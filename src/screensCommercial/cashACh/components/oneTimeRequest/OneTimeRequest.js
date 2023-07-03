import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import RequestInfo from "../RequestInfo";
import Accounts from "../addPersons/Accounts";
import Review from "../Review";
import StatusHandler from "../../../../../utils/StatusHandler";
import { OneTimeACH } from "../../../../store/actions/CommercialActions";

const OneTimeRequest = ({ navigation }) => {
  const state = useSelector((state) => state.commercial);
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    templateName: undefined,
    requestType: undefined,
    maxTxAmount: undefined,
    companyId: undefined,
    debitAccount: undefined,
    destAccounts: [],
    effectiveDate: undefined,
    templateDescription: undefined,
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
    setStatus({
      ...status,
      loading: true,
    });
    dispatch(OneTimeACH(payload));
  }

  useEffect(() => {
    switch (state.status) {
      case true:
        setStatus({
          ...status,
          loading: false,
        });
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
            handleChange={handleChange}
          ></Accounts>
        );

      case 2:
        return (
          <Review
            payload={payload}
            handleBack={handleBack}
            requestType="OneTime"
            handleSubmit={handleSubmit}
            status={status}
            handleChange={handleChange}
          ></Review>
        );
      default:
        return (
          <RequestInfo
            payload={payload}
            handleNext={handleNext}
            handleChange={handleChange}
            handleCancel={handleCancel}
          ></RequestInfo>
        );
    }
  }
  return (
    <View style={styles.container}>
      {/* <View
        style={{
          paddingHorizontal: config.wp("2%"),
          paddingVertical: config.hp("2%"),
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            textAlign: "left",
            width: "100%",
            color: theme.colors.primary,
            marginBottom: config.hp("2%"),
          }}
        >
          One Time Request
        </Text>
      </View> */}

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
    //paddingHorizontal: config.wp("2%"),
    paddingVertical: config.hp("1"),
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
export default OneTimeRequest;
