import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import Icon from "react-native-vector-icons/Ionicons";

import Reminder from "./Reminder";
import { styles } from "./style";

const UpComingReminders = ({ navigation }) => {
  const data = useSelector((state) => state.reminders.reminders);
  const sortedList = data?.sort((a, b) => new Date(a.date) - new Date(b.date));
  const list = sortedList?.slice(0, 5);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Upcoming Scheduled Reminders</Text>
      </View>

      <View style={styles.reminderContainer}>
        {list?.map((reminder, key) => {
          return (
            <Reminder key={key} reminder={reminder} navigation={navigation} />
          );
        })}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Profile/Settings", {
              screen: "profileReminders",
            })
          }
        >
          <Text style={styles.buttonText}> Create/View Reminders</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpComingReminders;
