import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Touchable,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { SendDeposit } from "../../store/actions/DepositActions";
import CurrencyInput from "react-native-currency-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CheckImages from "./checkImages/CheckImages";
import AccountDepositTo from "./accountDepositTo/AccountDepositTo";
import ButtonContainer from "./buttonContainer/ButtonContainer";
import StatusHandler from "../../../utils/StatusHandler";
import { styles } from "./style";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";

const DepositScreen = ({ navigation }) => {
  const accounts = useSelector((state) => state.accounts.accounts);
  const state = useSelector((state) => state.deposits);
  const checkImages = useSelector((state) => state.checkImages);
  const scrollViewRef = useRef();
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    depositAccount: undefined,
    amount: 0.0,
    principle: false,
    status: "Pending",
    date: "",
    confirmation: "",
    checkImage1: "",
    checkImage2: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    error: undefined,
    disabled: true,
    isValid: false,
  });

  //Add images from redux to payload
  useEffect(() => {
    if (checkImages) {
      setPayload({
        ...payload,
        checkImage1: checkImages.check1,
        checkImage2: checkImages.check2,
      });
    }
  }, [checkImages]);

  const handleScreenChange = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
  };
  const handleChange = (name, value) => {
    setPayload({ ...payload, [name]: value });
  };

  //Submit deposit to backend
  const submit = async () => {
    let data = {
      depositAccount: payload.depositAccount,
      amount: payload.amount,
      principle: false,
      status: "Pending",
      date: new Date().toLocaleDateString("en-US"),
      checkImage1: payload.checkImage1,
      checkImage2: payload.checkImage2,
    };

    dispatch(SendDeposit(data));
  };

  //Field validation
  useEffect(() => {
    if (
      payload.depositAccount !== "" &&
      payload.amount > 0 &&
      payload.checkImage1 &&
      payload.checkImage2
    ) {
      setStatus({
        ...status,
        disabled: false,
      });
    } else {
      setStatus({
        ...status,
        disabled: true,
      });
    }
  }, [payload]);

  useEffect(() => {
    if (state.status == true) {
      setPayload({
        depositAccount: "",
        amount: "",
        principle: false,
        status: undefined,
        date: "",
        confirmation: "",
        checkImage1: "",
        checkImage2: "",
      });
      setStatus({
        ...status,
        loading: false,
      });
    }

    if (state.status == "Error") {
      setStatus({
        ...status,
        loading: false,
        error: status.error,
      });
    }
  }, [state]);

  return (
    <>
      <ButtonContainer
        isSelected={true}
        handleScreenChange={handleScreenChange}
        navigation={navigation}
      />
      <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{}}>
        <View
          style={{
            paddingHorizontal: config.wp("2%"),
            paddingVertical: config.hp("2%"),
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: theme.colors.primary,
            }}
          >
            Remote Deposit Capture
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Deposit Disclosures")}
            style={{ flexDirection: "row" }}
          >
            <Text style={{ marginRight: 5 }}>
              Learn more about remote deposit capture
            </Text>
            <Text style={{ textDecorationLine: "underline" }}>Here.</Text>
          </TouchableOpacity>
        </View>
        <AccountDepositTo
          data={accounts}
          handleChange={handleChange}
          depositAccount={payload.depositAccount}
        />
        {/* <DepositAmount handleChange={handleChange} amount={payload.amount} /> */}
        <View
          style={{
            paddingVertical: config.hp("2%"),
            borderColor: theme.colors.faded,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            flexDirection: "row",
            paddingHorizontal: config.wp("4%"),
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: theme.colors.primary,
              fontWeight: "500",
              width: "50%",
            }}
          >
            Amount:
          </Text>
          <CurrencyInput
            value={payload.amount}
            onChangeValue={(value) => handleChange("amount", value)}
            style={{
              width: "50%",
              backgroundColor: "lightgray",
              height: config.hp("4%"),
              borderRadius: 7,
            }}
            placeholder={"0.00"}
            textAlign={"center"}
            keyboardType="numeric"
            prefix="$"
            delimiter=","
            separator="."
            precision={2}
          />
        </View>
        <CheckImages setPayload={setPayload} payload={payload} />

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: 25,
            backgroundColor: "white",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: status.disabled
                ? theme.colors.faded
                : theme.colors.primary,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: config.hp("1%"),
              width: "75%",
              borderRadius: 12,
            }}
          >
            <Text style={{ fontSize: 16, color: "white", fontWeight: "500" }}>
              Deposit
            </Text>
          </TouchableOpacity>
        </View>

        <StatusHandler
          state={state}
          setStatus={setStatus}
          status={status}
        ></StatusHandler>
      </KeyboardAwareScrollView>
    </>
  );
};

export default DepositScreen;
