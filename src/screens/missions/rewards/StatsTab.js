import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const StatsTab = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: config.hp("4%"),
        }}
      >
        <View style={styles.box}>
          <Text>Bad Expenses</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 1,
              paddingHorizontal: 4,
            }}
          >
            <Text style={{ fontSize: 26 }}>$245</Text>
            <Text style={{ fontSize: 20, color: theme.colors.primary }}>
              +45%
            </Text>
          </View>
          <Text>Bad Expenses</Text>
        </View>
        <View style={styles.box}>
          <Text>Good Expenses</Text>
          <Text style={{ fontSize: 24 }}>$245</Text>
          <Text>Good Expenses</Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "white",
          height: config.hp("20%"),
          borderRadius: 12,
        }}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: "white",
    height: config.hp("20%"),
    width: config.wp("42%"),
    borderRadius: 12,
    padding: "4%",
  },
  container: {
    paddingHorizontal: config.wp("4%"),
    paddingVertical: config.hp("4%"),
    width: "100%",
  },
});

export default StatsTab;
