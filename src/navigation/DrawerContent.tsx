import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Drawer, Text } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import Help from "../screens/landing/Help";
import { config } from "../config/Config";
import { theme } from "../config/Theme";

import {
  AccountsIcon,
  AlertIcon,
  BillPayIcon,
  MobileDepositIcon,
  CardControlIcon,
  TransferFundsIcon,
  EStatementsIcon,
  EmessageCenterIcon,
  EsafeIcon,
  RemindersIcon,
  LogoutIcon,
} from "../components/Icons";
import { useAppDispatch, useAppSelector } from "../store/Store";
import { Logout } from "../store/actionReducers/auth";

//import  from "../components/icons/AccountsIcon";

const DrawerContent = ({ navigation }) => {
  const profile = useAppSelector((state) => state.profile);
  const bitPanel = useAppSelector((state) => state.client);
  const eMsg = bitPanel ? bitPanel.bitPanel.eMsgCenter : false;
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { colors } = theme;
  //console.log(profile);

  const logout = async () => {
    if (auth.rememberDevice == true) {
      let refreshToken = await AsyncStorage.getItem("refreshToken");
      let rememberToken = await AsyncStorage.getItem("rememberToken");
      await AsyncStorage.removeItem("cookie");

      let data = { token: rememberToken, refreshToken: refreshToken };

      dispatch(Logout(data));
      navigation.navigate("Login");
    } else {
      let data = { token: "", refreshToken: "" };
      await AsyncStorage.removeItem("cookie");
      await AsyncStorage.removeItem("refreshToken");
      await AsyncStorage.removeItem("rememberToken");
      dispatch(Logout(data));
      navigation.navigate("Login");
    }
  };

  const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
      backgroundColor: "black",
    },
    userInfoSection: {
      paddingHorizontal: config.wp("3%"),
      paddingVertical: config.hp("1.2%"),
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#F4F4F4",
      borderBottomWidth: config.hp(".07%"),
      borderTopWidth: config.hp(".07%"),
      borderColor: theme.colors.faded,
    },
    userImageContainer: {
      flexDirection: "column",
      justifyContent: "center",
      marginLeft: config.wp("1.5%"),
    },
    sideContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 5,
      width: "80%",
    },

    row: {
      marginTop: config.hp("1.5%"),
      flexDirection: "row",
      alignItems: "center",
    },
    paragraph: {
      fontWeight: "bold",
      marginRight: 3,
    },
    drawerSection: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "white",
    },
    drawerItem: {
      overflow: "hidden",
      display: "flex",
      justifyContent: "flex-start",
    },
    bottomDrawerSection: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    preference: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    labelStyle: {
      fontSize: config.hp("2.25%"),
      color: "black",
      width: "100%",
    },
    userName: {
      fontSize: config.hp("2.5%"),
      paddingBottom: 5,
      textTransform: "capitalize",
    },
    userSettingsContainer: {
      flexDirection: "column",
      justifyContent: "space-between",

      width: "80%",
    },

    userSettings: {
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    userSettingsText: {
      fontSize: config.hp("1.6%"),
      color: colors.primary,
      fontWeight: "bold",
      paddingHorizontal: 7,
    },
  });
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <DrawerContentScrollView navigation={navigation}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={styles.userImageContainer}>
              {profile?.profilePic ? (
                <Avatar.Image
                  source={{
                    uri: `data:image/png;base64,${profile?.profilePic}`,
                  }}
                  size={config.hp("7.5%")}
                  resizeMode="cover"
                />
              ) : (
                <AntDesign name="user" size={24} color="black" />
              )}
            </View>
            <View style={styles.sideContainer}>
              <View style={styles.userSettingsContainer}>
                <Text style={styles.userName}>{profile?.info?.fullName}</Text>
                <TouchableOpacity
                  style={styles.userSettings}
                  onPress={() => {
                    navigation.navigate("Profile/Settings");
                  }}
                >
                  <Text style={styles.userSettingsText}>Profile</Text>
                  <Text style={styles.userSettingsText}>Settings</Text>
                  <Text style={styles.userSettingsText}>Disclosures</Text>
                </TouchableOpacity>
              </View>
              <Icon
                name="close"
                color={colors.primary}
                size={config.hp("4.5%")}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </View>
          </View>
          {/* <View style={styles.row}></View> */}
        </View>

        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            style={styles.drawerItem}
            labelStyle={styles.labelStyle}
            label="Accounts"
            icon={() => <AccountsIcon />}
            onPress={() => {
              navigation.navigate("Accounts");
            }}
          />
          <DrawerItem
            style={styles.drawerItem}
            labelStyle={styles.labelStyle}
            label="Transfer Funds"
            icon={() => <TransferFundsIcon />}
            onPress={() => {
              navigation.navigate("transferTab");
            }}
          />
          <DrawerItem
            style={styles.drawerItem}
            labelStyle={styles.labelStyle}
            label="BillPay"
            icon={() => <BillPayIcon />}
            onPress={() => {
              navigation.navigate("BillPayStack");
            }}
          />
          <DrawerItem
            style={styles.drawerItem}
            labelStyle={styles.labelStyle}
            label="Mobile Deposit"
            icon={() => <MobileDepositIcon />}
            onPress={() => {
              navigation.navigate("Deposit");
            }}
          />
          {eMsg ? (
            <DrawerItem
              style={styles.drawerItem}
              labelStyle={styles.labelStyle}
              label="eMessage center"
              icon={() => <EmessageCenterIcon />}
              onPress={() => {
                navigation.navigate("e-Message Center");
              }}
            />
          ) : undefined}
          <DrawerItem
            style={styles.drawerItem}
            labelStyle={styles.labelStyle}
            label="eStatements"
            icon={() => <EStatementsIcon />}
            onPress={() => {
              navigation.navigate("E-statements");
            }}
          />

          <DrawerItem
            style={styles.drawerItem}
            labelStyle={styles.labelStyle}
            label="eSafe"
            icon={() => <EsafeIcon />}
            onPress={() => {
              navigation.navigate("e-safe");
            }}
          />
          {/* <DrawerItem
            style={styles.drawerItem}
            labelStyle={styles.labelStyle}
            label="Reminders"
            icon={() => <RemindersIcon />}
            onPress={() => {
              navigation.navigate("Profile/Settings", {
                screen: "profileReminders",
              });
            }}
          /> */}
          <DrawerItem
            style={styles.drawerItem}
            labelStyle={styles.labelStyle}
            label="Alerts"
            icon={() => <AlertIcon />}
            onPress={() => {
              navigation.navigate("Alerts");
            }}
          />
          <DrawerItem
            style={styles.drawerItem}
            labelStyle={styles.labelStyle}
            label="Missions"
            icon={() => (
              <FontAwesome5
                name="piggy-bank"
                size={24}
                color={theme.colors.primary}
                style={{ width: config.wp("7.9%") }}
              />
            )}
            onPress={() => {
              navigation.navigate("Missions");
            }}
          />
          <DrawerItem
            style={styles.drawerItem}
            labelStyle={styles.labelStyle}
            label="Commercial"
            icon={() => (
              <FontAwesome5
                name="user-shield"
                size={24}
                color={theme.colors.primary}
              />
            )}
            onPress={() => {
              navigation.navigate("Admin");
            }}
          />
          <DrawerItem
            style={[styles.drawerItem, styles.drawerItem]}
            labelStyle={styles.labelStyle}
            label="Logout"
            icon={() => <LogoutIcon />}
            onPress={() => logout()}
          />
          <View style={{ paddingHorizontal: 15 }}>
            <Help colors={colors} height={config.hp("1.5%")} />
          </View>
        </Drawer.Section>
      </DrawerContentScrollView>
    </View>
  );
};

export default DrawerContent;
