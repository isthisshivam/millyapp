import React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { useSelector } from "react-redux";
import { config } from "../../../config/Config";

import ButtonContainer from "../buttonContainer/ButtonContainer";
import Activity from "./Activity/Activity";

const DepositRecentActivity = ({ navigation }) => {
  const month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  const data = useSelector((state) => state.deposits.history);
  //Sort by date
  const deposits = data
    ?.sort((a, b) => new Date(b.date) - new Date(a.date))
    ?.map((deposit) => {
      let temp = new Date(deposit.date);
      return {
        ...deposit,
        date: `${month[temp?.getMonth()]} ${temp?.getDate()}`,
      };
    });

  //Get all dates
  const shortDates = data?.map((deposit) => {
    let temp = new Date(deposit.date);
    return `${month[temp?.getMonth()]} ${temp?.getDate()}`;
  });

  //Remove duplicates
  const uniqueDates = [...new Set(shortDates?.map((date) => date?.toString()))];

  return (
    <>
      <ButtonContainer isSelected={false} navigation={navigation} />
      <ScrollView>
        {uniqueDates?.map((date, i) => (
          <View key={i}>
            <View style={styles.dateContainer}>
              <Text style={styles.date}>{date}</Text>
            </View>
            <View>
              {deposits
                ?.filter((deposit, i) => deposit.date === date)
                ?.map((item, index) => {
                  return (
                    <Activity key={index} {...item} navigation={navigation} />
                  );
                })}
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  date: {
    fontSize: 18,
  },
  dateContainer: {
    backgroundColor: "#e0e0e0",
    paddingVertical: config.hp("1%"),
    paddingHorizontal: config.wp("4%"),
  },
});

export default DepositRecentActivity;
