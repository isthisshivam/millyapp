import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import DropDowns from "./DropDowns";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

const TemplateForm = ({ payload }) => {
  return (
    <View style={{ width: "100%" }}>
      <Text style={{ marginBottom: config.hp("1%") }}>
        UI messaging goes here. templates etc
      </Text>
      <DropDowns payload={payload}></DropDowns>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: config.hp("2%"),
        }}
      >
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Template Name</Text>
          <TextInput style={styles.input} placeholder="Enter a Name" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Company/ID</Text>
          <TextInput style={styles.input} placeholder="Company/ID" />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: config.hp("4%"),
        }}
      >
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Max Amount</Text>
          <TextInput style={styles.input} placeholder="ex. $12,000" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Credit/Debit Account</Text>
          <TouchableOpacity
            //onPress={toggleType}
            style={{
              flexDirection: "row",
              alignItems: "center",

              ...styles.input,
            }}
          >
            {payload.type ? (
              <Text style={{ fontSize: 18, paddingRight: 20 }}>
                {payload.type}
              </Text>
            ) : (
              <Text style={{ fontSize: 16, paddingRight: 20 }}>
                Select Account
              </Text>
            )}
            <Ionicons name="caret-down" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text style={styles.label}>Description</Text>
        <TextInput
          placeholder="You can add a description here"
          style={{
            backgroundColor: "white",
            borderRadius: 7,
            textAlignVertical: "top",
          }}
          numberOfLines={4}
        ></TextInput>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: config.wp("2%"),
    paddingVertical: config.hp("2%"),
    height: "100%",
  },
  input: {
    height: config.hp("4%"),
    backgroundColor: "white",
    paddingHorizontal: config.wp("1%"),
    borderRadius: 7,
  },
  inputContainer: {
    width: "48%",
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 5,
  },
});

export default TemplateForm;
