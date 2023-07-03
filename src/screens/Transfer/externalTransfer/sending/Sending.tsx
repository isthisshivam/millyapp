import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector, useDispatch } from "react-redux";
import AnimatedLottieView from "lottie-react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import BottomSheets from "../../../../components/bottomSheets/BottomSheets";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import StatusHandler from "../../../../../utils/StatusHandler";
import Carousel from "../../../../components/Carousel/Carousel";
import Confirmation from "./Confirmation";
import EffectiveDate from "../../../../components/EffectiveDate";
import { OneTimeACH } from "../../../../store/actions/CommercialActions";
import { useAppDispatch, useAppSelector } from "../../../../store/Store";
import { formatDateYYMMDD } from "../../../../../utils/utils";
import globalStyles from "../../../../globalStyles/styles";
import AddExternalAccount from "../components/AddExternalAccount";
import {
  DeleteExternalAccountPayload,
  ExternalPayload,
  SavedAccount,
} from "../../../../../types/transfer/types";
import CurrencyInput from "react-native-currency-input";
import {
  DeleteExternalAcct,
  ExternalTransfer,
  reset,
} from "../../../../store/actionReducers/transfers";

const Sending = ({ navigation }) => {
  const state = useAppSelector((state) => state.transferHistory);
  const accounts = useAppSelector((state) => state.accounts.accounts);
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(0);
  const [sheet, setSheet] = useState(undefined);
  const bottomSheetRef = useRef(null);
  const dispatch = useAppDispatch();

  const [payload, setPayload] = useState<ExternalPayload>({
    debitAccountId: undefined,
    effectiveDate: undefined,
    isAdminUser: false,
    isMoneySend: true,
    isRetail: true,
    destinationAccounts: [
      {
        aba: undefined,
        amount: 0.0,
        accountNumber: undefined,
        confirmAccount: undefined,
        confirmRouting: undefined,
        alias: undefined,
      },
    ],
  });

  const [status, setStatus] = useState({
    loading: false,
    error: undefined,
    message: undefined,
    disabled: true,
    showDelete: false,
  });

  const handleChange = useCallback(
    (name: string, value: any) => {
      closeSheet();
      switch (name) {
        case "accountfromid":
          setPayload({
            ...payload,
            debitAccountId: value,
          });
          return;
        case "startDate":
          setPayload({
            ...payload,
            effectiveDate: value,
            startDate: value,
          });
          return;

        case "amount":
          setPayload({
            ...payload,
            destinationAccounts: [
              {
                ...payload.destinationAccounts[0],
                amount: Number(value),
              },
            ],
          });
          return;
        case "alias":
          setPayload({
            ...payload,
            destinationAccounts: [
              {
                ...payload.destinationAccounts[0],
                alias: value,
              },
            ],
          });
          return;
        case "routingNum":
          setPayload({
            ...payload,
            destinationAccounts: [
              {
                ...payload.destinationAccounts[0],
                aba: value,
              },
            ],
          });
          return;

        case "confirmRouting":
          setPayload({
            ...payload,
            destinationAccounts: [
              {
                ...payload.destinationAccounts[0],
                confirmRouting: value,
              },
            ],
          });
          return;

        case "accountNum":
          setPayload({
            ...payload,
            destinationAccounts: [
              {
                ...payload.destinationAccounts[0],
                accountNumber: value,
              },
            ],
          });
          return;

        case "confirmAccount":
          setPayload({
            ...payload,
            destinationAccounts: [
              {
                ...payload.destinationAccounts[0],
                confirmAccount: value,
              },
            ],
          });
          return;
        case "savedAccount":
          setShowForm(false);
          setPayload({
            ...payload,
            destinationAccounts: [
              {
                ...payload.destinationAccounts[0],
                accountNumber: value.accountNumber,
                aba: value.routingNumber,
                alias: value.alias,
                confirmAccount: value.accountNumber,
                confirmRouting: value.routingNumber,
              },
            ],
          });
          return;

        default:
          setPayload({
            ...payload,
            [name]: value,
          });
          closeSheet();
          return;
      }
    },
    [payload]
  );

  // callbacks
  const handleExpand = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const closeSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);
  const toggleDelete = useCallback(() => {
    setShowForm(true);
    setStatus({
      ...status,
      showDelete: true,
    });
  }, []);

  const DeleteSavedAcct = useCallback((item: SavedAccount) => {
    let data: DeleteExternalAccountPayload = {
      aliases: [item],
    };
    dispatch(DeleteExternalAcct(data));
    closeSheet();
  }, []);

  function toggleAccounts(name: string) {
    setSheet(name);
    handleExpand();
  }

  function handleBack() {
    setStep(0);
  }
  function handleNext() {
    setStep(1);
  }
  function handleCancel() {
    navigation.goBack();
  }

  function handleSubmit() {
    setStatus({
      ...status,
      loading: true,
    });

    let data: ExternalPayload = {
      effectiveDate: formatDateYYMMDD(payload.effectiveDate),
      destinationAccounts: payload.destinationAccounts,
      debitAccountId: payload.debitAccountId.toString(),
      isAdminUser: false,
      isMoneySend: true,
      isRetail: true,
    };

    dispatch(ExternalTransfer(data));
  }

  useEffect(() => {
    if (
      payload.destinationAccounts[0]?.aba &&
      payload.destinationAccounts[0]?.confirmRouting &&
      payload.destinationAccounts[0]?.accountNumber &&
      payload.destinationAccounts[0]?.confirmAccount &&
      payload.effectiveDate &&
      payload.debitAccountId
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
    if (state.status == "Error") {
      dispatch(reset());
      setStatus({
        ...status,
        loading: false,
        error: true,
      });
    }

    if (state.status == true) {
      dispatch(reset());
      setStatus({
        ...status,
        loading: false,
      });
    }
  }, [state]);

  function handleStep() {
    switch (step) {
      case 0:
        return (
          <>
            <View style={{ borderBottomWidth: 1 }}>
              <Text
                style={{
                  width: "100%",
                  fontSize: 18,
                  color: theme.colors.primary,
                  fontWeight: "500",
                  marginBottom: config.hp(".5%"),
                }}
              >
                From
              </Text>
              <Text style={{ width: "100%", marginBottom: config.hp("2%") }}>
                Select the account you would like to transfer from
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: config.hp("4%"),
                  height: config.hp("24%"),
                }}
              >
                <Carousel
                  items={accounts}
                  navigation={navigation}
                  type={"account-transfer-from"}
                  handleChange={handleChange}
                  accountTransferFrom={payload.debitAccountId}
                />
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: config.hp("3%"),
                borderBottomWidth: 1,
                marginBottom: config.hp("2%"),
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: theme.colors.primary,
                  fontWeight: "500",
                }}
              >
                Amount:
              </Text>
              <CurrencyInput
                onChangeValue={(value) => handleChange("amount", value)}
                keyboardType="decimal-pad"
                //onChangeText={(value) => handleChange("amount", value)}
                value={Number(payload.destinationAccounts[0]?.amount)}
                prefix="$"
                delimiter=","
                separator="."
                precision={2}
                minValue={0}
                style={{
                  width: "50%",
                  borderRadius: 7,
                  backgroundColor: "white",
                  height: config.hp("4%"),
                  paddingHorizontal: config.wp("1%"),
                  borderWidth: 1,
                  borderColor: theme.colors.faded,
                }}
                // placeholder={"$000.00"}
                // placeholderTextColor={payload.amount ? "black" : undefined}
              />
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: config.hp(".8%"),
                borderBottomWidth: 1,
                marginBottom: config.hp("3%"),
              }}
            >
              <EffectiveDate
                handleChange={handleChange}
                activeDate={payload.startDate}
                label={"Effective Date"}
              ></EffectiveDate>
              {/* <TextInput
                onChangeText={(text) => handleChange("amount", text)}
                placeholder="123456789"
                style={{
                  width: "50%",
                  borderRadius: 7,
                  backgroundColor: "white",
                  height: config.hp("4%"),
                  paddingHorizontal: config.wp("1%"),
                  borderWidth: 1,
                  borderColor: theme.colors.faded,
                }}
              ></TextInput> */}
            </View>

            <AddExternalAccount
              payload={payload}
              handleChange={handleChange}
              toggleAccounts={toggleAccounts}
              showForm={showForm}
              setShowForm={setShowForm}
              label={"To"}
            />
            <View style={globalStyles.submitButtonContainer}>
              <TouchableOpacity
                disabled={status.disabled}
                onPress={handleNext}
                style={{
                  ...globalStyles.submitButton,
                  backgroundColor: status.disabled
                    ? theme.colors.faded
                    : theme.colors.primary,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 16, fontWeight: "500" }}
                >
                  Continue
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleCancel}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </>
        );

      case 1:
        return (
          <Confirmation
            handleBack={handleBack}
            payload={payload}
            handleSubmit={handleSubmit}
          ></Confirmation>
        );

      default:
        return;
    }
  }

  return (
    <>
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View
          style={{
            paddingVertical: config.hp("2%"),
            paddingHorizontal: config.wp("2%"),
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: theme.colors.primary,
              fontWeight: "bold",
            }}
          >
            External Transfers
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              marginBottom: config.hp("1.5%"),
              color: theme.colors.primary,
              //marginBottom: config.hp("2%"),
            }}
          >
            Send Money Out
          </Text>
        </View>
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
              source={require("../../../../components/ui/loading-spinner.json")}
            />
          </View>
        ) : (
          <View style={{ flex: 1, paddingHorizontal: config.wp("4%") }}>
            {handleStep()}
          </View>
        )}
      </KeyboardAwareScrollView>

      <StatusHandler
        state={state}
        status={status}
        setStatus={setStatus}
        navigation={navigation}
        deleteItem={DeleteSavedAcct}
        hideSuccess={false}
      />
      <BottomSheets
        closeSheet={closeSheet}
        handleChange={handleChange}
        sheet={sheet}
        bottomSheetRef={bottomSheetRef}
        attachments={[]}
        toggleDelete={toggleDelete}
      />
    </>
  );
};

export default Sending;
