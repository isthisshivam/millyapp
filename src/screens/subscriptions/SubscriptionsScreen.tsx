import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../config/Theme";
import { config } from "../../config/Config";
import SubItem from "./components/SubItem";
import { useAppSelector } from "../../store/Store";
import globalStyles from "../../globalStyles/styles";

const SubscriptionsScreen = ({ navigation }) => {
  const state = useAppSelector((state) => state.subscriptions);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (state.subscriptions?.length > 0) {
      setData(state.subscriptions);
    }
  }, [state]);

  //console.log(state.subscriptions);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          paddingVertical: config.hp("1%"),
          marginBottom: config.hp("2%"),
          backgroundColor: "white",
          paddingHorizontal: config.wp("2%"),
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "600",
            color: theme.colors.primary,
            marginBottom: 5,
          }}
        >
          Subscriptions
        </Text>

        <Text style={styles.summary}>
          Lets keep track of your subscriptions together. We can help you to
          save money by reminding you of current subscriptions and help you to
          cancel them once your done.
        </Text>
      </View>

      <View style={{ paddingHorizontal: config.wp("2%"), flex: 1 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            color: theme.colors.primary,
          }}
        >
          Subscription Tracker
        </Text>

        <ScrollView
          style={{ height: "50%" }}
          contentContainerStyle={{
            width: "100%",
            flexDirection: "column",
            // height: "100%",
            //backgroundColor: "white",
          }}
        >
          {data?.map((item, index) => {
            return <SubItem item={item} key={index} navigation={navigation} />;
          })}
        </ScrollView>
      </View>

      <View style={globalStyles.submitButtonContainer}>
        <TouchableOpacity
          style={globalStyles.submitButton}
          onPress={() => navigation.navigate("Add Subscription")}
        >
          <Ionicons name="add" size={24} color="white" />
          <Text style={globalStyles.submitButtonText}>
            Add Subscription Service
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    height: config.hp("22%"),
    width: config.wp("44%"),
    backgroundColor: "white",
    borderRadius: config.hp("2%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: config.hp("1%"),
  },
  buttonTitle: {
    fontSize: config.hp("2%"),
    color: "white",
  },
  container: {
    flex: 1,
    paddingHorizontal: config.wp("4%"),
    paddingVertical: config.hp("4%"),
  },
  name: {
    fontSize: config.hp("2.75%"),
    textAlign: "center",
    fontWeight: "bold",
  },
  plus: {
    fontSize: config.hp("5%"),

    fontWeight: "bold",
  },

  secondaryTitle: {
    fontSize: config.hp("2.6%"),
    fontWeight: "bold",
  },
  secondaryTitleContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    //   paddingVertical: config.hp("1%"),
  },
  subscriptionItemContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  subscriptionContainer: {
    //backgroundColor: "white",
    paddingVertical: config.hp("4%"),
    paddingHorizontal: config.wp("3%"),
  },
  summary: {
    fontSize: 14,
    color: "black",
  },
  title: {
    fontSize: config.hp("3.5%"),
    fontWeight: "bold",
    color: "black",
  },
  titleContainer: {
    paddingVertical: config.hp("1%"),
  },
  topContainer: {
    height: config.hp("20%"),
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingHorizontal: config.wp("4%"),
  },
});

export default SubscriptionsScreen;
