import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "../../../../config/Theme";
import { config } from "../../../../config/Config";

const VehicleDetailItem = ({ vehicle }) => {
  const { make, type, model, year, payment, startDate } = vehicle;
  const d = new Date(startDate);
  const day = d.getDate() + 1;
  const month = d.getMonth();
  const dateYear = d.getFullYear();

  const formattedDate = `${month}/${day}/${dateYear}`;

  return (
    <View style={styles.vehicleInfo}>
      <View style={{ width: "100%" }}>
        <View style={styles.vehicleInfoItem}>
          <Text style={styles.vehicleInfoLabel} numberOfLines={1}>
            {vehicle.type}
          </Text>
          <Text style={styles.vehicleInfoText} numberOfLines={1}>
            {vehicle.year} {vehicle.make}, {vehicle.model}
          </Text>
        </View>

        <View style={styles.vehicleInfoItem}>
          <Text style={styles.vehicleInfoLabel} numberOfLines={1}>
            Loan Payment
          </Text>

          <Text style={styles.vehicleInfoText} numberOfLines={1}>
            ${payment}/month
          </Text>
        </View>
        <View style={styles.vehicleInfoItem}>
          <Text style={styles.vehicleInfoLabel} numberOfLines={1}>
            Next Due Date
          </Text>

          <Text style={styles.vehicleInfoText} numberOfLines={1}>
            {formattedDate}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  vehicleInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    paddingVertical: config.hp("1.5%"),
    marginBottom: config.hp("1.5%"),
    borderBottomWidth: config.hp(".05%"),
    borderBottomColor: theme.colors.black,
  },
  vehicleInfoLabel: {
    fontSize: config.hp("2%"),
    fontWeight: "bold",
  },
  vehicleInfoItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    paddingHorizontal: config.wp("1%"),
    marginVertical: config.hp(".50%"),
  },

  vehicleInfoText: {
    color: "black",
    fontSize: config.hp("2.25%"),
  },
});

export default VehicleDetailItem;
