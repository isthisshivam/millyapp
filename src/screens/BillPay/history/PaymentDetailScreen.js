import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const PaymentDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const payments = useSelector((state) => state.billPays).filter(
    (item) => item.id === id
  );

  const currentPayment = payments[0];

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Payment Details</Text>
      </View>
      <View style={{ width: config.wp("80%"), alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            width: config.wp("80%"),
            justifyContent: "space-between",
            paddingVertical: config.hp("2%"),
          }}
        >
          <Text style={styles.detailTitleMain}>Paid To:</Text>
          <Text style={{ ...styles.detailTitleSecondary, fontSize: 22 }}>
            {currentPayment.company}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: config.wp("80%"),
            justifyContent: "space-between",
            paddingVertical: config.hp(".75%"),
          }}
        >
          <Text style={styles.detailTitleMain}>Payment Amount:</Text>
          <Text style={styles.detailTitleSecondary}>
            ${currentPayment.amount}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: config.wp("80%"),
            justifyContent: "space-between",
            paddingVertical: config.hp(".75%"),
          }}
        >
          <Text style={styles.detailTitleMain}>Confirmation #</Text>
          <Text style={styles.detailTitleSecondary}>74131654865</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: config.wp("80%"),
            justifyContent: "space-between",
            paddingVertical: config.hp(".75%"),
          }}
        >
          <Text style={styles.detailTitleMain}>Status</Text>
          <Text style={styles.detailTitleSecondary}>{"Paid"}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: config.wp("80%"),
            justifyContent: "space-between",
            paddingVertical: config.hp(".75%"),
          }}
        >
          <Text style={styles.detailTitleMain}>Date Submitted:</Text>
          <Text style={styles.detailTitleSecondary}>{currentPayment.date}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: config.wp("80%"),
            justifyContent: "space-between",
            paddingVertical: config.hp(".75%"),
          }}
        >
          <Text style={styles.detailTitleMain}>Paid From:</Text>
          <Text style={styles.detailTitleSecondary}>
            {currentPayment.account}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: config.hp("4%"),
    paddingHorizontal: config.wp("2%"),

    alignItems: "center",
  },
  detailTitleMain: {
    color: theme.colors.primary,
    fontSize: config.hp("2.75%"),
  },

  detailTitleSecondary: {
    fontSize: config.hp("2.25%"),
    fontWeight: "bold",
    textAlign: "right",
    textTransform: "capitalize",
  },
  subTitle: {
    fontSize: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  titleContainer: {
    paddingBottom: config.hp("8%"),
  },
});

export default PaymentDetailScreen;
