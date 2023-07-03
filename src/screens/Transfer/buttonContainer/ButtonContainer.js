import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";

const ButtonContainer = ({ isSelected, navigation, handleScreenChange }) => {
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
          navigation.navigate("TransferMain");
        }}
      >
        <Text
          style={
            isSelected ? [styles.text, styles.isSelectedText] : styles.text
          }
        >
          Transfer Funds
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("RecentActivitySection");
          handleScreenChange();
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
