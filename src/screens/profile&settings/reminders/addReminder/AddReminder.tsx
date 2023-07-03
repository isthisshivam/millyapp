import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import { NewReminder, reset } from "../../../../store/actionReducers/reminders";
import StatusHandler from "../../../../../utils/StatusHandler";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import { formatDateYYMMDD } from "../../../../../utils/utils";
import { useAppDispatch, useAppSelector } from "../../../../store/Store";
import EffectiveDate from "../../../../components/EffectiveDate";
import BottomSheets from "../../../../components/bottomSheets/BottomSheets";
import CurrencyInput from "react-native-currency-input";

const AddReminder = ({ navigation }) => {
  const state = useAppSelector((state) => state.reminders);
  const [sheet, setSheet] = useState<string>();
  const dispatch = useAppDispatch();
  const bottomSheetRef = useRef(null);

  const [input, setInput] = useState({
    startDate: undefined,
    name: undefined,
    frequency: undefined,
    amount: undefined,
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

  const save = () => {
    setStatus({
      ...status,
      loading: true,
      disabled: true,
    });
    const data = {
      startDate: formatDateYYMMDD(input.startDate),
      type: 2,
      name: input.name,
      frequency: input.frequency,
      // amount: Number(input.amount),
      //rating: null,
    };

    dispatch(NewReminder(data));
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
        contentContainerStyle={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              color: theme.colors.primary,
            }}
          >
            Add Reminder
          </Text>
          <Text style={{ marginBottom: config.hp("4%") }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam iusto
            consequuntur debitis, voluptatibus obcaecati quae? Assumenda,
            similique, recusandae debitis et, deserunt a nobis voluptates itaque
            odit dolorem illum excepturi accusamus!
          </Text>
          {status.loading ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "flex-start",
                height: "100%",
                paddingTop: 25,
              }}
            >
              <LottieView
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
                  prefix="$"
                  value={input.amount}
                  placeholder={"0.00"}
                  keyboardType="decimal-pad"
                  style={styles.input}
                  onChangeValue={(value) => handleChange("amount", value)}
                  delimiter=","
                  separator="."
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
                    {input.frequency ? (
                      <Text style={styles.inputTouchTextSelected}>
                        {input.frequency}
                      </Text>
                    ) : (
                      <Text style={styles.inputTouchTextSelected}>
                        Select Frequency
                      </Text>
                    )}

                    <Icon name="chevron-down" style={styles.icon} />
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "column",
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  //disabled={status.disabled}
                  style={{
                    backgroundColor: theme.colors.primary,
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    width: "75%",
                    borderRadius: 12,
                    paddingVertical: config.hp("1%"),
                    marginBottom: config.hp("1%"),
                  }}
                  onPress={save}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
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
        hideSuccess={false}
        deleteItem={null}
      ></StatusHandler>
    </>
  );
};

const styles = StyleSheet.create({
  arrowIcon: {
    fontSize: config.hp("3%"),
    color: theme.colors.faded,
  },

  buttonText: {
    fontSize: 20,
    color: "white",
  },
  container: {
    paddingVertical: config.hp("2%"),
    paddingHorizontal: config.wp("2%"),
    backgroundColor: theme.colors.white,
    flex: 1,
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
    paddingVertical: config.hp("1%"),
    width: "100%",
    marginBottom: config.hp("2%"),
  },
  label: {
    fontSize: config.hp("2.5%"),
    width: "50%",
    color: theme.colors.primary,
    fontWeight: "400",
  },
  input: {
    paddingLeft: config.wp("1%"),
    paddingVertical: config.hp("1%"),
    fontSize: config.hp("2.25%"),
    borderWidth: 1,
    borderColor: theme.colors.faded,
    width: "50%",
    borderRadius: 7,
  },
  inputTouch: {
    paddingVertical: config.hp("1%"),
    paddingLeft: config.wp("1%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  touchInputContainer: {
    //paddingVertical: config.hp("5%"),
  },
  inputTouchText: {
    fontSize: config.hp("2.15%"),
    textAlign: "left",
    color: theme.colors.backdrop,
  },
  inputTouchTextSelected: {
    fontSize: config.hp("2.25%"),
    textAlign: "center",
    color: theme.colors.primary,
    fontWeight: "bold",
    paddingRight: 10,
  },
  icon: {
    fontSize: config.hp("2.5%"),
    maxWidth: "50%",
  },
  rightSide: {
    flex: 1,
  },
  touchWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  option: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: config.hp("1.5%"),
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

export default AddReminder;
