import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { AlertType } from "../../../../types/alerts/alertTypes";

type Props = {
  navigation: {
    navigate: (route: string, params: object) => void;
  };
  item: AlertType;
};

const SmartAlertCard: React.FC<Props> = ({ navigation, item }) => {
  //console.log(item);
  return (
    <View style={styles.alertCard}>
      <View style={styles.topContainer}>
        <Text style={styles.alertName}>{item?.alert}</Text>
        <Ionicon
          size={config.hp("3.8%")}
          color={theme.colors.faded}
          name="ellipsis-horizontal-circle"
          onPress={() => {
            navigation.navigate("AlertEdit", {
              sequenceNumber: item?.sequenceNumber,
            });
          }}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Text
          style={{
            color: theme.colors.primary,
            fontWeight: "500",
            fontSize: 16,
          }}
        >
          Auto Transfer
        </Text>
        <Text style={{ fontSize: 16 }}>
          When the balance of{" "}
          <Text style={{ color: theme.colors.primary, fontWeight: "500" }}>
            {item?.accountName}{" "}
          </Text>
          is {item?.comparisonOperator == "<" ? "less than" : "greater than"}{" "}
          <Text style={{ color: theme.colors.primary, fontWeight: "500" }}>
            ${item?.value}
          </Text>
        </Text>
      </View>
      {/* <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>Learn More</Text>
        <Ionicon
          size={config.hp("4%")}
          color={isAlertActive ? theme.colors.primary : "black"}
          name={`${
            isAlertActive
              ? "notifications-circle-sharp"
              : "notifications-off-circle"
          }`}
          onPress={setReminder}
        />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  alertCard: {
    backgroundColor: "rgba(0.24, 0.24, 0.26, 0.09)",
    width: config.wp("46%"),
    borderRadius: config.wp("2%"),
    paddingHorizontal: config.wp("1.5%"),
    paddingVertical: config.hp("1.5%"),
    height: config.hp("20%"),
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 25,
    marginRight: 20,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  alertName: {
    fontSize: 18,
    color: theme.colors.primary,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  alertDescription: {
    fontSize: config.hp("1.7%"),
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomText: {
    fontSize: config.hp("2.1%"),
    color: theme.colors.primary,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});

export default SmartAlertCard;
