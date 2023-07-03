import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { config } from "../../../../config/Config";
import Info from "./Info";
import RequestInfo from "../../components/RequestInfo";
import Accounts from "../../components/addPersons/Accounts";
import Confirmation from "./Confirmation";

const Review = ({ route, navigation }) => {
  const [step, setStep] = useState(0);
  const item = route.params.item;
  const confirmationType = route.params.confirmationType;
  const [payload, setPayload] = useState({ ...item });
  const [status, setStatus] = useState({
    loading: false,
    error: undefined,
    message: undefined,
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

  function handleDeny() {
    setStatus({
      ...status,
      loading: true,
    });
  }
  function handleApprove() {
    setStatus({
      ...status,
      loading: true,
    });
  }
  function handleSwitch() {
    switch (step) {
      case 0:
        return (
          <RequestInfo
            handleNext={handleNext}
            handleCancel={handleCancel}
            payload={payload}
            handleChange={handleChange}
          ></RequestInfo>
        );

      case 1:
        return (
          <Accounts
            handleNext={handleNext}
            handleBack={handleBack}
            payload={payload}
            handleChange={handleChange}
            setPayload={setPayload}
          ></Accounts>
        );

      case 2:
        return (
          <Confirmation
            handleDeny={handleDeny}
            handleApprove={handleApprove}
            handleBack={handleBack}
            handleChange={handleChange}
            status={status}
            payload={payload}
            confirmationType={confirmationType}
          ></Confirmation>
        );
    }
  }
  return <View style={styles.container}>{handleSwitch(step)}</View>;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: config.wp("2%"),
    //paddingVertical: config.hp("2%"),
    height: "100%",
    width: "100%",
  },
});

export default Review;
