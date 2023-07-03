import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LottieView from "lottie-react-native";
import { AntDesign } from "@expo/vector-icons";
import StatusHandler from "../../../../utils/StatusHandler";

import BottomSheets from "../components/bottomSheets/BottomSheets";
import AccountAlert from "../components/forms/AccountAlert";
import EventAlert from "../components/forms/EventAlert";
import SmartAlert from "../components/forms/SmartAlert";
import Confirmation from "../components/Confirmation";
import {
  AccountAlertPayload,
  AlertTypeEnum,
  ComparisonOperators,
  CreateAlertType,
  EventAlertPayload,
  initialStateType,
} from "../../../../types/alerts/alertTypes";
import { theme } from "../../../config/Theme";
import { config } from "../../../config/Config";
import { useAppDispatch, useAppSelector } from "../../../store/Store";
import { CreateAlert } from "../../../store/actionReducers/alerts";
import { formatDateYYMMDD } from "../../../../utils/utils";

const CreateAlertScreen = ({ navigation }) => {
  const state = useAppSelector((state) => state.alerts);
  const accounts = useAppSelector((state) => state.accounts);
  const [accountType, setAccountType] = useState<string>();
  const [sheet, setSheet] = useState<string>();
  const bottomSheetRef = useRef(null);
  const dispatch = useAppDispatch();

  const [payload, setPayload] = useState<CreateAlertType>({
    type: undefined,
    // comparisonOperator: {
    //   name: undefined,
    //   id: undefined,
    //   value: undefined,
    // },
    comparisonOperator: undefined,
    //threshold: undefined,
    amount: 0.0,
    toAccountId: undefined,
    fromAccountId: undefined,
    phone: false,
    text: false,
    email: false,
    alert: undefined,
    flag: 6,
    field: undefined,
    accountId: undefined,
    value: "0.00",
    accountName: undefined,
  });

  const [status, setStatus] = useState({
    loading: false,
    error: undefined,
    message: undefined,
    showConfirmation: false,
  });

  //console.log(payload);

  const closeSheet = useCallback(() => {
    setSheet(undefined);
    bottomSheetRef.current?.close();
  }, []);

  const expandSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const toggleSheet = useCallback((name: string, accountLabel: string) => {
    if (accountLabel) {
      setAccountType(accountLabel);
    }
    setSheet(name);
    expandSheet();
  }, []);

  const handleChange = useCallback(
    (name: string, value: any) => {
      if (
        name == "comparisonOperator" &&
        value == ComparisonOperators.GreaterThan
      ) {
        setPayload({
          ...payload,
          fromAccountId: payload.toAccountId,
          toAccountId: undefined,
          comparisonOperator: value,
        });
        return;
      }
      setPayload({ ...payload, [name]: value });
    },
    [payload]
  );

  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, []);

  const handleSubmit = useCallback(() => {
    setStatus({
      ...status,
      loading: true,
    });

    let accountData: AccountAlertPayload = {
      type: payload.type, //0: alerts, 1: event, 2: smartAlert
      alert: payload.alert,
      field: "balance", //"balance" |"date" | "amount" | "serial"
      comparisonOperator: payload.comparisonOperator, //"<" | ">"  | "A" | "="
      value: payload.value.toString(),
      text: payload.text,
      phone: payload.phone,
      email: payload.email,
      accountId: payload.accountId?.toString(),
      flag: 6,
    };

    let eventData: EventAlertPayload = {
      type: payload.type, //0: alerts, 1: event, 2: smartAlert
      alert: payload.alert,
      field: "date", //"balance" |"date" | "amount" | "serial"
      comparisonOperator: "A",
      value: formatDateYYMMDD(payload.startDate),
      text: payload.text,
      phone: payload.phone,
      email: payload.email,
      accountId: accounts.accounts[0].accountId.toString(),
      flag: 6,
    };
    let smartData = {
      type: payload.type, //0: alerts, 1: event, 2: smartAlert
      alert: payload.alert,
      field: "balance", //"balance" |"date" | "amount" | "serial"
      comparisonOperator: payload.comparisonOperator,
      value: payload.value.toString(),
      text: payload.text,
      phone: payload.phone,
      email: payload.email,
      accountId: payload.accountId?.toString(),
      fromAccountId:
        payload.comparisonOperator == ComparisonOperators.LessThan
          ? payload.fromAccountId?.toString()
          : payload.accountId?.toString(),
      toAccountId:
        payload.comparisonOperator == ComparisonOperators.LessThan
          ? payload.accountId?.toString()
          : payload.toAccountId?.toString(),
      amount: payload.amount,
      flag: 6,
    };

    dispatch(
      CreateAlert(
        payload.type == AlertTypeEnum.AccountAlert
          ? accountData
          : payload.type == AlertTypeEnum.EventAlert
          ? eventData
          : smartData
      )
    );
  }, [payload]);

  useEffect(() => {
    if (sheet) {
      bottomSheetRef.current?.expand();
    }
  }, [sheet]);

  useEffect(() => {
    if (state.error || state.status == "error" || state.status == true) {
      dispatch({ type: "alerts/reset" });
    }
  }, [state]);

  function handleForms(payload: CreateAlertType) {
    switch (payload.type) {
      case AlertTypeEnum.AccountAlert:
        return (
          <AccountAlert
            payload={payload}
            handleChange={handleChange}
            setSheet={setSheet}
            setAccountType={setAccountType}
          />
        );
      case AlertTypeEnum.EventAlert:
        return (
          <EventAlert
            payload={payload}
            handleChange={handleChange}
            setSheet={setSheet}
            item={undefined}
          />
        );
      case AlertTypeEnum.SmartAlert:
        return (
          <SmartAlert
            payload={payload}
            handleChange={handleChange}
            toggleSheet={toggleSheet}
            item={undefined}
          />
        );

      default:
        return;
    }
  }

  return (
    <>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
      >
        <View style={{ flex: 1 }}>
          {status.showConfirmation ? (
            <>
              <Text
                style={{
                  fontSize: 20,
                  color: theme.colors.primary,
                  fontWeight: "500",
                }}
              >
                Confirmation
              </Text>
              <Text style={{ marginBottom: config.hp("4%") }}>
                Please review the details below and confirm the information is
                correct.
              </Text>
            </>
          ) : (
            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
                color: theme.colors.primary,
                marginBottom: config.hp("4%"),
              }}
            >
              Create Alert
            </Text>
          )}
          {status?.loading ? (
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
                source={require("../../../components/ui/loading-spinner.json")}
              />
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              {status.showConfirmation ? (
                <Confirmation payload={payload} />
              ) : (
                <>
                  <View style={{ ...styles.inputContainer }}>
                    <Text style={styles.label}>Alert Type:</Text>
                    <TouchableOpacity
                      style={{ width: "50%" }}
                      onPress={() => setSheet("Alert Type")}
                    >
                      {payload.type == undefined ? (
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              color: theme.colors.fadedDark,
                            }}
                          >
                            Select Type
                          </Text>
                          <AntDesign
                            name="caretright"
                            size={24}
                            color={theme.colors.primary}
                          />
                        </View>
                      ) : (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 18,
                              color: theme.colors.primary,
                              fontWeight: "500",
                              textAlign: "right",
                            }}
                          >
                            {payload.type == AlertTypeEnum.AccountAlert
                              ? "Account Alert"
                              : payload.type == AlertTypeEnum.EventAlert
                              ? "Event Alert"
                              : "Smart Alert"}
                          </Text>
                          <AntDesign
                            name="caretright"
                            size={24}
                            color={theme.colors.primary}
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      ...styles.inputContainer,
                      marginBottom: config.hp("2%"),
                    }}
                  >
                    <Text style={styles.label}>Alert Name: </Text>
                    <TextInput
                      onChangeText={(value) => handleChange("alert", value)}
                      style={styles.input}
                      value={payload.alert}
                      placeholder={"Enter a Name"}
                      placeholderTextColor={payload.alert ? "black" : undefined}
                      keyboardAppearance="default"
                    />
                  </View>
                  <View style={{ flex: 1 }}>{handleForms(payload)}</View>
                </>
              )}

              <View
                style={{
                  alignItems: "center",
                  justifyContent: "flex-end",
                  flexDirection: "column",
                  height: config.hp("12%"),
                }}
              >
                {status.showConfirmation ? (
                  <>
                    <TouchableOpacity
                      onPress={handleSubmit}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "80%",
                        backgroundColor: theme.colors.primary,
                        borderRadius: 7,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          color: "white",
                          paddingVertical: config.hp(".5%"),
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        Add Alert
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        setStatus({
                          ...status,
                          showConfirmation: false,
                        })
                      }
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          color: "black",
                          paddingVertical: config.hp(".5%"),
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        Back
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <TouchableOpacity
                      onPress={() =>
                        setStatus({
                          ...status,
                          showConfirmation: true,
                        })
                      }
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "80%",
                        backgroundColor: theme.colors.primary,
                        borderRadius: 7,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          color: "white",
                          paddingVertical: config.hp(".5%"),
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        Continue
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleCancel}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          color: "black",
                          paddingVertical: config.hp(".5%"),
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        Back
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
      <BottomSheets
        handleChange={handleChange}
        closeSheet={closeSheet}
        accountType={accountType}
        payload={payload}
        bottomSheetRef={bottomSheetRef}
        sheet={sheet}
      ></BottomSheets>

      <StatusHandler
        navigation={navigation}
        state={state}
        status={status}
        setStatus={setStatus}
        hideSuccess={false}
        deleteItem={undefined}
      ></StatusHandler>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: config.wp("4%"),
    paddingVertical: config.hp("2%"),
    //flex: 1,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: config.wp("1%"),
    borderRadius: 7,
    borderColor: theme.colors.faded,
    borderWidth: 1,
    height: "100%",
    width: "50%",
  },
  inputContainer: {
    width: "100%",
    height: config.hp("5%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: config.hp("1%"),
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    //marginBottom: 5,
    width: "50%",
    color: theme.colors.primary,
  },
});

export default CreateAlertScreen;
