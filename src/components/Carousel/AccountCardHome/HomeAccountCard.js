import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";

//import CurrencyFormat from "react-currency-format";

import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { currencyFormat } from "../../../../utils/utils";

const HomeAccountCard = ({ navigation, item }) => {
  const bitPanel = useSelector((state) => state.config.bitPanel?.bitPanel);
  const { accountId, accountName, balance, accountNumber, nickname } = item;
  const backGroundColor = item.backGroundColor ? item.backGroundColor : "white";
  const mainTextColor = item.mainTextColor ? item.mainTextColor : "black";
  const [hideAcct, setHideAcct] = useState(undefined);
  const maskAccount = bitPanel?.maskAccount;
  const isFocused = useIsFocused();

  const secondaryTextColor = item.secondaryTextColor
    ? item.secondaryTextColor
    : "black";

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  function viewAcct() {
    setHideAcct(!hideAcct);
    wait(2000).then(() => setHideAcct(maskAccount));
  }

  useEffect(() => {
    setHideAcct(maskAccount);
  }, [isFocused]);

  const styles = StyleSheet.create({
    accountContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      paddingHorizontal: config.wp("1.2%"),
      paddingTop: 20,
    },
    accountNumber: {
      fontSize: config.hp("2.25%"),
      letterSpacing: config.wp(".2%"),
      paddingLeft: config.wp("1.5%"),
      color: secondaryTextColor == "default" ? "black" : secondaryTextColor,
      paddingTop: config.hp("1%"),
    },
    balance: {
      fontSize: config.hp("4%"),
      letterSpacing: 1,
      color: secondaryTextColor == "default" ? "black" : secondaryTextColor,
    },

    card: {
      backgroundColor: backGroundColor == "default" ? "white" : backGroundColor,
      width: config.wp("80%"),
      height: config.hp("25%"),
      shadowOffset: {
        width: 0,
        height: config.hp("2%"),
      },
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      borderRadius: config.hp("2%"),
      paddingBottom: config.hp("1%"),
      elevation: config.hp("1%"),
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      shadowColor: "black",
      position: "relative",
      zIndex: 30,
    },
    cardBody: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      paddingVertical: config.hp("0.5%"),
      height: "70%",
    },
    cardColumn1: {
      //height: "100%",
      width: "55%",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    cardColumn2: {
      //height: "100%",
      width: "45%",
      overflow: "hidden",
      justifyContent: "flex-end",
      alignItems: "flex-end",
      paddingHorizontal: config.wp("2%"),
    },
    cardTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      height: config.hp("10%"),
      paddingHorizontal: config.wp("3%"),
      paddingTop: config.hp("2%"),
      // backgroundColor: "white",
    },

    slide: {
      paddingHorizontal: config.wp("1.5%"),
      flexBasis: "100%",
      flex: 1,
      maxWidth: "100%",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      height: config.hp("30%"),
    },
    titleMain: {
      fontSize: config.hp("2.25%"),
      color: mainTextColor == "default" ? theme.colors.primary : mainTextColor,
      fontWeight: "bold",
      textTransform: "capitalize",
    },
  });

  return (
    <View style={styles.slide}>
      <Pressable
        //onPressIn={}
        android_ripple={{ color: "gray" }}
        delayLongPress={100}
        onPress={() => {
          navigation.navigate("Account", {
            accountId: accountId,
          });
        }}
        onLongPress={() => {
          navigation.navigate("Accounts");
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }}
        style={styles.card}
      >
        <View style={styles.cardTop}>
          <View style={{}}>
            <View>
              <Text style={styles.titleMain}>Available Balance </Text>
            </View>
            <View style={styles.balanceContainer}>
              <Text style={styles.balance}>{currencyFormat(balance)}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AccountTileSettings", {
                accountId: accountId,
              });
            }}
            style={{
              paddingVertical: 25,
              paddingHorizontal: 20,
              position: "absolute",
              right: 0,
              top: 0,
              zIndex: 20,
            }}
          >
            <Ionicons name="settings" size={35} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.cardBody}>
          <View style={styles.cardColumn1}>
            <View style={styles.accountContainer}>
              <Text
                style={{ ...styles.titleMain, paddingLeft: config.wp("2%") }}
              >
                {nickname ? nickname : accountName}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingRight: config.wp("4%"),
                }}
              >
                <Text style={styles.accountNumber}>
                  {hideAcct ? "************" : accountNumber}
                </Text>
                <TouchableOpacity
                  style={{
                    paddingLeft: config.wp("4%"),
                  }}
                  onPress={viewAcct}
                >
                  {hideAcct ? (
                    <Feather name="eye" size={24} color="black" />
                  ) : (
                    <Feather name="eye-off" size={24} color="black" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.cardColumn2}>
            {item?.image ? (
              <Image
                resizeMode="cover"
                source={{ uri: `data:image/jpg;base64,${item?.image}` }}
                style={{
                  width: "100%",
                  height: "65%",
                  alignSelf: "flex-end",
                  borderRadius: 7,
                }}
              ></Image>
            ) : (
              <View
                style={{
                  backgroundColor: `${backGroundColor}20`,

                  width: "100%",
                  height: "65%",
                  borderRadius: 7,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialIcons name="perm-media" size={24} color="black" />
              </View>
            )}
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default HomeAccountCard;
