import { View, Text } from "react-native";
import React from "react";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const ForgotUsername = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: config.hp("2%"),
        paddingHorizontal: config.wp("2%"),
      }}
    >
      <Text>ForgotUsername</Text>
      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          flex: 1,
          paddingBottom: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "80%",
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "500", color: "white" }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotUsername;
