import React, { useState } from "react";
import { View, Text, Switch } from "react-native";
import { styles } from "./style";
import { theme } from "../../../../config/Theme";
const Type = ({ handleChange, payload, type, text }) => {
  return (
    <View style={styles.flexContainer}>
      <View style={styles.switchContainer}>
        <Switch
          trackColor={{ false: theme.colors.fade4, true: theme.colors.fade4 }}
          thumbColor={payload.type === type ? theme.colors.primary : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => handleChange(type)}
          value={payload.type === type ? true : false}
          style={styles.switch}
        />
      </View>
      <Text style={styles.text} numberOfLines={1}>
        {type} : {text}
      </Text>
    </View>
  );
};

export default Type;
