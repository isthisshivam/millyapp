import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { formatBirthday } from "../../../../../utils/utils";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

const ReminderCard = ({ reminder, navigation }) => {
  const { startDate, id, amount, frequency, name } = reminder;
  const formattedDate = formatBirthday(startDate);

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate("Edit Reminder", { item: reminder })}
      >
        <View style={styles.reminder}>
          <View style={styles.leftReminder}>
            <Text style={styles.reminderName}>{name}</Text>
            <Text style={styles.reminderFreq}>{frequency}</Text>
          </View>
          <View style={styles.rightReminder}>
            <Text style={{ fontSize: config.hp("2%") }}>{formattedDate}</Text>
          </View>
          <FeatherIcon style={styles.arrowIcon} name="chevron-right" />
        </View>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  arrowIcon: {
    fontSize: config.hp("2.85%"),
    color: theme.colors.fadedLight,
  },
  buttonContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: config.wp("10%"),
    paddingVertical: config.hp("8%"),
  },
  buttonSection: {
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    flexDirection: "column",
  },
  container: {
    paddingTop: config.hp("2%"),
    paddingHorizontal: config.wp("5%"),
  },
  inputContainerCenter: {
    height: config.hp("15%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#bdbdbd",
    flex: 1,
    marginVertical: 150,
    marginHorizontal: 40,
    borderRadius: 10,
  },
  modalCenter: {
    alignItems: "center",
    paddingTop: config.hp("5%"),
  },
  modalDate: {
    alignItems: "center",
    paddingTop: 40,
  },
  modalFreq: {
    fontSize: 20,
  },
  modalName: {
    fontSize: 26,
  },
  modalTop: {
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  reminder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: config.hp("1%"),
    borderBottomWidth: config.hp(".1%"),
    borderBottomColor: theme.colors.faded,
    paddingHorizontal: config.wp("2%"),
  },

  reminderName: {
    fontSize: config.hp("2.25%"),

    //textTransform: "capitalize",
  },
  reminderFreq: {
    fontSize: config.hp("2.15%"),
    color: theme.colors.fadedDark,
    textTransform: "capitalize",
  },
  leftReminder: {
    flexDirection: "column",
    justifyContent: "center",
  },
  rightReminder: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  disabled: {
    backgroundColor: theme.colors.disabled,
  },
  title: {
    fontSize: config.hp("2.15%"),
    color: theme.colors.primary,
    marginVertical: config.hp(".5%"),
    fontWeight: "bold",
  },
  optionContainer: {
    paddingTop: config.hp("2%"),
    paddingHorizontal: 10,
    paddingBottom: config.hp("5%"),
  },
  option: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: config.hp("1.5%"),
    borderBottomWidth: config.hp(".1%"),
    borderBottomColor: theme.colors.faded,
  },
  optionText: {
    fontSize: 20,
    color: theme.colors.faded,
  },
  frequencyText: {
    color: "black",
    fontSize: 18,
    paddingRight: "15%",
  },
  input: {
    backgroundColor: theme.colors.white,
  },
  optionRight: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  arrowIcon: {
    fontSize: config.hp("3%"),
    color: theme.colors.faded,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "40%",
    width: "100%",
  },
  dollarContainer: {
    minWidth: "45%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  dollarSign: {
    fontSize: config.hp("4.75%"),
    color: "#5F5F60",
  },
  inputFieldContainer: {
    maxWidth: "60%",
    paddingLeft: config.wp("1%"),
  },
  inputField: {
    height: "100%",
    fontSize: config.hp("6%"),

    color: "#5F5F60",
  },
});

export default ReminderCard;
