import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";

const BackButton = ({ handleBack }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() => handleBack()}
        style={styles.button}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
