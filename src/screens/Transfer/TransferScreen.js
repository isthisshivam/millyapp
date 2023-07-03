import React, { useState, useEffect, useRef } from "react";
import { ScrollView, View, Modal, TouchableOpacity, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import LottieView from "lottie-react-native";
import CurrencyInput from "react-native-currency-input";
import { SendTransfer } from "../../store/actions/TransferActions";
import ButtonContainer from "./buttonContainer/ButtonContainer";
import TransferFrom from "./transferComponents/transferFrom/TransferFrom";
import TransferTo from "./transferComponents/transferTo/TransferTo";
import SubmitTransfer from "./transferComponents/submitTransfer/SubmitTransfer";
import FrequencyModal from "./transferComponents/modalContent/FrequencyModal";
import Frequency from "./transferComponents/modalContent/Frequency/Frequency";
import StatusHandler from "../../../utils/StatusHandler";
import CalendarSection from "./transferComponents/calendar/CalendarSection";
import { theme } from "../../config/Theme";
import { config } from "../../config/Config";
import EffectiveDate from "./transferComponents/EffectiveDate";

const TransferScreen = (props) => {
  const accounts = useSelector((state) => state.accounts.accounts);
  const nonLoanAccounts = accounts?.filter((item, i) => item.isLoan == false);
  const loanAccounts = accounts?.filter((item, i) => item.isLoan == true);
  const state = useSelector((state) => state.transfers);
  const [isSafeToTransfer, setIsSafeToTransfer] = useState(false); ///Form Validation
  const [showFrequency, setShowFrequency] = useState(false); //Frequency Modal
  const [visibleModal, setVisibleModal] = useState(false); //Frequency Period MOdal
  const scrollViewRef = useRef();
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    frequency: 1, //number of payments
    frequencyperiod: "Once", //weekly, bi-weekly, monthly, etc
    amount: 0,
    startdate: "", //StartDate
    accounttoid: undefined,
    accountfromid: undefined,
    principal: false,
    intereset: false,
    condition: "", //nnumofpayments, maxamount, enddate,
  });

  const [status, setStatus] = useState({
    loading: false,
    error: undefined,
    message: undefined,
    showError: false,
  });

  function toggleFrequency() {
    setShowFrequency(!showFrequency);
  }

  const handleChange = (name, value) => {
    setPayload({ ...payload, [name]: value });
  };

  //use Effect for validation
  useEffect(() => {
    if (
      payload.accounttoid !== undefined &&
      payload.accountfromid !== undefined &&
      payload.amount > 0 &&
      payload.accountfromid !== payload.accounttoid
    ) {
      setIsSafeToTransfer(true);
    } else {
      setIsSafeToTransfer(false);
    }
  }, [payload]);

  const handleScreenChange = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
  };
  const handleSubmit = () => {
    if (isSafeToTransfer) {
      setStatus({
        ...status,
        loading: true,
      });
      dispatch(SendTransfer(payload));
    }
  };

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

  return (
    <>
      <ButtonContainer
        isSelected={true}
        {...props}
        handleScreenChange={handleScreenChange}
      />
      <ScrollView ref={scrollViewRef}>
        {status.loading ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "flex-start",
              height: "100%",
              paddingTop: 25,
            }}
          >
            <LottieView
              loop
              autoPlay
              style={{
                width: 160,
                height: 160,
              }}
              source={require("../../components/ui/loading-spinner.json")}
            />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              paddingBottom: config.hp("2%"),
              backgroundColor: "white",
            }}
          >
            <TransferFrom
              data={nonLoanAccounts}
              {...props}
              accountTransferFrom={payload.accountfromid}
              handleChange={handleChange}
            />

            <View
              style={{
                paddingVertical: config.hp("1%"),
                borderColor: theme.colors.faded,
                borderTopWidth: 1,
                borderBottomWidth: 1,
                flexDirection: "row",
                paddingHorizontal: config.wp("4%"),
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
            <TransferTo
              data={loanAccounts}
              {...props}
              accountTransferTo={payload.accounttoid}
              handleChange={handleChange}
            />
            <EffectiveDate
              handleChange={handleChange}
              payload={payload}
            ></EffectiveDate>
            <SubmitTransfer
              {...props}
              isSafeToTransfer={isSafeToTransfer}
              handleChange={handleChange}
              principal={payload.principal}
              frequency={payload.frequency}
              handleSubmit={handleSubmit}
              setVisibleModal={setVisibleModal}
              frequencyperiod={payload.frequencyperiod}
              toggleFrequency={toggleFrequency}
            />
          </View>
        )}
      </ScrollView>

      <Modal visible={visibleModal} animationType="fade" transparent={true}>
        <FrequencyModal
          {...props}
          setVisibleModal={setVisibleModal}
          handleChange={handleChange}
        />
      </Modal>
      <Modal visible={showFrequency} animationType="fade" transparent={true}>
        <Frequency
          toggleFrequency={toggleFrequency}
          handleChange={handleChange}
        />
      </Modal>
      <StatusHandler
        state={state}
        navigation={props.navigation}
        status={status}
        setStatus={setStatus}
      ></StatusHandler>
    </>
  );
};

export default TransferScreen;
