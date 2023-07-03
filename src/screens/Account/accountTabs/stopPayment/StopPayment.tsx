import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AnimatedLottieView from "lottie-react-native";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import BottomSheets from "../../../../components/bottomSheets/BottomSheets";
import Confirmation from "./Confirmation";
import { useAppDispatch, useAppSelector } from "../../../../store/Store";

type PayloadType = {
  name: string;
  accountId: string;
  phoneNumber: string;
  checkNumber: number;
  amount: string;
  date: string;
  payeeName: string;
  reason: string;
};

const StopPayment = ({ navigation }) => {
  const state = useAppSelector((state) => state.accounts);
  const [sheet, setSheet] = useState<string>();
  const bottomSheetRef = useRef(null);
  const dispatch = useAppDispatch();

  const [payload, setPayload] = useState<PayloadType>({
    name: undefined,
    accountId: undefined,
    phoneNumber: undefined,
    checkNumber: undefined,
    amount: undefined,
    date: undefined,
    payeeName: undefined,
    reason: undefined,
  });

  const [status, setStatus] = useState({
    disabled: true,
    showConfirmation: false,
    loading: false,
  });
  const ShowConfirmation = useCallback(() => {
    setStatus({
      ...status,
      showConfirmation: true,
    });
  }, []);

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
      setPayload({
        ...payload,
        [name]: value,
      });
      closeSheet();
    },
    [payload]
  );

  const handleSubmit = useCallback(() => {
    navigation.goBack();
  }, []);

  useEffect(() => {
    if (
      payload.name &&
      payload.phoneNumber &&
      payload.checkNumber &&
      payload.amount &&
      payload.payeeName &&
      payload.reason
    ) {
      setStatus({
        ...status,
        disabled: false,
      });
    }
  }, [payload]);

  return (
    <>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: config.wp("2%"),
          paddingVertical: config.hp("2%"),
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "500",
            color: theme.colors.primary,
          }}
        >
          Stop Payment
        </Text>
        <Text style={{ marginBottom: config.hp("4%") }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem autem,
          excepturi hic quibusdam quaerat vitae consequuntur. Distinctio
          reprehenderit
        </Text>
        {status.loading ? (
          <>
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
          </>
        ) : status.showConfirmation ? (
          <Confirmation payload={payload} handleSubmit={handleSubmit} />
        ) : (
          <>
            <View style={{ flex: 1, paddingHorizontal: config.wp("2%") }}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.text}>
                  Enter your name as it appears on your account
                </Text>
                <TextInput
                keyboardType="default"
                  onChangeText={(text) => handleChange("name", text)}
                  placeholder="Enter Name"
                  style={styles.input}
                />
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.label}>Select Account</Text>

                <TouchableOpacity
                  style={{ width: "50%" }}
                  onPress={() => toggleSheet("Accounts")}
                >
                  {payload.accountId == undefined ? (
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
                        Select Account
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
                        {payload.accountId}
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
              <View style={styles.rowContainer}>
                <Text style={styles.label}>Phone Number</Text>

                <TextInput
                  onChangeText={(text) => handleChange("phoneNumber", text)}
                  placeholder="1234567890"
                  style={styles.rowInput}
                  keyboardType={"number-pad"}
                />
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.label}>Check Number</Text>

                <TextInput
                  onChangeText={(text) => handleChange("checkNumber", text)}
                  placeholder="123456"
                  style={styles.rowInput}
                  keyboardType={"number-pad"}
                />
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.label}>Check Amount</Text>

                <TextInput
                  onChangeText={(text) => handleChange("amount", text)}
                  placeholder="0.00"
                  style={styles.rowInput}
                  keyboardType={"number-pad"}
                />
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.label}>Payee Name</Text>

                <TextInput
                  onChangeText={(text) => handleChange("payeeName", text)}
                  placeholder="Enter Name"
                  style={styles.rowInput}
                />
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.label}>Reason</Text>

                <TouchableOpacity
                  style={{ width: "50%" }}
                  onPress={() => toggleSheet("Stop Check Reason")}
                >
                  {payload.reason == undefined ? (
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
                        Select Reason
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
                        {payload.reason}
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
            </View>
            <View
              style={{
                height: config.hp("12%"),
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity
                disabled={status.disabled}
                onPress={() => ShowConfirmation()}
                style={{
                  backgroundColor: status.disabled
                    ? theme.colors.faded
                    : theme.colors.primary,
                  width: "80%",
                  marginBottom: config.hp("1%"),
                  borderRadius: 12,
                  paddingVertical: config.hp("1%"),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "white" }}
                >
                  Continue
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </KeyboardAwareScrollView>
      <BottomSheets
        bottomSheetRef={bottomSheetRef}
        sheet={sheet}
        closeSheet={closeSheet}
        handleChange={handleChange}
        attachments={[]}
      />
    </>
  );
};

export default StopPayment;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderBottomColor: theme.colors.faded,
    borderBottomWidth: 1,
    paddingHorizontal: config.wp("1%"),
    borderRadius: 7,
    height: config.hp("5%"),
  },
  inputContainer: {
    marginBottom: config.hp("2%"),
    //paddingHorizontal: config.wp("2%"),
  },
  label: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: "500",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: config.hp("2%"),
  },
  rowInput: {
    width: "50%",
    backgroundColor: "white",
    borderBottomColor: theme.colors.faded,
    borderBottomWidth: 1,
    paddingHorizontal: config.wp("1%"),
    borderRadius: 7,
    height: config.hp("5%"),
  },
  rowLabel: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: "500",
    width: "50%",
  },
  text: {
    marginBottom: config.hp("1%"),
  },
});
