import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
} from "react-native";
import VehicleDetailItem from "./VehicleDetailItem.js/VehicleDetailItem";
import AddVehicleDetails from "./addVehicleDetails/AddVehicleDetails";
import ButtonContainer from "../ButtonContainer";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const VehicleSection = ({
  vehicleHandler,
  payload,
  step,
  next,
  back,
  cancel,
}) => {
  const [screen, setScreen] = useState("Vehicles");
  const data = payload.vehicles?.length ? payload.vehicles : [];

  function switchScreen(name) {
    setScreen(name);
  }

  const renderItem = ({ item }) => <VehicleDetailItem vehicle={item} />;

  function handleStep() {
    switch (screen) {
      case "Vehicles":
        return (
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Vehicle Details</Text>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.payment}
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1 }}
            />
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => setScreen("Add Vehicle")}
            >
              <Text style={styles.plusIcon}>+</Text>
              <Text style={styles.buttonTitle}>Add Vehicle</Text>
            </TouchableOpacity>
            <View
              style={{
                alignItems: "center",
                justifyContent: "flex-end",
                flex: 1,
              }}
            >
              <ButtonContainer
                step={step}
                next={next}
                back={back}
                cancel={cancel}
                navigation={null}
                submit={null}
              ></ButtonContainer>
            </View>
          </View>
        );

      case "Add Vehicle":
        return (
          <AddVehicleDetails
            switchScreen={switchScreen}
            vehicleHandler={vehicleHandler}
          ></AddVehicleDetails>
        );

      default:
        return;
    }
  }
  return <View style={styles.vehicleInfoContainer}>{handleStep()}</View>;
};
const styles = StyleSheet.create({
  vehicleInfoContainer: {
    flex: 1,
  },
  titleContainer: {
    paddingVertical: config.hp("2%"),
  },
  title: {
    fontSize: config.hp("3%"),
    color: theme.colors.primary,
    fontWeight: "500",
    textAlign: "left",
    width: "100%",
  },

  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
