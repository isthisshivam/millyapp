import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useCallback, useRef } from "react";
import StatusHandler from "../../../../utils/StatusHandler";
import { useSelector } from "react-redux";
import AnimatedLottieView from "lottie-react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import Sending from "./sending/Sending";
import Receiving from "./components/Receiving";
import AccountsSheet from "./components/AccountsSheet";

const ExternalTransfer = ({ navigation }) => {
  const state = useSelector((state) => state.transfers);
  const [step, setStep] = useState(0);
  const bottomSheetRef = useRef(null);

  // callbacks
  const handleExpand = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const [payload, setPayload] = useState({
    accountId: undefined,
    routingNum: undefined,
    accountNum: undefined,
    type: step,
    amount: undefined,
    date: undefined,
  });

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

  function handleCancel() {
    navigation.goBack();
  }

  function handleSubmit() {
    //console.log(payload);
    setStatus({
      ...status,
      loading: true,
    });
  }

  function handleForms(step) {
    switch (step) {
      case 0:
        return (
          <Sending
            handleChange={handleChange}
            payload={payload}
            setStep={setStep}
            handleExpand={handleExpand}
          ></Sending>
        );

      case 1:
        return (
          <Receiving
            handleChange={handleChange}
            payload={payload}
            setStep={setStep}
            handleExpand={handleExpand}
          ></Receiving>
        );
    }
  }

  useEffect(() => {
    if (state.status == true) {
      setStatus({
        loading: false,
      });
      return;
    }
    if (state.status == "Error") {
      setStatus({
        loading: false,
        error: state.error,
      });
      return;
    }
  }, [state]);

  return (
    <View style={styles.container}>
      <Text
        style={{ fontSize: 18, color: theme.colors.primary, fontWeight: "500" }}
      >
        External Transfer
      </Text>
      <Text style={{ fontSize: 16, marginBottom: config.hp("4%") }}>
        Transfer money to or from an external account.
      </Text>
      {status.loading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
            height: "100%",
            paddingTop: 25,
          }}
        >
          <AnimatedLottieView
            loop
            autoPlay
            style={{
              width: 160,
              height: 160,
            }}
            source={require("../../../components/ui/loading-spinner.json")}
          />
        </View>
      ) : (
        <>
          {handleForms(step)}

          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                width: "75%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.colors.primary,
                paddingVertical: config.hp("1%"),
                borderRadius: 12,
                marginBottom: config.hp("1%"),
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                Submit Transfer
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <StatusHandler
        state={state}
        status={status}
        setStatus={setStatus}
        navigation={navigation}
      ></StatusHandler>
      <AccountsSheet
        bottomSheetRef={bottomSheetRef}
        handleChange={handleChange}
        handleClose={handleClose}
      ></AccountsSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: config.wp("2%"),
    paddingVertical: config.hp("2%"),
  },
});

export default ExternalTransfer;
