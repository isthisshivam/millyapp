import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";
import { Title } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { config } from "../../config/Config";
import { theme } from "../../config/Theme";
import { useAppSelector } from "../../store/Store";

const AccountCard = ({ navigation, accountId }) => {
  const accounts = useAppSelector((state) => state.accounts.accounts).filter(
    (item) => item.accountId == accountId
  );
  const currentAcct = accounts[0];
  const {
    balance,
    accountNumber,
    image,
    nickname,
    accountName,
    availableBalance,
  } = currentAcct;

  const mainTextColor = theme.colors.primary;
  const secondaryTextColor = "black";
  const backgroundColor = "white";
  const styles = StyleSheet.create({
    accountCard: {
      paddingLeft: 5,
    },
    balanceContainer: {
      paddingVertical: config.hp("2%"),
      flexDirection: "column",
      justifyContent: "space-around",
    },
    balance: {
      fontSize: config.hp("3%"),
      color: secondaryTextColor,
    },
    bottomIcons: {
      color: mainTextColor,
    },

    card: {
      marginTop: config.hp("1.2%"),
      marginBottom: config.hp("1.2%"),
      width: "100%",
      backgroundColor: backgroundColor,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      paddingVertical: config.hp("1%"),
      paddingHorizontal: config.wp("3%"),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1.2,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7,
    },
    cardContent: {
      flexDirection: "column",
      justifyContent: "space-around",
    },
    circleIcon: {
      color: theme.colors.faded,
    },
    columnContainer: {
      flexDirection: "column",
      justifyContent: "space-around",
    },
    dotIconContainer: {
      flexDirection: "row",
    },
    iconContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },

    optionContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      paddingHorizontal: 25,
      paddingVertical: config.hp("1%"),
    },
    optionText: {
      fontSize: config.hp("1.8%"),
      color: theme.colors.fade,
      textTransform: "uppercase",
    },
    optionIsSelected: {
      color: mainTextColor,
    },

    rightIconsContainer: {
      width: "60%",
      flexDirection: "row",
      justifyContent: "space-between",
    },

    titleMain: {
      color: mainTextColor,
      fontSize: config.hp("2.3%"),
      fontWeight: "bold",
      textTransform: "capitalize",
    },
    titleSecondary: {
      color: secondaryTextColor,
      fontSize: config.hp("2.1%"),
    },
    titleAccount: {
      color: mainTextColor,
      fontSize: config.hp("2.5%"),
      fontWeight: "bold",
    },
    topContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });

  const [isBalance, setIsBalance] = useState(true);
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => {
        navigation.navigate("Account", {
          accountId: accountId,
          pageScreen: 1,
        });
      }}
    >
      <View style={styles.cardContent}>
        <View style={styles.topContainer}>
          <View>
            <Text style={styles.titleMain}>
              {nickname ? nickname : accountName}
            </Text>
            {/* <Text style={styles.titleSecondary}>{accountNumber}</Text> */}
          </View>

          <TouchableOpacity
            style={{ padding: 6 }}
            onPress={() =>
              navigation.navigate("AccountTileSettings", {
                accountId: accountId,
              })
            }
          >
            <Ionicons
              name="settings"
              style={styles.icon}
              size={config.hp("4%")}
              color={mainTextColor}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.balanceContainer}>
          <Title style={styles.balance}>
            ${isBalance ? balance : availableBalance}
          </Title>
          <View style={styles.optionContainer}>
            <Text
              style={
                isBalance
                  ? [styles.optionText, styles.optionIsSelected]
                  : styles.optionText
              }
              onPress={() => {
                setIsBalance(!isBalance);
              }}
            >
              current balance
            </Text>
            <Text
              style={
                !isBalance
                  ? [styles.optionText, styles.optionIsSelected]
                  : styles.optionText
              }
              onPress={() => {
                setIsBalance(!isBalance);
              }}
            >
              available balance
            </Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="chart-areaspline"
            style={styles.bottomIcons}
            size={config.hp("2.75%")}
            onPress={() => {
              navigation.navigate("Account", {
                accountId: accountId,
                pageScreen: 1,
              });
            }}
          />

          <FontAwesome5
            name="money-check"
            style={styles.bottomIcons}
            size={config.hp("2.75%")}
            onPress={() => {
              navigation.navigate("Account", {
                accountId: accountId,
                pageScreen: 2,
              });
            }}
          />
          <Fontisto
            name="arrow-swap"
            style={styles.bottomIcons}
            size={25}
            onPress={() => {
              navigation.navigate("Account", {
                accountId: accountId,
                pageScreen: 3,
              });
            }}
          />
          <View style={styles.rightIconsContainer}>
            <View style={styles.dotIconContainer}>
              <Entypo
                name="dot-single"
                style={isBalance ? styles.bottomIcons : styles.circleIcon}
                size={config.hp("2.75%")}
              />
              <Entypo
                name="dot-single"
                style={!isBalance ? styles.bottomIcons : styles.circleIcon}
                size={config.hp("2.75%")}
              />
            </View>
            {image ? (
              <View style={{ height: 65 }}>
                <Image
                  resizeMode="contain"
                  source={{ uri: image }}
                  style={{ height: 65, width: 110 }}
                ></Image>
              </View>
            ) : undefined}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AccountCard;
