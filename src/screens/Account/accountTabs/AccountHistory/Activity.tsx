import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AccountHistoryItem } from "../../../../../types/accountHistory/types";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import { currencyFormat } from "../../../../../utils/utils";

type Props = {
  item: AccountHistoryItem;
  navigation: {
    navigate: (route: string, params: any) => void;
  };
};

const Activity: React.FC<Props> = ({ item, navigation }) => {
  const balanceRemaining = currencyFormat(item.balance);
  const formattedDate = new Date(item.postDate).toLocaleDateString("en-US");
  const negative = Math.sign(item.amount);
  //console.log(negative);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("TransactionDetails", {
          item: item,
        })
      }
    >
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={styles.activityName}>
          {item.longDescription ? item.longDescription : "No transaction name"}
        </Text>
        <View style={styles.activity}>
          <Text style={styles.activityDate}>{formattedDate}</Text>

          <Text
            style={
              negative == -1
                ? { ...styles.amount, color: "red" }
                : { ...styles.amount, color: "green" }
            }
          >
            {currencyFormat(item.amount)}
          </Text>
        </View>
        <Text style={styles.runningBalance}>
          {currencyFormat(item.balance)}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={28} color={theme.colors.primary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  activity: {
    flexDirection: "row",
    justifyContent: "space-between",
    //paddingVertical: config.deviceHeight * 0.01,
    paddingRight: 10,
    marginBottom: config.hp("1%"),
  },
  activityContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
  },

  activityDate: {
    fontSize: 16,
    color: theme.colors.fadedDark,
  },
  activityName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 20,
  },
  amount: {
    fontSize: 16,
    fontWeight: "400",
  },
  container: {
    paddingVertical: 10,
    width: "100%",
    //backgroundColor: "white",
    marginBottom: config.hp("1%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.2,
  },
  icon: {
    color: theme.colors.faded,
    fontSize: 25,
  },
  runningBalance: {
    color: theme.colors.fadedDark,
    fontSize: 14,
    textAlign: "right",
    paddingRight: 10,
  },
  title: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: 20,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: config.deviceHeight * 0.015,
  },
  topRightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  topRightText: {
    color: theme.colors.primary,
    fontSize: 16,
  },
});

export default Activity;
