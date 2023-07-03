import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";
import Icon from "react-native-vector-icons/Ionicons";

const Alert = ({ alertName, eventDate, navigation, id }) => {
  const newDate = new Date(eventDate);
  const formattedDate = newDate.toLocaleDateString("en-US");
  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate("AlertEdit", { id: id })}
      >
        <View style={styles.alertItem}>
          <Text style={styles.alertName}>{alertName}</Text>

          <View style={styles.dateContainer}>
            <Text style={styles.date}>{formattedDate}</Text>
            <Icon
              style={styles.icon}
              name="chevron-forward"
              size={50}
              backgroundColor={"black"}
            />
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Alert;
