import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../../../config/Theme";
import { config } from "../../../../config/Config";
import {
  AddVehicleType,
  VehicleType,
} from "../../../../../types/vehicles/vehicleType";
import { useAppDispatch } from "../../../../store/Store";
import { DeleteVehicle } from "../../../../store/actionReducers/vehicles";
import { formatBirthday } from "../../../../../utils/utils";

type Props = {
  vehicle: VehicleType;
  toggleDelete: (id: number) => void;
};

const VehicleDetailItem = ({ vehicle, toggleDelete }: Props) => {
  const { make, type, model, year, paymentAmount, paymentDate } = vehicle;
  const d = new Date(paymentDate);
  const day = d.getDate() + 1;
  const month = d.getMonth();
  const dateYear = d.getFullYear();
  const formattedDate = `${month}/${day}/${dateYear}`;
  const dispatch = useAppDispatch();

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
            ${paymentAmount}/month
          </Text>
        </View>
        <View style={styles.vehicleInfoItem}>
          <Text style={styles.vehicleInfoLabel} numberOfLines={1}>
            Next Due Date
          </Text>

          <Text style={styles.vehicleInfoText} numberOfLines={1}>
            {formatBirthday(paymentDate)}
          </Text>
        </View>
      </View>
      <View
        style={{ width: "100%", alignItems: "flex-end", paddingVertical: 10 }}
      >
        <Ionicons
          onPress={() => toggleDelete(vehicle.id)}
          name="trash-outline"
          size={24}
          color="black"
        />
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
    marginBottom: config.hp("2%"),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.fadedDark,
  },
  vehicleInfoLabel: {
    fontSize: 18,
    //fontWeight: "500",
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
    fontSize: 18,
  },
});

export default VehicleDetailItem;
