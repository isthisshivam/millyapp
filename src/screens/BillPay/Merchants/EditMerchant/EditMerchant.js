import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import LottieView from "lottie-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import * as Device from "expo-device";
import { Update_Merchant } from "../../../../store/actions/MerchantActions";
import BottomSheets from "../../../../components/bottomSheets/BottomSheets";
import StatusHandler from "../../../../../utils/StatusHandler";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

const EditMerchant = ({ navigation, route: { params } }) => {
  const state = useSelector((state) => state.merchants);
  const [sheet, setSheet] = useState();
  const { merchantAccount } = params;

  const merchantArray = state?.merchants?.filter(
    (item) => item.merchantAccount == merchantAccount
  );
  const merchant = merchantArray[0];
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

  //Input chnage handler
  const handleChange = (name, value) => {
    setPayload({ ...payload, [name]: value });
  };
  //Required fields entered? disable btn if not
  useEffect(() => {
    if (
      payload.name !== "" &&
      payload.address1 !== "" &&
      payload.city !== "" &&
      payload.zip !== "" &&
      payload.account !== "" &&
      payload.state !== "" &&
      payload.contact !== ""
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

  //console.log(payload);

  const submit = () => {
    setStatus({
      ...status,
      loading: true,
    });
    let data = {
      merchantName: payload.name,
      address1: payload.address1,
      address2: payload.address2,
      city: payload.city,
      state: payload.state,
      zip: payload.zip,
      contact: payload.contact,
      merchantAccount: payload.merchantAccount,
    };

    dispatch(Update_Merchant(data));
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

  const cancel = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setPayload({
      ...payload,
      ...merchant,
      name: merchant.merchantName,
    });
  }, [merchant]);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: config.wp("4%"),
        paddingVertical: config.hp("2%"),
      }}
    >
      <Text style={styles.title}>Edit Merchant </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginBottom: config.hp("2%"),
        }}
      >
        <Text style={{ fontSize: 18 }}>Merchant Account:</Text>
        <Text style={{ fontSize: 18 }}>{merchant.merchantAccount}</Text>
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
      ) : (
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.bodyContainer}
        >
          <View style={{ flex: 1 }}>
            <View style={styles.inputContainer}>
              <TextInput
                value={payload.merchantName}
                keyboardType={"default"}
                autoCompleteType={"name"}
                style={styles.input}
                placeholder="Merchant Name"
                onChangeText={(value) => handleChange("merchantName", value)}
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
                keyboardType={"number-pad"}
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
                  {payload.state !== "" ? payload.state : "State"}
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
              behavior={Device.osName == "ios" ? "padding" : ""}
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
        </KeyboardAwareScrollView>
      )}
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

  bodyContainer: {
    flex: 1,
  },
  inputContainer: {
    paddingVertical: config.hp(".75%"),
  },
  twoInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: config.hp(".75%"),
  },
  input: {
    paddingLeft: config.wp(".5%"),
    paddingVertical: config.hp(".75%"),
    fontSize: config.hp("2.1%"),
    borderBottomWidth: config.hp(".2%"),
    borderBottomColor: theme.colors.primary,
  },
  input2: {
    width: "50%",
    paddingLeft: config.wp(".5%"),
    paddingVertical: config.hp(".5%"),
    fontSize: config.hp("2.1%"),
    borderBottomWidth: config.hp(".2%"),
    borderBottomColor: theme.colors.primary,
  },
  inputExample2: {
    width: "40%",
    justifyContent: "center",
    borderBottomWidth: config.hp(".2%"),
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

export default EditMerchant;
