import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

import {
  AlertType,
  ComparisonOperators,
  CreateAlertType,
} from "../../../../../types/alerts/alertTypes";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import { currencyFormat } from "../../../../../utils/utils";
import CurrencyInput from "react-native-currency-input";

type Props = {
  payload: CreateAlertType;
  handleChange: (name: string, value: any) => void;
  toggleSheet: (name: string, arg2?: string) => void;
  item: AlertType;
};

const SmartAlert: React.FC<Props> = ({
  payload,
  handleChange,
  toggleSheet,
  item,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>When the balance of</Text>
        <TouchableOpacity
          style={{ width: "50%", height: config.hp("5%") }}
          onPress={() => {
            toggleSheet("Accounts", "accountId");
          }}
        >
          {payload.accountId == undefined && item?.accountId == undefined ? (
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
                  payload.toAccountId == payload.fromAccountId
                    ? "red"
                    : payload.fromAccountId == payload.toAccountId
                    ? "red"
                    : theme.colors.primary,
                fontWeight: "500",
                textAlign: "right",
              }}
            >
              {payload.accountId ? payload.accountId : item.accountId}
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
          {payload.comparisonOperator == undefined ? (
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
              {payload.comparisonOperator == ComparisonOperators.LessThan
                ? "Less than"
                : "Greater than"}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>The amount of</Text>
        <CurrencyInput
          onChangeValue={(value) => handleChange("value", value)}
          keyboardType="decimal-pad"
          //onChangeText={(value) => handleChange("amount", value)}
          style={styles.input}
          value={Number(payload.value)}
          prefix="$"
          delimiter=","
          separator="."
          precision={2}
          minValue={0}
          // placeholder={"$000.00"}
          // placeholderTextColor={payload.amount ? "black" : undefined}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Auto Transfer</Text>
        <CurrencyInput
          onChangeValue={(value) => handleChange("amount", value)}
          keyboardType="decimal-pad"
          //onChangeText={(value) => handleChange("amount", value)}
          style={styles.input}
          value={payload.amount}
          prefix="$"
          delimiter=","
          separator="."
          precision={2}
          minValue={0}
          // placeholder={"$000.00"}
          // placeholderTextColor={payload.amount ? "black" : undefined}
        />
      </View>
      <View style={{ ...styles.inputContainer }}>
        <Text style={styles.label}>
          {payload.comparisonOperator == ComparisonOperators.LessThan
            ? "From"
            : "To"}
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
              payload.comparisonOperator == ComparisonOperators.LessThan
                ? "fromAccountId"
                : "toAccountId"
            )
          }
        >
          {(payload.comparisonOperator == ComparisonOperators.GreaterThan &&
            payload.toAccountId == undefined) ||
          (payload.comparisonOperator == ComparisonOperators.LessThan &&
            payload.fromAccountId == undefined) ||
          (payload.comparisonOperator == undefined &&
            payload.toAccountId == undefined) ? (
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
                  payload.toAccountId == payload.fromAccountId
                    ? "red"
                    : payload.fromAccountId == payload.toAccountId
                    ? "red"
                    : theme.colors.primary,
                fontWeight: "500",
                textAlign: "right",
              }}
            >
              {payload.comparisonOperator == ComparisonOperators.LessThan
                ? payload.fromAccountId
                : payload.toAccountId}
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
          {!payload.text && !payload.email && !payload.phone ? (
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
              {payload.text
                ? "Text"
                : payload.email
                ? "Email"
                : payload.phone
                ? "Phone"
                : undefined}
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
