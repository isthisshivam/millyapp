import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import EffectiveDate from "../../../../components/EffectiveDate";
import {
  AlertType,
  AlertTypeEnum,
  CreateAlertType,
} from "../../../../../types/alerts/alertTypes";

type Props = {
  payload: CreateAlertType;
  item: AlertType;
  handleChange: (name: string, value: any) => void;
  setSheet: (name: string) => void;
};

const EventAlert: React.FC<Props> = ({
  payload,
  handleChange,
  setSheet,
  item,
}) => {
  useEffect(() => {
    handleChange(
      "startDate",
      payload.type == AlertTypeEnum.EventAlert ? item?.field : payload.startDate
    );
  }, []);

  return (
    <View style={{ flex: 1 }}>
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
              {payload.text
                ? "Text"
                : payload.phone
                ? "Phone"
                : payload.email
                ? "Email"
                : undefined}
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
