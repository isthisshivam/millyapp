import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons, Foundation } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import Subscription from "./Subscription";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { useAppSelector } from "../../../store/Store";

const SubscriptionContainer = ({ navigation, openSubscription }) => {
  const state = useAppSelector((state) => state.subscriptions);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    if (state.subscriptions.length > 0) {
      let array = state.subscriptions?.slice(0, 4);
      setSubscriptions([...array]);
    }
  }, [state]);

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.titleContainer,
          justifyContent: "center",
          paddingVertical: 5,
        }}
      >
        <Text style={styles.title}>Upcoming Subscription Activity</Text>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "lightgray",
          //paddingVertical: config.hp("1%"),
        }}
      >
        <View style={{ width: config.wp("90%"), height: "100%" }}>
          {subscriptions?.map((sub, i) => {
            return <Subscription item={sub} key={i}></Subscription>;
          })}
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingVertical: config.hp("2%"),
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.primary,
            width: config.wp("80%"),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: config.hp(".5%"),
            borderRadius: 12,
          }}
          onPress={() => navigation.navigate("Subscriptions")}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "500",
              marginRight: config.wp("2%"),
            }}
          >
            View Subscriptions
          </Text>
          <Foundation name="arrow-right" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "lightgray",
    maxHeight: config.hp("60%"),
    minHeight: config.hp("50%"),
    //paddingVertical: config.hp("2%"),
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //paddingTop: config.hp("1.5%"),
    //paddingBottom: config.hp("1%"),
    paddingHorizontal: config.wp("4%"),
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: theme.colors.faded,
    marginBottom: config.hp("2%"),
  },
  title: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: config.hp("2.25%"),
    paddingBottom: config.hp("0%"),
  },

  accountContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingHorizontal: config.wp("1.2%"),
  },
  accountNumber: {
    fontSize: config.hp("2.25%"),
    letterSpacing: config.wp(".2%"),
    paddingLeft: config.wp("1.5%"),
  },
  amazon: {
    fontSize: config.hp("3%"),
    letterSpacing: 1,
    color: "rgb(0, 168, 255)'",
    fontWeight: "bold",
  },
  balance: {
    fontSize: config.hp("4%"),
    letterSpacing: 1,
  },
  balanceContainer: {
    // marginBottom: 15,
  },
  card: {
    width: config.wp("75%"),
    height: "95%",
    shadowOffset: {
      width: 0,
      height: config.hp("1%"),
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    borderRadius: 15,
    padding: 10,
    elevation: 10,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    backgroundColor: "#f4f4f4",
    shadowColor: "#fcfcfc",

    paddingHorizontal: config.wp("3.5%"),
    paddingVertical: config.hp("1.5%"),
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  date: {
    color: "#797979",
    fontSize: config.hp("2.4%"),
  },
  disney: {
    fontSize: config.hp("3%"),
    color: "#006e99",
    fontWeight: "bold",
  },
  hulu: {
    fontSize: config.hp("3%"),
    color: "#1ce783",
    fontWeight: "bold",
  },
  icon: {
    color: "#C7C7CC",
  },
  info: {
    fontSize: 18,

    fontWeight: "bold",
  },
  netflix: {
    fontSize: config.hp("3%"),
    color: "#d50000",
    fontWeight: "bold",
  },
  slide: {
    paddingHorizontal: config.wp("2%"),
    paddingBottom: config.hp("2%"),
    flexBasis: "100%",
    flex: 1,
    maxWidth: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    height: config.hp("35%"),
    backgroundColor: "white",
  },
  subtitle: {
    fontSize: 18,

    fontWeight: "bold",
  },
  titleMain: {
    fontSize: config.hp("2.7%"),
    color: "#0EA44B",
    fontWeight: "bold",
  },
});

export default SubscriptionContainer;
