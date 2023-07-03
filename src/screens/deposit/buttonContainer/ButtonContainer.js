import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";
const ButtonContainer = ({ isSelected, navigation }) => {
  return (
    <View style={styles.sectionOptionsContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={
          isSelected
            ? [styles.buttonContainer, styles.isSelected]
            : styles.buttonContainer
        }
        onPress={() => {
          navigation.navigate("DepositMain");
        }}
      >
        <Text
          style={
            isSelected ? [styles.text, styles.isSelectedText] : styles.text
          }
        >
          Deposit Funds
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("DepositRecentActivity");
        }}
        style={
          !isSelected
            ? [styles.buttonContainer, styles.isSelected]
            : styles.buttonContainer
        }
      >
        <Text
          style={
            !isSelected ? [styles.text, styles.isSelectedText] : styles.text
          }
        >
          View Recent Activity
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonContainer;
