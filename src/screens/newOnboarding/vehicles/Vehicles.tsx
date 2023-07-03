import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import VehicleDetailItem from "./VehicleDetailItem.js/VehicleDetailItem";
import AddVehicleDetails from "./addVehicleDetails/AddVehicleDetails";
import AnimatedLottieView from "lottie-react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import {
  AddVehicleType,
  VehicleType,
} from "../../../../types/vehicles/vehicleType";
import { useAppDispatch, useAppSelector } from "../../../store/Store";
import {
  AddVehicle,
  DeleteVehicle,
  reset,
} from "../../../store/actionReducers/vehicles";
import StatusHandler from "../../../../utils/StatusHandler";

const VehicleSection = ({ handleNext, handleBack, onboardingStyles }) => {
  const state = useAppSelector((state) => state.vehicles);
  const [screen, setScreen] = useState("Vehicles");
  const [payload, setPayload] = useState<AddVehicleType[]>([]);
  const dispatch = useAppDispatch();

  const [status, setStatus] = useState({
    showDelete: false,
    id: undefined,
  });

  const toggleDelete = (id: number) => {
    setStatus({
      showDelete: true,
      id: id,
    });
  };

  const deleteItem = (id: number) => {
    dispatch(DeleteVehicle({ id: [status.id] }));
  };
  const switchScreen = useCallback(
    (name: string) => {
      setScreen(name);
    },
    [screen]
  );

  const Submit = useCallback(() => {
    // dispatch(AddVehicle(payload));
    handleNext();
  }, []);

  useEffect(() => {
    if (state.error || state.status == "Error") {
      dispatch(reset());
    }
    if (state.status == true) {
      dispatch(reset());
      //handleNext();
    }
  }, [state]);

  const renderItem = ({ item }) => (
    <VehicleDetailItem vehicle={item} toggleDelete={toggleDelete} />
  );

  function handleStep() {
    switch (screen) {
      case "Vehicles":
        return (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, paddingHorizontal: config.wp("4%") }}>
              <Text style={onboardingStyles.title}>Vehicles</Text>
              <Text style={{ marginBottom: config.hp("2%") }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                tempore similique soluta eveniet magni aperiam illo ducimus
                accusantium. Ullam a qui
              </Text>
              {state.loading ? (
                <>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "flex-start",
                      height: "100%",
                      paddingTop: 25,
                    }}
                  >
                    <AnimatedLottieView
                      loop
                      autoPlay
                      style={{
                        width: 160,
                        height: 160,
                      }}
                      source={require("../../../components/ui/loading-spinner.json")}
                    />
                  </View>
                </>
              ) : state.vehicles?.length > 0 ? (
                <>
                  <FlatList
                    data={state.vehicles}
                    renderItem={renderItem}
                    keyExtractor={(item: VehicleType) => item.id.toString()}
                    style={{ flex: 1 }}
                    contentContainerStyle={{}}
                  />
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => setScreen("Add Vehicle")}
                  >
                    <Text style={styles.plusIcon}>+</Text>
                    <Text style={styles.buttonTitle}>Add Vehicle</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <View style={{ flex: 1, justifyContent: "flex-start" }}>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => setScreen("Add Vehicle")}
                  >
                    <Text style={styles.plusIcon}>+</Text>
                    <Text style={styles.buttonTitle}>Add Vehicle</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={onboardingStyles.buttonContainer}>
              <TouchableOpacity
                style={{ paddingVertical: 12 }}
                onPress={handleNext}
              >
                <Text style={{ fontSize: 16, color: theme.colors.fadedDark }}>
                  Skip
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={Submit}
                style={onboardingStyles.button}
              >
                <Text style={onboardingStyles.buttonText}>Continue</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleBack}>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>Back</Text>
              </TouchableOpacity>
            </View>

            <StatusHandler
              state={state}
              status={status}
              setStatus={setStatus}
              hideSuccess={true}
              deleteItem={deleteItem}
              navigation={null}
            />
          </View>
        );

      case "Add Vehicle":
        return (
          <AddVehicleDetails
            onboardingStyles={onboardingStyles}
            switchScreen={switchScreen}
            //handleChange={handleChange}
          ></AddVehicleDetails>
        );
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
    //flex: 1,
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
