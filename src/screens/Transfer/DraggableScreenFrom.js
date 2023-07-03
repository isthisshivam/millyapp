import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DraggableSection from "./draggableTilesFrom/DraggableSection";
import { theme } from "../../config/Theme";
import { config } from "../../config/Config";

const DraggableScreenFrom = ({ navigation }) => {
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
        Transfer From Tiles
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

export default DraggableScreenFrom;
