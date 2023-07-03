import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import AccountConfirmation from "./confirmation/AccountConfirmation";
import EventConfirmation from "./confirmation/EventConfirmation";
import SmartConfirmation from "./confirmation/SmartConfirmation";

const Confirmation = ({ payload }) => {
  function handleType() {
    if (payload.type.value) {
      switch (payload.type.id) {
        case 0:
          return <AccountConfirmation payload={payload} />;

        case 1:
          return <EventConfirmation payload={payload} />;

        case 2:
          return <SmartConfirmation payload={payload} />;
      }
      return;
    }
  }
  return <View style={styles.container}>{handleType()}</View>;
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: config.hp("1%") },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: config.hp("1%"),
  },
  section: {
    marginBottom: config.hp("2%"),

    paddingBottom: config.hp("1%"),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.faded,
  },
  text: {
    fontSize: 18,
  },
});

export default Confirmation;
