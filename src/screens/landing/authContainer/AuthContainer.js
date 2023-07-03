import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { config } from "../../../config/Config";

import { styles } from "./style";
const AuthContainer = ({ navigation, colors }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={[styles.buttonContainer, styles.isSelected]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setIsLogin(true);
            }}
          >
            <Text style={[styles.text, styles.isSelectedText]}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("RegisterPath");
            }}
          >
            <Text style={styles.text}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AuthContainer;
