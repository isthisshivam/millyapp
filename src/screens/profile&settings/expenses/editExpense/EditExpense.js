import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LottieView from "lottie-react-native";
import BottomSheets from "../../../../components/bottomSheets/BottomSheets";
import StatusHandler from "../../../../../utils/StatusHandler";
import EffectiveDate from "../../../../components/EffectiveDate";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import {
  UpdateExpense,
  DeleteExpense,
} from "../../../../store/actions/ExpenseAction";
import {
  localStringToNumber,
  formatDateYYMMDD,
} from "../../../../../utils/utils";

const EditExpense = ({ navigation, route }) => {
  const state = useSelector((state) => state.expenses);
  const bottomSheetRef = useRef(null);
  const [sheet, setSheet] = useState();
  const dispatch = useDispatch();

  let id = route.params.id;
  let item = state.expenses.filter((item) => item.id == id);

  const [payload, setPayload] = useState({
    type: 1, //type 1 for expenses
    name: item[0]?.name,
    startDate: new Date(item[0]?.startDate).toLocaleDateString(), //yyyy-mm-dd
    frequency: item[0]?.frequency,
    amount: item[0]?.amount,
    id: item[0]?.id,
  });

  //console.log(item[0]);

  const [status, setStatus] = useState({
    error: undefined,
    loading: false,
    state: false,
    disabled: true,
  });

  function handleChange(name, value) {
    setPayload({ ...payload, [name]: value });
  }

  const closeSheet = useCallback(() => {
    setSheet(undefined);
    bottomSheetRef.current?.close();
  }, []);
  function toggleDelete() {
    setStatus({
      ...status,
      showDelete: true,
      message: "Are you sure you want to delete this Expense?",
    });
  }

  const deleteExpense = () => {
    setStatus({
      ...status,
      loading: true,
      //message: "Successfully Deleted Subscription",
    });
    dispatch(DeleteExpense({ id: [id], type: 1 }));
  };

  function Submit() {
    setStatus({
      ...status,
      loading: true,
      disabled: true,
    });
    let date = formatDateYYMMDD(payload.startDate);

    let data = {
      startDate: date,
      type: 1,
      name: payload.name,
      frequency: payload.frequency,
      amount: localStringToNumber(payload.amount),
    };

    dispatch(UpdateExpense(data));
  }

  useEffect(() => {
    if (
      payload.name !== undefined &&
      payload.startDate !== undefined &&
      payload.frequency !== undefined &&
      payload.amount !== undefined
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
        message: "Successfully Updated Expense",
      });
    }
    if (state.error) {
      setStatus({
        ...status,
        loading: false,
        error: state.error,
        showError: true,
      });
    }
  }, [state]);

  useEffect(() => {
    if (sheet) {
      bottomSheetRef.current?.expand();
    }
  }, [sheet]);

  return (
    <>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
      >
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
            Update Expense
          </Text>
          <Text>
            Lets keep track of your subscriptions together. We can help you to
            save money by reminding you of current subscriptions and help you to
            cancel them once your done.
          </Text>
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
                marginBottom: config.hp("3%"),
                height: config.hp("4%"),
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

              <TextInput
                onChangeText={(text) => handleChange("name", text)}
                placeholder={payload.name}
                placeholderTextColor="black"
                style={{
                  backgroundColor: "white",
                  width: "50%",
                  borderRadius: 7,
                  height: config.hp("4%"),
                  borderWidth: 1,
                  paddingHorizontal: config.wp("2%"),
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: config.hp("3%"),
                height: config.hp("4%"),
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

              <TextInput
                keyboardType="decimal-pad"
                onChangeText={(text) => handleChange("amount", text)}
                placeholder={payload.amount.toString()}
                placeholderTextColor="black"
                style={{
                  backgroundColor: "white",
                  width: "50%",
                  borderRadius: 7,
                  height: config.hp("4%"),
                  borderWidth: 1,
                  paddingHorizontal: config.wp("2%"),
                }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: config.hp("3%"),
                height: config.hp("4%"),
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
                //disabled={payload.amount == undefined ? true : false}
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
            ></EffectiveDate>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                flexDirection: "column",
                alignItems: "center",
                paddingBottom: config.hp("1%"),
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
                        marginBottom: config.hp("2%"),
                      }
                    : {
                        backgroundColor: theme.colors.primary,
                        width: "75%",
                        paddingVertical: config.hp("1%"),
                        borderRadius: 12,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: config.hp("2%"),
                      }
                }
                onPress={Submit}
                disabled={status.disabled}
              >
                <Text
                  style={{ color: "white", fontSize: 18, fontWeight: "500" }}
                >
                  Update Expense
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={toggleDelete}>
                <Text style={{ fontSize: config.wp("4%") }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAwareScrollView>
      <StatusHandler
        status={status}
        setStatus={setStatus}
        navigation={navigation}
        state={state}
        deleteItem={deleteExpense}
      />
      <BottomSheets
        bottomSheetRef={bottomSheetRef}
        sheet={sheet}
        handleChange={handleChange}
        closeSheet={closeSheet}
        payload={payload}
      />
    </>
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

export default EditExpense;
