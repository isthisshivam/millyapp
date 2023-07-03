import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const EffectiveDate = ({ handleChange, payload }) => {
  const platform = Platform.OS;
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(platform == "android" ? false : true);

  const onChange = async (event, selectedDate) => {
    setDate(selectedDate);
    await handleChange("startDate", selectedDate.toLocaleDateString());
    if (platform == "android") {
      setShow(false);
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        //paddingVertical: config.hp("2%"),
        marginBottom: config.hp("2%"),
        height: config.hp("5%"),
        borderBottomColor: "grey",
        borderBottomWidth: 0.2,
        //paddingHorizontal: config.wp("4%"),
      }}
    >
      <Text style={styles.label}>Effect Date:</Text>

      {platform == "android" ? (
        <TouchableOpacity onPress={showDatepicker}>
          <Text style={styles.label}>
            {payload?.startDate ? payload.startDate : "Select Date"}
          </Text>
        </TouchableOpacity>
      ) : undefined}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={false}
          onChange={onChange}
          locale={"en-US"}
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "column",
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
    color: theme.colors.primary,
  },
});
export default EffectiveDate;
