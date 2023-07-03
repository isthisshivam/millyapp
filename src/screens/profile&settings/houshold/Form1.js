import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import data from "./components/data";

const Form1 = ({ payload, handleAdd, Submit, handleMinus }) => {
  const renderItem = ({ item, i }) => {
    let qty = payload?.filter((id) => id == item.name) || 0;

    return (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: config.hp("14%"),
          marginBottom: config.hp("1%"),
        }}
      >
        <View style={{ flexDirection: "column", height: "100%" }}>
          <Image
            source={item.icon}
            style={{ height: "100%", width: config.wp("9%") }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: config.wp("4%") }}>{item.name}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: theme.colors.faded,
            borderRadius: 12,
            paddingVertical: config.hp("1%"),
          }}
        >
          <TouchableOpacity
            onPress={() => handleMinus(item.name)}
            style={{
              paddingHorizontal: config.wp("2%"),
            }}
          >
            <Ionicons name="ios-remove" size={config.wp("7%")} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: config.wp("7%"),
              paddingHorizontal: config.wp("2%"),
            }}
          >
            {qty.length}
          </Text>
          <TouchableOpacity
            onPress={() => handleAdd(item.name)}
            style={{
              paddingHorizontal: config.wp("2%"),
            }}
          >
            <Ionicons name="add" size={config.wp("7%")} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{}}>What is your household size? </Text>
      <Text>Drag and drop to build what best resembles your household</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.icon}
        //style={{ flex: 6 }}
        contentContainerStyle={{
          paddingHorizontal: config.wp("4%"),
          paddingBottom: 50,
          //height: "70%",
          //flex: 6,
        }}
      />
      <View
        style={{
          height: config.hp("9%"),
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          onPress={() => Submit()}
          style={{
            backgroundColor: theme.colors.primary,
            width: "75%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
            paddingVertical: config.hp("1%"),
          }}
        >
          <Text style={{ color: "white", fontSize: config.wp("4%") }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Form1;
