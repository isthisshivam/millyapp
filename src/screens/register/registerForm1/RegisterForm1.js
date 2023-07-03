import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import FeatherIcons from "react-native-vector-icons/Feather";
import { TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import * as Device from "expo-device";
import { config } from "../../../config/Config";
import { styles } from "./style";
import client from "../../../../utils/client";

const RegisterForm1 = ({
  handleChange,
  formOneIsFilled,
  handleNext,
  user,
  navigation,
  strengthBadgeColor,
  strengthBadgeText,
}) => {
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const bitPanel = useSelector((state) => state.config.bitPanel);
  const showPasswordMeter = bitPanel?.bitPanel?.passwordMeter;
  const secureSSN = bitPanel?.bitPanel?.maskSSN;
  const maskAcct = bitPanel?.bitPanel?.maskAccount;

  ////////////////////////////////////  PASSWORD VALIDATION /////////////////////////////////
  //Get password requirements from bitPanel
  const passwordRequirements = bitPanel.bitPanel.minimumPasswordRequirements;
  //Login Requirements to display
  const loginRequirements = [
    "Must have a number",
    "Must have a number and a special characters",
    "Must have a number with a lowercase and an uppercase letter",
    "Must have a number with a special character, lowercase and an uppercase letter",
  ];

  //Check requirements are met
  function isNumber(s) {
    var boolToReturn = false;
    if (s) {
      s.split("").forEach((item) => {
        if (!isNaN(item)) {
          boolToReturn = true;
        }
      });
    }
    return boolToReturn;
  }
  //////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <KeyboardAvoidingView
      behavior={Device.osName == "ios" ? "padding" : "padding"}
    >
      <View style={[styles.textContainer, styles.textContainerWelcome]}>
        <Text style={styles.textTitle}>
          Thank you for choosing {client.clientName}.
        </Text>

        <Text style={styles.welcomeTextSecondary}>
          To setup your account we just need a bit of information
        </Text>
      </View>
      <View style={styles.ssnContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>SSN/Tax Id</Text>
        </View>
        <TextInput
          style={styles.input}
          label="SSN/Tax Id#"
          placeholder="SSN/Tax Id#"
          onChangeText={(value) => handleChange("ssn", value)}
          value={user.ssn}
          keyboardType={"number-pad"}
          secureTextEntry={secureSSN}
        />
      </View>
      <View style={styles.acctContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>Acct Number</Text>
        </View>
        <TextInput
          style={styles.input}
          keyboardType={"number-pad"}
          label="Account"
          placeholder="Account"
          value={user.account}
          onChangeText={(value) => handleChange("account", value)}
          secureTextEntry={maskAcct}
        />
      </View>
      <View style={styles.usernameContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>User ID</Text>
          <Text style={{ fontSize: 14 }}>
            Create a username to access you account online.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            label="User Id"
            placeholder="User Id"
            onChangeText={(value) => handleChange("userId", value)}
            value={user.userId}
          />

          <Text style={{ fontSize: 12, paddingLeft: 8 }}>
            Must contain at least 1 letter and 1 number
          </Text>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>Password</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          label="Password"
          placeholder="Password"
          secureTextEntry={!showPassword}
          onChangeText={(value) => handleChange("password", value)}
          value={user.password}
          right={
            <TextInput.Icon
              name={() => (
                <FeatherIcons
                  name={"eye"}
                  style={styles.eyeIcon}
                  onPress={() => {
                    setshowPassword(!showPassword);
                  }}
                />
              )}
            />
          }
        />
        {user.password && isNumber(user.password) ? undefined : (
          <View style={{}}>
            <Text style={{ color: "red" }}>
              {passwordRequirements < loginRequirements.length && user.password
                ? loginRequirements[passwordRequirements]
                : undefined}
            </Text>
            {user.password.length > 0 ? (
              <Text style={{ color: "red" }}>
                {user.password.length < 8 || user.password.length > 32
                  ? `Must be between ${bitPanel.minimumPasswordLength}-${bitPanel.maximumPasswordLength} characters long`
                  : undefined}
              </Text>
            ) : undefined}
          </View>
        )}
        {user.password.length && showPasswordMeter > 0 ? (
          <View style={{ paddingHorizontal: config.hp("4%"), paddingTop: 10 }}>
            <View
              style={{
                backgroundColor: strengthBadgeColor,
                paddingHorizontal: config.wp("12%"),
                alignItems: "center",
                paddingVertical: config.hp(".3%"),
                borderRadius: 12,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                {strengthBadgeText}
              </Text>
            </View>
          </View>
        ) : undefined}

        <TextInput
          value={user.confirmPassword}
          style={styles.input}
          label="Confirm Password"
          placeholder="confirm Password"
          onChangeText={(value) => handleChange("confirmPassword", value)}
          secureTextEntry={!showConfirmPassword}
          right={
            <TextInput.Icon
              name={() => (
                <FeatherIcons
                  name={"eye"}
                  style={styles.eyeIcon}
                  onPress={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                />
              )}
            />
          }
        />
        {user.password !== user.confirmPassword ? (
          <Text
            style={{
              color: "red",
              fontSize: 16,
              paddingLeft: config.wp("4%"),
              paddingVertical: config.hp("1%"),
            }}
          >
            Passwords Must Match
          </Text>
        ) : undefined}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          //disabled={!}
          style={!formOneIsFilled ? styles.disabled : styles.button}
          onPress={() => {
            handleNext();
          }}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          //disabled={!formOneIsFilled}
          activeOpacity={0.85}
          style={styles.blackButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterForm1;
