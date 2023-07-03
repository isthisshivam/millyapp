import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useFocusEffect } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { Ionicons } from "@expo/vector-icons";
import { handleType } from "../../components/functions";
import EffectiveDate from "./modals/EffectiveDate";
import { set } from "date-fns";
import BottomSheets from "../../../components/bottomSheets/BottomSheets";

const RequestInfo = ({
  handleNext,
  payload,
  handleChange,
  handleCancel,
  setPayload,
}) => {
  const state = useSelector((state) => state.commercial);
  const [sheet, setSheet] = useState();
  const [type, setType] = useState();
  const bottomSheetRef = useRef(); // ref

  function select(id) {
    setType(handleType(id.toString()));
    handleClose();
  }

  const closeSheet = useCallback(() => {
    setSheet(undefined);
    bottomSheetRef.current?.close();
  }, []);

  const expandSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  function toggleSheet(name) {
    // if (accountLabel) {
    //   setAccountType(accountLabel);
    // }
    setSheet(name);
    expandSheet();
  }

  useEffect(() => {
    if (type) {
      handleChange("requestType", type);
    }
  }, [type]);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      if (state.selectedTemplate?.requestType) {
        let item = handleType(state.selectedTemplate?.requestType);
        setType(item);
        return;
      }
      if (payload?.requestType) {
        let item = handleType(payload?.requestType);
        setType(item);
      }
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [state.selectedTemplate])
  );

  return (
    <>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            color: theme.colors.primary,
            //paddingHorizontal: config.wp("2%"),
            marginBottom: config.hp("2%"),
          }}
        >
          Request Info
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            // width: "100%",
            marginBottom: config.hp("2%"),
          }}
        >
          <Text style={{ fontSize: 16 }}>ACH Type</Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              //width: "100%",
            }}
          >
            <TouchableOpacity
              onPress={() => toggleSheet("Type")}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              {type ? (
                <Text style={{ fontSize: 18, paddingRight: 20 }}>{type}</Text>
              ) : (
                <Text style={{ fontSize: 16, paddingRight: 20 }}>
                  Select Type
                </Text>
              )}
              <Ionicons
                name="caret-down"
                size={24}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: config.hp("4%"),
          }}
        >
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Request Name</Text>
            <TextInput
              onChangeText={(value) => handleChange("templateName", value)}
              style={styles.input}
              placeholder={
                payload.templateName ? payload.templateName : "Enter a Name"
              }
              placeholderTextColor={payload.templateName ? "black" : undefined}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Company/ID</Text>
            <TextInput
              onChangeText={(value) => handleChange("companyId", value)}
              style={styles.input}
              placeholder={
                payload.companyId ? payload.companyId : "Enter company/id"
              }
              placeholderTextColor={payload.companyId ? "black" : undefined}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: config.hp("4%"),
          }}
        >
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Max Amount</Text>
            <TextInput
              keyboardType="decimal-pad"
              onChangeText={(value) => handleChange("maxTxAmount", value)}
              style={styles.input}
              placeholder={
                payload.maxTxAmount
                  ? payload.maxTxAmount.toString()
                  : "ex. $12,000"
              }
              placeholderTextColor={payload.maxTxAmount ? "black" : undefined}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Credit/Debit Account</Text>
            <TouchableOpacity
              onPress={() => toggleSheet("Accounts")}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                ...styles.input,
              }}
            >
              {payload.debitAccount || payload.accountId ? (
                <Text style={{ fontSize: 18, paddingRight: 20 }}>
                  {payload.debitAccount
                    ? payload.debitAccount
                    : payload.accountId}
                </Text>
              ) : (
                <Text style={{ fontSize: 16, paddingRight: 20 }}>
                  Select Account
                </Text>
              )}
              <Ionicons
                name="caret-down"
                size={24}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
        <EffectiveDate
          handleChange={handleChange}
          payload={payload}
        ></EffectiveDate>

        <Text style={styles.label}>Description</Text>
        <TextInput
          //textAlignVertical="top"
          multiline
          onChangeText={(value) => handleChange("templateDescription", value)}
          placeholder={
            payload.templateDescription
              ? payload.templateDescription
              : "You can add a description here"
          }
          placeholderTextColor={payload.templateDescription ? "black" : "gray"}
          style={{
            backgroundColor: "white",
            borderRadius: 7,
            borderColor: theme.colors.faded,
            borderWidth: 1,
            paddingHorizontal: 10,
            height: config.hp("8%"),
            width: "100%",
          }}
        ></TextInput>

        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <TouchableOpacity
            onPress={handleNext}
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
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      <BottomSheets
        closeSheet={closeSheet}
        sheet={sheet}
        handleChange={handleChange}
        bottomSheetRef={bottomSheetRef}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: config.wp("2%"),
    paddingVertical: config.hp("2%"),
    flex: 1,
  },
  input: {
    height: config.hp("5%"),
    backgroundColor: "white",
    paddingHorizontal: config.wp("1%"),
    borderRadius: 7,
    borderColor: theme.colors.faded,
    borderWidth: 1,
  },
  inputContainer: {
    width: "48%",
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 5,
  },
});

export default RequestInfo;
