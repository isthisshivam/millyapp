import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const Fab = ({ navigation }) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: config.hp("3%"),
        right: config.wp("3%"),
        zIndex: 20,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("CreateMsg", { type: "new" })}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: 60,
          height: 60,
          paddingVertical: config.hp("2%"),
          paddingHorizontal: config.wp("2%"),
          backgroundColor: theme.colors.primary,
          borderRadius: 100,
        }}
      >
        <FontAwesome name="pencil-square-o" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Fab;
