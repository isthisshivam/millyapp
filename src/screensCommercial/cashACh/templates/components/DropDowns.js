import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

const DropDowns = ({ payload }) => {
  return (
    <View style={{ width: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: config.hp("1%"),
        }}
      >
        <Text style={{ fontSize: 16 }}>ACH Type</Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",

            //width: "100%",
          }}
        >
          <TouchableOpacity
            //onPress={toggleType}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            {payload.type ? (
              <Text style={{ fontSize: 18, paddingRight: 20 }}>
                {payload.type}
              </Text>
            ) : (
              <Text style={{ fontSize: 16, paddingRight: 20 }}>
                Select Type
              </Text>
            )}
            <Ionicons name="caret-down" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: config.hp("4%"),
        }}
      >
        <Text style={{ fontSize: 16 }}>Request Type</Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",

            //width: "100%",
          }}
        >
          <TouchableOpacity
            //onPress={toggleType}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            {payload.type ? (
              <Text style={{ fontSize: 18, paddingRight: 20 }}>
                {payload.type}
              </Text>
            ) : (
              <Text style={{ fontSize: 16, paddingRight: 20 }}>
                Select Type
              </Text>
            )}
            <Ionicons name="caret-down" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DropDowns;
