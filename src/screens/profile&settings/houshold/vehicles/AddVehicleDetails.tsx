import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import VehicleSheets from "../../../../components/bottomSheets/vehicleSheets/VehicleSheets";
import EffectiveDate from "../../../../components/EffectiveDate";
import { AddVehicleType } from "../../../../../types/vehicles/vehicleType";
import { useAppDispatch, useAppSelector } from "../../../../store/Store";
import { AddVehicle, reset } from "../../../../store/actionReducers/vehicles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CurrencyInput from "react-native-currency-input";
import globalStyles from "../../../../globalStyles/styles";
import StatusHandler from "../../../../../utils/StatusHandler";
import AnimatedLottieView from "lottie-react-native";
import { formatDateYYMMDD } from "../../../../../utils/utils";

const AddVehicleDetails = ({ navigation }) => {
  const state = useAppSelector((state) => state.vehicles);
  const [disabled, setDisabled] = useState(true);
  const [sheet, setSheet] = useState(undefined);
  const bottomSheetRef = useRef(null);
  const dispatch = useAppDispatch();

  const [payload, setPayload] = useState<AddVehicleType>({
    type: undefined,
    buyAmount: undefined,
    buyDate: undefined,
    year: undefined,
    make: undefined,
    model: undefined,
  });

  const [status, setStatus] = useState({});

  const closeSheet = useCallback(() => {
    setSheet(undefined);
    bottomSheetRef.current?.close();
  }, []);

  const expandSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const toggleSheet = useCallback(
    (name: string) => {
      setSheet(name);
      expandSheet();
    },
    [sheet]
  );

  const inputHandler = useCallback(
    (name: string, value: any) => {
      switch (name) {
        case "startDate":
          setPayload({ ...payload, buyDate: formatDateYYMMDD(value) });
          closeSheet();
          return;

        case "type":
          setPayload({
            ...payload,
            type: value,
            year: undefined,
            make: undefined,
            model: undefined,
          });
          closeSheet();
          return;

        case "year":
          setPayload({
            ...payload,
            year: value,
            make: undefined,
            model: undefined,
          });
          closeSheet();
          return;

        case "make":
          setPayload({
            ...payload,
            make: value,
            model: undefined,
          });
          closeSheet();
          return;
        default:
          setPayload({ ...payload, [name]: value });
          closeSheet();
          return;
      }
    },
    [payload]
  );

  //Field Validation
  useEffect(() => {
    if (
      payload.type !== undefined &&
      payload.buyAmount !== undefined &&
      payload.buyDate !== undefined &&
      payload.year !== undefined &&
      payload.make !== undefined
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [payload]);

  const addVehicle = useCallback(() => {
    dispatch(AddVehicle(payload));
  }, [payload]);

  useEffect(() => {
    if (state.status == true) {
      dispatch(reset());
    } else if (state.status == "Error" || state.error) {
      dispatch(reset());
    }
  }, [state]);

  return (
    <>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.container}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}> Add Vehicle Details </Text>
          </View>

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
                  source={require("../../../../components/ui/loading-spinner.json")}
                />
              </View>
            </>
          ) : (
            <View style={{ flex: 1, marginBottom: config.hp("4%") }}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Type</Text>

                <TouchableOpacity
                  style={styles.touchWrapper}
                  onPress={() => toggleSheet("Type")}
                >
                  {payload.type == undefined ? (
                    <Text style={styles.inputTouchText}>Select Type</Text>
                  ) : (
                    <Text style={styles.inputTouchTextSelected}>
                      {payload.type}
                    </Text>
                  )}
                  <Ionicons name="chevron-down" style={styles.icon} />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Year</Text>

                <TouchableOpacity
                  style={styles.touchWrapper}
                  onPress={() => toggleSheet("Year")}
                >
                  {payload.year == undefined ? (
                    <Text style={styles.inputTouchText}>Select Year</Text>
                  ) : (
                    <Text style={styles.inputTouchTextSelected}>
                      {payload.year}
                    </Text>
                  )}
                  <Ionicons name="chevron-down" style={styles.icon} />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Make</Text>

                <TouchableOpacity
                  style={styles.touchWrapper}
                  onPress={() => toggleSheet("Make")}
                >
                  {payload.make === undefined ? (
                    <Text style={styles.inputTouchText}>Select Make</Text>
                  ) : (
                    <Text style={styles.inputTouchTextSelected}>
                      {payload.make}
                    </Text>
                  )}
                  <Ionicons name="chevron-down" style={styles.icon} />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Model</Text>

                <TouchableOpacity
                  style={styles.touchWrapper}
                  onPress={() => toggleSheet("Model")}
                >
                  {payload.model === undefined ? (
                    <Text style={styles.inputTouchText}>Select Model</Text>
                  ) : (
                    <Text style={styles.inputTouchTextSelected}>
                      {payload.model}
                    </Text>
                  )}
                  <Ionicons name="chevron-down" style={styles.icon} />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Payment Amount</Text>
                <CurrencyInput
                  value={payload.buyAmount}
                  delimiter=","
                  separator="."
                  prefix="$"
                  style={styles.input}
                  placeholder={"Payment"}
                  keyboardType={"decimal-pad"}
                  onChangeValue={(value) => {
                    inputHandler("buyAmount", value);
                  }}
                />
                <TextInput />
              </View>
              <EffectiveDate
                activeDate={payload.buyDate}
                handleChange={inputHandler}
                label="Next Payment"
              />
            </View>
          )}
        </ScrollView>
        <View style={globalStyles.submitButtonContainer}>
          <TouchableOpacity
            onPress={() => addVehicle()}
            style={
              !disabled
                ? globalStyles.submitButton
                : {
                    ...globalStyles.submitButton,
                    backgroundColor: theme.colors.faded,
                  }
            }
            disabled={disabled}
          >
            <Text style={globalStyles.submitButtonText}>
              Add Vehicle Information
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{}}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
      <VehicleSheets
        sheet={sheet}
        bottomSheetRef={bottomSheetRef}
        handleChange={inputHandler}
        closeSheet={closeSheet}
        payload={payload}
      />
      <StatusHandler
        state={state}
        status={status}
        setStatus={setStatus}
        hideSuccess={false}
        deleteItem={null}
        navigation={navigation}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    // backgroundColor: theme.colors.white,
    paddingHorizontal: config.wp("4%"),
    paddingVertical: config.hp("2%"),
  },
  contentContainer: {
    paddingHorizontal: config.wp("5%"),
    paddingVertical: config.hp("2.5%"),
  },
  titleContainer: {
    marginBottom: config.hp("4%"),
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
    marginBottom: config.hp("2%"),
  },

  label: {
    fontSize: config.hp("2.5%"),
    width: "50%",
  },
  input: {
    paddingLeft: config.wp("1%"),
    //paddingVertical: config.hp("1%"),
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

    //paddingVertical: config.hp("1%"),
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
