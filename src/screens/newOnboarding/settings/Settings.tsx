import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import AnimatedLottieView from "lottie-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAppDispatch, useAppSelector } from "../../../store/Store";
import * as Device from "expo-device";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";
import { GetMessages } from "../../../store/actions/MessageActions";
import { GetAccounts, GetOrder } from "../../../store/actions/AccountActions";
import { GetSubscriptions } from "../../../store/actions/SubscriptionAction";
import { GetNameAndProfilePic } from "../../../store/actions/ProfileAction";
import { LoginUser, RememberDevice } from "../../../store/actionReducers/auth";
import StatusHandler from "../../../../utils/StatusHandler";

const Settings = ({ onboardingStyles, handleBack, navigation }) => {
  const bitPanel = useAppSelector((state) => state.client);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [payload, setPayload] = useState({
    rememberDevice: false,
    rememberUserId: false,
  });

  const handleChange = useCallback(
    (name: string, value: boolean) => {
      setPayload({
        ...payload,
        [name]: value,
      });
    },
    [payload]
  );

  const Login = useCallback(() => {
    dispatch(
      LoginUser({
        channel: "mTeller",
        username: "Demos1234",
        password: "Demos1234",
      })
    );
  }, []);

  const [status, setStatus] = useState({
    rememberDevice: false,
    rememberUser: false,
    isBiometricSupported: false,
    enableBioAuth: false,
    allowFingerPrintAndroid: false,
    allowFingerPrintIos: false,
    type: undefined,
    device: undefined,
    refreshToken: undefined,
    rememberToken: undefined,
    error: undefined,
  });

  //Check if hardware supports biometrics
  const checkHardware = async () => {
    const authTypes =
      await LocalAuthentication.supportedAuthenticationTypesAsync();
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    let rememberToken = await AsyncStorage.getItem("rememberToken");
    let refreshToken = await AsyncStorage.getItem("refreshToken");
    let userId = await AsyncStorage.getItem("username");

    setStatus({
      ...status,
      isBiometricSupported: compatible,
      type: authTypes,
      device: Device.osName,
      rememberDevice: rememberToken ? true : false,
      refreshToken: refreshToken,
      rememberToken: rememberToken,
      rememberUser: userId ? true : false,
    });
  };

  //console.log(status);

  // //Enable BioAuth
  // const toggleBioAuth = () => {
  //   setStatus({
  //     ...status,
  //     enableBioAuth: !status.enableBioAuth,
  //   });
  //   dispatch(SetBioAuth(!enableBioAuth));
  // };
  //Remember UserId
  const toogleRememberUserId = async (value: boolean) => {
    if (value == true) {
      await AsyncStorage.setItem("username", auth.username);
      setStatus({
        ...status,
        rememberUser: true,
      });
    } else {
      await AsyncStorage.removeItem("username");
      setStatus({
        ...status,
        rememberUser: false,
      });
    }
  };

  function rememberDevice() {
    if (auth.rememberDevice == true) {
      let data = {
        deviceInfo: `${Device.deviceName},${Device.modelId},${Device.osVersion}`,
      };

      dispatch(RememberDevice(data));
      setStatus({
        ...status,
        rememberDevice: false,
      });
    } else {
      let data = {
        rememberDevice: false,
      };
      setStatus({
        ...status,
        rememberDevice: false,
      });
      dispatch(RememberDevice(data));
    }
  }

  useEffect(() => {
    checkHardware();
  }, []);

  useEffect(() => {
    setStatus({
      ...status,
      allowFingerPrintAndroid: bitPanel?.bitPanel?.hasFingerprintLoginAndroid,
      allowFingerPrintIos: bitPanel?.bitPanel?.hasFingerprintLoginiOS,
    });
  }, [auth, bitPanel]);

  useEffect(() => {
    setStatus({
      ...status,
      rememberDevice: auth.rememberDevice,
    });
    if (auth.status == true) {
      dispatch(GetNameAndProfilePic());
      dispatch(GetOrder());
      dispatch(GetAccounts());
      dispatch(GetSubscriptions());
      //dispatch(GetReminders());
      dispatch(GetMessages());
      navigation.navigate("Main");
    }
    if (auth.error || auth.status == "Error") {
      setStatus({
        ...status,
        error: auth.error,
      });
      //dispatch(rese);
    }
  }, [auth]);

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ flex: 1 }}
    >
      <Text
        style={{
          fontSize: 24,
          color: theme.colors.primary,
          fontWeight: "bold",
          textAlign: "left",
          marginBottom: config.hp("4%"),
        }}
      >
        Preferences
      </Text>

      {auth.loading ? (
        <>
          <View
            style={{
              alignItems: "center",
              justifyContent: "flex-start",
              height: "100%",
              paddingTop: 25,
            }}
          >
            <AnimatedLottieView
              loop
              autoPlay
              style={{
                width: 160,
                height: 160,
              }}
              source={require("../../../components/ui/loading-spinner.json")}
            />
          </View>
        </>
      ) : (
        <>
          <View style={{ flex: 3, justifyContent: "flex-end" }}>
            {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: config.hp("2%"),
          }}
        >
          <Text style={{ fontSize: 20 }}>Enable Push Notifications</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggle}
            value={isEnabled}
          />
        </View> */}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: config.hp("2%"),
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <Text style={{ fontSize: 20 }}>Remember UserID</Text>
                <Text>Remember UserID for faster login.</Text>
              </View>
              <Switch
                trackColor={{ false: "#767577", true: theme.colors.primary }}
                thumbColor={payload.rememberUserId ? "white" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(value) => handleChange("rememberUserId", value)}
                value={payload.rememberUserId}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: config.hp("2%"),
                width: "100%",
              }}
            >
              <View style={{ flexDirection: "column", width: "70%" }}>
                <Text style={{ fontSize: 20 }}>Enable Biometrics</Text>
                <Text style={{}}>
                  Enable Biometrics to save time and increase security
                </Text>
              </View>
              <Switch
                trackColor={{ false: "#767577", true: theme.colors.primary }}
                thumbColor={"white"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(value) => rememberDevice()}
                value={status.rememberDevice}
              />
            </View>
          </View>
          <View style={onboardingStyles.buttonContainer}>
            <TouchableOpacity onPress={Login} style={onboardingStyles.button}>
              <Text style={onboardingStyles.buttonText}>Complete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBack}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>Back</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <StatusHandler
        state={auth}
        setStatus={setStatus}
        status={status}
        navigation={undefined}
        hideSuccess={true}
        deleteItem={undefined}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: config.wp("4%"),
    width: "100%",
  },
});

export default Settings;
