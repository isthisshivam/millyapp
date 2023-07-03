import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import Alert from "./Alert";
import { styles } from "./style";
const UpComingAlerts = ({ navigation }) => {
  const data = useSelector((state) => state.alert.alerts);
  const eventAlerts = data.filter((item) => item.alertType === "Event");
  const orderedList = eventAlerts.sort(
    (a, b) => new Date(a.eventDate) - new Date(b.eventDate)
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Upcoming scheduled Alerts</Text>
      </View>

      <View style={styles.alertContainer}>
        {orderedList.map((item, key) => {
          return <Alert key={key} {...item} navigation={navigation} />;
        })}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Alerts")}
        >
          <Text style={styles.buttonText}> View/Create Alerts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpComingAlerts;
