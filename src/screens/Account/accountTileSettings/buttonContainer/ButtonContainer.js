import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";

const ButtonContainer = ({ isSelected, tabChange }) => {
  return (
    <View style={styles.sectionOptionsContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={
          isSelected
            ? [styles.buttonContainer, styles.isSelected]
            : styles.buttonContainer
        }
        onPress={tabChange}
      >
        <Text
          style={
            isSelected ? [styles.text, styles.isSelectedText] : styles.text
          }
        >
          Image
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={tabChange}
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
          Color
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonContainer;
