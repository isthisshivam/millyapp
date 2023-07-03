import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { useSelector } from "react-redux";

const TemplateDetails = ({ navigation }) => {
  const state = useSelector((state) => state.commercial);
  const data = state.selectedTemplate;
  return (
    <View
      style={{
        paddingHorizontal: config.wp("2%"),
        paddingVertical: config.hp("2%"),
        //height: "100%",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
      }}
    >
      <View
        style={{
          width: "100%",
          marginBottom: config.hp("4%"),
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            color: theme.colors.primary,
            marginBottom: config.hp("4%"),
          }}
        >
          Template Details
        </Text>
        <View style={styles.row}>
          <Text style={styles.text}> Request Type: </Text>
          <Text style={styles.text}> {data.requestType}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}> Company/Id: </Text>
          <Text style={styles.text}> {data.company}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.text}> Account: </Text>
          <Text style={styles.text}> {data.account}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}> Max Amount:</Text>
          <Text style={styles.text}> ${data.maxTransfer}</Text>
        </View>

        <View style={{ width: "100%" }}>
          <Text numberOfLines={4} ellipsizeMode="tail" style={styles.text}>
            Description:
          </Text>
          <Text style={styles.text}> {data.description}</Text>
        </View>
      </View>

      <Text>Date</Text>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
          flexDirection: "column",
          //height: "100%",
          //backgroundColor: "blue",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("TemplateRequest")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "80%",
            backgroundColor: theme.colors.primary,
            borderRadius: 7,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "white",
              paddingVertical: config.hp(".5%"),
              width: "100%",
              textAlign: "center",
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
  row: {
    marginBottom: config.hp("1%"),
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default TemplateDetails;
