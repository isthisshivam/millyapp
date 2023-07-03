import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Activity from "../accountTabs/AccountHistory/Activity";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { useAppSelector } from "../../../store/Store";
import { AccountHistoryItem } from "../../../../types/accountHistory/types";

const AccountActivity = ({ navigation, route, colors }) => {
  const state = useAppSelector((state) => state.accountHistory);
  const [data, setData] = useState<AccountHistoryItem[]>([]);

  const renderItem = ({ item }) => (
    <Activity item={item} navigation={navigation} />
  );

  useEffect(() => {
    let array = [...state.history];
    setData(
      array?.sort(
        (a, b) =>
          new Date(b.postDate).valueOf() - new Date(a.postDate).valueOf()
      )
    );
  }, [state]);

  const NoData = () => (
    <>
      <View style={styles.topContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Account Activity</Text>
        </View>
        <View style={styles.secondaryTitleContainer}>
          <Text style={styles.secondaryTitle}>Past 30 Days</Text>
          <Text style={styles.summary}>
            Account transactions going back the last 30 days.
          </Text>
        </View>
      </View>
      <Text
        style={{ fontSize: 16, paddingVertical: 25, paddingHorizontal: 25 }}
      >
        You do not have any activity this month
      </Text>
    </>
  );

  return (
    <View
      style={{
        flex: 1,

        // paddingHorizontal: config.wp("2%"),
      }}
    >
      {!data[0] ? (
        <NoData></NoData>
      ) : (
        <>
          <View style={styles.topContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Account Activity</Text>
            </View>
            <View style={styles.secondaryTitleContainer}>
              <Text style={styles.secondaryTitle}>Past 30 Days</Text>
              <Text style={styles.summary}>
                Account transactions going back the last 30 days.
              </Text>
            </View>
          </View>

          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.recordId}
            contentContainerStyle={{ paddingHorizontal: config.hp("2%") }}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: "white",
    paddingHorizontal: config.wp("2%"),
    //paddingBottom: 50,
    height: config.hp("15%"),
  },
  titleContainer: {
    paddingVertical: config.hp("1.5%"),
  },
  secondaryTitleContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    //   paddingVertical: config.hp("1%"),
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: theme.colors.primary,
  },
  secondaryTitle: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: "500",
  },
  summary: {
    fontSize: config.hp("1.9%"),
    color: "black",
  },
  container: {
    paddingTop: config.deviceHeight * 0.025,
    //paddingHorizontal: config.deviceWidth * 0.035,
    width: "100%",
    backgroundColor: "#eeeeee",
    paddingBottom: 100,
  },
});

export default AccountActivity;
