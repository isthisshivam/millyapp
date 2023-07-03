import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
import ButtonContainer from "./buttonContainer/ButtonContainer";
import Activity from "./Activity/Activity";
import { config } from "../../config/Config";
import { useAppSelector } from "../../store/Store";
import { TransferHistoryItem } from "../../../types/transfer/types";

const RecentActivitySection = ({ navigation }) => {
  const state = useAppSelector((state) => state.transferHistory);
  const [data, setData] = useState<TransferHistoryItem[]>([]);
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

  //Sort by date
  const transfers = data
    ?.sort(
      (a, b) => new Date(b.postDate).valueOf() - new Date(a.postDate).valueOf()
    )
    ?.map((transfer: TransferHistoryItem) => {
      let temp = new Date(transfer?.postDate);
      return {
        ...transfer,
        startdate: `${month[temp.getMonth()]} ${temp.getDate()}`,
      };
    });

  //console.log(transfers);

  //Get all startdates
  const shortDates = state.history?.map((transfer) => {
    let temp = new Date(transfer.postDate);
    return `${month[temp.getMonth()]} ${temp.getDate()}`;
  });

  //console.log(state);

  //Remove duplicates
  const uniqueDates = [...new Set(shortDates.map((date) => date?.toString()))];

  useEffect(() => {
    if (state.history[0]) {
      let array = state.history.slice(0, 50);
      setData(array);
    }
  }, [state]);

  return (
    <>
      <ButtonContainer isSelected={false} navigation={navigation} />
      <ScrollView>
        {uniqueDates.slice(0, 30)?.map((date, i) => (
          <View key={i}>
            <View style={styles.dateContainer}>
              <Text style={styles.date}>{date}</Text>
            </View>
            <View style={{}}>
              {transfers
                ?.filter(
                  (transfer, i) =>
                    new Date(transfer?.startdate).valueOf() ==
                    new Date(date).valueOf()
                )
                .map((item, index) => {
                  return <Activity key={index} item={item} />;
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

export default RecentActivitySection;
