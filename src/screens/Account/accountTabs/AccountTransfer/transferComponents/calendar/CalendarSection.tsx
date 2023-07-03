import React, { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import { Calendar } from "react-native-calendars";
import { config } from "../../../../../../config/Config";
import { theme } from "../../../../../../config/Theme";
import { styles } from "./style";

const CalendarSection = ({ handleChange, startdate }) => {
  const today = new Date();
  const Todaydate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const [selected, setSelected] = useState(Todaydate);
  useEffect(() => {
    setSelected(startdate);
  }, [startdate]);
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
            handleChange("startdate", day.dateString);
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
        <Text style={styles.dateConfirmTitle}>Payment Start Date</Text>
        <TextInput
          placeholder={"Payment Start Date"}
          value={startdate}
          style={styles.input}
          // onEndEditing={(e) => {
          //   console.log(e.nativeEvent.text);
          // }}
          onChangeText={(value) => handleChange("startdate", value)}
        />
      </View>
    </>
  );
};

export default CalendarSection;
