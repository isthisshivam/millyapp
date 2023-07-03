import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../config/Theme";
import { config } from "../../config/Config";
import { useDispatch } from "react-redux";

import { GetVehicles } from "../../store/actions/VehicleActions";
import { GetHousehold } from "../../store/actions/HouseActions";
import { GetExpenses } from "../../store/actions/ExpenseAction";

const ProfileAndSettingsScreen = ({ navigation }) => {
  let data = [
    { route: "Subscriptions", name: "Subscriptions", icon: "library" },
    { route: "Expenses", name: "Expenses", icon: "receipt" },

    {
      route: "House",
      name: "My House",
      icon: "home",
    },
    { route: "Goals", name: "My Goals", icon: "golf" },
    { route: "Reminders", name: "Reminders", icon: "today" },
    {
      route: "Disclosures",
      name: "Disclosures",
      icon: "document",
    },

    { route: "Account Settings", name: "Profile Settings", icon: "person" },
    { route: "Security Settings", name: "Security Center", icon: "shield" },
  ];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetVehicles());
    dispatch(GetHousehold());
    dispatch(GetExpenses());

    return () => {};
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          //backgroundColor: "white",
          paddingHorizontal: config.wp("4%"),
          paddingTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            color: theme.colors.primary,
            marginBottom: config.hp("4%"),
          }}
        >
          Profile and settings
        </Text>
        <View
          style={{
            flex: 1,
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {data?.map((item, i) => (
            <TouchableOpacity
              key={i}
              activeOpacity={0.65}
              style={styles.links}
              onPress={() => navigation.navigate(item.route)}
            >
              <Text style={styles.settingLinkText}>{item.name}</Text>
              <Ionicons name={item.icon} size={24} color="black" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View
        style={{
          height: config.hp("12%"),
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: config.hp("4%"),
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.primary,
            width: "75%",
            paddingVertical: config.hp("1%"),
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      {/* <View
        style={{
          height: config.hp("25%"),
          paddingHorizontal: config.wp("2%"),
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            marginBottom: 10,
            fontSize: 20,
            fontWeight: "500",
            color: theme.colors.primary,
          }}
        >
          Settings
        </Text>

        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",

            flex: 1,
          }}
        >
          <TouchableOpacity
            style={styles.links}
            onPress={() => navigation.navigate("Account Settings")}
          >
            <Text style={styles.settingLinkText}>Account Settings</Text>
            <Entypo name="chevron-right" size={24} color="black" /> 
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.links}
            onPress={() => navigation.navigate("Security Settings")}
          >
            <Text style={styles.settingLinkText}>Security Center</Text>
             <Entypo name="chevron-right" size={24} color="black" /> 
          </TouchableOpacity>
        </View>
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  links: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderolor: theme.colors.primary,
    // borderWidth: config.hp(".1%"),
    borderRadius: 12,
    //paddingVertical: 10,
    height: config.hp("10%"),
    width: "45%",
    marginBottom: config.hp("2%"),
    backgroundColor: "white",
  },
  settingLinkText: {
    fontSize: 18,
    color: theme.colors.primary,
    fontWeight: "500",
    marginBottom: config.hp("1%"),
  },
});

export default ProfileAndSettingsScreen;
