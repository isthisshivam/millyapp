import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import { ExternalPayload } from "../../../../../types/transfer/types";
import { useAppSelector } from "../../../../store/Store";

type Props = {
  payload: ExternalPayload;
  showForm: boolean;
  label: string;
  handleChange: (name: string, value: any) => void;
  toggleAccounts: (name: string) => void;
  setShowForm: (arg: boolean) => void;
};

const AddExternalAccount = ({
  payload,
  showForm,
  label,
  handleChange,
  toggleAccounts,
  setShowForm,
}: Props) => {
  const state = useAppSelector((state) => state.transferHistory);
  const [showRoutingError, setShowRoutingError] = useState(false);
  const [showAccountError, setShowAccountError] = useState(false);
  //console.log(payload);
  // callbacks

  useEffect(() => {
    if (
      payload.destinationAccounts[0]?.aba !=
      payload.destinationAccounts[0]?.confirmRouting
    ) {
      setShowRoutingError(true);
    } else {
      setShowRoutingError(false);
    }

    if (
      payload.destinationAccounts[0]?.accountNumber !=
        payload.destinationAccounts[0]?.confirmAccount &&
      payload.destinationAccounts[0].accountNumber &&
      payload.destinationAccounts[0].confirmAccount
    ) {
      setShowAccountError(true);
    } else {
      setShowAccountError(false);
    }
  }, [payload]);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: config.hp("4%"),
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            width: "20%",
            fontSize: 18,
            color: theme.colors.primary,
            fontWeight: "500",
            marginBottom: config.hp(".5%"),
          }}
        >
          {label}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "60%",
            justifyContent: "space-between",
            //marginBottom: config.hp("4%"),
          }}
        >
          <TouchableOpacity
            disabled={state.savedAccounts.length == 0}
            onPress={() => toggleAccounts("External Accounts")}
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* <Text style={{ textAlign: "left", fontSize: 16 }}>
              Saved Accounts:
            </Text> */}
            {!payload.destinationAccounts[0].alias ? (
              <Text style={{ fontSize: 16 }}>Select Account</Text>
            ) : (
              <Text style={{ fontSize: 18 }}>
                {payload.destinationAccounts[0].alias}
              </Text>
            )}
            <AntDesign name="caretdown" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {!showForm ? (
        <View
          style={{
            width: "100%",
            alignItems: "center",
            marginBottom: config.hp("4%"),
          }}
        >
          <TouchableOpacity
            onPress={() => setShowForm(true)}
            style={{
              width: "50%",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderRadius: 12,
              height: config.hp("8%"),
              //width: "60%",
              borderColor: theme.colors.faded,
            }}
          >
            <Ionicons name="add" size={32} color={theme.colors.primary} />
            <Text style={{ color: theme.colors.primary }}>
              Add external account
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: config.hp("3%"),
            }}
          >
            <Text style={{ fontSize: config.hp("1.8%") }}>Name</Text>
            <TextInput
              onChangeText={(text) => handleChange("alias", text)}
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
          <View style={{ marginBottom: config.hp("0%") }}>
            {showRoutingError ? (
              <Text
                style={{
                  fontSize: 16,
                  color: "red",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Routing numbers must match
              </Text>
            ) : undefined}
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: config.hp("1%"),
            }}
          >
            <Text style={{ fontSize: config.hp("1.8%") }}>Routing Number:</Text>
            <TextInput
              keyboardType="number-pad"
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
              marginBottom: config.hp("3%"),
            }}
          >
            <Text style={{ fontSize: config.hp("1.8%") }}>
              Confirm Routing #:
            </Text>
            <TextInput
              keyboardType="number-pad"
              onChangeText={(text) => handleChange("confirmRouting", text)}
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
          <View style={{ marginBottom: config.hp("0%") }}>
            {showAccountError ? (
              <Text
                style={{
                  fontSize: 16,
                  color: "red",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Account numbers must match
              </Text>
            ) : undefined}
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: config.hp("1%"),
            }}
          >
            <Text style={{ fontSize: config.hp("1.8%") }}>Account Number:</Text>
            <TextInput
              keyboardType="number-pad"
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
            <Text style={{ fontSize: config.hp("1.8%") }}>
              Confirm Account #:
            </Text>
            <TextInput
              keyboardType="number-pad"
              onChangeText={(text) => handleChange("confirmAccount", text)}
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
            style={{ width: "100%", alignItems: "center", marginBottom: 15 }}
          >
            <TouchableOpacity onPress={() => setShowForm(false)}>
              <Text>Close Add Account</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    marginBottom: config.hp("4%"),
                  }}
                >
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: theme.colors.faded,
                      borderRadius: 40,
                      borderColor: theme.colors.fadedDark,
                      borderWidth: 1,
                      marginRight: 20,
                    }}
                  ></View>
                  <Text style={{ fontSize: 16 }}>
                    Save this account for future transfers
                  </Text>
                </View> */}
    </>
  );
};

export default AddExternalAccount;

const styles = StyleSheet.create({});
