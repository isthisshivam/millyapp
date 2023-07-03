import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

const Reminder = ({ reminder }) => {
  let { amount, frequency, id, name, startDate } = reminder;

  //FORMAT DATE
  const newDate = new Date(startDate);
  const formattedDate = newDate.toLocaleDateString("en-US");

  return (
    <>
      <View style={styles.container}>
        <View style={styles.reminderNameContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.reminderName}>{name}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
          <Text style={styles.reminderAmount}>
            ${amount}/{frequency}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  date: {
    fontSize: config.hp("2.05%"),
    color: theme.colors.primaryLight,
  },
  dateContainer: {
    flex: 1,
    flexDirection: "col",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
  },
  reminderAmount: {
    textAlign: "left",
    color: theme.colors.primaryLight,
    fontSize: config.hp("2.05%"),
  },
  reminderAmountContainer: {
    flex: 1,
  },
  reminderName: {
    textAlign: "center",
    color: theme.colors.primaryLight,
    fontWeight: "bold",
    fontSize: config.hp("2.05%"),
    textTransform: "capitalize",
  },
  reminderNameContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    //width: config.wp("50%"),
    flexDirection: "row",
  },
  container: {
    flexDirection: "col",
    justifyContent: "center",
    alignItems: "space-between",
    width: "100%",
    borderBottomWidth: config.hp(".1%"),
    paddingVertical: config.hp(".25%"),
    borderBottomColor: theme.colors.faded,
  },
});
export default Reminder;
