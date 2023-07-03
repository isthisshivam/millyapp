import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { theme } from "../../../config/Theme";
import { config } from "../../../config/Config";

const ProfileLink = ({ navigation }) => {
  let data = [
    { route: "Subscriptions", name: "Subscriptions" },
    { route: "Expenses", name: "Expenses" },
    { route: "Reminders", name: "Reminders" },
    {
      route: "House",
      name: "My House",
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      {data?.map((item, i) => (
        <TouchableOpacity
          key={i}
          activeOpacity={0.65}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: config.hp("9%"),
            borderBottomColor: theme.colors.disabled,
            borderBottomWidth: 1,
          }}
          onPress={() => navigation.navigate(item.route)}
        >
          <Text
            style={{
              fontSize: config.wp("5%"),
              fontWeight: "400",
              //color: theme.colors.primary,
            }}
          >
            {item.name}
          </Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProfileLink;
