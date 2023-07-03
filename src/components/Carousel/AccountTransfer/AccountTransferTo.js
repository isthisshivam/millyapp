import React from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import * as Haptics from "expo-haptics";

import styles from "./styles";
import { currencyFormat } from "../../../../utils/utils";

const AccountTransferTo = ({
  balance,
  accountNumber,
  navigation,
  accountName,
  nickname,
  accountId,
  handleChange,
  accountTransferTo,
  secondaryTextColor,
  backGroundColor,
  mainTextColor,
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
        delayLongPress={100}
        style={
          accountId && accountId == accountTransferTo
            ? { ...styles.card, backgroundColor: backgroundColor }
            : styles.card
        }
        onPress={() => {
          // handleTransferToTouch(id);
          handleChange("accounttoid", accountId);
        }}
        onLongPress={() => {
          navigation.navigate("DraggableTo");
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }}
      >
        <View style={styles.cardTop}>
          <View>
            <Text
              style={{
                ...styles.titleMain,
                color:
                  accountId && accountId == accountTransferTo
                    ? mainColor
                    : "black",
              }}
            >
              Available Balance
            </Text>
          </View>
        </View>
        <View style={styles.balanceContainer}>
          <Text style={{ ...styles.balance, color: secondaryColor }}>
            {currencyFormat(balance)}
          </Text>
        </View>

        <View style={styles.accountContainer}>
          <View style={styles.accountContainer2}>
            <Text
              style={{
                ...styles.titleMain,
                color:
                  accountId && accountId == accountTransferTo
                    ? mainColor
                    : "black",
              }}
            >
              {nickname ? nickname : accountName}
            </Text>
            <Text style={{ ...styles.accountNumber, color: secondaryColor }}>
              {accountNumber}
            </Text>
          </View>
          {accountId && accountId === accountTransferTo ? (
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

export default AccountTransferTo;
