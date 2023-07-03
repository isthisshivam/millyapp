import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import StatusHandler from "../../../../../utils/StatusHandler";

import { useAppDispatch, useAppSelector } from "../../../../store/Store";
import CurrencyInput from "react-native-currency-input";
import {
  DeleteReminder,
  reset,
  UpdateReminder,
} from "../../../../store/actionReducers/reminders";
import globalStyles from "../../../../globalStyles/styles";
import BottomSheets from "../../../../components/bottomSheets/BottomSheets";
import EffectiveDate from "../../../../components/EffectiveDate";
import AnimatedLottieView from "lottie-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import { formatDateYYMMDD } from "../../../../../utils/utils";

const EditReminder = ({ route, navigation }) => {
  const state = useAppSelector((state) => state.reminders);
  const [sheet, setSheet] = useState<string>();
  const reminder = route.params.item;
  const startDate = reminder?.startDate;
  const amount = reminder?.amount;
  const frequency = reminder?.frequency;
  const name = reminder?.name;
  const dispatch = useAppDispatch();
  const bottomSheetRef = useRef(null);

  const [input, setInput] = useState({
    startDate: startDate,
    name: name,
    frequency: frequency,
    amount: amount?.toString(),
    id: reminder.id,
  });

  const [status, setStatus] = useState({
    error: undefined,
    showSuccess: false,
    showError: false,
    loading: false,
    state: false,
    message: undefined,
    showDelete: false,
    disabled: true,
  });

  const handleChange = (name: string, value: any) => {
    setInput({ ...input, [name]: value });
  };

  const expand = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const closeSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  function toggleDelete() {
    setStatus({
      ...status,
      showDelete: true,
    });
  }

  function deleteItem() {
    setStatus({
      ...status,
      loading: true,
      disabled: true,
    });
    dispatch(DeleteReminder({ id: [reminder.id], type: 2 }));
  }

  useEffect(() => {
    if (
      input.startDate !== undefined &&
      input.name !== undefined &&
      input.frequency !== undefined
    ) {
      setStatus({
        ...status,
        disabled: false,
      });
    } else {
      setStatus({
        ...status,
        disabled: true,
      });
    }
  }, [input]);

  const save = () => {
    setStatus({
      ...status,
      loading: true,
      disabled: true,
    });
    const data = {
      newDate: formatDateYYMMDD(input.startDate),
      oldType: 2,
      type: 2,
      name: input.name,
      frequency: input.frequency,
      id: input.id,
      // amount: Number(input.amount),
    };
    if (!status.disabled) {
      dispatch(UpdateReminder(data));
    }
  };

  useEffect(() => {
    if (state.status == true) {
      dispatch(reset());
      return;
    }

    if (state.status == "Error") {
      dispatch(reset());
    }
  }, [state]);
  return (
    <>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flex: 1,
          paddingVertical: config.hp("2%"),
          paddingHorizontal: config.wp("4%"),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: config.hp("4%"),
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: theme.colors.primary,
            }}
          >
            Update Reminder
          </Text>
          <Ionicons onPress={toggleDelete} name="trash" size={28} color="red" />
        </View>
        {status.loading ? (
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
        ) : (
          <>
            <View style={{ flex: 1 }}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                  style={styles.input}
                  placeholder={"Enter a name"}
                  keyboardType={"default"}
                  //autoCompleteType={"name"}
                  onChangeText={(value) => {
                    handleChange("name", value);
                  }}
                  value={input.name}
                />
              </View>
              {/* <View style={styles.inputContainer}>
                <Text style={styles.label}>Price:</Text>
                <CurrencyInput
                  value={input.amount}
                  placeholder={"0.00"}
                  keyboardType="decimal-pad"
                  style={styles.input}
                  onChangeValue={(value) => handleChange("amount", value)}
                  delimiter=","
                  separator="."
                  prefix="$"
                />

                <TextInput
                  style={styles.input}
                  value={input.amount}
                  placeholder={"0.00"}
                  keyboardType={"decimal-pad"}
                  onChangeText={(value) => {
                    handleChange("amount", value);
                  }}
                />
              </View> */}

              <EffectiveDate
                handleChange={handleChange}
                activeDate={input.startDate}
                label={"Effective Date"}
              ></EffectiveDate>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Frequency:</Text>

                <View style={styles.rightSide}>
                  <TouchableOpacity
                    style={styles.touchWrapper}
                    onPress={() => {
                      setSheet("Frequency");
                      expand();
                    }}
                  >
                    <Text style={styles.inputTouchTextSelected}>
                      {input.frequency}
                    </Text>

                    <Icon name="chevron-down" style={styles.icon} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={globalStyles.submitButtonContainer}>
              <TouchableOpacity
                //disabled={status.disabled}
                style={globalStyles.submitButton}
                onPress={save}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              {/* 
              <TouchableOpacity>
                <Text>Cancel</Text>
              </TouchableOpacity> */}
            </View>
          </>
        )}
      </KeyboardAwareScrollView>
      <BottomSheets
        bottomSheetRef={bottomSheetRef}
        handleChange={handleChange}
        closeSheet={closeSheet}
        attachments={null}
        sheet={sheet}
      ></BottomSheets>

      <StatusHandler
        status={status}
        setStatus={setStatus}
        navigation={navigation}
        state={state}
        deleteItem={deleteItem}
        hideSuccess={false}
      ></StatusHandler>
    </>
  );
};

const styles = StyleSheet.create({
  arrowIcon: {
    fontSize: config.hp("3%"),
    color: theme.colors.faded,
  },
  buttonContainer: {
    elevation: config.hp(".5%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: config.hp("1.5%"),
    paddingVertical: config.hp("2%"),
    paddingHorizontal: config.wp("2.4%"),
    width: "100%",
    backgroundColor: theme.colors.primary,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
  container: {
    paddingTop: config.hp("2%"),
    paddingHorizontal: config.wp("5%"),
    backgroundColor: theme.colors.white,
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: config.hp("2%"),
  },
  disabled: {
    backgroundColor: theme.colors.disabled,
  },
  frequencyText: {
    color: "black",
    fontSize: 18,
    paddingRight: "15%",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: config.hp("3%"),
    width: "100%",
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
    paddingVertical: config.hp("1%"),
    borderBottomWidth: config.hp(".15%"),
    borderBottomColor: theme.colors.primary,
    paddingLeft: config.wp("1%"),

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  touchInputContainer: {
    paddingVertical: config.hp("5%"),
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
    paddingVertical: config.hp("1%"),
    paddingLeft: config.wp("1%"),
    textTransform: "capitalize",
  },
  icon: {
    fontSize: config.hp("2.5%"),
    maxWidth: "50%",
  },
  rightSide: {
    flex: 1,
    borderBottomWidth: config.hp(".15%"),
    borderBottomColor: theme.colors.primary,
  },
  touchWrapper: {
    //flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  option: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: config.hp("1.5%"),
    borderBottomWidth: config.hp(".1%"),
    borderBottomColor: theme.colors.faded,
  },
  optionContainer: {
    paddingTop: config.hp("2%"),
    paddingHorizontal: 10,
    paddingBottom: config.hp("5%"),
  },
  optionRight: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionText: {
    fontSize: config.hp("2.1%"),
    color: theme.colors.faded,
  },
  title: {
    fontSize: 22,
    color: theme.colors.primary,
    marginVertical: config.hp(".5%"),
    paddingBottom: config.hp("2%"),
    fontWeight: "bold",
  },
});

export default EditReminder;
