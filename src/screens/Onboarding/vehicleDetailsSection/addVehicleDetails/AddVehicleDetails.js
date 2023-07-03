import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import VehicleSheets from "../vehicleSheets/VehicleSheets";
import EffectiveDate from "../../.././../components/EffectiveDate";

const AddVehicleDetails = ({ switchScreen, vehicleHandler }) => {
  const [isSafeToTransfer, setisSafeToTransfer] = useState(true);
  const [sheet, setSheet] = useState();
  const bottomSheetRef = useRef(null);

  const [payload, setPayload] = useState({
    type: "",
    payment: "",
    date: "",
    year: "",
    make: "",
    model: "",
  });

  const closeSheet = useCallback(() => {
    setSheet(undefined);
    bottomSheetRef.current?.close();
  }, []);

  const expandSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  function toggleSheet(name) {
    setSheet(name);
    expandSheet();
  }

  const inputHandler = (name, value) => {
    setPayload({ ...payload, [name]: value });
    closeSheet();
  };

  // //Field Validation
  // useEffect(() => {
  //   const { name, payment, frequency, date } = payload;
  //   if (name !== "" && payment > 1 && frequency !== "" && date !== "") {
  //     setisSafeToTransfer(true);
  //   } else {
  //     setisSafeToTransfer(false);
  //   }
  // }, [payload]);

  const addVehicle = () => {
    vehicleHandler(payload);
    switchScreen("Vehicles");
  };

  return (
    <>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          {/* <TouchableOpacity>
            <AntDesign
              name="close"
              size={24}
              color="black"
              onPress={closeAddModal}
            />
          </TouchableOpacity> */}
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}> Add Vehicle Details </Text>
        </View>
        <View style={{ marginBottom: config.hp("4%") }}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Type</Text>

            <TouchableOpacity
              style={styles.touchWrapper}
              onPress={() => toggleSheet("Type")}
            >
              {payload.type === "" ? (
                <Text style={styles.inputTouchText}>Select Type</Text>
              ) : (
                <Text style={styles.inputTouchTextSelected}>
                  {payload.type}
                </Text>
              )}
              <Icon name="chevron-down" style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Year</Text>

            <TouchableOpacity
              style={styles.touchWrapper}
              onPress={() => toggleSheet("Year")}
            >
              {payload.year === "" ? (
                <Text style={styles.inputTouchText}>Select Year</Text>
              ) : (
                <Text style={styles.inputTouchTextSelected}>
                  {payload.year}
                </Text>
              )}
              <Icon name="chevron-down" style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Make</Text>

            <TouchableOpacity
              style={styles.touchWrapper}
              onPress={() => toggleSheet("Make")}
            >
              {payload.make === "" ? (
                <Text style={styles.inputTouchText}>Select Make</Text>
              ) : (
                <Text style={styles.inputTouchTextSelected}>
                  {payload.make}
                </Text>
              )}
              <Icon name="chevron-down" style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Model</Text>

            <TouchableOpacity
              style={styles.touchWrapper}
              onPress={() => toggleSheet("Model")}
            >
              {payload.model === "" ? (
                <Text style={styles.inputTouchText}>Select Model</Text>
              ) : (
                <Text style={styles.inputTouchTextSelected}>
                  {payload.model}
                </Text>
              )}
              <Icon name="chevron-down" style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Payment Amount</Text>
            <TextInput
              style={styles.input}
              placeholder={"Payment"}
              keyboardType={"decimal-pad"}
              onChangeText={(value) => {
                inputHandler("payment", value);
              }}
            />
          </View>
        </View>

        <EffectiveDate activeDate={payload.date} handleChange={inputHandler} />

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
        >
          <TouchableOpacity
            onPress={addVehicle}
            style={isSafeToTransfer ? styles.buttonActive : styles.button}
            disabled={!isSafeToTransfer}
          >
            <Text style={styles.buttonText}>Add Vehicle Information</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => switchScreen("Vehicles")}>
            <Text style={{}}>Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <VehicleSheets
        sheet={sheet}
        bottomSheetRef={bottomSheetRef}
        handleChange={inputHandler}
        closeSheet={closeSheet}
        payload={payload}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: theme.colors.white,
    paddingHorizontal: config.wp("4%"),
    paddingVertical: config.hp("2%"),
  },
  contentContainer: {
    paddingHorizontal: config.wp("5%"),
    paddingVertical: config.hp("2.5%"),
  },
  titleContainer: {
    marginBottom: config.hp("1%"),
  },
  title: {
    fontSize: config.hp("2.5%"),
    color: theme.colors.primary,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: config.hp("4%"),
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: config.hp("1%"),
    width: "100%",
    //marginBottom: config.hp("1.5%"),
  },
  label: {
    fontSize: config.hp("2.5%"),
    width: "50%",
  },
  input: {
    paddingLeft: config.wp("1%"),
    paddingVertical: config.hp("1%"),
    fontSize: config.hp("2.25%"),
    borderBottomWidth: config.hp(".15%"),
    borderBottomColor: theme.colors.primary,
    maxWidth: "50%",
    minWidth: "50%",
  },
  inputTouch: {
    //paddingVertical: config.hp("1%"),
    paddingLeft: config.wp("1%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  touchInputContainer: {
    //paddingVertical: config.hp("2%"),
  },
  inputTouchText: {
    fontSize: config.hp("2.15%"),
    textAlign: "left",
    color: theme.colors.backdrop,

    paddingVertical: config.hp("1%"),
    paddingLeft: config.wp("1%"),
  },
  inputTouchTextSelected: {
    fontSize: config.hp("2.25%"),
    textAlign: "center",
    color: theme.colors.primary,
    fontWeight: "bold",
    //paddingVertical: config.hp("1%"),
    paddingLeft: config.wp("1%"),
  },
  icon: {
    fontSize: config.hp("2.5%"),
    maxWidth: "50%",
  },
  rightSide: {
    alignItems: "center",
    width: "50%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  touchWrapper: {
    alignItems: "center",
    width: "50%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  buttonContainer: {},
  button: {
    backgroundColor: theme.colors.disabled,
    paddingVertical: config.hp("1%"),
    width: "80%",
    borderRadius: 12,
  },
  buttonActive: {
    backgroundColor: theme.colors.primary,
    paddingVertical: config.hp("1%"),
    width: "80%",
    borderRadius: 12,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: theme.colors.white,
    fontWeight: "500",
  },
});

export default AddVehicleDetails;
