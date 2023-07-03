import AnimatedLottieView from "lottie-react-native";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { Reminder } from "../../../../types/reminders/types";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import globalStyles from "../../../globalStyles/styles";
import { GetReminders } from "../../../store/actionReducers/reminders";
import { useAppDispatch, useAppSelector } from "../../../store/Store";
import ReminderCard from "./components/ReminderCard";

const RemindersScreen = ({ navigation }) => {
  const state = useAppSelector((state) => state.reminders);
  const [data, setData] = useState([]);
  const [fetched, setFetched] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!fetched) {
      dispatch(GetReminders());
      setFetched(true);
    }
    if (state.reminders?.length > 0) {
      setData([...state.reminders]);
    }
  }, [state]);

  const renderItem = ({ item }) => (
    <ReminderCard navigation={navigation} reminder={item} />
  );

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: config.wp("2%"),
        paddingVertical: config.hp("2%"),
      }}
    >
      <Text style={styles.title}>Reminders</Text>

      <Text style={styles.secondaryTitle}>What are Reminders?</Text>
      <Text style={{ marginBottom: config.hp("2%") }}>
        We know life happens and we want to make sure you don’t miss the
        important things. Set up reminders such as anniversaries, birthdays or
        other special occasions and we’ll send you a friendly reminder via text
        or email.
      </Text>

      {state.loading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
            height: "100%",
            paddingTop: 25,
          }}
        >
          <AnimatedLottieView
            loop
            autoPlay
            style={{
              width: 160,
              height: 160,
            }}
            source={require("../../../components/ui/loading-spinner.json")}
          />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item: Reminder, i) => item?.id?.toString()}
            style={{ flex: 1 }}
            //contentContainerStyle={{ flex: 1 }}
          />

          {/* <View style={styles.reminderContainer}>
            {data?.map((reminder, index) => {
              return (
                <ReminderCard
                  navigation={navigation}
                  key={index}
                  reminder={reminder}
                />
              );
              })}
            </View> */}

          <View style={globalStyles.submitButtonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Add Reminder")}
              style={globalStyles.submitButton}
            >
              <Text style={globalStyles.submitButtonText}>Add Reminder</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  modal: {
    borderRadius: 12,
  },
  modalButtonContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  modalContainer: {
    height: config.hp("40%"),
    width: config.wp("80%"),
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    fontSize: 22,
    textAlign: "center",
    paddingBottom: config.hp("4%"),
  },
  reminderContainer: {
    flex: 1,
    paddingVertical: config.hp("1%"),
  },

  secondaryTitle: {
    color: "black",
    fontSize: config.hp("1.9%"),
    fontWeight: "500",
    paddingTop: 5,
  },
  secondaryTitleContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    //   paddingVertical: config.hp("1%"),
  },
  summary: {
    fontSize: config.hp("1.9%"),
    color: "black",
  },
  title: {
    fontSize: config.hp("2.5%"),
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  titleContainer: {
    paddingVertical: config.hp("1%"),
  },
  topContainer: {
    height: config.hp("20%"),
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingHorizontal: config.wp("4%"),
  },
});

export default RemindersScreen;
