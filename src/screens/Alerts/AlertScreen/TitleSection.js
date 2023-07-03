import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const TitleSection = () => {
  return (
    <View style={styles.topContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Alerts</Text>
      </View>
      <View style={styles.secondaryTitleContainer}>
        {/* <Text style={styles.secondaryTitle}>What are Account Alerts</Text> */}
        <Text style={styles.summary}>
          Alerts keep you in the loop when you don’t have time. We’ll alert you
          if your balance falls below a certain amount, when a deposit is made
          or even when a specific transaction clears your account. If you really
          want to kick back, our Smart Alerts will even automatically transfer
          funds for you.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    //height: config.hp("20%"),
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingHorizontal: config.wp("4%"),
  },
  titleContainer: {
    paddingTop: config.hp("1%"),
  },
  secondaryTitleContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    //   paddingVertical: config.hp("1%"),
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  secondaryTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  summary: {
    fontSize: config.hp("1.9%"),
    color: "black",
    marginBottom: config.hp("4%"),
  },
});

export default TitleSection;
