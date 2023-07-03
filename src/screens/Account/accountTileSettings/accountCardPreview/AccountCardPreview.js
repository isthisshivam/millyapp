import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

const AccountCardPreview = ({
  accountName,
  image,
  nickname,
  mainTextColor,
  secondaryTextColor,
  backgroundColor,
}) => {
  const styles = StyleSheet.create({
    accountContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      paddingHorizontal: config.wp("1.2%"),
    },
    accountNumber: {
      fontSize: config.hp("2.25%"),
      letterSpacing: config.wp(".2%"),
      color:
        secondaryTextColor == "default"
          ? theme.colors.primary
          : secondaryTextColor,
    },
    balance: {
      fontSize: config.hp("4.5%"),
      letterSpacing: 1,
      color:
        secondaryTextColor == "default"
          ? theme.colors.primary
          : secondaryTextColor,
    },
    balanceContainer: {
      marginBottom: config.hp("1.5%"),
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: config.hp("1%"),
      paddingHorizontal: config.wp("5%"),
      borderRadius: config.hp("1.5%"),
      elevation: config.hp(".5%"),
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      fontSize: config.hp("2.25%"),
      color: theme.colors.whiteText,
      fontWeight: "bold",
    },
    card: {
      backgroundColor: backgroundColor == "default" ? "white" : backgroundColor,

      width: config.wp("70%"),
      height: config.hp("20%"),
      shadowOffset: {
        width: 0,
        height: config.hp("2%"),
      },
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      borderRadius: config.hp("2%"),
      paddingHorizontal: config.wp("2%"),
      paddingVertical: config.hp("2%"),
      elevation: config.hp("1%"),
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      shadowColor: "black",
    },
    cardBody: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      paddingVertical: config.hp("2%"),
      height: "100%",
      width: "100%",
    },
    cardColumn1: { height: "100%", width: "60%" },
    cardColumn2: {
      height: "100%",
      width: "40%",
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
    cardTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: config.wp("1.2%"),
    },
    container: {
      backgroundColor: "white",
      paddingVertical: config.hp("2.5%"),
      borderBottomWidth: config.hp(".1%"),
    },

    slide: {
      paddingHorizontal: config.wp("1.5%"),
      paddingBottom: config.hp("2.5%"),
      flexBasis: "100%",
      flex: 1,
      maxWidth: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
    },
    titleMain: {
      fontSize: config.hp("2.5%"),
      fontWeight: "bold",
      textTransform: "capitalize",
      color: mainTextColor == "default" ? "black" : mainTextColor,
    },
  });
  return (
    <>
      <View style={styles.slide}>
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <View>
              <Text style={styles.titleMain}>Available Balance </Text>
            </View>
            <Ionicons
              name="settings"
              style={styles.icon}
              size={config.hp("4%")}
              color="black"
            />
          </View>
          <View style={styles.cardBody}>
            <View style={styles.cardColumn1}>
              <View style={styles.balanceContainer}>
                <Text style={styles.balance}>$1,500</Text>
              </View>

              <View style={styles.accountContainer}>
                <Text
                  style={styles.titleMain}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {nickname?.length > 1 ? nickname : accountName}
                </Text>
                <Text style={styles.accountNumber}>12345678910</Text>
              </View>
            </View>
            <View style={styles.cardColumn2}>
              {image ? (
                <Image
                  resizeMode="contain"
                  source={{ uri: `data:image/jpg;base64,${image}` }}
                  style={{ height: "60%", width: "100%" }}
                ></Image>
              ) : undefined}
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default AccountCardPreview;
