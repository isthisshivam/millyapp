import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import UpComingAlert from "./UpComingAlert";
import Button from "../../../../components/Button";
import { theme } from "../../../../config/Theme";
import { config } from "../../../../config/Config";
import { useAppSelector } from "../../../../store/Store";

const UpComingAlertsSection = ({ navigation }) => {
  const state = useAppSelector((state) => state.alerts);
  const [more, setMore] = useState(false);
  const [data, setData] = useState([]);

  const filteredAlerts = data?.filter((alert) => alert?.type == "E");
  const orderedList = filteredAlerts?.sort(
    (a, b) => new Date(a.eventDate) - new Date(b.eventDate)
  );
  let list = orderedList;
  if (!more) {
    list = orderedList?.slice(0, 4);
  }

  useEffect(() => {
    if (state.alerts?.length > 0) {
      setData([...state.alerts]);
    }
  }, [state]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Upcoming Alerts</Text>
      </View>
      <View style={styles.upComingAlertcontainer}>
        {filteredAlerts &&
          list?.map((alert, i) => {
            return (
              <UpComingAlert key={i} alert={alert} navigation={navigation} />
            );
          })}
      </View>
      <View style={styles.linkContainer}>
        {list.length > 4 ? (
          <Button
            text="See More"
            height={40}
            width={120}
            radius={7}
            background={theme.colors.primary}
            onPress={() => setMore(!more)}
            color="white"
            fontSize={16}
          ></Button>
        ) : undefined}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //backgroundColor: theme.colors.faded,
    paddingHorizontal: config.wp("2.5%"),
    paddingVertical: config.hp("2.25%"),
    paddingBottom: 25,
  },
  titleContainer: {
    paddingVertical: config.hp(".2%"),
    marginBottom: config.hp("1%"),
  },
  title: {
    fontSize: config.hp("2.5%"),
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  upComingAlertcontainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: config.hp(".05%"),
    paddingVertical: config.hp(".5%"),
    marginTop: config.hp(".2%"),
    marginBottom: config.hp(".2%"),
  },
  alertNameContainer: {
    maxWidth: "50%",
  },
  alertName: {
    fontSize: config.hp("2.25%"),
    width: "100%",
    textTransform: "capitalize",
  },
  alertDateContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: "50%",
  },
  alertDate: {
    fontSize: config.hp("2.2%"),
    color: theme.colors.faded,
  },
  arrowIcon: {
    fontSize: config.hp("2.5%"),
    color: theme.colors.faded,
    paddingVertical: config.hp(".2%"),
  },
  linkContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: config.hp("2%"),
  },
  link: {
    color: theme.colors.primary,
    fontSize: config.hp("2.3%"),
  },
});

export default UpComingAlertsSection;
