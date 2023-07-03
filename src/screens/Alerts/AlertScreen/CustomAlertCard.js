import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const CustomAlertCard = ({ navigation, item }) => {
  const alertName = item.alert;
  const [type, setType] = useState();
  //const [isAlertActive, setIsAlertActive] = useState(active);
  const dispatch = useDispatch();

  // const setReminder = () => {
  //   setIsAlertActive(!isAlertActive);
  //   //Save to db if alert should be reminded or not
  //   dispatch({
  //     type: "Toggle_Reminder",
  //     payload: { id: id, active: !isAlertActive },
  //   });
  // };

  function handleContent() {
    switch (item.type) {
      case "A":
        return (
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Text
              style={{
                color: theme.colors.primary,
                fontWeight: "500",
                fontSize: 16,
              }}
            >
              Alert
            </Text>
            <Text style={{ fontSize: 16 }}>
              When the balance of{" "}
              <Text style={{ color: theme.colors.primary, fontWeight: "500" }}>
                {item.accountName}{" "}
              </Text>
              is {item.comparisonOperator == "<" ? "less than" : "greater than"}{" "}
              <Text style={{ color: theme.colors.primary, fontWeight: "500" }}>
                ${item.value}
              </Text>
            </Text>
          </View>
        );
      case "E":
        const date = new Date(item.value).toLocaleDateString("en-us");
        return (
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Text
              style={{
                color: theme.colors.primary,
                fontWeight: "500",
                fontSize: 16,
              }}
            >
              Event Date:
            </Text>
            <Text
              style={{
                //color: theme.colors.primary,
                //fontWeight: "500",
                fontSize: 16,
              }}
            >
              {date}
            </Text>
          </View>
        );

      default:
        break;
    }
  }

  return (
    <View style={styles.alertCard}>
      <View style={{ flex: 1 }}>
        <View style={styles.topContainer}>
          <Text style={styles.alertName}>{item.alert}</Text>
          <Ionicon
            size={24}
            color={theme.colors.shade}
            name="ellipsis-horizontal-circle"
            onPress={() => {
              navigation.navigate("AlertEdit", {
                sequenceNumber: item.sequenceNumber,
              });
            }}
          />
        </View>
        {handleContent()}
      </View>
      {/*  <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>Learn More</Text>
       <Ionicon
          size={config.hp("4%")}
          color={isAlertActive ? theme.colors.primary : "black"}
          name={`${
            isAlertActive
              ? "notifications-circle-sharp"
              : "notifications-off-circle"
          }`}
          onPress={setReminder}
        /> 
      </View>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  alertCard: {
    backgroundColor: "white",
    borderRadius: config.wp("2%"),
    paddingHorizontal: config.wp("2%"),
    paddingVertical: config.hp("1.5%"),
    height: config.hp("20%"),
    width: config.wp("46%"),
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 25,
    marginRight: 20,
    borderWidth: 1,
    borderColor: theme.colors.faded,
  },
  alertDescription: {
    fontSize: config.hp("1.7%"),
  },
  alertName: {
    fontSize: 18,
    color: theme.colors.primary,
    fontWeight: "500",
    textTransform: "capitalize",
  },

  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomText: {
    fontSize: config.hp("2.1%"),
    color: theme.colors.primary,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default CustomAlertCard;
