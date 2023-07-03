import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useEffect, useState } from "react";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

const UserDetails = ({ payload, handleChange, handleNext, handleBack }) => {
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text
        style={{
          color: theme.colors.primary,
          fontSize: 20,
          fontWeight: "500",
          marginBottom: config.hp("1%"),
        }}
      >
        User Details
      </Text>
      <Text
        style={{
          color: theme.colors.primary,
          fontSize: 16,

          marginBottom: config.hp("4%"),
        }}
      >
        Please enter new users details
      </Text>
      <View style={styles.rowContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mobile number</Text>
          <TextInput
            keyboardType="number-pad"
            onChangeText={(text) => handleChange("mobileNumber", text)}
            style={styles.input}
            placeholder="ex. 1234567890"
          ></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Home number</Text>
          <TextInput
            keyboardType="number-pad"
            onChangeText={(text) => handleChange("homeNumber", text)}
            style={styles.input}
            placeholder="ex. 1234567890"
          ></TextInput>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            onChangeText={(text) => handleChange("address1", text)}
            style={styles.input}
            placeholder="ex. 123 Main st"
          ></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Suite/Apt #</Text>
          <TextInput
            onChangeText={(text) => handleChange("address2", text)}
            style={styles.input}
            placeholder="ex.201"
          ></TextInput>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter UserId"
          ></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>State</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter UserId"
          ></TextInput>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Zipcode</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter UserId"
          ></TextInput>
        </View>
      </View>

      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
      >
        <TouchableOpacity
          onPress={handleNext}
          style={{
            backgroundColor: theme.colors.primary,
            width: config.wp("75%"),
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 7,
            paddingVertical: config.hp(".5%"),
            marginBottom: config.hp("1%"),
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleBack}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: theme.colors.faded,
    height: config.hp("4%"),
    paddingHorizontal: config.wp("1%"),
  },

  inputContainer: {
    width: "50%",
    alignItems: "flex-start",
    paddingHorizontal: config.wp("2%"),
  },
  label: {
    fontSize: 16,
    color: theme.colors.primary,
    marginBottom: config.hp(".5%"),
  },
  rowContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: config.hp("4%"),
  },
});

export default UserDetails;
