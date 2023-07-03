import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { styles } from "./style";
const RegisterTop = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.buttonContainer, styles.isSelected]}>
        <TouchableOpacity style={styles.button}>
          <Text style={[styles.buttonText, styles.isSelectedText]}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterTop;
