import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../../config/Theme";
import { config } from "../../../config/Config";

const Request = ({ item }) => {
  return (
    <View
      style={{
        marginBottom: config.hp("2%"),
        backgroundColor: "white",
        borderRadius: 7,
      }}
    >
      <View
        style={{
          backgroundColor: theme.colors.primaryLight,
          paddingVertical: config.hp("1%"),
          paddingHorizontal: config.wp("2%"),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: config.hp("1%"),
          borderTopRightRadius: 7,
          borderTopLeftRadius: 7,
        }}
      >
        <View style={styles.row}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
            AccessID:
          </Text>
          <Text style={{ color: "white", fontSize: 18 }}> {item.accessId}</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
            Amount:
          </Text>
          <Text style={{ color: "white", fontSize: 18 }}>
            {" "}
            ${item.amount?.toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.row}>
          <Text style={styles.title}>Transfer Date: </Text>
          <Text style={styles.info}>{item.transferDate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Confirmation #:</Text>
          <Text style={styles.info}>{item.confirmation}</Text>
        </View>
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.row}>
          <Text style={styles.title}>From: </Text>
          <Text style={styles.info}>{item.from}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>To: </Text>
          <Text style={styles.info}>{item.to}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingVertical: config.hp("1%"),
        }}
      >
        <Ionicons name="ios-checkmark" size={28} color="green" />
        <Ionicons name="close" size={28} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: config.hp("1%"),
    paddingHorizontal: config.wp("2%"),
  },
});

export default Request;
