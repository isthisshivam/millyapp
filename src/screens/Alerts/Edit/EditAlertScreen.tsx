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
import { Ionicons, AntDesign } from "@expo/vector-icons";
import StatusHandler from "../../../../utils/StatusHandler";
import BottomSheets from "../components/bottomSheets/BottomSheets";
import AccountAlert from "../components/forms/AccountAlert";
import EventAlert from "../components/forms/EventAlert";
import SmartAlert from "../components/forms/SmartAlert";
import Confirmation from "../components/Confirmation";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { useAppDispatch, useAppSelector } from "../../../store/Store";
import {
  CreateAlertType,
  ComparisonOperators,
  AlertTypeEnum,
} from "../../../../types/alerts/alertTypes";
import { DeleteAlert, UpdateAlert } from "../../../store/actionReducers/alerts";
import { formatDateYYMMDD } from "../../../../utils/utils";

const EditAlertScreen = ({ navigation, route }) => {
  const state = useAppSelector((state) => state.alerts);
  const [accountType, setAccountType] = useState<string>();
  const [sheet, setSheet] = useState<string>();
  const [step, setStep] = useState<number>(0);
  const bottomSheetRef = useRef(null);
  const dispatch = useAppDispatch();

  const sequenceNumber = route.params.sequenceNumber;
  let array = state.alerts.filter(
    (item) => item.sequenceNumber == sequenceNumber
  );
  let item = array[0];

  const [payload, setPayload] = useState<CreateAlertType>({
    type: undefined,
    comparisonOperator: undefined,
    amount: 0,
    toAccountId: undefined,
    fromAccountId: undefined,
    phone: false,
    text: false,
    email: false,
    alert: undefined,
    flag: 6,
    field: undefined,
    accountId: undefined,
    value: undefined,
    accountName: undefined,
    startDate: undefined,
  });

  const [status, setStatus] = useState({
    loading: false,
    error: undefined,
    message: undefined,
    showConfirmation: false,
    showDelete: false,
  });

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

  const toggleDelete = useCallback(() => {
    setStatus({
      ...status,
      showDelete: true,
    });
  }, [status]);

  const handleDelete = useCallback(() => {
    dispatch(DeleteAlert({ alertId: sequenceNumber, type: payload.type }));
  }, [payload]);

  const handleSubmit = useCallback(() => {
    setStatus({
      ...status,
      loading: true,
    });

    let accountData: CreateAlertType = {
      type: payload.type, //0: alerts, 1: event, 2: smartAlert
      alert: payload.alert,
      field: "balance", //"balance" |"date" | "amount" | "serial"
      comparisonOperator: payload.comparisonOperator, //"<" | ">"  | "A" | "="
      value: payload.value,
      text: payload.text,
      phone: payload.phone,
      email: payload.email,
      accountId: payload.accountId?.toString(),
      flag: 6,
      accountName: "",
      alertId: sequenceNumber,
    };

    let eventData = {
      sequenceNumber: sequenceNumber,
      type: payload.type, //0: alerts, 1: event, 2: smartAlert
      alert: payload.alert,
      field: "date", //"balance" |"date" | "amount" | "serial"
      comparisonOperator: "A",
      value: formatDateYYMMDD(payload.startDate),
      text: payload.text,
      phone: payload.phone,
      email: payload.email,
      accountId: "1817853119",
      flag: 6,
      message: "",
      alertId: sequenceNumber,
    };
    let smartData = {
      type: payload.type, //0: alerts, 1: event, 2: smartAlert
      alert: payload.alert,
      field: "balance", //"balance" |"date" | "amount" | "serial"
      comparisonOperator: payload.comparisonOperator,
      value: payload.value,
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
      alertId: sequenceNumber,
    };

    switch (payload.type) {
      case AlertTypeEnum.AccountAlert:
        dispatch(UpdateAlert(accountData));
        return;

      case AlertTypeEnum.EventAlert:
        dispatch(UpdateAlert(eventData));
        return;

      case AlertTypeEnum.SmartAlert:
        dispatch(UpdateAlert(smartData));
        return;
    }
  }, [payload]);

  useEffect(() => {
    if (item) {
      if (
        item.smartAlertInformation &&
        item.smartAlertInformation[0] !== null
      ) {
        setPayload({
          ...item,
          phone: item.transmissionType == "PHONE" ? true : false,
          text: item.transmissionType == "TEXT" ? true : false,
          email: item.transmissionType == "EMAIL" ? true : false,
          comparisonOperator:
            item.comparisonOperator == "<"
              ? ComparisonOperators.LessThan
              : item.comparisonOperator == ">"
              ? ComparisonOperators.GreaterThan
              : ComparisonOperators.NoComparison,
          type:
            item.type == "A"
              ? AlertTypeEnum.AccountAlert
              : item.type == "E"
              ? AlertTypeEnum.EventAlert
              : item.type == "S"
              ? AlertTypeEnum.SmartAlert
              : undefined,
          flag: 6,
          field: item.field == "balance" ? "balance" : item.field,
          accountId: item.accountId.toString(),
          startDate: item.requestDate,
          value: item.value,
          amount:
            item.type == "S"
              ? item.smartAlertInformation[0]?.amount
              : undefined,
          fromAccountId:
            item.type == "S"
              ? item.smartAlertInformation[0]?.fromAccountId
              : undefined,
          toAccountId:
            item.type == "S"
              ? item.smartAlertInformation[0]?.toAccountId
              : undefined,
        });
        return;
      }
      setPayload({
        ...item,
        phone: item.transmissionType == "PHONE" ? true : false,
        text: item.transmissionType == "TEXT" ? true : false,
        email: item.transmissionType == "EMAIL" ? true : false,
        comparisonOperator:
          item.comparisonOperator == "<"
            ? ComparisonOperators.LessThan
            : item.comparisonOperator == ">"
            ? ComparisonOperators.GreaterThan
            : ComparisonOperators.NoComparison,
        type:
          item.type == "A"
            ? AlertTypeEnum.AccountAlert
            : item.type == "E"
            ? AlertTypeEnum.EventAlert
            : item.type == "S"
            ? AlertTypeEnum.SmartAlert
            : undefined,
        flag: 6,
        field: item.field == "balance" ? "balance" : item.field,
        accountId: item.accountId.toString(),
        startDate: item.requestDate,
        value: item.value,
        // amount:
        //   item.type == "S" ? item.smartAlertInformation[0]?.amount : undefined,
        // fromAccountId:
        //   item.type == "S"
        //     ? item.smartAlertInformation[0]?.fromAccountId
        //     : undefined,
        // toAccountId:
        //   item.type == "S"
        //     ? item.smartAlertInformation[0]?.toAccountId
        //     : undefined,
      });
    }
  }, [item]);

  useEffect(() => {
    if (sheet) {
      bottomSheetRef.current?.expand();
    }
  }, [sheet]);
  //console.log(item);

  const handleForms = useCallback(() => {
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
            item={item}
            handleChange={handleChange}
            setSheet={setSheet}
            //   setAccountType={setAccountType}
          />
        );
      case AlertTypeEnum.SmartAlert:
        return (
          <SmartAlert
            payload={payload}
            item={item}
            handleChange={handleChange}
            toggleSheet={toggleSheet}
          />
        );

      default:
        return;
    }
  }, [item, payload]);

  useEffect(() => {
    if (state.error || state.status == "error" || state.status == true) {
      dispatch({ type: "alerts/reset" });
    }
  }, [state]);

  return (
    <>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
      >
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            marginBottom: config.hp("4%"),
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: theme.colors.primary,
            }}
          >
            Update Alert
          </Text>
          <Ionicons
            onPress={toggleDelete}
            name="trash-outline"
            size={28}
            color="red"
          />
        </View>
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
        ) : status.showConfirmation ? (
          <>
            <Confirmation payload={payload} />
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
                  Update Alert
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
            </View>
          </>
        ) : (
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
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
                          : payload.type == AlertTypeEnum.SmartAlert
                          ? "Smart Alert"
                          : item.type == "A"
                          ? "Account Alert"
                          : item.type == "E"
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
                  value={payload.alert ? payload.alert : item.alert}
                  placeholderTextColor={
                    payload?.alert || item.alert ? "black" : undefined
                  }
                  keyboardAppearance="default"
                  keyboardType="default"
                />
              </View>
              {handleForms()}
            </>

            <View
              style={{
                alignItems: "center",
                justifyContent: "flex-end",
                flexDirection: "column",
                // flex: 1,
              }}
            >
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
            </View>
          </View>
        )}
      </KeyboardAwareScrollView>
      <BottomSheets
        sheet={sheet}
        handleChange={handleChange}
        closeSheet={closeSheet}
        accountType={accountType}
        payload={payload}
        bottomSheetRef={bottomSheetRef}
      ></BottomSheets>

      <StatusHandler
        navigation={navigation}
        state={state}
        status={status}
        setStatus={setStatus}
        hideSuccess={false}
        deleteItem={handleDelete}
      ></StatusHandler>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: config.wp("4%"),
    paddingVertical: config.hp("2%"),
    flex: 1,
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

export default EditAlertScreen;
