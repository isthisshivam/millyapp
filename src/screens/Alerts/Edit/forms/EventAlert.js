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
import EffectiveDate from "../../../../components/EffectiveDate";
import { AlertTypeEnum } from "../../../../../types/alerts/alertTypes";

const EventAlert = ({ payload, handleChange, setSheet, setAccountType }) => {
  return (
    <View style={{ flex: 1 }}>
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
                {payload.type == AlertTypeEnum.AccountAlert
                  ? "Account Alert"
                  : payload.type == AlertTypeEnum.EventAlert
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

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Alert me by</Text>
        <TouchableOpacity
          style={{ width: "50%" }}
          onPress={() => {
            setSheet("contactMethod");
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
              {payload.text ? "Text" : payload.phone ? "Phone" : "Email"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <EffectiveDate
        handleChange={handleChange}
        label="Event Date"
        activeDate={payload.startDate}
      />
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
    marginBottom: config.hp("4%"),
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    //marginBottom: 5,
    width: "50%",
    color: theme.colors.primary,
  },
});

export default EventAlert;
