import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { handleType } from "../../components/functions";

const DropDowns = ({ type, handleExpand, toggleRequestType }) => {
  //  let type = handleType(payload.requestType);
  return (
    <>
      <View style={{ width: "100%", paddingHorizontal: config.wp("2%") }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: config.hp("2%"),
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
              onPress={handleExpand}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              {type ? (
                <Text style={{ fontSize: 18, paddingRight: 20 }}>{type}</Text>
              ) : (
                <Text style={{ fontSize: 16, paddingRight: 20 }}>
                  Select Type
                </Text>
              )}
              <Ionicons
                name="caret-down"
                size={24}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default DropDowns;
