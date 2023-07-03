import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import client from "../../../utils/client";

import { config } from "../../config/Config";
import { theme } from "../../config/Theme";

const RegisterPath = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          paddingBottom: 50,
          fontSize: 22,
          fontWeight: "bold",
          paddingHorizontal: config.wp("2%"),
        }}
      >
        Welcome to{" "}
        <Text style={{ color: theme.colors.primary }}>{client.clientName}</Text>
      </Text>

      <Text style={styles.title}>Already a member? </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.yes}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.optionTitle}>Yes</Text>
          <Text style={styles.option}>I am a member</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.yes}
          onPress={() => navigation.navigate("NewMemberPath")}
        >
          <Text style={styles.optionTitle}>No</Text>
          <Text style={styles.option}>I am not a member</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ fontSize: 18 }}>Return to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    marginTop: config.hp("6%"),
    justifyContent: "space-between",
    alignContent: "center",
    width: "100%",
    paddingHorizontal: config.wp("4%"),
  },
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    height: "70%",
    flex: 1,
    paddingVertical: config.hp("4%"),
  },
  loginButton: {
    marginTop: config.hp("4%"),
  },
  option: {
    color: "white",
  },
  optionTitle: {
    fontSize: 20,
    color: "white",
  },
  title: {
    fontSize: 20,
  },
  yes: {
    color: "white",
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    paddingVertical: config.hp("2%"),
    paddingHorizontal: config.wp("2%"),
    width: config.wp("40%"),
    borderRadius: 12,
    elevation: config.hp("1%"),
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: "black",
  },
});

export default RegisterPath;
