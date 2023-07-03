import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
//import CurrencyInput from "react-native-currency-input";

import { styles } from "./style";
const AmountTransfer = ({ colors, handleChange, amount }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Amount</Text>
      </View>
      <View style={styles.inputContainerCenter}>
        {/* <CurrencyInput
          value={amount}
          onChangeValue={(value) => handleChange("amount", value)}
          style={styles.inputField}
          placeholder={"0.00"}
          textAlign={"center"}
          keyboardType="numeric"
          prefix="$"
          delimiter=","
          separator="."
          precision={2}
        /> */}
      </View>
    </View>
  );
};

export default AmountTransfer;
