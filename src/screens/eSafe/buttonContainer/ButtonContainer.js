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
          navigation.navigate("upload");
        }}
      >
        <Text
          style={
            isSelected ? [styles.text, styles.isSelectedText] : styles.text
          }
        >
          Upload File
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("items");
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
          eSafe Items
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonContainer;
