import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DraggableSection from "./draggableTiles/DraggableSection";
import { theme } from "../../../config/Theme";
import { config } from "../../../config/Config";

const MyAccounts = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",

        alignItems: "center",
        paddingHorizontal: config.wp("4%"),
        paddingVertical: config.hp("2%"),
      }}
    >
      <Text
        style={{
          width: "100%",
          color: theme.colors.primary,
          fontSize: 22,
          fontWeight: "bold",
        }}
      >
        My Accounts
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          marginBottom: 25,
        }}
      >
        <Text style={{ fontSize: 16 }}>Drag n Drop to order your tiles.</Text>
        <Ionicons name="ios-shuffle" size={24} color="black" />
      </View>
      <DraggableSection navigation={navigation}></DraggableSection>
    </View>
  );
};
const styles = StyleSheet.create({
  titleContainer: {
    paddingVertical: config.hp(".5%"),
    marginTop: config.hp("1.2%"),
    marginBottom: config.hp("1.2%"),
    height: config.hp("4%"),
  },
  title: {
    fontSize: config.hp("2.5%"),
    paddingBottom: config.hp("4%"),
  },
  viewContainer: {
    paddingHorizontal: config.wp("5%"),
  },
  padding: {
    height: config.hp("5%"),
  },
});
export default MyAccounts;
