import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const HomeSubscriptionCard = ({
  subscriptionName,
  price,
  date,
  navigation,
  nickName,
  id,
}) => {
  const subscriptions = useSelector((state) => state.subscriptions).filter(
    (item) => item.id == id
  );
  const item = subscriptions[0];

  const { backgroundColor, mainTextColor, secondaryTextColor } = item;

  return (
    <View style={styles.slide}>
      <TouchableOpacity
        style={{ ...styles.card, backgroundColor: backgroundColor }}
        onPress={() => {
          navigation.navigate("SubscriptionTileSettings", { id: id });
        }}
      >
        <View style={styles.cardTop}>
          <View>
            {(() => {
              switch (subscriptionName) {
                case "Netflix":
                  return (
                    <Text style={{ ...styles.netflix, color: mainTextColor }}>
                      {nickName != undefined ? nickName : subscriptionName}
                    </Text>
                  );
                case "Disney Plus":
                  return (
                    <Text style={{ ...styles.disney }}>{subscriptionName}</Text>
                  );
                case "Amazon prime":
                  return (
                    <Text style={{ ...styles.amazon }}>{subscriptionName}</Text>
                  );
                case "Hulu":
                  return (
                    <Text style={{ ...styles.hulu }}>{subscriptionName}</Text>
                  );
                default:
                  return (
                    <Text style={{ ...styles.titleMain, color: mainTextColor }}>
                      {subscriptionName}
                    </Text>
                  );
              }
            })()}
          </View>
          <Ionicons
            name="settings"
            size={config.hp("4%")}
            color={theme.colors.primary}
            onPress={() => {
              navigation.navigate("SubscriptionTileSettings", {
                subscriptionName: subscriptionName,
                date: date,
                id: id,
              });
            }}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ ...styles.subtitle, color: secondaryTextColor }}>
            Next Payment
          </Text>
          <Text style={{ ...styles.info, color: secondaryTextColor }}>
            {date}
          </Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ ...styles.subtitle, color: secondaryTextColor }}>
            Amount Due
          </Text>
          <Text style={styles.info}>${price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const styles = StyleSheet.create({
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
    height: "85%",
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
    borderRadius: config.hp("2%"),
    paddingHorizontal: config.wp("3.5%"),
    paddingVertical: config.hp("1.5%"),
    elevation: config.hp("1%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
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
    height: config.hp("24.5%"),
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

export default HomeSubscriptionCard;
