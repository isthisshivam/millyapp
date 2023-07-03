import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

import DateTimePicker from "@react-native-community/datetimepicker";

const UserInfo = ({ payload, handleChange, handleCancel, handleNext }) => {
  const platform = Platform.OS;
  let date = new Date(payload.birthday);
  const [show, setShow] = useState(platform == "android" ? false : true);

  const onChange = async (event, selectedDate) => {
    await handleChange("birthday", selectedDate.toLocaleDateString());
    if (platform == "android") {
      setShow(false);
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: theme.colors.primary,
          fontSize: 20,
          fontWeight: "500",
          marginBottom: config.hp("1%"),
        }}
      >
        UserInfo
      </Text>
      <Text
        style={{
          color: theme.colors.primary,
          fontSize: 16,

          marginBottom: config.hp("4%"),
        }}
      >
        Please enter new users information
      </Text>
      <View style={styles.rowContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>UserId</Text>
          <TextInput
            onChangeText={(text) => handleChange("userId", text)}
            style={styles.input}
            placeholder="Enter UserId"
          ></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email address</Text>
          <TextInput
            onChangeText={(text) => handleChange("email", text)}
            style={styles.input}
            placeholder="Enter an email"
          ></TextInput>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First name</Text>
          <TextInput
            onChangeText={(text) => handleChange("firstName", text)}
            style={styles.input}
            placeholder="First name"
          ></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last name</Text>
          <TextInput
            onChangeText={(text) => handleChange("lastName", text)}
            style={styles.input}
            placeholder="Last name"
          ></TextInput>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Birthday</Text>
          {platform == "android" ? (
            <TouchableOpacity
              style={{
                ...styles.input,
                justifyContent: "center",
                width: "100%",
              }}
              onPress={showDatepicker}
            >
              <Text>
                {payload?.birthday ? payload.birthday : "Select Date"}
              </Text>
            </TouchableOpacity>
          ) : undefined}
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={"date"}
              is24Hour={false}
              onChange={onChange}
              locale={"en-US"}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                //backgroundColor: "white",
                width: "100%",
                borderRadius: 7,
                //borderWidth: 1,
                borderColor: theme.colors.faded,
                height: config.hp("4%"),
                paddingHorizontal: config.wp("1%"),
              }}
            />
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>UserId</Text>
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

        <TouchableOpacity onPress={handleCancel}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
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

export default UserInfo;
