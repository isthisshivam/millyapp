import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AnimatedLottieView from "lottie-react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import CurrencyInput from "react-native-currency-input";
import BottomSheets from "../../../../components/bottomSheets/BottomSheets";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import StatusHandler from "../../../../../utils/StatusHandler";
import Carousel from "../../../../components/Carousel/Carousel";
import Confirmation from "./Confirmation";
import EffectiveDate from "../../../../components/EffectiveDate";
import AddExternalAccount from "../components/AddExternalAccount";
import {
  DeleteExternalAccountPayload,
  ExternalPayload,
  SavedAccount,
} from "../../../../../types/transfer/types";
import { useAppDispatch, useAppSelector } from "../../../../store/Store";
import { formatDateYYMMDD } from "../../../../../utils/utils";
import { OneTimeACH } from "../../../../store/actions/CommercialActions";
import { DeleteExternalAcct } from "../../../../store/actionReducers/transfers";

const Receiving = ({ navigation }) => {
  const state = useAppSelector((state) => state.commercial);
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
    isMoneySend: false,
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
    setShowForm(false);
  }, []);

  function toggleAccounts() {
    setSheet("External Accounts");
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
      isMoneySend: false,
      isRetail: true,
    };

    dispatch(OneTimeACH(data));
  }

  useEffect(() => {
    if (
      payload.destinationAccounts[0]?.aba &&
      payload.destinationAccounts[0]?.confirmRouting &&
      payload.destinationAccounts[0]?.accountNumber &&
      payload.destinationAccounts[0]?.confirmAccount &&
      payload.destinationAccounts[0].accountNumber &&
      payload.destinationAccounts[0].confirmAccount &&
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
                To
              </Text>
              <Text style={{ width: "100%", marginBottom: config.hp("2%") }}>
                Select the account you would like to receive money to
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
              {/* 
              <TextInput
                keyboardType="number-pad"
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
                activeDate={payload.startDate}
                handleChange={handleChange}
                label="Effective Date"
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
              label={"From"}
            />

            <View
              style={{
                //height: config.hp("12%"),
                alignItems: "center",
                justifyContent: "flex-end",
                paddingBottom: 12,
                flex: 1,
                marginBottom: config.hp("4%"),
              }}
            >
              <TouchableOpacity
                disabled={status.disabled}
                onPress={handleNext}
                style={{
                  width: "75%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: status.disabled
                    ? theme.colors.faded
                    : theme.colors.primary,
                  paddingVertical: config.hp("1%"),
                  borderRadius: 12,
                  marginBottom: config.hp("1%"),
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
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        style={{
          flex: 1,
          paddingHorizontal: config.wp("4%"),
          paddingVertical: config.hp("2%"),
        }}
        contentContainerStyle={{
          flexGrow: 1,
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
          Receive Money
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
              source={require("../../../../components/ui/loading-spinner.json")}
            />
          </View>
        ) : (
          <>{handleStep()}</>
        )}
      </KeyboardAwareScrollView>

      <StatusHandler
        state={state}
        status={status}
        setStatus={setStatus}
        navigation={navigation}
        hideSuccess={false}
        deleteItem={DeleteSavedAcct}
      />
      <BottomSheets
        closeSheet={closeSheet}
        handleChange={handleChange}
        sheet={sheet}
        bottomSheetRef={bottomSheetRef}
        attachments={null}
        toggleDelete={toggleDelete}
      />
    </View>
  );
};

export default Receiving;
