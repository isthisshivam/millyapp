import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, Linking } from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import EntypIcon from "react-native-vector-icons/Entypo";
import { AccountHistoryItem } from "../../../../types/accountHistory/types";
import { currencyFormat } from "../../../../utils/utils";

import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

type Props = {
  navigation: {
    goBack: () => void;
    navigate: (name: string, params: any) => void;
  };
  route: {
    params: {
      item: AccountHistoryItem;
    };
  };
};

const TransactionDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const item = route.params.item;
  const formattedDate = new Date(item.postDate).toLocaleDateString("en-US");
  const negative = Math.sign(item.amount);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Account Activity</Text>
        </View>
        <View style={styles.secondaryTitleContainer}>
          <Text style={styles.secondaryTitle}>Transaction Details</Text>
          <Text style={styles.summary}>{item.longDescription}</Text>
        </View>
      </View>

      <View style={styles.transactionContainer}>
        <View style={styles.purchaseInfo}>
          <Text
            style={
              negative == -1
                ? { ...styles.amount, color: "red" }
                : { ...styles.amount, color: "green" }
            }
          >
            {currencyFormat(item.amount)}
          </Text>
          <Text style={styles.name}>name</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailText}>Remaining Balance: </Text>
          <Text style={styles.detailText}>{currencyFormat(item.balance)}</Text>
        </View>

        <View style={styles.detail}>
          <Text style={styles.detailText}>Posted Date: </Text>
          <Text style={styles.detailText}>{formattedDate}</Text>
        </View>

        {/* <View style={styles.detail}>
          <Text style={styles.detailText}>Transaction Type: </Text>
          <Text style={styles.detailText}>{type}</Text>
        </View> */}
        {/* <View style={styles.detail}>
          <Text style={styles.detailText}>Purchase Type: </Text>
          <Text style={styles.detailText}>Pin, Credit, POS, Online</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailText}>Reference Number </Text>
          <Text style={styles.detailText}>0481192682</Text>
        </View> */}
      </View>
      {/* <View style={styles.helpContainer}>
        <View style={{ alignItems: "center" }}>
          <AntIcon
            name="phone"
            style={styles.helpIcon}
            onPress={() => {
              Linking.openURL(`tel:407-288-6765`);
            }}
          />
          <Text>Call</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <EntypIcon
            name="message"
            style={styles.helpIcon}
            onPress={() => {
              Linking.openURL(
                `sms:321-202-1242?body=I have Question about this transaction : ${item.longDescription} `
              );
            }}
          />
          <Text>Text</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <EntypIcon
            name="new-message"
            style={styles.helpIcon}
            onPress={() =>
              navigation.navigate("CreateMsg", {
                name: item.longDescription,
                date: item.postDate,
              })
            }
          />
          <Text>eMsg</Text>
        </View>
      </View> */}
    </View>
  );
};

export default TransactionDetailScreen;
const styles = StyleSheet.create({
  amount: {
    fontSize: 30,
    fontWeight: "500",
    //fontFamily: "open-sans-bold",
    //color: type === "credit" ? "green" : "red",
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: config.hp("1%"),
  },
  detailText: {
    fontSize: 18,
    textTransform: "capitalize",
  },
  name: {
    fontSize: 18,
  },
  purchaseInfo: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: config.hp("2%"),
    borderBottomWidth: 2,
    borderBottomColor: "gray",
  },
  secondaryTitle: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: "500",
  },
  secondaryTitleContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    //   paddingVertical: config.hp("1%"),
  },
  summary: {
    fontSize: config.hp("1.9%"),
    color: "black",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: theme.colors.primary,
  },

  titleContainer: {
    paddingVertical: config.hp("1.5%"),
  },
  transactionContainer: {
    paddingVertical: config.hp("4%"),
    paddingHorizontal: config.wp("10%"),
  },

  topContainer: {
    backgroundColor: "white",
    paddingHorizontal: config.wp("2%"),
    //paddingBottom: 50,
    height: config.hp("15%"),
  },
  buttonContainer: {
    height: config.hp("5%"),
    backgroundColor: theme.colors.primary,
    width: config.wp("50%"),
    borderRadius: config.wp("2%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: config.hp("1%"),
  },
  buttonText: {
    fontSize: config.hp("2.5%"),
    color: "white",
  },
  helpContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: config.hp("4%"),
    paddingHorizontal: config.wp("15%"),
  },
  helpIcon: {
    fontSize: config.hp("4.5%"),
    color: theme.colors.primary,
  },
  centerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  helperText: {
    textAlign: "center",
    fontSize: config.hp("2.15%"),
  },
});
