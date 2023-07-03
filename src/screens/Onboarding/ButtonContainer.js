import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";

const ButtonContainer = ({ step, next, back, cancel, navigation, Submit }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "flex-end",
        paddingVertical: config.hp("1%"),
        flex: 1,
      }}
    >
      {step == 3 ? (
        <TouchableOpacity style={{ paddingBottom: 10 }}>
          <Text style={{ color: "gray" }}>Skip, I'll do this later</Text>
        </TouchableOpacity>
      ) : undefined}
      {step == 6 ? (
        <TouchableOpacity
          onPress={Submit}
          style={{
            alignItems: "center",
            borderRadius: 24,
            paddingVertical: config.hp(".75%"),
            backgroundColor: theme.colors.primary,
            paddingHorizontal: config.wp("30%"),
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Finish
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={next}
          style={{
            alignItems: "center",
            borderRadius: 6,
            paddingVertical: config.hp(".75%"),
            backgroundColor: theme.colors.primary,
            paddingHorizontal: config.wp("30%"),
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Continue
          </Text>
        </TouchableOpacity>
      )}
      {step == 0 ? (
        <TouchableOpacity
          onPress={cancel}
          style={{ marginTop: config.hp("1%") }}
        >
          <Text style={{ color: "gray", fontSize: 16 }}>Cancel</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={back} style={{ marginTop: config.hp("1%") }}>
          <Text style={{ color: "gray", fontSize: 16 }}>Back</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ButtonContainer;
