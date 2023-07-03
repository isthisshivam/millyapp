import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { config } from "../config/Config";

const Button = ({
  color,
  text,
  height,
  width,
  radius,
  marginBottom,
  marginTop,
  background,
  fontSize,
  fontWeight,
  onPress,
  disabled,
  style,
}) => {
  const styles = StyleSheet.create({
    button: {},
    container: {
      height: height,
      width: width,
      backgroundColor: background,
      borderRadius: radius,
      marginBottom: marginBottom,
      justifyContent: "center",
      alignItems: "center",
      fontWeight: fontWeight,
      marginTop: marginTop,
      elevation: config.hp("1%"),
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      shadowColor: "gray",
    },
    text: {
      color: color,
      fontSize: fontSize,
    },
  });
  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles.button}
      onPress={() => onPress()}
    >
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
