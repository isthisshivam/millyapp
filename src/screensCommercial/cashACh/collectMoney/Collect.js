import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import Template from "../components/Template";
import { Ionicons } from "@expo/vector-icons";

const Collect = ({ navigation }) => {
  const state = useSelector((state) => state.commercial);
  const templates = state.templates;

  let array = templates.filter(
    (item) =>
      item.requestType == "12" ||
      item.requestType == "13" ||
      item.requestType == "15"
  );

  const renderItem = ({ item }) => (
    <Template item={item} navigation={navigation}></Template>
  );

  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: config.wp("2%"),
        paddingVertical: config.hp("1%"),
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          textAlign: "left",
          width: "100%",
          color: theme.colors.primary,
        }}
      >
        Collect Money
      </Text>
      <Text>
        Submit a One Time ACH Request or Template Request for Approval
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100%",
          paddingTop: config.hp("1%"),
          //marginBottom: config.hp("4%"),
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("OneTimeRequest")}
          style={styles.boxContainer}
        >
          <Text style={{ color: "white", fontSize: 18 }}>One Time Request</Text>
          <Ionicons name="arrow-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          width: "100%",
          textAlign: "left",
          fontSize: 20,
          fontWeight: "500",
          paddingVertical: config.hp("1%"),
          color: theme.colors.primaryLight,
        }}
      >
        Saved Templates
      </Text>

      <FlatList
        contentContainerStyle={{ paddingBottom: config.hp("20%") }}
        data={array}
        renderItem={renderItem}
        keyExtractor={(item) => item.recordId?.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: theme.colors.primaryLight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    //width: config.wp("45%"),
    paddingVertical: config.hp("1.5%"),
    paddingHorizontal: config.wp("2%"),
    borderRadius: 7,
  },
});

export default Collect;
