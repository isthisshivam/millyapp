import React from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import * as Haptics from "expo-haptics";
import { currencyFormat } from "../../../../utils/utils";
import styles from "./styles";
import { theme } from "../../../config/Theme";

const AccountTransferFrom = ({
  accountName,
  balance,
  accountNumber,
  accountId,
  accountTransferFrom,
  handleChange,
  backGroundColor,
  mainTextColor,
  secondaryTextColor,
  nickname,
  image,
  navigation,
}) => {
  const secondaryColor =
    secondaryTextColor == "default" ? "black" : secondaryTextColor;
  const mainColor = mainTextColor == "default" ? "black" : mainTextColor;
  const backgroundColor =
    backGroundColor == "default" ? "white" : backGroundColor;

  return (
    <View style={styles.slide}>
      <Pressable
        android_ripple={{ color: "gray" }}
        delayLongPress={300}
        onPress={() => {
          // handleTransferFromTouch(accountId);
          handleChange("accountfromid", accountId);
        }}
        onLongPress={() => {
          navigation.navigate("DraggableFrom");
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }}
        style={
          accountId && accountId == accountTransferFrom
            ? { ...styles.card, backgroundColor: backgroundColor }
            : styles.card
        }
      >
        <View style={styles.cardTop}>
          <View>
            <Text
              style={{
                ...styles.titleMain,
                color: accountId == accountTransferFrom ? mainColor : "black",
              }}
            >
              Available Balance
            </Text>
          </View>
        </View>
        <View style={styles.balanceContainer}>
          <Text
            style={{
              ...styles.balance,
              color:
                accountId == accountTransferFrom
                  ? secondaryColor
                  : theme.colors.fadedDark,
            }}
          >
            {currencyFormat(balance)}
          </Text>
        </View>

        <View style={styles.accountContainer}>
          <View style={styles.accountContainer2}>
            <Text
              style={{
                ...styles.titleMain,
                color:
                  accountId == accountTransferFrom
                    ? secondaryColor
                    : theme.colors.fadedDark,
              }}
            >
              {nickname ? nickname : accountName}
            </Text>
            <Text
              style={{
                ...styles.accountNumber,
                color:
                  accountId == accountTransferFrom
                    ? secondaryColor
                    : theme.colors.fadedDark,
              }}
            >
              {accountNumber}
            </Text>
          </View>
          {accountId && accountId === accountTransferFrom ? (
            <AntDesignIcon
              name="checksquare"
              size={25}
              style={styles.iconSelected}
            />
          ) : (
            <AntDesignIcon name="checksquare" size={25} style={styles.icon} />
          )}
        </View>
      </Pressable>
    </View>
  );
};

export default AccountTransferFrom;
