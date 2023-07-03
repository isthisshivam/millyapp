import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import LottieView from "lottie-react-native";
import { useSelector, useDispatch } from "react-redux";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import Disclosures from "./Disclosures";
import Create from "./Create";
import StatusHandler from "../../../../utils/StatusHandler";
import { CreateBillpayAccount } from "../../../store/actions/BillPayAction";

const CreateAccount = ({ navigation }) => {
  const state = useSelector((state) => state.billPays);
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    accountNum: undefined,
    confirmAcct: undefined,
    routingNum: undefined,
    confirmRouting: undefined,
    achAccount: undefined,
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

  function handleNext() {
    setStep(step + 1);
  }
  function handleBack() {
    setStep(step - 1);
  }

  function submit() {
    // setStatus({
    //   ...status,
    //   loading: true,
    // });
    // let data = {
    //   routing: payload.routingNum,
    //   accountId: profile.accountId,
    //   achAccount: payload.achAccount,
    // };
    // dispatch(CreateBillpayAccount(data));

    navigation.navigate("TabBillPay");
  }

  useEffect(() => {
    if (state.status == true) {
      setStatus({
        ...status,
        loading: false,
      });
      navigation.navigate("TabBillPay");
    }
    if (state.status == "Error") {
      setStatus({
        ...status,
        loading: false,
        error: state.error,
      });
    }
  }, [state]);

  function handleStep() {
    switch (step) {
      case 0:
        return (
          <Create
            handleChange={handleChange}
            payload={payload}
            handleNext={handleNext}
            handleBack={handleBack}
          ></Create>
        );

      case 1:
        return (
          <Disclosures
            handleChange={handleChange}
            handleNext={handleNext}
            handleBack={handleBack}
            submit={submit}
            payload={payload}
          ></Disclosures>
        );
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {status.loading ? (
        <>
          <View
            style={{
              width: "100%",
              height: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LottieView
              loop
              autoPlay
              style={{
                width: 160,
                height: 160,
              }}
              source={require("../../../components/ui/loading-spinner.json")}
            />
          </View>
        </>
      ) : (
        handleStep()
      )}
      <StatusHandler state={state} status={status} setStatus={setStatus} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: config.hp("2%"),
    paddingHorizontal: config.wp("2%"),
  },
  input: {
    backgroundColor: "white",
    width: "50%",
    paddingHorizontal: config.wp("1%"),
    borderRadius: 7,
    height: config.hp("4%"),
    borderWidth: 1,
    borderColor: theme.colors.faded,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: config.hp("1%"),
    paddingHorizontal: config.wp("4%"),
  },
  rowText: {
    fontSize: 16,
  },
});

export default CreateAccount;
