import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import RequestInfo from "../RequestInfo";
import Review from "../Review";
import Accounts from "../addPersons/Accounts";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import { OneTimeACH } from "../../../../store/actions/CommercialActions";
import StatusHandler from "../../../../../utils/StatusHandler";

const TemplateRequest = ({ navigation }) => {
  const state = useSelector((state) => state.commercial);
  const [step, setStep] = useState(0);
  const template = state.selectedTemplate;
  const dispatch = useDispatch();
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
    effectiveDate: undefined,
    total: undefined,
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

  function handleBack() {
    setStep(step - 1);
  }
  function handleNext() {
    setStep(step + 1);
  }
  function handleCancel() {
    navigation.goBack();
  }
  function handleSubmit() {
    let data = {
      ...payload,
      templateName: payload.name,
    };
    setStatus({
      ...status,
      loading: true,
    });
    dispatch(OneTimeACH(data));
  }

  useEffect(() => {
    setPayload({
      ...payload,
      ...template,
    });
  }, [template]);

  useEffect(() => {
    switch (state.status) {
      case true:
        setStatus({
          ...status,
          loading: false,
        });
        // setPayload({
        //   name: undefined,
        //   requestType: undefined,
        //   achType: undefined,
        //   company: undefined,
        //   description: undefined,
        //   account: undefined, //
        //   maxTransferAmount: undefined,
        //   date: undefined,
        //   controlAmount: undefined,
        //   amount: undefined,
        //   destAccounts: [],
        //   effectiveDate: undefined,
        //   total: undefined,
        // });
        return;

      case "Error":
        setStatus({
          ...status,
          loading: false,
        });
        return;

      default:
        setStatus({
          ...status,
          loading: false,
        });
        return;
    }
  }, [state]);

  function handleStep(step) {
    switch (step) {
      case 0:
        return (
          <RequestInfo
            payload={payload}
            handleNext={handleNext}
            handleCancel={handleCancel}
            handleChange={handleChange}
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
            requestType="Template"
            navigation={navigation}
            status={status}
            handleChange={handleChange}
          ></Review>
        );
    }
  }
  return (
    <View style={{ height: "100%", paddingVertical: config.hp("1%") }}>
      {/* <View
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
            textAlign: "left",
            width: "100%",
            color: theme.colors.primary,
          }}
        >
          Template Request
        </Text>
        <Text style={{ fontSize: 18 }}> UI Messaging Goes Here</Text>
      </View> */}
      {handleStep(step)}
      <StatusHandler
        state={state}
        status={status}
        setStatus={setStatus}
        navigation={navigation}
      ></StatusHandler>
    </View>
  );
};

export default TemplateRequest;
