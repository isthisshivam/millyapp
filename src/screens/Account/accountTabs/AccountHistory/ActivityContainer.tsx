import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { AccountHistoryItem } from "../../../../../types/accountHistory/types";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import { useAppSelector } from "../../../../store/Store";
import Activity from "./Activity";

const ActivityContainer = ({ navigation }) => {
  const state = useAppSelector((state) => state.accountHistory);
  const [data, setData] = useState<AccountHistoryItem[]>([]);

  const NoData = () => (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Account Activity</Text>
        <TouchableOpacity style={styles.topRightContainer}>
          <Text style={styles.topRightText}>Past 30 Days</Text>
          <Icon name="chevron-forward" style={styles.icon} />
        </TouchableOpacity>
      </View>

      <Text>You do not have any accounthistory for the past 30 days.</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Activity item={item} navigation={navigation} />
  );

  useEffect(() => {
    setData(state.history);
  }, [state]);

  return (
    <View style={styles.container}>
      {!state.history ? (
        <NoData></NoData>
      ) : (
        <>
          <View style={styles.topContainer}>
            <Text style={styles.title}>Recent Account Activity</Text>
            <TouchableOpacity
              style={styles.topRightContainer}
              onPress={() => navigation.navigate("AccountActivity")}
            >
              <Text style={styles.topRightText}>View more</Text>
              <Icon name="chevron-forward" style={styles.icon} />
            </TouchableOpacity>
          </View>

          <View style={styles.activityContainer}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.recordId}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: config.deviceHeight * 0.025,
    paddingBottom: config.deviceHeight * 0.025,
    paddingHorizontal: config.deviceWidth * 0.035,
    width: "100%",
    backgroundColor: "white",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: config.deviceHeight * 0.015,
  },
  topRightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: 20,
  },
  topRightText: {
    color: theme.colors.primary,
    fontSize: 16,
  },
  icon: {
    color: theme.colors.faded,
    fontSize: 25,
  },
  activityContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
  },
  activity: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: config.deviceHeight * 0.005,
  },
  activityName: {
    fontSize: 16,
  },
  activityDate: {
    fontSize: 16,
    color: theme.colors.faded,
  },
});

export default ActivityContainer;
