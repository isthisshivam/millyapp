import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import { Ionicons } from "@expo/vector-icons";
import AchType from "../../components/modals/AchType";
import RequestType from "../../components/modals/RequestType";
import AccountsModal from "../../components/modals/AccountsModal";
import EffectiveDate from "../../components/modals/EffectiveDate";

const RequestInfo = ({ handleNext, payload, handleChange, handleCancel }) => {
  const [showType, setShowType] = useState(false); //Send or Collect
  const [showRequestType, setShowRequestType] = useState(false); //PPD or CCD
  const [showAccounts, setShowAccounts] = useState(false); //list of accounts

  function toggleAchType() {
    setShowType(!showType);
  }

  function toggleRequestType() {
    setShowRequestType(!showRequestType);
  }

  function toggleAccounts() {
    setShowAccounts(!showAccounts);
  }

  return (
    <View style={{ flex: 1, paddingVertical: config.hp("1%") }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "500",
          color: theme.colors.primary,
          paddingHorizontal: config.wp("2%"),
          marginBottom: config.hp("2%"),
        }}
      >
        Template Info
      </Text>
      <DropDowns
        payload={payload}
        toggleAchType={toggleAchType}
        toggleRequestType={toggleRequestType}
      ></DropDowns>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: config.hp("4%"),
          }}
        >
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Request Name</Text>
            <TextInput
              onChangeText={(value) => handleChange("templateName", value)}
              style={styles.input}
              placeholder={
                payload.templateName ? payload.templateName : "Enter a Name"
              }
              placeholderTextColor={payload.templateName ? "black" : undefined}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Company/ID</Text>
            <TextInput
              onChangeText={(value) => handleChange("company", value)}
              style={styles.input}
              placeholder="Company/ID"
              placeholderTextColor={payload.company ? "black" : undefined}
            />
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
            <Text style={styles.label}>Total Amount</Text>
            <TextInput
              keyboardType="deciaml-pad"
              onChangeText={(value) => handleChange("totalAmount", value)}
              style={styles.input}
              placeholder={
                payload.totalAmount
                  ? payload.totalAmount.toString()
                  : "ex. $12,000"
              }
              placeholderTextColor={payload.totalAmount ? "black" : undefined}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Credit/Debit Account</Text>
            <TouchableOpacity
              onPress={toggleAccounts}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",

                ...styles.input,
              }}
            >
              {payload.account ? (
                <Text style={{ fontSize: 18, paddingRight: 20 }}>
                  {payload.account}
                </Text>
              ) : (
                <Text style={{ fontSize: 16, paddingRight: 20 }}>
                  Select Account
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
        <EffectiveDate
          handleChange={handleChange}
          payload={payload}
        ></EffectiveDate>
        <View>
          <Text style={styles.label}>Description</Text>
          <TextInput
            textAlignVertical="top"
            onChangeText={(value) => handleChange("description", value)}
            placeholder={
              payload.description
                ? payload.description
                : "You can add a description here"
            }
            placeholderTextColor={payload.description ? "black" : "gray"}
            style={{
              backgroundColor: "white",
              borderRadius: 7,
              borderColor: theme.colors.faded,
              borderWidth: 1,
              paddingHorizontal: 10,
              height: config.hp("12%"),
            }}
            numberOfLines={6}
            // multiline={true}
          ></TextInput>
        </View>
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
          onPress={handleNext}
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

        <TouchableOpacity
          onPress={handleCancel}
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
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
      <AchType
        showType={showType}
        toggleAchType={toggleAchType}
        handleChange={handleChange}
      ></AchType>
      <RequestType
        showRequestType={showRequestType}
        toggleRequestType={toggleRequestType}
        handleChange={handleChange}
      ></RequestType>
      <AccountsModal
        handleChange={handleChange}
        showAccounts={showAccounts}
        toggleAccounts={toggleAccounts}
      ></AccountsModal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: config.wp("2%"),
    paddingVertical: config.hp("2%"),
    flex: 1,
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
    fontWeight: "400",
    marginBottom: 5,
  },
});

export default RequestInfo;
