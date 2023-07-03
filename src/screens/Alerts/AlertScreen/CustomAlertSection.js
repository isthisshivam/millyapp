import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import CustomAlertCard from "./CustomAlertCard";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { useAppSelector } from "../../../store/Store";

const CustomAlertSection = ({ config, navigation }) => {
  const state = useAppSelector((state) => state.alerts);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (state.alerts?.length > 0) {
      setData([...state.alerts]);
    }
  }, [state]);

  const alerts = data?.filter(
    (alert) => alert?.type == "A" || alert?.type == "E"
  );
  const numOfColumns = Math.ceil(data.length / 2);

  if (!alerts) {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Custom Alerts</Text>
        </View>
        <View>
          <Text>
            Create an alert to be notified whenever your account balance falls
            below a certain threshold or simply set an alert to remind yourself
            of something you need to do.
          </Text>
        </View>
      </View>
    );
  }

  //console.log(state);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Custom Alerts</Text>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text>
          Create an alert to be notified whenever your account balance falls
          below a certain threshold or simply set an alert to remind yourself of
          something you need to do.
        </Text>
      </View>

      <FlatList
        //numColumns={numOfColumns}
        data={alerts}
        //key={numOfColumns}
        horizontal
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <CustomAlertCard
            key={item.id}
            item={item}
            colors={theme.colors}
            config={config}
            navigation={navigation}
          ></CustomAlertCard>
        )}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: config.hp("24%"),
    backgroundColor: "white",
    borderRadius: config.hp("2%"),

    width: config.wp("45%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    //backgroundColor: "white",

    paddingHorizontal: config.wp("4%"),
    paddingTop: config.hp("1%"),
    paddingBottom: config.hp("2%"),
  },
  gridContainer: {
    justifyContent: "space-between",
    alignContent: "space-around",
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
  titleContainer: {
    paddingVertical: config.hp(".5%"),
    marginVertical: config.hp(".5%"),
  },
  title: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: config.hp("2.5%"),
  },
});

export default CustomAlertSection;
