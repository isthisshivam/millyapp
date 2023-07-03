import React from "react";
import { View, TextInput } from "react-native";

const Information = () => {
  return (
    <View>
      <TextInput
        style={styles.input}
        label="SSN/Tax Id#"
        placeholder="SSN/Tax Id#"
        onChangeText={(value) => handleChange("ssn", value)}
        value={user.ssn}
        keyboardType={"numeric"}
      />
      <TextInput
        style={styles.input}
        keyboardType={"numeric"}
        label="Account"
        placeholder="Account"
        value={user.account}
        onChangeText={(value) => handleChange("account", value)}
      />
    </View>
  );
};

export default Information;
