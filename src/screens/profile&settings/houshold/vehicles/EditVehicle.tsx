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
import {
  EditVehicleType,
  VehicleType,
} from "../../../../../types/vehicles/vehicleType";
import { useAppDispatch, useAppSelector } from "../../../../store/Store";
import {
  reset,
  UpdateVehicle,
  DeleteVehicle,
} from "../../../../store/actionReducers/vehicles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CurrencyInput from "react-native-currency-input";
import globalStyles from "../../../../globalStyles/styles";
import StatusHandler from "../../../../../utils/StatusHandler";
import AnimatedLottieView from "lottie-react-native";
import { formatDateYYMMDD } from "../../../../../utils/utils";

const EditVehicle = ({ navigation, route }) => {
  const state = useAppSelector((state) => state.vehicles);
  const [disabled, setDisabled] = useState(false);
  const [sheet, setSheet] = useState(undefined);
  const bottomSheetRef = useRef(null);
  const dispatch = useAppDispatch();

  const vehicle: VehicleType = route.params?.item;
  let newDate = new Date(vehicle.paymentDate).toLocaleDateString();

  const [payload, setPayload] = useState<EditVehicleType>({
    id: vehicle.id,
    type: vehicle.type,
    year: vehicle.year,
    make: vehicle.make,
    model: vehicle.model,
    buyDate: newDate,
    buyAmount: vehicle.paymentAmount,
  });

  const [status, setStatus] = useState({
    showDelete: false,
  });

  const toggleDelete = () => {
    setStatus({
      showDelete: true,
    });
  };

  const deleteItem = () => {
    dispatch(DeleteVehicle({ id: [vehicle.id] }));
  };

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

  const updateVehicle = useCallback(() => {
    let data: EditVehicleType = {
      ...payload,
      buyDate: formatDateYYMMDD(payload.buyDate),
    };
    dispatch(UpdateVehicle(data));
  }, [payload]);

  useEffect(() => {
    if (!vehicle) {
      navigation.goBack();
    }
  }, [vehicle]);

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
            <Text style={styles.title}> Edit Vehicle Details </Text>
            <Ionicons
              onPress={() => toggleDelete()}
              name="trash-outline"
              size={26}
              color="red"
            />
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
                  <Text style={styles.inputTouchTextSelected}>
                    {payload.type ? payload.type : vehicle.type}
                  </Text>

                  <Ionicons name="chevron-down" style={styles.icon} />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Year</Text>

                <TouchableOpacity
                  style={styles.touchWrapper}
                  onPress={() => toggleSheet("Year")}
                >
                  <Text style={styles.inputTouchTextSelected}>
                    {payload.year ? payload.year : vehicle.year}
                  </Text>

                  <Ionicons name="chevron-down" style={styles.icon} />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Make</Text>

                <TouchableOpacity
                  style={styles.touchWrapper}
                  onPress={() => toggleSheet("Make")}
                >
                  <Text style={styles.inputTouchTextSelected}>
                    {payload.make ? payload.make : vehicle.make}
                  </Text>

                  <Ionicons name="chevron-down" style={styles.icon} />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Model</Text>

                <TouchableOpacity
                  style={styles.touchWrapper}
                  onPress={() => toggleSheet("Model")}
                >
                  <Text style={styles.inputTouchTextSelected}>
                    {payload.model ? payload.model : vehicle.model}
                  </Text>

                  <Ionicons name="chevron-down" style={styles.icon} />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Payment Amount</Text>
                <CurrencyInput
                  editable
                  value={
                    payload.buyAmount
                      ? payload.buyAmount
                      : vehicle.paymentAmount
                  }
                  delimiter=","
                  separator="."
                  prefix="$"
                  style={{ width: "35%", ...styles.input }}
                  placeholder={"Payment"}
                  keyboardType={"decimal-pad"}
                  onChangeValue={(value) => {
                    inputHandler("buyAmount", value);
                  }}
                />
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
            onPress={() => updateVehicle()}
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
              Update Vehicle Information
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
        deleteItem={deleteItem}
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
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
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

export default EditVehicle;
