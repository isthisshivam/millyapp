import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import TransactionGame from "./game/TransactionGame";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import { config } from "../../config/Config";
import { theme } from "../../config/Theme";
import MonthGraph from "./graphs/MonthGraph";
import CompareGraph from "./graphs/CompareGraph";
import YtdGraph from "./graphs/YtdGraph";

const MissionScreen = ({ navigation }) => {
  const [playing, setPlaying] = useState(false);

  function toggleGame() {
    setPlaying(!playing);
  }

  function goToRewards() {
    navigation.navigate("Rewards");
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}> Missions</Text>
      </View>
      <View style={styles.secondaryTitleContainer}>
        <Text style={styles.secondaryTitle}>What are Missions</Text>
        <Text style={styles.summary}>
          Account missions help you stay focused on your financial goals.
          Missions can help you save money for a new car, vacation, or even a
          wedding. There is no better person than yourself to assess your
          purchases. Select Play Now below and start your next mission.
        </Text>
      </View>
      <View style={{ width: "100%", flex: 1 }}>
        {playing ? (
          <TransactionGame toggleGame={toggleGame}></TransactionGame>
        ) : (
          <View style={{ alignItems: "center" }}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 22 }}>You have 30 Transactions. </Text>
              <TouchableOpacity onPress={toggleGame} style={styles.playButton}>
                <Text
                  style={{ fontSize: 20, color: "white", fontWeight: "bold" }}
                >
                  Play Now
                </Text>
                <MaterialIcons name="swipe" size={24} color="black" />
              </TouchableOpacity>
            </View>

            {/* <View style={styles.insightsContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    color: theme.colors.primary,
                    marginRight: 10,
                  }}
                >
                  Rewards
                </Text>
                <FontAwesome5 name="piggy-bank" size={24} color="black" />
              </View>
              <View style={{ marginTop: 20 }}>
                <Text>32 Points</Text>
                <TouchableOpacity
                  onPress={goToRewards}
                  style={styles.redeemButton}
                >
                  <Text style={{ color: "white", fontSize: 18 }}>
                    View Rewards
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.insightsContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginBottom: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    color: theme.colors.primary,
                    marginRight: 10,
                  }}
                >
                  Insights
                </Text>
                <FontAwesome name="line-chart" size={24} color="black" />
              </View>
              <MonthGraph></MonthGraph>
              <CompareGraph></CompareGraph>
              <YtdGraph></YtdGraph>
            </View> */}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    padding: config.hp("2%"),
  },

  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  insightsContainer: {
    paddingVertical: config.hp("4%"),
    width: "100%",
  },
  playButton: {
    backgroundColor: theme.colors.primary,
    width: config.wp("45%"),
    borderRadius: 12,
    alignItems: "center",
    marginTop: config.hp("2%"),
    paddingVertical: 7,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: config.wp("8%"),
  },

  redeemButton: {
    backgroundColor: theme.colors.primary,
    width: config.wp("45%"),
    paddingHorizontal: config.wp("2%"),
    paddingVertical: config.wp("1%"),
    borderRadius: 12,
    alignItems: "center",
    elevation: config.hp("1%"),
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: "black",
  },

  secondaryTitle: {
    color: theme.colors.primary,
    fontSize: config.hp("2.6%"),
    fontWeight: "bold",
  },
  secondaryTitleContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: config.hp("4%"),
    alignItems: "flex-start",
  },

  titleContainer: {
    paddingVertical: config.hp("1%"),
    width: "100%",
  },

  title: {
    fontSize: config.hp("3.5%"),
    fontWeight: "bold",
    color: "black",
  },
});

export default MissionScreen;
