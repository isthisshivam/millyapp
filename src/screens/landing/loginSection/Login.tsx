import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native-paper";
import * as LocalAuthentication from "expo-local-authentication";
import LottieView from "lottie-react-native";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetSubscriptions } from "../../../store/actionReducers/subscriptions";
import { GetReminders } from "../../../store/actions/ReminderActions";
import { TokenLogin, userLoginMain } from "../../../store/actions/authActions";
import { GetBitPanel } from "../../../store/actions/AppConfigActions";
import { GetAccounts, GetOrder } from "../../../store/actions/AccountActions";
import {
  SetUserID,
  GetNameAndProfilePic,
} from "../../../store/actions/ProfileAction";
import { GetMessages } from "../../../store/actions/MessageActions";
import { config } from "../../../config/Config";
import { styles } from "./style";
import StatusHandler from "../../../../utils/StatusHandler";
import { useAppDispatch, useAppSelector } from "../../../store/Store";
import { LoginUser, reset } from "../../../store/actionReducers/auth";
import {
  AuthType,
  LoginPayload,
  LoginStatus,
} from "../../../../types/auth/authTypes";
import {
  GetContactInfo,
  GetProfilePic,
} from "../../../store/actionReducers/profile";

const Login = ({ navigation }) => {
  const bitPanel = useAppSelector((state) => state.client);
  const state = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  //console.log(state);

  const strikeBlocking = bitPanel
    ? bitPanel.bitPanel.strikeBlocking
    : undefined;

  const [user, setUser] = useState<LoginPayload>({
    channel: "mTeller",
    username: "Demos1234",
    password: "Demos1234",
  });

  const [status, setStatus] = useState<LoginStatus>({
    loading: false,
    error: undefined,
    message: undefined,
    biometricSupported: false,
    showLogin: true,
    bioMetricType: undefined,
    disabled: true,
    hasBioMetricsSaved: false,
    rememberToken: undefined,
    refreshToken: undefined,
  });

  //INPUT HANDLER
  const handleChange = useCallback(
    (name: string, value: any) => {
      setUser({ ...user, [name]: value });
    },
    [user]
  );

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  const checkHardware = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    let rememberToken = await AsyncStorage.getItem("rememberToken");
    let refreshToken = await AsyncStorage.getItem("refreshToken");
    let username = await AsyncStorage.getItem("username");

    if (username) {
      setUser({
        ...user,
        username: username,
      });
    }

    setStatus({
      ...status,
      biometricSupported: compatible,
      bioMetricType:
        types[0] == 1
          ? AuthType.FINGERPRINT
          : types[0] == 2
          ? AuthType.FaceId
          : types[0] == 3
          ? AuthType.Iris
          : undefined,
      hasBioMetricsSaved: savedBiometrics,
      rememberToken: rememberToken,
      refreshToken: refreshToken,
    });
  };

  //Submit Login to backend
  const handleSubmit = async () => {
    if (state.rememberDevice) {
      await AsyncStorage.setItem("username", user.username);
    }
    dispatch(LoginUser(user));
  };

  const bioLogin = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      //promptMessage: "Sign in with bio metrics",
      cancelLabel: "Cancel",
      disableDeviceFallback: false,
      fallbackLabel: "Use Password",
    });

    //If Successful Bio Auth Submit Login
    if (result.success === true) {
      setStatus({
        ...status,
        loading: true,
      });
      let username = AsyncStorage.getItem("username");
      // let password = AsyncStorage.getItem("password");

      let data = {
        channel: "mTeller",
        username: username,
        token: status.rememberToken,
        refreshToken: status.refreshToken,
        deviceInfo: `${Device.deviceName},${Device.modelId},${Device.osVersion}`,
        rememberDevice: true,
      };

      //console.log(data);

      dispatch(LoginUser(data));
      return;
    }
  };

  async function loginSuccessActions() {
    dispatch(SetUserID(user.username));
    dispatch(GetProfilePic());
    dispatch(GetContactInfo());
    dispatch(GetOrder());
    dispatch(GetAccounts());
    dispatch(GetSubscriptions());
    dispatch(GetReminders());
    dispatch(GetMessages());
    navigation.navigate("Main"); //Navigate to home screen
    setStatus({
      ...status,
      loading: false,
    });

    setUser({
      username: undefined,
      password: undefined,
      channel: "mTeller",
    });
    return;
  }

  // Check if hardware supports biometrics
  useEffect(() => {
    checkHardware();
    dispatch(GetBitPanel);
  }, []);

  useEffect(() => {
    if (state.showTwoFactor) {
      navigation.navigate("Two Factor");
      return;
    }
    if (state.status == true) {
      loginSuccessActions();
      dispatch(reset());

      //Auth Failed
    } else if (state.status == "Error") {
      dispatch(reset());
      return;
    }
  }, [state]);

  function handleBioOptions() {
    switch (status?.bioMetricType) {
      case 1:
        if (Device.osName == "ios") {
          return (
            <>
              <Image
                source={require("../../../../assets/fingerprint.png")}
                style={{ height: 50, width: 50 }}
              ></Image>
              <Text>Sign in with FingerPrint</Text>
            </>
          );
        }
      case 1:
        if (Device.osName == "Android") {
          return (
            <>
              <Image
                source={require("../../../../assets/fingerprint.png")}
                style={{ height: 50, width: 50 }}
              ></Image>
              <Text>Sign in with FingerPrint</Text>
            </>
          );
        }
      case 2:
        return (
          <>
            <Image
              source={require("../../../../assets/faceid.png")}
              style={{ height: 50, width: 50 }}
            ></Image>
            <Text>Sign in with FaceID</Text>
          </>
        );
      default:
        return (
          <Text>
            "Your device is not compatible with Touch Id or facial recognition"
          </Text>
        );
    }
  }

  function handleBioAuth() {
    // switch (status?.bioMetricType) {
    //   case 1:
    //     if (Device.osName == "ios") {
    //       return "Sign In with Touch ID";
    //     } else {
    //       return "Sign In With FingerPrint";
    //     }
    //   case 2:
    //     return "Sign In with Face ID";
    //   case 3:
    //     return "Use Iris Recognition";
    //   default:
    //     return "Your device is not compatible with Touch Id or facial recognition";
    // }
  }

  return (
    <View style={{ flex: 1 }}>
      {state?.loading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
            height: "100%",
            paddingTop: 25,
          }}
        >
          <LottieView
            loop
            autoPlay
            style={{
              width: 160,
              height: 160,
            }}
            source={require("../../../components/ui/loading-spinner.json")}
          />
        </View>
      ) : (
        <View style={{ flex: 1, paddingTop: config.hp("2%") }}>
          <View style={styles.inputContainer}>
            <View style={styles.inputView}>
              <TextInput
                underlineColor="gray"
                style={styles.input}
                label="User ID"
                placeholder="Enter your username"
                //value={user.username}
                onChangeText={(value) => handleChange("username", value)}
                textContentType="username"
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                underlineColor="gray"
                style={styles.input}
                label="Password"
                placeholder="Enter your Password"
                onChangeText={(value) => handleChange("password", value)}
                //value={user.password}
                secureTextEntry
                textContentType="password"
              />
            </View>
          </View>
          {status.showLogin == true ? (
            <View style={{ paddingTop: 20 }}>
              {status.rememberToken ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: config.wp("4%"),
                    marginBottom: 25,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => {
                      //setShowLogin(false);
                      bioLogin();
                      // setStatus({
                      //   ...status,
                      //   showLogin: true,
                      // });
                    }}
                    style={styles.signIn}
                  >
                    {handleBioOptions()}
                  </TouchableOpacity>
                </View>
              ) : undefined}

              <View
                style={{
                  alignItems: "center",
                  justifyContent: "flex-end",
                  flex: 1,
                  paddingBottom: 10,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => handleSubmit()}
                  style={{
                    ...styles.button,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "80%",
                    borderRadius: 12,
                  }}
                >
                  <Text style={styles.buttonText}>Sign In with password</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("Forgot Password")}
                >
                  <Text style={{ paddingVertical: 10 }}>
                    Forgot Password/Username?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.bioContainer}>
              <View
                style={{
                  height: config.hp("9%"),
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                {status.biometricSupported ? (
                  <TouchableOpacity
                    // disabled={!formOneIsFilled}
                    activeOpacity={0.85}
                    style={styles.touchId}
                    onPress={() => bioLogin()}
                  >
                    <Text
                      style={{
                        ...styles.buttonText,
                        //paddingVertical: 5,
                        textAlign: "center",
                        textAlignVertical: "center",
                        width: "100%",
                      }}
                    >
                      {handleBioAuth()}
                    </Text>
                  </TouchableOpacity>
                ) : undefined}
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() =>
                    setStatus({
                      ...status,
                      showLogin: true,
                    })
                  }
                  style={{
                    ...styles.signIn,
                  }}
                >
                  <Text style={{ color: "black", paddingVertical: 5 }}>
                    Sign In with password
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}

      <StatusHandler
        state={state}
        status={status}
        setStatus={setStatus}
        hideSuccess={true}
        navigation={undefined}
        deleteItem={undefined}
      ></StatusHandler>

      {/* <ErrorModal
        showErrorModal={showErrorModal}
        closeErrorModal={closeErrorModal}
        error={error}
        error2={
          auth.status == 401
            ? `To Protect your account, after ${strikeBlocking} failed attempts, your account will be locked and you will have to give us a call to unlock your account.`
            : undefined
        }
      ></ErrorModal> */}
    </View>
  );
};

export default Login;
