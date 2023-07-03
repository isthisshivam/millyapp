import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import UpComingReminders from "./reminders/UpComingReminders";
import UpComingAlerts from "./alerts/UpComingAlerts";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const UpComingContainer = ({ navigation }) => {
  const [isReminder, setIsreminder] = useState(true);
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={
            isReminder
              ? [styles.buttonContainer, styles.isSelected]
              : styles.buttonContainer
          }
          onPress={() => {
            setIsreminder(true);
          }}
        >
          <Text
            style={
              isReminder ? [styles.text, styles.isSelectedText] : styles.text
            }
          >
            Reminders
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setIsreminder(false);
          }}
          style={
            !isReminder
              ? [styles.buttonContainer, styles.isSelected]
              : styles.buttonContainer
          }
        >
          <Text
            style={
              !isReminder ? [styles.text, styles.isSelectedText] : styles.text
            }
          >
            Alerts
          </Text>
        </TouchableOpacity>
      </View>
      {isReminder ? (
        <UpComingReminders navigation={navigation} />
      ) : (
        <UpComingAlerts navigation={navigation} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
  },
  buttonContainer: {
    width: "50%",
    borderWidth: config.hp(".1%"),
    borderColor: "grey",
    borderStyle: "solid",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: config.hp("1%"),
    backgroundColor: "white",
  },
  isSelected: {
    borderBottomWidth: config.hp(".65%"),
    borderBottomColor: theme.colors.primary,
  },
  isSelectedText: {
    color: "black",
  },
  text: {
    color: "grey",
    fontSize: config.hp("2.155%"),
  },
});
export default UpComingContainer;
