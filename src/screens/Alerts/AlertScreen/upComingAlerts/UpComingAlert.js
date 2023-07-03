import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";
import FeatherIcon from "react-native-vector-icons/Feather";

const UpComingAlert = ({ alert, navigation }) => {
  const { alertName, eventDate } = alert;
  const newDate = new Date(eventDate);
  const formattedDate = newDate.toLocaleDateString("en-US");
  return (
    <TouchableOpacity
      activeOpacity={0.55}
      style={styles.rowContainer}
      onPress={() => {
        navigation.navigate("AlertEdit", {
          id: alert.id,
        });
      }}
    >
      <View style={styles.alertNameContainer}>
        <Text style={styles.alertName}>{alert.alert}</Text>
      </View>
      <View style={styles.alertDateContainer}>
        <Text style={styles.alertDate}>{alert.value}</Text>
        <FeatherIcon style={styles.arrowIcon} name="chevron-right" />
      </View>
    </TouchableOpacity>
  );
};

export default UpComingAlert;
