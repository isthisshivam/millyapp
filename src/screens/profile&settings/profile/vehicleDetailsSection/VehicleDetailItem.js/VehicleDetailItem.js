import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { formatBirthday } from "../../../../../../utils/utils";

const VehicleDetailItem = ({ vehicle, navigation }) => {
  const { make, type, model, year, paymentAmount, paymentDate, id } = vehicle;
  const date = formatBirthday(paymentDate);

  return (
    <TouchableOpacity
      style={styles.vehicleInfo}
      onPress={() => navigation.navigate("EditVehicleDetails", { id: id })}
    >
      <View style={styles.vehicleInfoItem}>
        <Text style={styles.vehicleInfoLabel} numberOfLines={1}>
          {type}
        </Text>
        <Text style={styles.vehicleInfoText} numberOfLines={1}>
          {year} {make}, {model}
        </Text>
      </View>

      <View style={styles.vehicleInfoItem}>
        <Text style={styles.vehicleInfoLabel} numberOfLines={1}>
          Loan Payment
        </Text>

        <Text style={styles.vehicleInfoText} numberOfLines={1}>
          ${paymentAmount}/month
        </Text>
      </View>
      <View style={styles.vehicleInfoItem}>
        <Text style={styles.vehicleInfoLabel} numberOfLines={1}>
          Next Due Date
        </Text>

        <Text style={styles.vehicleInfoText} numberOfLines={1}>
          {date}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default VehicleDetailItem;
