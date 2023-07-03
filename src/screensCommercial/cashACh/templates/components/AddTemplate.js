import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import RequestInfo from "../../components/RequestInfo";
import Review from "../../components/Review";
import Accounts from "../../components/addPersons/Accounts";

const AddTemplate = ({ navigation }) => {
  const [step, setStep] = useState(0);
  const [payload, setPayload] = useState({
    name: undefined,
    requestType: undefined,
    achType: undefined,
    company: undefined,
    description: undefined,
    account: undefined, //
    maxTransferAmount: undefined,
    date: undefined,
    controlAmount: undefined,
    amount: undefined,
    destAccounts: [],
  });

  const [status, setStatus] = useState({
    loading: false,
    error: undefined,
    message: undefined,
    showError: false,
  });

  function handleChange(name, value) {
    setPayload({
      ...payload,
      [name]: value,
    });
  }

  function handleNext() {
    setStep(step + 1);
  }

  function handleBack() {
    setStep(step - 1);
  }
  function handleCancel() {
    navigation.goBack();
  }

  function handleSubmit() {
    navigation.navigate("ACH");
    setStatus({
      ...status,
      loading: true,
    });
  }

  function handleStep(step) {
    switch (step) {
      case 0:
        return (
          <RequestInfo
            payload={payload}
            handleNext={handleNext}
            handleChange={handleChange}
            handleCancel={handleCancel}
          ></RequestInfo>
        );

      case 1:
        return (
          <Accounts
            payload={payload}
            setPayload={setPayload}
            handleNext={handleNext}
            handleBack={handleBack}
          ></Accounts>
        );

      case 2:
        return (
          <Review
            payload={payload}
            handleBack={handleBack}
            handleSubmit={handleSubmit}
            requestType="AddTemplate"
          ></Review>
        );
    }
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          paddingHorizontal: config.wp("2%"),
          paddingVertical: config.hp("2%"),
          //marginBottom: config.hp("2%"),
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            color: theme.colors.primary,
          }}
        >
          Add Template
        </Text>
        <Text style={{ fontSize: 18 }}> UI Messaging Goes Here</Text>
      </View>

      {handleStep(step)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default AddTemplate;
