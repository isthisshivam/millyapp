import {
  View,
  Text,
  Switch,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const EditPermissions = ({ setStep, submit }) => {
  const [allowView, setAllowView] = useState(false);
  const [allowTransferTo, setAllowTransferTo] = useState(false);
  const [allowTransferFrom, setAllowTransferFrom] = useState(false);

  function toggleSwitch(type) {
    switch (type) {
      case "View":
        setAllowView(!allowView);
        return;
      case "TransferTo":
        setAllowTransferTo(!allowTransferTo);
        return;
      case "TransferFrom":
        setAllowTransferFrom(!allowTransferFrom);
        return;
    }
  }
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      style={{
        flex: 1,
      }}
    >
      <Text
        style={{ fontSize: 22, marginBottom: 15, color: theme.colors.primary }}
      >
        Edit Account based permissions.
      </Text>
      <View style={{ marginBottom: config.hp("4%") }}>
        <Text style={styles.sectionTitle}>Access</Text>
        <Text style={{ marginBottom: 15 }}>Toggle User Permissions</Text>

        <View style={styles.switchContainer}>
          <Text style={styles.label}>View</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#767577" }}
            thumbColor={allowView ? theme.colors.primaryLight : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSwitch("View")}
            value={allowView}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Transfer To</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#767577" }}
            thumbColor={allowTransferTo ? theme.colors.primaryLight : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSwitch("TransferTo")}
            value={allowTransferTo}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Transfer From</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#767577" }}
            thumbColor={
              allowTransferFrom ? theme.colors.primaryLight : "#f4f3f4"
            }
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSwitch("TransferFrom")}
            value={allowTransferFrom}
          />
        </View>
      </View>
      <View style={{ marginBottom: config.hp("4%") }}>
        <Text style={styles.sectionTitle}>Limits</Text>
        <Text>Enter $ amount to set Limit - ie: $100.00</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text>Transaction Withdrawal Limit:</Text>
        <TextInput keyboardType="decimal-pad" style={styles.input}></TextInput>
      </View>
      <View style={styles.inputContainer}>
        <Text>Transaction Withdrawal Limit:</Text>
        <TextInput keyboardType="decimal-pad" style={styles.input}></TextInput>
      </View>

      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
      >
        <TouchableOpacity
          onPress={() => {
            submit(), setStep(1);
          }}
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
          <Text style={{ color: "white", fontSize: 18 }}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setStep(0)}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    width: config.wp("40%"),
    height: config.hp("4%"),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.faded,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: config.hp("4%"),
  },
  label: { fontSize: 18 },
  sectionTitle: { fontSize: 20, fontWeight: "500" },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: config.hp("2%"),
  },
});

export default EditPermissions;
