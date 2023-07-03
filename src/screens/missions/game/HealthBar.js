import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { config } from "../../../config/Config";

const HealthBar = ({ health }) => {
  return (
    <View
      style={{
        alignItems: "flex-start",
        width: config.wp("70%"),
      }}
    >
      <Text style={{ fontSize: 20 }}>Health+</Text>
      <Progress.Bar
        progress={health}
        width={300}
        height={20}
        color={
          health > 0.75
            ? "#00c853"
            : health > 0.65
            ? "#64dd17"
            : health > 0.55
            ? "#aeea00"
            : health > 0.45
            ? "#ffd600"
            : health > 0.3
            ? "#ff6d00"
            : "#dd2c00"
        }
        unfilledColor={
          health > 0.75
            ? "#009624"
            : health > 0.65
            ? "#1faa00"
            : health > 0.55
            ? "#79b700"
            : health > 0.45
            ? "#c7a500"
            : health > 0.3
            ? "#c43c00"
            : "#a30000"
        }
        borderRadius={12}
        style={{
          elevation: config.hp("1%"),
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
          shadowColor: "black",
        }}
      />
    </View>
  );
};

export default HealthBar;
