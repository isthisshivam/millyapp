import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import VehicleDetailItem from "./VehicleDetailItem.js/VehicleDetailItem";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

const VehicleSection = ({ navigation }) => {
  const state = useSelector((state) => state.vehicles);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (state.vehicles.length > 0) {
      setData(state.vehicles);
    }
  }, [state]);

  return (
    <View style={styles.vehicleInfoContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Vehicle Details</Text>
      </View>
      {data.length > 0 ? (
        data?.map((vehicle, index) => {
          return (
            <VehicleDetailItem
              vehicle={vehicle}
              navigation={navigation}
              key={index}
            />
          );
        })
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>
            You have not personalized this experience. You can keep track of
            your vehicles hear
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("addVehicleDetails")}
      >
        {/* <FeatherIcon name="plus" size={25} style={styles.plusIcon} /> */}
        <Text style={styles.plusIcon}>+</Text>
        <Text style={styles.buttonTitle}>Add Vehicle</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  vehicleInfoContainer: {
    // minHeight: config.hp("43.5%"),
    backgroundColor: "white",
    paddingHorizontal: config.wp("3%"),
    paddingVertical: config.hp("1%"),
    flexDirection: "column",
    justifyContent: "space-between",
  },
  titleContainer: {
    paddingVertical: config.hp("2%"),
  },
  title: {
    fontSize: config.hp("2.3%"),
    color: theme.colors.primary,
    fontWeight: "bold",
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: config.hp("1%"),
  },
  plusIcon: {
    fontSize: config.hp("3.8%"),
    fontWeight: "bold",
    color: theme.colors.primary,
    marginRight: config.wp("1.2%"),
  },
  buttonTitle: {
    fontSize: config.hp("2.1%"),
    color: theme.colors.primary,
  },
});

export default VehicleSection;
