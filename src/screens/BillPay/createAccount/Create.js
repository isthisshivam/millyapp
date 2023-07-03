import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const Create = ({ handleNext, handleChange, payload }) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: config.wp("5%"),
          fontWeight: "500",
          color: theme.colors.primary,
        }}
      >
        Welcome to BillPay
      </Text>
      <Text
        style={{ fontSize: config.wp("4%"), marginBottom: config.hp("4%") }}
      >
        Aute veniam ut in deserunt veniam voluptate proident in eiusmod non.
        Tempor cillum ex dolore id ullamco minim irure sunt et. Esse ut eu velit
        nulla sint occaecat quis mollit enim ex duis nostrud occaecat. Esse elit
        non laboris ullamco Lorem ad nostrud ipsum sit mollit cillum id
      </Text>

      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          marginBottom: config.hp("2%"),
        }}
      >
        Sign up for BillPay
      </Text>

      <View style={styles.rowContainer}>
        <Text style={styles.rowText}>Routing Number:</Text>
        <TextInput
          keyboardType="number-pad"
          onChangeText={(text) => handleChange("routingNum", text)}
          style={styles.input}
        />
      </View>
      <View style={{ ...styles.rowContainer, marginBottom: config.hp("4%") }}>
        <Text style={styles.rowText}>Confirm Routing #:</Text>
        <TextInput
          keyboardType="number-pad"
          onChangeText={(text) => handleChange("confirmRouting", text)}
          style={styles.input}
        />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.rowText}>Account Number:</Text>
        <TextInput
          keyboardType="number-pad"
          onChangeText={(text) => handleChange("accountNum", text)}
          style={styles.input}
        />
      </View>
      <View style={{ ...styles.rowContainer, marginBottom: config.hp("4%") }}>
        <Text style={styles.rowText}>Confirm Account #:</Text>
        <TextInput
          keyboardType="number-pad"
          onChangeText={(text) => handleChange("confirmAcct", text)}
          style={styles.input}
        />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.rowText}>ACH Account:</Text>
        <TextInput
          keyboardType="number-pad"
          onChangeText={(text) => handleChange("achAccount", text)}
          style={styles.input}
        />
      </View>

      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
      >
        <TouchableOpacity
          onPress={handleNext}
          style={{
            backgroundColor: theme.colors.primary,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 12,
            width: "75%",
            paddingVertical: config.hp("1%"),
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: config.hp("2%"),
    paddingHorizontal: config.wp("2%"),
  },
  input: {
    backgroundColor: "white",
    width: "50%",
    paddingHorizontal: config.wp("1%"),
    borderRadius: 7,
    height: config.hp("4%"),
    borderWidth: 1,
    borderColor: theme.colors.faded,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: config.hp("2%"),
    paddingHorizontal: config.wp("4%"),
  },
  rowText: {
    fontSize: 16,
  },
});
export default Create;
