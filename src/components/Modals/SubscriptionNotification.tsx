import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Rating, AirbnbRating } from "react-native-ratings";
import { Ionicons } from "@expo/vector-icons";
import Button from "../Button";
import { theme } from "../../config/Theme";
import { config } from "../../config/Config";
import { useAppDispatch, useAppSelector } from "../../store/Store";
import {
  RateSubscriptionPayload,
  SubscriptionPopUp,
  SubscriptionType,
  UpdateSubscriptionType,
} from "../../../types/subscriptions/types";
import {
  GetSubscriptionPopupHistory,
  RateSubscription,
  reset,
  UpdateSubscription,
} from "../../store/actionReducers/subscriptions";
import AnimatedLottieView from "lottie-react-native";

const SubscriptionNotification = ({ modalVisible, closeModal }) => {
  const state = useAppSelector((state) => state.subscriptions);

  const [result, setResult] = useState(undefined);
  const [lastRating, setLastRating] = useState(0);
  const [popupData, setPopupData] = useState<SubscriptionPopUp>({
    id: undefined,
    createdDate: undefined,
    name: undefined,
    startDate: undefined,
    frequency: undefined,
    amount: undefined,
    ignored: false,
    previousDate: undefined,
  });
  const dispatch = useAppDispatch();
  //let subscription = { name: "Netflix", price: 14.99, frequency: "monthly" };

  const openBrowser = async () => {
    let result = await WebBrowser.openBrowserAsync(
      "https://www.netflix.com/login?nextpage=https%3A%2F%2Fwww.netflix.com%2Fcancelplan"
    );
    setResult(result);
  };

  let item: SubscriptionType = state.subscriptions.filter(
    (a) => a.id == popupData?.id
  );

  const handleChange = (value: number) => {
    let data: RateSubscriptionPayload = {
      id: popupData.id,
      rating: value,
      oldType: 0,
      type: 0,
      //newDate: item.startDate,
    };
    dispatch(RateSubscription(data));
    setLastRating(value);
  };

  //console.log("popupData", popupData);

  //useEffect(() => {}, []);
  useEffect(() => {
    if (item[0]) {
      setLastRating(item.rating ? item.rating : 0);
      dispatch(GetSubscriptionPopupHistory(item.id));
    }
  }, []);

  useEffect(() => {
    if (state.subscriptionsToPopup?.length > 0) {
      setPopupData(state.subscriptionsToPopup[0]);
    }

    if (state.status == true) {
      closeModal();
      dispatch(reset());
    }

    if (state.status == "Error") {
      closeModal();
      dispatch(reset());
    }
  }, [state]);

  function handleStep() {
    switch (lastRating) {
      case 5:
        return (
          <View
            style={{
              flex: 1,
              paddingHorizontal: config.hp("1%"),
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginBottom: config.hp("2%"),
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                  marginBottom: config.hp("2%"),
                }}
              >
                Are you still enjoying {popupData?.name}?
              </Text>
            </View>
            <AirbnbRating
              count={5}
              onFinishRating={(rating) => handleChange(rating)}
              selectedColor={theme.colors.primary}
              reviewColor={theme.colors.primary}
              reviews={[
                "Not at all",
                "Not Really",
                "Its ok",
                "Like it",
                "Love it",
              ]}
              defaultRating={5}
              size={32}
            />
          </View>
        );

      case 4:
        <View
          style={{
            flex: 1,
            paddingHorizontal: config.hp("1%"),
          }}
        >
          <Text style={styles.modalText}>
            Your {popupData?.name} subscription payment is coming up.
          </Text>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: config.hp("2%"),
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
                marginBottom: config.hp("2%"),
              }}
            >
              Are you still enjoying {popupData?.name}?
            </Text>
          </View>
          <AirbnbRating
            count={5}
            onFinishRating={(rating) => handleChange(rating)}
            selectedColor={theme.colors.primary}
            reviewColor={theme.colors.primary}
            reviews={[
              "Not at all",
              "Not Really",
              "Its ok",
              "Like it",
              "Love it",
            ]}
            defaultRating={4}
            size={32}
          />
        </View>;

      case 3:
        return (
          <View
            style={{
              flex: 1,
              paddingHorizontal: config.hp("1%"),
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginBottom: config.hp("2%"),
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                  marginBottom: config.hp("2%"),
                }}
              >
                Are you still enjoying {popupData?.name}?
              </Text>
            </View>
            <AirbnbRating
              count={5}
              onFinishRating={(rating) => handleChange(rating)}
              selectedColor={theme.colors.primary}
              reviewColor={theme.colors.primary}
              reviews={[
                "Not at all",
                "Not Really",
                "Its ok",
                "Like it",
                "Love it",
              ]}
              defaultRating={3}
              size={32}
            />
          </View>
        );

      case 2:
        return (
          <View
            style={{
              flex: 1,
              paddingHorizontal: config.hp("1%"),
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginBottom: config.hp("2%"),
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                  marginBottom: config.hp("2%"),
                }}
              >
                You could save $320 a year. Are you still enjoying
                {popupData?.name}?
              </Text>
            </View>
            <AirbnbRating
              count={5}
              onFinishRating={(rating) => handleChange(rating)}
              selectedColor={theme.colors.primary}
              reviewColor={theme.colors.primary}
              reviews={[
                "Not at all",
                "Not Really",
                "Its ok",
                "Like it",
                "Love it",
              ]}
              defaultRating={2}
              size={32}
            />
          </View>
        );

      case 1:
        return (
          <View
            style={{
              flex: 1,
              paddingHorizontal: config.hp("1%"),
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginBottom: config.hp("2%"),
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                  marginBottom: config.hp("2%"),
                }}
              >
                Are you enjoying {popupData?.name} again?
              </Text>
            </View>
            <AirbnbRating
              count={5}
              onFinishRating={(rating) => handleChange(rating)}
              selectedColor={theme.colors.primary}
              reviewColor={theme.colors.primary}
              reviews={[
                "Not at all",
                "Not Really",
                "Its ok",
                "Like it",
                "Love it",
              ]}
              defaultRating={1}
              size={32}
            />
          </View>
        );
      default:
        return (
          <View
            style={{
              flex: 1,
              paddingHorizontal: config.hp("1%"),
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginBottom: config.hp("2%"),
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                  marginBottom: config.hp("2%"),
                }}
              >
                Are you still enjoying {popupData?.name}?
              </Text>
            </View>
            <AirbnbRating
              count={5}
              onFinishRating={(rating) => handleChange(rating)}
              selectedColor={theme.colors.primary}
              reviewColor={theme.colors.primary}
              reviews={[
                "Not at all",
                "Not Really",
                "Its ok",
                "Like it",
                "Love it",
              ]}
              defaultRating={5}
              size={32}
            />
          </View>
        );
    }
  }

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                width: "100%",
                alignItems: "center",
                paddingHorizontal: config.wp("4%"),
                paddingTop: config.hp("1%"),
              }}
            >
              <TouchableOpacity onPress={() => closeModal()}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalText}>
              You have subscription payments coming up.
            </Text>

            {state.loading ? (
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
                  source={require("../../components/ui/loading-spinner.json")}
                />
              </View>
            ) : (
              handleStep()
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    height: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: config.wp("4%"),
    alignItems: "flex-end",
    paddingTop: 20,
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    top: config.hp("20%"),
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  info: {
    fontSize: 20,
    color: "black",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    color: theme.colors.primary,
    fontWeight: "600",
    paddingHorizontal: config.wp("4%"),
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: config.wp("85%"),
    height: 300,
  },
  savingsContainer: {
    paddingHorizontal: config.wp("4%"),
    justifyContent: "space-between",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SubscriptionNotification;
