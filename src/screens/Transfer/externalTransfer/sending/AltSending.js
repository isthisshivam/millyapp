import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import BottomSheets from "../../../../components/bottomSheets/BottomSheets";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import StatusHandler from "../../../../../utils/StatusHandler";
import Carousel from "../../../../components/Carousel/Carousel";

const AltSending = ({ navigation }) => {
  const savedAccounts = useSelector((state) => state.transfers.savedExternals);
  const state = useSelector((state) => state.transfers);
  const accounts = useSelector((state) => state.accounts.accounts);
  const [showForm, setShowForm] = useState(false);
  const [sheet, setSheet] = useState(undefined);
  const bottomSheetRef = useRef(null);

  const [payload, setPayload] = useState({
    accountfromid: undefined,
    routingNum: undefined,
    confirmRouting: undefined,
    accountNum: undefined,
    confirmAccNum: undefined,
    amount: undefined,
    date: undefined,
  });

  const [status, setStatus] = useState({
    loading: false,
    error: undefined,
    message: undefined,
  });

  function handleChange(name, value) {
    setPayload({
      ...payload,
      [name]: value,
    });
  }

  // callbacks
  const handleExpand = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const closeSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  function toggleAccounts() {
    setSheet("Accounts");
    handleExpand();
  }
  function handleCancel() {
    navigation.goBack();
  }

  function handleSubmit() {
    //console.log(payload);
    setStatus({
      ...status,
      loading: true,
    });
  }
  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingHorizontal: config.wp("4%"),
          paddingVertical: config.hp("2%"),
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 22,
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
            marginBottom: config.hp("2%"),
            color: theme.colors.primary,
            marginBottom: config.hp("2%"),
          }}
        >
          Send Money Out
        </Text>

        <View style={{ width: "100%", alignItems: "center" }}>
          <Text
            style={{
              width: "100%",
              fontSize: config.wp("5%"),
              color: theme.colors.primary,
              fontWeight: "500",
              marginBottom: config.hp(".5%"),
            }}
          >
            From
          </Text>
          <Text style={{ width: "100%" }}>
            Select the account you would like to transfer from
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: config.hp("3%"),
            }}
          >
            <Carousel
              items={accounts}
              navigation={navigation}
              type={"account-transfer-from"}
              handleChange={handleChange}
              accountTransferFrom={payload.accountfromid}
            />
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: config.hp("2%"),
            }}
          >
            <Text style={{ fontSize: config.hp("1.8%") }}>
              Transfer Amount:
            </Text>
            <TextInput
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
            ></TextInput>
          </View>

          <Text
            style={{
              width: "100%",
              fontSize: config.wp("5%"),
              color: theme.colors.primary,
              fontWeight: "500",
              marginBottom: config.hp(".5%"),
            }}
          >
            To
          </Text>
          <Text style={{ width: "100%", marginBottom: config.hp("2%") }}>
            Select an external account you would like to send to or add an
            external account and save it for future transfers.
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: config.hp("4%"),
            }}
          >
            <Text style={{ textAlign: "left", width: "50%", fontSize: 16 }}>
              Saved Accounts:
            </Text>
            <TouchableOpacity
              onPress={handleExpand}
              style={{
                width: "50%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {!payload.accountId ? (
                <Text style={{ fontSize: 16 }}>Select Account</Text>
              ) : (
                <Text style={{ fontSize: 18 }}>{payload.accountId}</Text>
              )}
              <AntDesign name="caretdown" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            //onPress={handleExpand}
            style={{
              width: "50%",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderRadius: 12,
              height: config.hp("8%"),
              width: "60%",
              borderColor: theme.colors.faded,
            }}
          >
            <Ionicons name="add" size={32} color={theme.colors.primary} />
            <Text style={{ color: theme.colors.primary }}>
              Add external account
            </Text>
          </TouchableOpacity>

          {/* <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: config.hp("2%"),
            }}
          >
            <Text style={{ fontSize: config.hp("1.8%") }}>Routing Number:</Text>
            <TextInput
              onChangeText={(text) => handleChange("routingNum", text)}
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
            ></TextInput>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: config.hp("2%"),
            }}
          >
            <Text style={{ fontSize: config.hp("1.8%") }}>
              Confirm Routing Number:
            </Text>
            <TextInput
              onChangeText={(text) => handleChange("routingNum", text)}
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
            ></TextInput>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: config.hp("2%"),
            }}
          >
            <Text style={{ fontSize: config.hp("1.8%") }}>
              To Account Number:
            </Text>
            <TextInput
              onChangeText={(text) => handleChange("accountNum", text)}
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
            ></TextInput>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: config.hp("2%"),
            }}
          >
            <Text style={{ fontSize: config.hp("1.8%") }}>Name</Text>
            <TextInput
              onChangeText={(text) => handleChange("accountNum", text)}
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
            ></TextInput>
          </View> <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: 35,
                height: 35,
                backgroundColor: theme.colors.faded,
                borderRadius: 40,
                borderColor: theme.colors.fadedDark,
                borderWidth: 1,
              }}
            ></View>
            <Text style={{ fontSize: 16 }}>
              Save this account for future transfers
            </Text>
          </View>*/}
        </View>
      </KeyboardAwareScrollView>
      <View
        style={{
          height: config.hp("12%"),
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 12,
        }}
      >
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            width: "75%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.colors.primary,
            paddingVertical: config.hp("1%"),
            borderRadius: 12,
            marginBottom: config.hp("1%"),
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
            Submit Transfer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCancel}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
      <StatusHandler
        state={state}
        status={status}
        setStatus={setStatus}
        navigation={navigation}
      />
      <BottomSheets
        closeSheet={closeSheet}
        handleChange={handleChange}
        sheet={sheet}
      />
    </View>
  );
};

export default AltSending;
