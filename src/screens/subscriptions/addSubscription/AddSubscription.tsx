import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import BottomSheets from "../components/bottomSheets/BottomSheets";
import StatusHandler from "../../../../utils/StatusHandler";
import EffectiveDate from "../../../components/EffectiveDate";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

import {
  categories,
  streaming,
  gaming,
  music,
  food,
} from "../components/database";
import {
  localStringToNumber,
  formatDateYYMMDD,
  handleTiers,
} from "../../../../utils/utils";
import { useAppDispatch, useAppSelector } from "../../../store/Store";
import {
  CreateSubscription,
  reset,
} from "../../../store/actionReducers/subscriptions";
import { SubscriptionPayload } from "../../../../types/subscriptions/types";

const AddSubscription = ({ navigation }) => {
  const state = useAppSelector((state) => state.subscriptions);
  const [sheet, setSheet] = useState<string>();
  const [tiers, setTiers] = useState([]);
  const [array, setArray] = useState([]);
  const dispatch = useAppDispatch();

  const bottomSheetRef = useRef(null);

  const [payload, setPayload] = useState({
    type: 0, //type 0 for subscriptions
    name: undefined,
    startDate: new Date().toLocaleDateString(), //yyyy-mm-dd
    frequency: undefined,
    amount: undefined,
    category: undefined,
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

  function handleChange(name: string, value: string) {
    if (name == "amount") {
      setPayload({
        ...payload,
        frequency: "Monthly",
      });
    }
    setPayload({ ...payload, [name]: value });
  }

  const closeSheet = useCallback(() => {
    setSheet(undefined);
    bottomSheetRef.current?.close();
  }, []);

  function selectCategory(item: string) {
    setPayload({
      ...payload,
      amount: undefined,
      name: undefined,
      frequency: undefined,
      category: item,
    });
    closeSheet();
    setTiers(undefined);

    if (item == "Streaming") {
      setArray(streaming);
    } else if (item == "Gaming") {
      setArray(gaming);
    } else if (item == "Music") {
      setArray(music);
    } else {
      setArray(food);
    }
  }
  function selectStreaming(item: string) {
    setPayload({
      ...payload,
      amount: undefined,
      frequency: undefined,
    });
    closeSheet();
    if (item !== "Other") {
      handleChange("name", item);
    }

    setTiers(handleTiers(item));
  }

  function Submit() {
    setStatus({
      ...status,
      loading: true,
      disabled: true,
    });

    let data: SubscriptionPayload = {
      startDate: payload.startDate,
      type: 0,
      name: payload.name,
      frequency: payload.frequency,
      amount: localStringToNumber(payload.amount),
    };

    dispatch(CreateSubscription(data));
  }

  useEffect(() => {
    if (
      payload.name !== undefined &&
      payload.startDate !== undefined &&
      payload.frequency !== undefined &&
      payload.amount !== undefined &&
      payload.category !== undefined
    ) {
      setStatus({
        ...status,
        disabled: false,
      });
    }
  }, [payload]);

  useEffect(() => {
    if (state.status == true) {
      setStatus({
        ...status,
        loading: false,
      });
      dispatch(reset());
      return;
    }
    if (state.error) {
      dispatch(reset());
      setStatus({
        ...status,
        loading: false,
      });
      return;
    }
  }, [state]);

  useEffect(() => {
    if (sheet) {
      bottomSheetRef.current?.expand();
    }
  }, [sheet]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingHorizontal: config.wp("2%"),
          paddingTop: config.hp("2%"),
          marginBottom: config.hp("3%"),
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: theme.colors.primary,
            fontWeight: "500",
          }}
        >
          Add Subscription
        </Text>
        <Text>
          Lets keep track of your subscriptions together. We can help you to
          save money by reminding you of current subscriptions and help you to
          cancel them once your done.
        </Text>
      </View>
      {state.loading ? (
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
            source={require("../../../components/ui/loading-spinner.json")}
          />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            paddingHorizontal: config.wp("2%"),
            paddingVertical: config.hp("1%"),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: config.hp("2%"),
            }}
          >
            <Text
              style={{
                color: theme.colors.primary,
                width: "50%",
                fontSize: 20,
                fontWeight: "500",
              }}
            >
              Category
            </Text>

            <TouchableOpacity
              style={{
                //flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onPress={() => {
                setSheet("Category");
              }}
            >
              {payload.category == undefined ? (
                <Text style={styles.inputTouchText}>Select Category</Text>
              ) : (
                <Text style={styles.inputTouchTextSelected}>
                  {payload.category}
                </Text>
              )}
              <Icon name="chevron-down" style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: config.hp("3%"),
            }}
          >
            <Text
              style={{
                color: theme.colors.primary,
                width: "50%",
                fontSize: 20,
                fontWeight: "500",
              }}
            >
              Name
            </Text>

            <TouchableOpacity
              disabled={payload.category == undefined ? true : false}
              style={styles.touchWrapper}
              onPress={() => {
                setSheet("Service");
              }}
            >
              {payload.name == undefined ? (
                <Text style={styles.inputTouchText}>Select Service</Text>
              ) : (
                <Text style={styles.inputTouchTextSelected}>
                  {payload.name}
                </Text>
              )}
              <Icon name="chevron-down" style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: config.hp("3%"),
            }}
          >
            <Text
              style={{
                color: theme.colors.primary,
                width: "50%",
                fontSize: 20,
                fontWeight: "500",
              }}
            >
              Price
            </Text>

            <TouchableOpacity
              disabled={payload.name == undefined ? true : false}
              style={styles.touchWrapper}
              onPress={() => {
                setSheet("Tier");
              }}
            >
              {payload.amount == undefined ? (
                <Text style={styles.inputTouchText}>Select Tier</Text>
              ) : (
                <Text style={styles.inputTouchTextSelected}>
                  ${payload.amount}
                </Text>
              )}
              <Icon name="chevron-down" style={styles.icon} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: config.hp("3%"),
            }}
          >
            <Text
              style={{
                color: theme.colors.primary,
                width: "50%",
                fontSize: 20,
                fontWeight: "500",
              }}
            >
              Frequency
            </Text>

            <TouchableOpacity
              disabled={payload.amount == undefined ? true : false}
              style={styles.touchWrapper}
              onPress={() => {
                setSheet("Frequency");
              }}
            >
              {payload.frequency == undefined ? (
                <Text style={styles.inputTouchText}>Select Frequency</Text>
              ) : (
                <Text style={styles.inputTouchTextSelected}>
                  {payload.frequency}
                </Text>
              )}
              <Icon name="chevron-down" style={styles.icon} />
            </TouchableOpacity>
          </View>
          <EffectiveDate
            handleChange={handleChange}
            activeDate={payload.startDate}
            label="Next Payment Date:"
          />
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              flexDirection: "column",
              alignItems: "center",
              paddingBottom: config.hp("2%"),
            }}
          >
            <TouchableOpacity
              style={
                status.disabled
                  ? {
                      width: "75%",
                      paddingVertical: config.hp("1%"),
                      borderRadius: 12,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: theme.colors.faded,
                    }
                  : {
                      backgroundColor: theme.colors.primary,
                      width: "75%",
                      paddingVertical: config.hp("1%"),
                      borderRadius: 12,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }
              }
              onPress={Submit}
              disabled={status.disabled}
            >
              <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
                Add Subscription
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <StatusHandler
        status={status}
        setStatus={setStatus}
        navigation={navigation}
        state={state}
        hideSuccess={false}
        deleteItem={null}
      />
      <BottomSheets
        bottomSheetRef={bottomSheetRef}
        sheet={sheet}
        selectCategory={selectCategory}
        categories={categories}
        streaming={array}
        selectStreaming={selectStreaming}
        handleChange={handleChange}
        closeSheet={closeSheet}
        tiers={tiers}
      ></BottomSheets>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: theme.colors.disabled,
    paddingVertical: config.hp("1.5%"),
  },
  buttonActive: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingVertical: config.hp("1.5%"),
  },
  buttonContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: config.hp("1%"),
    elevation: config.hp(".5%"),
    overflow: "hidden",
    marginTop: config.hp("1%"),
    marginBottom: config.hp("2%"),
    justifyContent: "space-between",
  },
  buttonsContainer: {},
  buttonDeleteContainer: {
    flex: 1,
    elevation: config.hp(".5%"),
    color: "black",
    alignItems: "center",
  },

  buttonText: {
    textAlign: "center",
    fontSize: config.hp("2.5%"),
    color: theme.colors.white,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  contentContainer: {
    paddingHorizontal: config.wp("5%"),
    paddingVertical: config.hp("2.5%"),
  },
  icon: {
    fontSize: config.hp("2.5%"),
    maxWidth: "50%",
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

  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: config.hp("1%"),
    width: "100%",
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
  },
  label: {
    fontSize: config.hp("2.5%"),
    width: "50%",
  },
  rightSide: {
    flex: 1,
    borderBottomWidth: config.hp(".15%"),
    borderBottomColor: theme.colors.primary,
  },
  touchWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  touchInputContainer: {
    paddingVertical: config.hp("5%"),
  },
  title: {
    fontSize: config.hp("2.5%"),
    color: theme.colors.primary,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleContainer: {
    marginBottom: config.hp("1%"),
  },
});

export default AddSubscription;
