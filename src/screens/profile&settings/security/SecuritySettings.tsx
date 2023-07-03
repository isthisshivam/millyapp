import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Device from "expo-device";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";
// import {
//   SetBioAuth,
//   ToggleRememberUserId,
// } from "../../../store/actions/ProfileAction.js";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { RememberDevice } from "../../../store/actionReducers/auth";
import { useAppDispatch, useAppSelector } from "../../../store/Store";

const SecuritySettings = ({ navigation }) => {
  const profile = useAppSelector((state) => state.profile);
  const bitPanel = useAppSelector((state) => state.client);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

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
  });

  //Check if hardware supports biometrics
  const checkHardware = async () => {
    const authTypes =
      await LocalAuthentication.supportedAuthenticationTypesAsync();
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    let rememberToken = await AsyncStorage.getItem("rememberToken");
    let refreshToken = await AsyncStorage.getItem("refreshToken");
    let userId = await AsyncStorage.getItem("userId");

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
  const toggleRememberUserId = async (value) => {
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

  function rememberDevice(value) {
    if (value == true) {
      let data = {
        deviceInfo: `${Device.deviceName},${Device.modelId},${Device.osVersion}`,
      };
      setStatus({
        ...status,
        rememberDevice: true,
      });
      dispatch(RememberDevice(data));
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
      allowFingerPrintAndroid: bitPanel.bitPanel.hasFingerprintLoginAndroid,
      allowFingerPrintIos: bitPanel?.bitPanel?.hasFingerprintLoginiOS,
    });
  }, [bitPanel]);

  // function handleSwitches() {
  //   switch (status.device) {
  //     case "ios" && status.isBiometricSupported && status.allowFingerPrintIos:
  //       return (
  //         <View style={styles.switchContainer}>
  //           <Text style={styles.switchText}>Enable Touch ID</Text>
  //           <Switch
  //             trackColor={{
  //               false: theme.colors.faded,
  //               true: theme.colors.primaryLight,
  //             }}
  //             thumbColor={
  //               status.enableBioAuth ? theme.colors.primary : "#f4f3f4"
  //             }
  //             ios_backgroundColor="#3e3e3e"
  //             onValueChange={toggleBioAuth}
  //             value={status.enableBioAuth}
  //             style={{
  //               transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  //               height: config.hp("4%"),
  //             }}
  //           />
  //         </View>
  //       );

  //     case "ios" && status.isBiometricSupported && !status.allowFingerPrintIos:
  //       return (
  //         <View style={styles.switchContainer}>
  //           <Text style={styles.switchText}>Enables Face Recognition</Text>
  //           <Switch
  //             trackColor={{
  //               false: theme.colors.faded,
  //               true: theme.colors.primaryLight,
  //             }}
  //             thumbColor={
  //               status.enableBioAuth ? theme.colors.primary : "#f4f3f4"
  //             }
  //             ios_backgroundColor="#3e3e3e"
  //             onValueChange={toggleBioAuth}
  //             value={status.enableBioAuth}
  //             style={{
  //               transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  //               height: config.hp("4%"),
  //             }}
  //           />
  //         </View>
  //       );

  //     case "Android" &&
  //       status.isBiometricSupported &&
  //       status.allowFingerPrintAndroid:
  //       return (
  //         <View style={styles.switchContainer}>
  //           <Text style={styles.switchText}>Enable FingerPrint</Text>
  //           <Switch
  //             trackColor={{
  //               false: theme.colors.faded,
  //               true: theme.colors.primaryLight,
  //             }}
  //             thumbColor={
  //               status.enableBioAuth ? theme.colors.primary : "#f4f3f4"
  //             }
  //             ios_backgroundColor="#3e3e3e"
  //             onValueChange={toggleBioAuth}
  //             value={status.enableBioAuth}
  //             style={{
  //               transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  //             }}
  //           />
  //         </View>
  //       );
  //     default:
  //       return;
  //   }
  // }
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingVertical: config.hp("3%"),
        paddingHorizontal: config.wp("4%"),
        paddingBottom: config.hp("12%"),
      }}
    >
      {/* <Text>Security Alerts</Text>
      <Text>Manage Devices</Text> */}

      <TouchableOpacity
        onPress={() => navigation.navigate("Update Password")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: config.hp("3%"),
        }}
      >
        <Text style={{ fontSize: config.wp("5%"), fontWeight: "400" }}>
          Update Password
        </Text>
        <Entypo name="chevron-right" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Update Questions")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: config.hp("3%"),
        }}
      >
        <Text style={{ fontSize: config.wp("5%"), fontWeight: "400" }}>
          Update Questions
        </Text>
        <Entypo name="chevron-right" size={24} color="black" />
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          width: "100%",
          flexDirection: "column",
          justifyContent: "flex-end",
          // paddingBottom: ,
        }}
      >
        {/* {handleSwitches()} */}
        <View style={styles.switchContainer}>
          <View style={{ width: "80%" }}>
            <Text style={styles.switchText}>Remember User ID</Text>
            <Text>Save time on your next login </Text>
          </View>
          <Switch
            trackColor={{
              false: theme.colors.faded,
              true: theme.colors.primaryLight,
            }}
            thumbColor={status.rememberUser ? theme.colors.primary : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(value) => toggleRememberUserId(value)}
            value={status.rememberUser}
            style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
          />
        </View>
        {status.isBiometricSupported ? (
          <View style={styles.switchContainer}>
            <View style={{ width: "80%" }}>
              <Text style={styles.switchText}>Remember Device</Text>
              <Text>
                This will enable you to use your devices biometrics to login.
              </Text>
            </View>
            <Switch
              trackColor={{
                false: theme.colors.faded,
                true: theme.colors.primaryLight,
              }}
              thumbColor={
                status.rememberDevice ? theme.colors.primary : "#f4f3f4"
              }
              ios_backgroundColor="#3e3e3e"
              onValueChange={(value) => rememberDevice(value)}
              value={status.rememberDevice}
              style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
            />
          </View>
        ) : undefined}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  arrowIcon: {
    fontSize: config.hp("2.7%"),
  },
  container: {
    height: config.hp("100%"),
  },
  titleContainer: {
    height: "7%",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: config.wp("4%"),
  },
  title: {
    fontSize: config.hp("3.5%"),
    fontWeight: "bold",
  },
  profileContainer: {
    height: "24%",
    // backgroundColor: "blue",
    backgroundColor: "white",
    paddingHorizontal: config.wp("4%"),
    display: "flex",
    flexDirection: "column",
    borderBottomColor: theme.colors.disabled,
    borderBottomWidth: config.hp(".1%"),
  },
  secondaryTitleContainer: {
    height: "40%",
    display: "flex",
    justifyContent: "center",
  },
  secondaryTitle: {
    fontSize: config.hp("2.3%"),
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  profileLinksContainer: {
    height: "60%",
    display: "flex",
    justifyContent: "space-evenly",
  },
  settingsContainer: {
    flexDirection: "column",
    flex: 1,
  },

  settingsTitleContainer: {
    height: "30%",
    flexDirection: "column",
    justifyContent: "center",
  },
  settingsLinkcontainer: {
    height: "70%",
    display: "flex",
    justifyContent: "space-evenly",
    paddingHorizontal: config.wp("4%"),
  },
  switchContainer: {
    borderBottomColor: theme.colors.disabled,
    borderBottomWidth: config.hp(".1%"),
    paddingVertical: 10,
    paddingHorizontal: config.wp("4%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: config.hp("2%"),
  },
  switchText: {
    fontSize: 18,
    color: theme.colors.primary,
    fontWeight: "500",
  },
});

export default SecuritySettings;
