import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

const SmartAlert = ({ payload, handleChange, toggleSheet }) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          borderBottomColor: theme.colors.fadedDark,
          borderBottomWidth: 1,
        }}
      >
        <View style={{ ...styles.inputContainer }}>
          <Text style={styles.label}>Alert Type:</Text>
          <TouchableOpacity
            style={{ width: "50%" }}
            onPress={() => toggleSheet("Alert Type")}
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
                  {payload.type == "A"
                    ? "Account Alert"
                    : payload.type == "E"
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
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>When the balance of</Text>
        <TouchableOpacity
          style={{ width: "50%", height: config.hp("5%") }}
          onPress={() => {
            toggleSheet("Accounts", "accountId");
          }}
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
              <Text style={{ fontSize: 16, color: theme.colors.fadedDark }}>
                Select Account
              </Text>
              <AntDesign
                name="caretright"
                size={24}
                color={theme.colors.primary}
              />
            </View>
          ) : (
            <Text
              style={{
                fontSize: 18,
                color:
                  payload.accountId == payload.fromAccount
                    ? "red"
                    : payload.accountId == payload.toAccount
                    ? "red"
                    : theme.colors.primary,
                fontWeight: "500",
                textAlign: "right",
              }}
            >
              {payload.accountId}
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>is</Text>
        <TouchableOpacity
          style={{ width: "50%", height: config.hp("5%") }}
          onPress={() => toggleSheet("Triggers")}
        >
          {payload.comparisionOperator == undefined ? (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 16, color: theme.colors.fadedDark }}>
                Select Trigger
              </Text>
              <AntDesign
                name="caretright"
                size={24}
                color={theme.colors.primary}
              />
            </View>
          ) : (
            <Text
              style={{
                fontSize: 18,
                color: theme.colors.primary,
                fontWeight: "500",
                textAlign: "right",
              }}
            >
              {payload.comparisonOperator == "<" ? "Less Than" : "Greater Than"}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>The amount of</Text>
        <TextInput
          keyboardType="decimal-pad"
          onChangeText={(value) => handleChange("value", value)}
          style={styles.input}
          placeholder="$000.00"
          placeholderTextColor={payload.value ? "black" : undefined}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Auto Transfer</Text>
        <TextInput
          keyboardType="decimal-pad"
          onChangeText={(value) => handleChange("amount", value)}
          style={styles.input}
          placeholder="$000.00"
          placeholderTextColor={payload.value ? "black" : undefined}
        />
      </View>
      <View style={{ ...styles.inputContainer }}>
        <Text style={styles.label}>
          {payload.comparisionOperator == "<" ? "From" : "To"}
        </Text>
        <TouchableOpacity
          style={{
            width: "50%",
            height: config.hp("5%"),
            //backgroundColor: "blue",
          }}
          onPress={() =>
            toggleSheet(
              "Accounts",
              payload.comparisionOperator == "<" ? "fromAccount" : "toAccount"
            )
          }
        >
          {(payload.comparisionOperator == ">" &&
            payload.toAccount == undefined) ||
          (payload.comparisionOperator == "<" &&
            payload.fromAccount == undefined) ||
          (payload.comparisionOperator == undefined &&
            payload.toAccount == undefined) ? (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 16, color: theme.colors.fadedDark }}>
                Select Account
              </Text>
              <AntDesign
                name="caretright"
                size={24}
                color={theme.colors.primary}
              />
            </View>
          ) : (
            <Text
              style={{
                fontSize: 18,
                color:
                  payload.accountId == payload.fromAccount
                    ? "red"
                    : payload.accountId == payload.toAccount
                    ? "red"
                    : theme.colors.primary,
                fontWeight: "500",
                textAlign: "right",
              }}
            >
              {payload.comparisionOperator == "<"
                ? payload.fromAccount
                : payload.toAccount}
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Alert me by</Text>
        <TouchableOpacity
          style={{ width: "50%", height: config.hp("5%") }}
          onPress={() => {
            toggleSheet("contactMethod");
          }}
        >
          {payload.contactMethod == undefined ? (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 16, color: theme.colors.fadedDark }}>
                Select Method
              </Text>
              <AntDesign
                name="caretright"
                size={24}
                color={theme.colors.primary}
              />
            </View>
          ) : (
            <Text
              style={{
                fontSize: 18,
                color: theme.colors.primary,
                fontWeight: "500",
                textAlign: "right",
              }}
            >
              {payload.contactMethod}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
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
    height: config.hp("5%"),
    width: "50%",
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: config.hp("2%"),
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    //marginBottom: 5,
    width: "50%",
    color: theme.colors.primary,
  },
});

export default SmartAlert;
