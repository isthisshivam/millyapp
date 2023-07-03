import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import * as Device from "expo-device";

import { NewMerchant } from "../../../../store/actions/MerchantActions";
import StatusHandler from "../../../../../utils/StatusHandler";
import BottomSheets from "../../../../components/bottomSheets/BottomSheets";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

const AddMerchant = ({ navigation }) => {
  const state = useSelector((state) => state.merchants);
  const [sheet, setSheet] = useState();
  const dispatch = useDispatch();
  const bottomSheetRef = useRef(null);

  const [payload, setPayload] = useState({
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    contact: "",
    merchantAccount: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    error: undefined,
    meessage: undefined,
    disable: true,
  });

  const closeSheet = useCallback(() => {
    setSheet(undefined);
    bottomSheetRef.current?.close();
  }, []);

  const expandSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleChange = (name, value) => {
    setPayload({ ...payload, [name]: value });
  };

  ///REQUIRED FIELDS ENTERED? IF NOT DISABLE BUTTON
  useEffect(() => {
    if (
      payload.name !== "" &&
      payload.address1 !== "" &&
      payload.city !== "" &&
      payload.zip !== "" &&
      payload.account !== "" &&
      payload.state !== "" &&
      payload.contact !== "" &&
      payload.merchantAccount !== ""
    ) {
      setStatus({
        ...status,
        disable: false,
      });
    } else {
      setStatus({
        ...status,
        disable: true,
      });
    }
  }, [payload]);

  //const stateAbbrv = abbrState(payload.addressState, "abbr");

  const submit = () => {
    setStatus({
      ...status,
      loading: true,
    });
    let requestData = {
      merchantName: payload.name,
      address1: payload.address1,
      address2: payload.address2,
      city: payload.city,
      state: payload.state,
      zip: payload.zip,
      contact: payload.contact,
      merchantAccount: payload.merchantAccount,
    };

    dispatch(NewMerchant(requestData));
    setPayload({
      name: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      contact: "",
      merchantAccount: "",
    });
  };

  function cancel() {
    navigation.goBack();
  }

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: config.wp("2%"),
        paddingVertical: config.hp("2%"),
      }}
    >
      <Text style={styles.title}>Add Merchant</Text>

      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.bodyContainer}
      >
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
              <LottieView
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
        ) : (
          <View style={{ flex: 1 }}>
            <View style={styles.inputContainer}>
              <TextInput
                value={payload.name}
                keyboardType={"default"}
                autoCompleteType={"name"}
                style={styles.input}
                placeholder="Merchant Name"
                onChangeText={(value) => handleChange("name", value)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                value={payload.address1}
                keyboardType={"default"}
                autoCompleteType={"street-address"}
                style={styles.input}
                placeholder="Address Line 1"
                onChangeText={(value) => handleChange("address1", value)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                value={payload.address2}
                keyboardType={"default"}
                autoCompleteType={"street-address"}
                style={styles.input}
                placeholder="Address Line 2"
                onChangeText={(value) => handleChange("address2", value)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                value={payload.city}
                keyboardType={"default"}
                autoCompleteType={"name"}
                style={styles.input}
                placeholder="City"
                onChangeText={(value) => handleChange("city", value)}
              />
            </View>
            <View style={styles.twoInputContainer}>
              <TouchableOpacity
                style={styles.inputExample2}
                onPress={() => {
                  setSheet("State"), expandSheet();
                }}
              >
                <Text
                  numberOfLines={1}
                  style={
                    payload?.state !== ""
                      ? [styles.stateTitle, styles.stateTitleSelected]
                      : styles.stateTitle
                  }
                >
                  {payload?.state !== "" ? payload.state : "State"}
                </Text>
              </TouchableOpacity>
              <TextInput
                value={payload.zip}
                keyboardType={"number-pad"}
                style={styles.input2}
                placeholder="Zip"
                onChangeText={(value) => handleChange("zip", value)}
              />
            </View>

            <View
              behavior={Device.osName === "ios" ? "padding" : ""}
              style={styles.inputContainer}
            >
              <TextInput
                value={payload.account}
                keyboardType={"number-pad"}
                style={styles.input}
                placeholder="Account Number"
                onChangeText={(value) => handleChange("merchantAccount", value)}
              />
            </View>

            <View
              behavior={Device.osName === "ios" ? "padding" : ""}
              style={styles.inputContainer}
            >
              <TextInput
                value={payload.contact}
                keyboardType={"number-pad"}
                style={styles.input}
                placeholder="Contact Info "
                onChangeText={(value) => handleChange("contact", value)}
              />
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity
                disabled={status.disable}
                style={{
                  backgroundColor: status.disable
                    ? theme.colors.faded
                    : theme.colors.primary,
                  width: "80%",
                  borderRadius: 12,
                  paddingVertical: config.hp("1%"),
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: config.hp("1%"),
                }}
                onPress={submit}
              >
                <Text
                  style={{ color: "white", fontSize: 16, fontWeight: "500" }}
                >
                  Add Merchant
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cancel}>
                <Text style={{ fontSize: 16 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAwareScrollView>
      <StatusHandler
        state={state}
        status={status}
        navigation={navigation}
        setStatus={setStatus}
      />
      <BottomSheets
        bottomSheetRef={bottomSheetRef}
        sheet={sheet}
        closeSheet={closeSheet}
        handleChange={handleChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: config.hp("2.5%"),
    textAlign: "left",
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "capitalize",
    marginBottom: config.hp("4%"),
    color: theme.colors.primary,
  },

  saveTextSafe: {
    color: theme.colors.white,
    fontSize: config.hp("2.25%"),
    fontWeight: "bold",
  },
  bodyContainer: {
    paddingHorizontal: config.wp("4%"),
    justifyContent: "space-evenly",
    flex: 1,
  },
  inputContainer: {
    paddingVertical: config.hp(".75%"),
    marginBottom: config.hp("1%"),
  },
  twoInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: config.hp(".75%"),
    marginBottom: config.hp("1%"),
  },
  input: {
    paddingLeft: config.wp(".5%"),
    paddingVertical: config.hp(".75%"),
    fontSize: config.hp("2.1%"),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary,
  },
  input2: {
    width: "50%",
    paddingLeft: config.wp(".5%"),
    paddingVertical: config.hp(".5%"),
    fontSize: config.hp("2.1%"),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary,
  },
  inputExample2: {
    width: "40%",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary,
    paddingLeft: config.wp(".5%"),
    fontSize: config.hp("2.05%"),
  },
  stateTitle: {
    color: theme.colors.fade5,
    fontSize: config.hp("2.1%"),
  },
  stateTitleSelected: {
    color: theme.colors.black,
  },
});

export default AddMerchant;
