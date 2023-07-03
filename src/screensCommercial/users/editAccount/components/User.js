import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

const User = ({ setStep, handleNext, payload, handleCancel }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          color: theme.colors.primary,
          fontSize: 20,
          fontWeight: "500",
          marginBottom: config.hp("4%"),
        }}
      >
        User Information
      </Text>
      <Text>Username</Text>
      <View style={{ ...styles.rowContainer, marginBottom: config.hp("2%") }}>
        <Text
          style={{
            ...styles.text,
            fontSize: 20,
            color: theme.colors.primary,
            fontWeight: "400",
          }}
        >
          {payload.userName}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.primary,
            paddingHorizontal: config.hp("4%"),
            borderRadius: 7,
            paddingVertical: config.hp(".5%"),
          }}
          //onPress={() => setStep("Edit Info")}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Update Info</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>
          {payload.lastName}, {payload.firstName}
        </Text>
        <Text style={styles.text}>{payload.role}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>
          {payload.address1}, {payload.address2}
        </Text>
        <Text style={styles.text}>
          {payload.city} {payload.state}, {payload.zip}
        </Text>
      </View>
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
      >
        <TouchableOpacity
          onPress={handleNext}
          style={{
            backgroundColor: theme.colors.primary,
            width: config.wp("75%"),
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 7,
            paddingVertical: config.hp(".5%"),
            marginBottom: config.hp("1%"),
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCancel}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  text: {
    fontSize: 18,
    textTransform: "capitalize",
  },
});

export default User;
