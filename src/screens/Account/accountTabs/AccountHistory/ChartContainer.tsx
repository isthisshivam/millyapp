import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Chart from "./Chart";

const ChartContainer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Balance Tracker </Text>
      </View>
      <View style={styles.Cards}>
        <View>
          <Chart />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",

    height: 300,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
    paddingLeft: 10,
  },
  title: {
    color: "#0EA44B",
    fontWeight: "bold",
    fontSize: 20,
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
