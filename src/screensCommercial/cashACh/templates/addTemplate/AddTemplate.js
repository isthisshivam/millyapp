import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import RequestInfo from "../../components/RequestInfo";
import Review from "../../components/Review";
import Accounts from "../../components/addPersons/Accounts";
import { AddAchTemplate } from "../../../../store/actions/CommercialActions";
import StatusHandler from "../../../../../utils/StatusHandler";

const AddTemplate = ({ navigation }) => {
  const state = useSelector((state) => state.commercial);
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    name: undefined,
    requestType: undefined,
    company: undefined,
    description: undefined,
    account: undefined, //
    maxTransferAmount: undefined,
    isMoneySend: false,
    destAccounts: [],
    accountId: undefined,
  });

  const [status, setStatus] = useState({
    loading: false,
    error: undefined,
    message: undefined,
    showError: false,
  });

  ///console.log(payload);

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
    let data = {
      ...payload,
      templateName: payload.name,
      debitAccount: payload.accountId,
    };
    setStatus({
      ...status,
      loading: true,
    });
    dispatch(AddAchTemplate(data));
  }

  // useEffect(() => {
  //   switch (state.status) {
  //     case true:
  //       setStatus({
  //         ...status,
  //         loading: false,
  //       });
  //       return;

  //     case "Error":
  //       setStatus({
  //         ...status,
  //         loading: false,
  //       });
  //       return;

  //     default:
  //       setStatus({
  //         ...status,
  //         loading: false,
  //       });
  //       return;
  //   }
  // }, [state]);

  function handleStep(step) {
    switch (step) {
      case 0:
        return (
          <RequestInfo
            payload={payload}
            setPayload={setPayload}
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
            requestType="AddTemplate"
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            status={status}
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
      <StatusHandler
        state={state}
        navigation={navigation}
        status={status}
        setStatus={setStatus}
      ></StatusHandler>
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
