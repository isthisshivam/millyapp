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
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import { useSelector } from "react-redux";
import { wait } from "../../../../../utils/utils";

const BillpayCard = ({
  navigation,
  item,
  accountTransferFrom,
  handleChange,
}) => {
  const { accountId } = item;
  const accounts = useSelector((state) => state.accounts.accounts);
  const account = accounts.filter((item) => item.accountId == accountId);
  const [hideAcct, setHideAcct] = useState(true);
  const [active, setActive] = useState(false);
  const isFocused = useIsFocused();

  const accountName = account[0]?.accountName;
  const balance = account[0]?.balance;
  const accountNumber = account[0]?.accountNumber;
  const nickname = account[0]?.nickname;
  const backGroundColor = account[0]?.backGroundColor;
  const mainTextColor = account[0]?.mainTextColor;
  const secondaryTextColor = account[0]?.secondaryTextColor;

  function viewAcct() {
    setHideAcct(!hideAcct);
    wait(2000).then(() => setHideAcct(true));
  }

  useEffect(() => {
    setHideAcct(true);
  }, [isFocused]);

  useEffect(() => {
    if (accountTransferFrom == accountId) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [accountTransferFrom]);

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
      backgroundColor:
        backGroundColor == "default" || !active ? "white" : backGroundColor,
      width: config.wp("80%"),
      height: config.hp("23%"),
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
      color: !active
        ? "black"
        : mainTextColor == "default"
        ? theme.colors.primary
        : mainTextColor,
      fontWeight: "bold",
      textTransform: "capitalize",
    },
  });

  return (
    <View style={styles.slide}>
      <TouchableOpacity
        onPress={() => handleChange("accountfromid", accountId)}
        style={styles.card}
      >
        <View style={styles.cardTop}>
          <View style={{}}>
            <View>
              <Text style={styles.titleMain}>Available Balance </Text>
            </View>
            <View style={styles.balanceContainer}>
              <Text style={styles.balance}>${balance}</Text>
            </View>
          </View>
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
                source={{ uri: `data:image/jpg;base64,${account[0]?.image}` }}
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
      </TouchableOpacity>
    </View>
  );
};

export default BillpayCard;
