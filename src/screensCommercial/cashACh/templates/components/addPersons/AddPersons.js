import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { config } from "../../../../../config/Config";
import { theme } from "../../../../../config/Theme";
import { Ionicons } from "@expo/vector-icons";

const AddPersons = ({ account, handleChange, handleExpand, handleSave }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: config.hp("4%"),
        }}
      >
        <Text style={{ fontSize: 16 }}>Account Type</Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            //width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={() => handleExpand()}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            {account?.accountType ? (
              <Text style={{ fontSize: 18, paddingRight: 20 }}>
                {account.accountType}
              </Text>
            ) : (
              <Text style={{ fontSize: 16, paddingRight: 20 }}>
                Select Typer
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
      <View style={styles.rowContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>ABA/TRC:</Text>
          <TextInput
            keyboardType="number-pad"
            onChangeText={(text) => handleChange("routing", text)}
            style={styles.input}
            placeholder={
              account.routing ? account.routing.toString() : "Routing Number"
            }
          ></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Account #:</Text>
          <TextInput
            keyboardType="number-pad"
            onChangeText={(text) => handleChange("accountNumber", text)}
            style={styles.input}
            placeholder={
              account.accountNumber
                ? account.accountNumber.toString()
                : "Account #"
            }
          ></TextInput>
        </View>
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.inputContainer}>
          <Text>First Name:</Text>
          <TextInput
            name={"firstName"}
            onChangeText={(text) => handleChange("firstName", text)}
            style={styles.input}
            placeholder={account.firstName ? account.firstName : "First Name"}
          ></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <Text>Last Name:</Text>
          <TextInput
            name={"lastName"}
            onChangeText={(text) => handleChange("lastName", text)}
            style={styles.input}
            placeholder={account.lastName ? account.lastName : "Last Name"}
          ></TextInput>
        </View>
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.inputContainer}>
          <Text>Detail Id: </Text>
          <TextInput
            name={"details"}
            onChangeText={(text) => handleChange("details", text)}
            style={styles.input}
          ></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <Text>Amount:</Text>
          <TextInput
            name={"amount"}
            keyboardType="decimal-pad"
            onChangeText={(text) => handleChange("amount", text)}
            style={styles.input}
            defaultValue={
              account.amount ? account.amount.toString() : undefined
            }
            // placeholder={
            //   account.amount ? account.amount.toString() : "Enter Amount"
            // }
          ></TextInput>
        </View>
      </View>

      <View
        style={{
          ...styles.inputContainer,
          width: "100%",
          height: config.hp("12%"),
        }}
      >
        <Text>Notes: </Text>
        <TextInput
          name={"notes"}
          multiline={true}
          numberOfLines={12}
          placeholder={account.details ? account.details : "Details"}
          onChangeText={(text) => handleChange("notes", text)}
          style={{ ...styles.input, width: "100%", height: config.hp("12%") }}
        ></TextInput>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <TouchableOpacity
          onPress={handleSave}
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
            Save Account
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowForm(false)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "black",
              paddingVertical: config.hp(".5%"),
              width: "100%",
              textAlign: "center",
            }}
          >
            Back
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: config.wp("2%"),
  },
  input: {
    height: config.hp("5%"),
    backgroundColor: "white",
    paddingHorizontal: config.wp("1%"),
    borderRadius: 7,
    borderColor: theme.colors.faded,
    borderWidth: 1,
  },
  inputContainer: {
    width: "48%",
  },
  label: {
    fontSize: 16,
    marginBottom: 3,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: config.hp("2%"),
  },
});

export default AddPersons;
