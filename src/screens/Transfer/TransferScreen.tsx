import React, { useState, useEffect, useRef, useCallback } from "react";
import { ScrollView, View, Modal, TouchableOpacity, Text } from "react-native";
import LottieView from "lottie-react-native";
import CurrencyInput from "react-native-currency-input";
import { SendTransfer } from "../../store/actions/TransferActions";
import ButtonContainer from "./buttonContainer/ButtonContainer";
import TransferFrom from "./transferComponents/transferFrom/TransferFrom";
import TransferTo from "./transferComponents/transferTo/TransferTo";
import SubmitTransfer from "./transferComponents/submitTransfer/SubmitTransfer";
import StatusHandler from "../../../utils/StatusHandler";
import BottomSheets from "../../components/bottomSheets/BottomSheets";
import { theme } from "../../config/Theme";
import { config } from "../../config/Config";
import { useAppDispatch, useAppSelector } from "../../store/Store";
import { FrequencyEnum, TransferType } from "../../../types/transfer/types";

type Props = {
  navigation: {
    goBack: () => void;
    navigate: (route: string, params: any) => void;
  };
};

const TransferScreen = ({ navigation }: Props) => {
  const accounts = useAppSelector((state) => state.accounts.accounts);
  const state = useAppSelector((state) => state.transfers);
  const nonLoanAccounts = accounts?.filter((item, i) => item.isLoan == false);
  const loanAccounts = accounts?.filter((item, i) => item.isLoan == true);
  const [sheet, setSheet] = useState<string>();
  const bottomSheetRef = useRef(null);
  const scrollViewRef = useRef(null);
  const dispatch = useAppDispatch();

  const [payload, setPayload] = useState<TransferType>({
    frequency: 1, //number of payments
    frequencyperiod: FrequencyEnum.once, //weekly, bi-weekly, monthly, etc
    amount: 0,
    startdate: "", //StartDate
    accounttoid: undefined,
    accountfromid: undefined,
    principal: false,
    intereset: false,
    condition: undefined, //nnumofpayments, maxamount, enddate,
  });

  const [status, setStatus] = useState({
    loading: false,
    error: undefined,
    message: undefined,
    showError: false,
    disabled: true,
  });

  const closeSheet = useCallback(() => {
    setSheet(undefined);
    bottomSheetRef.current?.close();
  }, []);

  const expandSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const toggleSheet = useCallback((name: string) => {
    setSheet(name);
    expandSheet();
  }, []);

  const handleChange = useCallback(
    (name: string, value: any) => {
      if (name == "startDate") {
        setPayload({
          ...payload,
          startdate: value,
        });
        return;
      }

      setPayload({ ...payload, [name]: value });
    },
    [payload]
  );

  //use Effect for validation
  useEffect(() => {
    if (
      payload.accounttoid !== undefined &&
      payload.accountfromid !== undefined &&
      payload.amount > 0 &&
      payload.accountfromid !== payload.accounttoid
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

  const handleScreenChange = useCallback(() => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
  }, [scrollViewRef]);

  const handleSubmit = () => {
    if (status.disabled == false) {
      setStatus({
        ...status,
        loading: true,
      });

      dispatch(SendTransfer(payload));
    }
  };
  //console.log(payload);
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
        navigation={navigation}
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
              navigation={navigation}
              handleChange={handleChange}
              accountTransferFrom={payload.accountfromid}
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
              navigation={navigation}
              accountTransferTo={payload.accounttoid}
              handleChange={handleChange}
            />

            <SubmitTransfer
              status={status}
              handleChange={handleChange}
              principal={payload.principal}
              frequency={payload.frequency}
              handleSubmit={handleSubmit}
              frequencyperiod={payload.frequencyperiod}
              toggleSheet={toggleSheet}
              payload={payload}
            />
          </View>
        )}
      </ScrollView>

      <StatusHandler
        state={state}
        navigation={navigation}
        status={status}
        setStatus={setStatus}
        hideSuccess={false}
        deleteItem={null}
      ></StatusHandler>
      <BottomSheets
        handleChange={handleChange}
        closeSheet={closeSheet}
        bottomSheetRef={bottomSheetRef}
        sheet={sheet}
        attachments={null}
      ></BottomSheets>
    </>
  );
};

export default TransferScreen;
