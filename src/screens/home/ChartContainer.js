import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";
import ChartExample from "./ChartExample";

const ChartContainer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Balance Tracker </Text>
      </View>
      <View style={styles.Cards}>
        <View>
          <ChartExample />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    paddingVertical: config.hp("4%"),
    paddingHorizontal: config.wp("2%"),
    height: config.hp("40%"),
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: config.wp("4%"),
    paddingBottom: 10,
  },
  title: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: config.hp("2.15%"),
  },
  Cards: {
    height: "100%",
    overflow: "hidden",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});
export default ChartContainer;
