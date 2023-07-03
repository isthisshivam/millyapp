import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Linking } from "react-native";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";

const Help = ({ colors, height, bgColor }) => {
  const styles = StyleSheet.create({
    container: {
      height: config.hp("6%"),
      backgroundColor: bgColor ? bgColor : "rgba(0,0,0,0)",
      flexDirection: "row",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingVertical: 5,
    },
    inputContainer: {
      width: "100%",
      flexDirection: "row",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: config.wp("4%"),
    },
    text: {
      fontSize: config.hp("2%"),
      color: theme.colors.primary,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text
          style={styles.text}
          onPress={() => {
            Linking.openURL(
              "https://www.worldwideinteractiveservices.com/#contact"
            );
          }}
        >
          Contact Us
        </Text>
        <Text
          style={styles.text}
          onPress={() => {
            Linking.openURL("https://www.worldwideinteractiveservices.com/");
          }}
        >
          How can we help you?
        </Text>
      </View>
    </View>
  );
};

export default Help;
