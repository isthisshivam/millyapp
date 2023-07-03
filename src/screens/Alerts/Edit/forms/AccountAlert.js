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

const AccountAlert = ({ payload, handleChange, setSheet, setAccountType }) => {
  //console.log(payload);
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          borderBottomColor: theme.colors.fadedDark,
          borderBottomWidth: 1,
          marginBottom: config.hp("2%"),
        }}
      >
        <View
          style={{
            ...styles.inputContainer,
            marginBottom: config.hp("1%"),
          }}
        >
          <Text style={styles.label}>Alert Name: </Text>
          <TextInput
            onChangeText={(value) => handleChange("name", value)}
            style={styles.input}
            placeholder={payload.alert ? payload.alert : "Enter a Name"}
            placeholderTextColor={payload.alert ? "black" : undefined}
            keyboardAppearance="default"
            keyboardType="default"
          />
        </View>
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
                    paddingRight: 10,
                  }}
                >
                  Select Type
                </Text>
                <AntDesign
                  name="caretdown"
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
                    paddingRight: 15,
                  }}
                >
                  {payload.type.name
                    ? payload.type.name
                    : payload.type == "A"
                    ? "Account Alert"
                    : payload.type == "E"
                    ? "Event Alert"
                    : "Smart Alert"}
                </Text>
                <AntDesign
                  name="caretdown"
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
          style={{ width: "45%" }}
          onPress={() => {
            setSheet("Accounts"), setAccountType("account1");
          }}
        >
          {payload.account1 == undefined && payload.accountId == undefined ? (
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
                name="caretdown"
                size={24}
                color={theme.colors.primary}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                //width: "50%",
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 18,
                  color: theme.colors.primary,
                  fontWeight: "500",
                  textAlign: "right",
                  paddingRight: 15,
                }}
              >
                {payload.account1
                  ? payload.account1.accountName
                  : payload.accountName}
              </Text>
              <AntDesign
                name="caretdown"
                size={24}
                color={theme.colors.primary}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>is</Text>
        <TouchableOpacity
          style={{ width: "50%" }}
          onPress={() => setSheet("Triggers")}
        >
          {payload.comparisonOperator == undefined &&
          payload.trigger == undefined ? (
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
                name="caretdown"
                size={24}
                color={theme.colors.primary}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
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
                  paddingRight: 15,
                }}
              >
                {payload.trigger
                  ? payload.trigger.name
                  : payload.comparisonOperator == "<"
                  ? "Less Than"
                  : "Greater Than"}
              </Text>
              <AntDesign
                name="caretdown"
                size={24}
                color={theme.colors.primary}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>The amount of</Text>
        <TextInput
          keyboardType="decimal-pad"
          onChangeText={(value) => handleChange("value", value)}
          style={styles.input}
          placeholder={payload.value}
          placeholderTextColor={payload.value ? "black" : undefined}
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
          {payload.transmissionType == undefined ? (
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
                name="caretdown"
                size={24}
                color={theme.colors.primary}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
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
                  paddingRight: 15,
                }}
              >
                {payload.contactMethod
                  ? payload.contactMethod
                  : payload.transmissionType}
              </Text>
              <AntDesign
                name="caretdown"
                size={24}
                color={theme.colors.primary}
              />
            </View>
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

export default AccountAlert;
