import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { config } from "../../../../../config/Config";
import { theme } from "../../../../../config/Theme";

const Person = ({ item, editPerson, removePerson }) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "white",
        paddingVertical: config.hp("1%"),
        paddingHorizontal: config.wp("1%"),
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        flexDirection: "column",
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: config.hp("1%"),
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: theme.colors.primary,
            fontWeight: "500",
          }}
        >
          {item.lastName}, {item.firstName}
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: theme.colors.primary,
            fontWeight: "500",
          }}
        >
          Amount: ${item.amount}
        </Text>
      </View>

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 16 }}>Account Type: {item.accountType}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            //width: "100%",
            //paddingTop: config.hp("2%"),
          }}
        >
          <Ionicons
            onPress={() => editPerson(item)}
            name="md-pencil"
            size={24}
            style={{ color: theme.colors.yellow, marginRight: 5 }}
          />
          <Ionicons
            onPress={() => removePerson(item)}
            name="trash"
            size={24}
            style={{ color: "#f44336" }}
          />
        </View>
      </View>
    </View>
  );
};

export default Person;
