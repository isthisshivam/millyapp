import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LottieView from "lottie-react-native";
import StatusHandler from "../../../../../utils/StatusHandler";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import { useAppDispatch, useAppSelector } from "../../../../store/Store";
import { UpdateUserPassword } from "../../../../store/actionReducers/auth";
import { reset } from "../../../../store/actionReducers/auth";
import { UpdatePasswordType } from "../../../../../types/auth/authTypes";

const UpdatePassword = ({ navigation }) => {
  const state = useAppSelector((state) => state.auth);
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useAppDispatch();

  const [payload, setPayload] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    error: undefined,
    alert: false,
    message: undefined,
    disabled: false,
  });

  function handleChange(name: string, value: string) {
    setPayload({
      ...payload,
      [name]: value,
    });
  }

  //   useEffect(() => {
  //     //No errors
  //     if (
  //       payload.oldPassword.length >= 6 &&
  //       payload.newPassword === payload.confirmPassword &&
  //       payload.newPassword.length >= 6 &&
  //       payload.confirmPassword.length >= 6
  //     ) {
  //       setIsSafe(true);
  //       setAlert(false);
  //     } else {
  //       //User has not typed yet no errors
  //       setIsSafe(false);
  //     }
  //   }, [payload]);

  function submit() {
    setStatus({
      ...status,
      loading: true,
    });
    let data: UpdatePasswordType = {
      channel: "mTeller",
      oldPwd: payload.oldPassword,
      newPwd: payload.newPassword,
    };
    dispatch(UpdateUserPassword(data));
  }

  useEffect(() => {
    if (state.status == true) {
      setStatus({
        ...status,
        loading: false,
      });
      dispatch(reset());
    }
    if (state.status == "Error") {
      setStatus({
        ...status,
        loading: false,
        error: state.error,
      });
      dispatch(reset());
    }
  }, [state]);

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
    >
      <Text
        style={{
          width: "100%",
          fontSize: 18,
          fontWeight: "500",
          color: theme.colors.primary,
        }}
      >
        Update Password
      </Text>
      <Text style={{ marginBottom: config.hp("4%") }}>
        Enter your old password to set a new password for your account.
      </Text>

      {status.loading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "80%",
          }}
        >
          <LottieView
            loop={false}
            speed={1.5}
            autoPlay
            style={{
              width: 160,
              height: 160,
            }}
            source={require("../../../../components/ui/loading-spinner.json")}
            //donAnimationFinish={() => redirect()}
          />
        </View>
      ) : (
        <>
          <View style={{ width: "100%", alignItems: "center" }}>
            <View
              style={{
                width: "75%",
                alignItems: "center",
                marginBottom: config.hp("2%"),
              }}
            >
              <Text style={{ fontSize: 16, width: "100%", marginBottom: 5 }}>
                Enter your old password.
              </Text>
              <TextInput
                style={styles.input}
                //secureTextEntry={!showPassword}
                placeholder={"Old Password"}
                onChangeText={(value) => {
                  handleChange("oldPassword", value);
                }}
                // right={
                //   <TextInput.Icon
                //     name={() => (
                //       <FeatherIcons
                //         name={"eye"}
                //         style={styles.eyeIcon}
                //         onPress={() => {
                //           setshowPassword(!showPassword);
                //         }}
                //       />
                //     )}
                //   />
                // }
              />
            </View>

            <View style={{ width: "75%" }}>
              <Text style={{ fontSize: 16, width: "100%", marginBottom: 5 }}>
                Enter a new password for your account.
              </Text>
              <TextInput
                style={styles.input}
                //secureTextEntry={!showPassword}
                placeholder={"New Password"}
                onChangeText={(value) => {
                  handleChange("newPassword", value);
                }}
                // right={
                //   <TextInput.Icon
                //     name={() => (
                //       <FeatherIcons
                //         name={"eye"}
                //         style={styles.eyeIcon}
                //         onPress={() => {
                //           setshowPassword(!showPassword);
                //         }}
                //       />
                //     )}
                //   />
                // }
              />

              <TextInput
                style={styles.input}
                placeholder={"Confirm New Password"}
                onChangeText={(value) => {
                  setPayload({ ...payload, confirmPassword: value });
                }}
                // right={
                //   <TextInput.Icon
                //     name={() => (
                //       <FeatherIcons
                //         name={"eye"}
                //         size={10}
                //         // style={styles.eyeIcon}
                //         onPress={() => {
                //           setShowConfirmPassword(!showConfirmPassword);
                //         }}
                //       />
                //     )}
                //   />
                // }
              />
            </View>

            <View>
              {status.alert ? (
                <>
                  <Text style={{ color: "red" }}>
                    Both passwords must match
                  </Text>
                  <Text style={{ color: "red" }}>
                    Password must be at least 6 characters
                  </Text>
                </>
              ) : undefined}
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={submit}
              style={styles.button}
              disabled={status.disabled}
            >
              <Text style={{ color: "white", fontSize: 16 }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <StatusHandler
        state={state}
        setStatus={setStatus}
        status={status}
        navigation={navigation}
        hideSuccess={false}
        deleteItem={null}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    width: "75%",
    paddingVertical: config.hp("1%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    paddingVertical: config.hp("2%"),
    paddingHorizontal: config.wp("2%"),
    //flex: 1,
    flexDirection: "column",
    //alignItems: "center",
    height: "100%",
    width: "100%",
  },
  input: {
    borderRadius: 7,
    borderWidth: 1,
    borderColor: theme.colors.fadedDark,
    width: "100%",
    paddingHorizontal: config.wp("1%"),
    height: config.hp("5%"),
    marginBottom: config.hp("2%"),
    backgroundColor: "white",
  },
});
export default UpdatePassword;
