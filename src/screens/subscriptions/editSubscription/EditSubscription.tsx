import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";

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
import EffectiveDate from "../../../components/EffectiveDate";
import StatusHandler from "../../../../utils/StatusHandler";
import BottomSheets from "../components/bottomSheets/BottomSheets";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { styles } from "./style";
import { useAppSelector, useAppDispatch } from "../../../store/Store";
import {
  SubscriptionType,
  UpdateSubscriptionType,
} from "../../../../types/subscriptions/types";
import {
  DeleteSubscription,
  reset,
  UpdateSubscription,
} from "../../../store/actionReducers/subscriptions";
import globalStyles from "../../../globalStyles/styles";
import { AirbnbRating } from "react-native-ratings";

const EditSubscription = ({ route, navigation }) => {
  const state = useAppSelector((state) => state.subscriptions);
  const item: SubscriptionType = route.params.item;
  const [sheet, setSheet] = useState<string>();
  const [tiers, setTiers] = useState([]);
  const [array, setArray] = useState([]);
  const dispatch = useAppDispatch();

  const bottomSheetRef = useRef(null);

  let date = new Date(item.startDate).toLocaleDateString();

  const [payload, setPayload] = useState<SubscriptionType>({
    type: 0, //type 0 for subscriptions
    name: item?.name,
    startDate: date, //new Date(item.startDate).toLocaleDateString(), //yyyy-mm-dd
    frequency: item.frequency,
    amount: item.amount,
    //category: item?.category,
    id: item.id,
    rating: item.rating,
    ...item,
  });

  const [status, setStatus] = useState({
    error: undefined,
    showSuccess: false,
    showError: false,
    loading: false,
    state: false,
    message: undefined,
    showDelete: false,
  });

  function handleChange(name: string, value: any) {
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
      //category: item,
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
      //disabled: true,
    });
    let date = formatDateYYMMDD(payload.startDate);
    let data: UpdateSubscriptionType = {
      id: payload.id,
      newDate: date,
      type: 0,
      oldType: 0,
      name: payload.name,
      frequency: payload.frequency,
      amount: localStringToNumber(payload.amount),
      rating: payload.rating,
    };

    dispatch(UpdateSubscription(data));
  }

  //console.log("payload", payload);

  useEffect(() => {
    //let date = formatBirthday(item?.startDate);
    //selectCategory(item.category);

    // setPayload({
    //   ...payload,
    //   name: item?.name,
    //   startDate: date,
    //   amount: item?.amount,
    //   frequency: item?.frequency,
    //   category: item.category,
    //   type: 0,
    // });

    if (!item) {
      navigation.goBack();
    }

    //console.log(payload);

    selectStreaming(item?.name);
  }, [item]);

  function toggleDelete() {
    setStatus({
      ...status,
      showDelete: true,
      message: "Are you sure you want to delete this subscription?",
    });
  }

  const deleteSubs = () => {
    setStatus({
      ...status,
      loading: true,
      //message: "Successfully Deleted Subscription",
    });
    dispatch(DeleteSubscription({ id: [item.id], type: 0 }));
  };

  useEffect(() => {
    if (state.status == true) {
      dispatch(reset());
    }
    if (state.status == "Error") {
      dispatch(reset());
    }
  }, [state]);

  useEffect(() => {
    if (sheet) {
      bottomSheetRef.current?.expand();
    }
  }, [sheet]);

  return (
    <>
      <View style={{ flex: 1, paddingHorizontal: config.wp("2%") }}>
        <View
          style={{
            //paddingHorizontal: config.wp("2%"),
            paddingTop: config.hp("2%"),
            marginBottom: config.hp("3%"),
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: theme.colors.primary,
              fontWeight: "500",
            }}
          >
            Update Subscription
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
              source={require("../../../components/ui/loading-spinner.json")}
            />
          </View>
        ) : (
          <>
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
                  height: config.hp("4%"),
                }}
              >
                <Text
                  style={{
                    color: theme.colors.primary,
                    width: "50%",
                    fontSize: 18,
                    fontWeight: "500",
                  }}
                >
                  Category
                </Text>

                <TouchableOpacity
                  style={styles.touchWrapper}
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
                  height: config.hp("4%"),
                }}
              >
                <Text
                  style={{
                    color: theme.colors.primary,
                    width: "50%",
                    fontSize: 18,
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
                  height: config.hp("4%"),
                }}
              >
                <Text
                  style={{
                    color: theme.colors.primary,
                    width: "50%",
                    fontSize: 18,
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
                  height: config.hp("4%"),
                }}
              >
                <Text
                  style={{
                    color: theme.colors.primary,
                    width: "50%",
                    fontSize: 18,
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
                activeDate={payload.startDate ? payload.startDate : date}
                label="Next Payment Date:"
              ></EffectiveDate>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text
                  style={{
                    color: theme.colors.primary,
                    width: "50%",
                    fontSize: 18,
                    fontWeight: "500",
                  }}
                >
                  Subscription Rating
                </Text>
                <AirbnbRating
                  count={5}
                  onFinishRating={(rating) => handleChange("rating", rating)}
                  selectedColor={theme.colors.primary}
                  reviewColor={theme.colors.primary}
                  reviewSize={18}
                  reviews={[
                    "Not at all",
                    "Not Really",
                    "Its ok",
                    "Like it",
                    "Love it",
                  ]}
                  defaultRating={payload.rating}
                  size={30}
                />
              </View>
            </View>

            <View style={globalStyles.submitButtonContainer}>
              <TouchableOpacity
                style={globalStyles.submitButton}
                onPress={Submit}
                // disabled={status.disabled}
              >
                <Text
                  style={{ color: "white", fontSize: 18, fontWeight: "500" }}
                >
                  Update Subscription
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleDelete}>
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <StatusHandler
        status={status}
        setStatus={setStatus}
        navigation={navigation}
        deleteItem={deleteSubs}
        state={state}
        hideSuccess={false}
      ></StatusHandler>
      <BottomSheets
        bottomSheetRef={bottomSheetRef}
        sheet={sheet}
        selectCategory={selectCategory}
        categories={categories}
        streaming={array}
        selectStreaming={selectStreaming}
        handleChange={handleChange}
        closeSheet={closeSheet}
        //payload={payload}
        tiers={tiers}
      ></BottomSheets>
    </>
  );
};

export default EditSubscription;
