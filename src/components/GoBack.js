import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import OcticonsIcon from "react-native-vector-icons/Octicons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { theme } from "../config/Theme";
import { config } from "../config/Config";

const GoBack = ({ navigation, goTo, title }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
  });

  const handleTouch = () => {
    if (goTo) {
      navigation.navigate(`${goTo}`);
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleTouch()}
      TouchableOpacity={0.95}
    >
      <OcticonsIcon
        name="chevron-left"
        size={hp("3.0%")}
        color={theme.colors.primary}
      />
      <Text
        style={{
          color: theme.colors.primary,
          fontSize: hp("2.5%"),
          paddingLeft: config.wp("1%"),
        }}
      >
        {title ? title : "Back"}
      </Text>
    </TouchableOpacity>
  );
};

export default GoBack;
