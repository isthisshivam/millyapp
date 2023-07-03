import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { AntDesign } from "@expo/vector-icons";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

const StatContainer = () => {
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={config.hp("30%")}
        width={20}
        fill={80}
        tintColor={theme.colors.primary}
        backgroundColor="#3d5875"
        rotation={240}
        arcSweepAngle={240}
        childrenContainerStyle={{ borderRadius: 12 }}
        lineCap="round"
      />
      <View style={styles.overlay}>
        <Text>Points this month.</Text>
        <Text style={{ fontSize: config.wp("7%") }}>312 Points</Text>
      </View>
      <View
        style={{
          paddingVertical: config.hp("1%"),
          paddingHorizontal: config.wp("4%"),
          backgroundColor: "#00600f",
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 12,
          bottom: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>25%</Text>
        <Text style={{ color: "white" }}> above your monthly average.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingTop: 10,
  },
  overlay: {
    alignItems: "center",
    position: "absolute",
    top: config.hp("9%"),
  },
});

export default StatContainer;
