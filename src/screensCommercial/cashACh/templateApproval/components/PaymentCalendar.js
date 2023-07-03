import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { formatBirthday } from "../../../../../utils/utils";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

const PaymentCalendar = ({ handleChange, date }) => {
  let newDate = date == undefined ? new Date() : date;
  const today = new Date();
  const Todaydate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const [selected, setSelected] = useState(Todaydate);
  useEffect(() => {
    setSelected(date);
  }, [date]);
  return (
    <>
      <View style={styles.container}>
        <Calendar
          hideExtraDays
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: theme.colors.primary,
              selectedTextColor: theme.colors.white,
            },
          }}
          onDayPress={(day) => {
            setSelected(day.dateString);
            handleChange("buyDate", day.dateString);
          }}
          style={styles.calender}
          theme={{
            calendarBackground: theme.colors.white,
            todayTextColor: theme.colors.primary,
            dayTextColor: "#2d4150",
            arrowColor: theme.colors.primary,
            textDayFontWeight: "300",
            textMonthFontWeight: "bold",
            textDayHeaderFontWeight: "300",
            textDayFontSize: config.hp("2.1%"),
            textMonthFontSize: config.hp("2.5%"),
            textDayHeaderFontSize: config.hp("1.75%"),
          }}
        />
      </View>
      <View style={styles.confirmDateTextContainer}>
        <Text style={styles.dateConfirmTitle}>Date</Text>
        <TextInput
          placeholder={"Payment Date"}
          value={formatBirthday(newDate)}
          style={styles.input}
          onChangeText={(value) => handleChange("buyDate", value)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: config.wp("4%"),
    paddingVertical: config.hp("4%"),
  },
  calender: {
    borderRadius: config.hp("1%"),
    borderWidth: 1,
    borderColor: "gray",
    elevation: config.hp(".5%"),
  },
  confirmDateTextContainer: {
    paddingVertical: config.hp("2%"),
  },
  dateConfirmTitle: {
    color: theme.colors.black,
    fontSize: config.hp("1.95%"),
    paddingVertical: config.hp("2.5%"),
    fontWeight: "bold",
  },
  input: {
    paddingLeft: config.wp("2%"),
    paddingVertical: config.hp("1.2%"),
    borderBottomColor: theme.colors.fade4,
    borderBottomWidth: config.hp(".1%"),
    backgroundColor: theme.colors.fadedBackground,
    fontSize: config.hp("2.5%"),
    borderRadius: config.hp(".5%"),
  },
});

export default PaymentCalendar;
