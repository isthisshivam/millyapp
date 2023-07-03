import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import CurrencyInput from "react-native-currency-input";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import {
  ComparisonOperators,
  CreateAlertType,
} from "../../../../../types/alerts/alertTypes";

type Props = {
  payload: CreateAlertType;
  handleChange: (name: string, value: any) => void;
  setSheet: (name: string) => void;
  setAccountType: (name: string) => void;
};

const AccountAlert: React.FC<Props> = ({
  payload,
  handleChange,
  setSheet,
  setAccountType,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>When the balance of</Text>
        <TouchableOpacity
          style={{ width: "50%" }}
          onPress={() => {
            setSheet("Accounts"), setAccountType("accountId");
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
                color: theme.colors.primary,
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
          style={{ width: "50%" }}
          onPress={() => setSheet("Triggers")}
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
                : "Greater Than"}
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
        <Text style={styles.label}>Alert me by</Text>
        <TouchableOpacity
          style={{ width: "50%" }}
          onPress={() => {
            setSheet("contactMethod");
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
              {payload.text ? "Text" : payload.phone ? "Phone" : "Email"}
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
    height: "100%",
    width: "50%",
  },
  inputContainer: {
    width: "100%",
    height: config.hp("5%"),
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

export default AccountAlert;
