import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SmartAlertCard from "./SmartAlertCard";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../../store/Store";

const SmartAlertSection = ({ navigation }) => {
  const state = useAppSelector((state) => state.alerts);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (state.alerts?.length > 0) {
      setData(state.alerts?.filter((alert) => alert?.type == "S"));
    }
  }, [state]);

  if (!data) {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Smart Alerts</Text>
          <Ionicons
            name="md-swap-horizontal"
            size={22}
            color={theme.colors.primary}
          />
        </View>
        <View style={{ marginBottom: 25 }}>
          <Text style={{ color: "black" }}>
            With Smart Alerts whenever your account falls below a certain
            threshold, we alert you and automatically transfer funds.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Smart Alerts</Text>
        <Ionicons name="md-swap-horizontal" size={24} color="black" />
      </View>
      <View style={{ marginBottom: 25 }}>
        <Text style={{ color: "black" }}>
          With Smart Alerts whenever your account falls below a certain
          threshold, we alert you and automatically transfer funds.
        </Text>
      </View>

      <FlatList
        //numColumns={numOfColumns}
        data={data}
        horizontal
        keyExtractor={(item, i) => i.toString()}
        //key={numOfColumns}
        renderItem={({ item }) => (
          <SmartAlertCard
            item={item}
            colors={theme.colors}
            config={config}
            navigation={navigation}
          ></SmartAlertCard>
        )}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: config.wp("4%"),
    paddingTop: config.hp("1%"),
    paddingBottom: config.hp("2%"),
  },
  titleContainer: {
    paddingVertical: config.hp(".5%"),
    marginVertical: config.hp(".5%"),
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
  },
  title: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: config.hp("2.5%"),
    marginRight: 7,
  },
  gridContainer: {
    justifyContent: "space-between",
    alignContent: "space-around",
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
});

export default SmartAlertSection;
