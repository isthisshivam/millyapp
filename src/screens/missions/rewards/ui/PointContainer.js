import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "../../../../config/Theme";
import { config } from "../../../../config/Config";

const PointContainer = ({ toggleInfo }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={styles.currentPoints}>Current Points</Text>
      <View style={styles.pointContainer}>
        <Text style={styles.points}>312</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: config.hp("1%"),
        }}
      >
        <Text style={{ fontSize: 16 }}>Total Points Earned: </Text>
        <Text
          style={{
            color: theme.colors.primary,
            fontWeight: "bold",
            fontSize: config.wp("6%"),
          }}
        >
          3,110
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  currentPoints: {
    paddingBottom: config.hp("2%"),
    fontSize: 22,
  },
  points: {
    fontSize: config.wp("20%"),
    fontWeight: "bold",
    color: "white",
  },
  pointContainer: {
    backgroundColor: theme.colors.primary,
    elevation: config.hp("1%"),
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: "black",
    paddingHorizontal: config.wp("3%"),

    width: config.wp("45%"),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
});

export default PointContainer;
