import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { config } from "../../config/Config";
import { Ionicons, Octicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../../config/Theme";
import {
  GetAchTypes,
  GetTemplates,
  GetPermissions,
} from "../../store/actions/CommercialActions";

const CashACH = ({ navigation }) => {
  const [admin, setAdmin] = useState(false);
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();

  function toggleAdmin() {
    setAdmin(!admin);
  }

  let data = [
    { title: "Templates", route: "Templates", requiresAdmin: false },
    { title: "Send Money", route: "Send", requiresAdmin: false },
    { title: "Collect Money", route: "collect", requiresAdmin: false },
    { title: "ACH History", route: "history", requiresAdmin: false },

    {
      title: "Template Approval",
      route: "Template Approval",
      requiresAdmin: true,
    },
    {
      title: "Request Approval",
      route: "ACH Requests",
      requiresAdmin: true,
    },
    { title: "ACH Transmit", route: "Transmit", requiresAdmin: true },
    {
      title: "Users",
      route: "Users",
      requiresAdmin: true,
    },
  ];

  useEffect(() => {
    if (!admin) {
      let array = data.filter((item) => item.requiresAdmin == false);
      setOptions(array);
      return;
    }
    setOptions(data);
  }, [admin]);
  useEffect(() => {
    dispatch(GetTemplates());
    dispatch(GetAchTypes());
    dispatch(GetPermissions());
  }, []);

  return (
    <View
      style={{
        alignItems: "center",
        width: "100%",
        paddingTop: config.hp("2%"),
        paddingHorizontal: config.wp("4%"),
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "600",
          width: "100%",
          textAlign: "left",
          color: theme.colors.primary,
        }}
      >
        Commercial
      </Text>
      <Text
        style={{
          width: "100%",
          textAlign: "left",
          fontSize: 16,
          marginBottom: config.hp("4%"),
        }}
      >
        CashACH
      </Text>

      <TouchableOpacity onPress={toggleAdmin}>
        <Text>ToggleAdmin</Text>
      </TouchableOpacity>

      <View
        style={{
          width: "100%",
          color: "white",
        }}
      >
        {options?.map((item, i) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.route)}
            key={i}
            style={{
              ...styles.option,
            }}
          >
            <Text style={styles.optionTitle}>{item.title}</Text>
            {item.route == "Templates" || item.route == "Template Approval" ? (
              <Octicons
                name="repo-template"
                size={24}
                color={theme.colors.primaryLight}
              />
            ) : item.route == "history" ? (
              <Octicons
                name="history"
                size={24}
                color={theme.colors.primaryLight}
              />
            ) : item.route == "Transmit" ? (
              <MaterialCommunityIcons
                name="bank-transfer"
                size={32}
                color={theme.colors.primaryLight}
              />
            ) : item.route == "ACH Requests" ? (
              <Octicons
                name="checklist"
                size={24}
                color={theme.colors.primaryLight}
              />
            ) : item.route == "Users" ? (
              <Octicons
                name="person"
                size={24}
                color={theme.colors.primaryLight}
              />
            ) : item.route != "collect" ? (
              <Ionicons
                name="arrow-forward"
                size={24}
                color={theme.colors.primaryLight}
              />
            ) : (
              <Ionicons
                name="arrow-back"
                size={24}
                color={theme.colors.primaryLight}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  option: {
    backgroundColor: "white",
    paddingVertical: config.hp("1%"),
    flexDirection: "row",
    alignItems: "center",
    marginBottom: config.hp("1%"),
    paddingHorizontal: config.wp("2%"),
    borderRadius: 7,
  },
  optionTitle: {
    fontSize: 18,
    marginRight: config.wp("2%"),
  },
});

export default CashACH;
