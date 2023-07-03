import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import CustomAlertSection from "./CustomAlertSection";
import SmartAlertSection from "./SmartAlertSection";
import TitleSection from "./TitleSection";
import UpComingAlertsSection from "./upComingAlerts/UpComingAlertsSection";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { GetAlerts } from "../../../store/actionReducers/alerts";
import { useAppDispatch, useAppSelector } from "../../../store/Store";

const AlertScreen = ({ navigation }) => {
  const alerts = useAppSelector((state) => state.alerts.alerts);
  const [fetched, setFetched] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!fetched == true) {
      dispatch(GetAlerts());
      setFetched(true);
    }
  }, []);

  return (
    <>
      <ScrollView style={styles.container}>
        <TitleSection config={config} colors={theme.colors} />
        <View style={styles.titleContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("CreateAlert");
            }}
          >
            <Text style={styles.plus}>+</Text>
            <Text style={styles.name}>Create Alert</Text>
          </TouchableOpacity>
        </View>
        {alerts ? (
          <>
            <CustomAlertSection
              alerts={alerts}
              colors={theme.colors}
              config={config}
              navigation={navigation}
            ></CustomAlertSection>
            <SmartAlertSection
              alerts={alerts}
              colors={theme.colors}
              config={config}
              navigation={navigation}
            ></SmartAlertSection>
            <UpComingAlertsSection navigation={navigation} />
          </>
        ) : (
          <></>
        )}
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  button: {
    height: config.hp("22%"),
    width: config.wp("44%"),
    backgroundColor: "white",
    borderRadius: config.hp("2%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  plus: {
    fontSize: config.hp("5%"),
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  name: {
    fontSize: config.hp("2.75%"),
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  titleContainer: {
    paddingVertical: config.hp("2%"),
    marginVertical: config.hp(".5%"),
    paddingHorizontal: config.wp("5%"),
  },
});

export default AlertScreen;
