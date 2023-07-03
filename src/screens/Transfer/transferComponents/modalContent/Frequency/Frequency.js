import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";

import { theme } from "../../../../../config/Theme";
import { config } from "../../../../../config/Config";

const Frequency = ({ toggleFrequency, handleChange }) => {
  const frequencyOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "Until end date"];
  return (
    <View style={styles.modalContainer}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Select Frequency</Text>
        </View>

        <SafeAreaView style={styles.scrollContainer}>
          <FlatList
            data={frequencyOptions}
            keyExtractor={(item) => item.toString()}
            ItemSeparatorComponent={() => <View style={styles.seperator} />}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.selectItem}
                onPress={() => {
                  handleChange("frequency", item);
                  toggleFrequency();
                }}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => toggleFrequency()}
            style={[styles.button, styles.cancelButton]}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  acceptButton: {
    backgroundColor: theme.colors.primary,
  },
  button: {
    width: config.wp("40%"),
    paddingVertical: config.hp(".8%"),
    borderRadius: config.hp(".5%"),
    elevation: config.hp(".5%"),
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.whiteText,
    fontSize: config.hp("2.10%"),
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: theme.colors.danger,
  },
  container: {
    width: config.wp("100%"),
    height: config.hp("45%"),
    backgroundColor: "white",
    borderRadius: config.hp("1%"),
    paddingVertical: config.hp("2%"),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
  },

  itemText: {
    fontSize: config.hp("2.5%"),
    textAlign: "center",
    paddingVertical: config.hp("1%"),
  },
  modalContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  scrollContainer: {
    paddingHorizontal: config.wp("5%"),
    backgroundColor: theme.colors.fadedBackground,
    flex: 1,
    marginBottom: config.hp("1%"),
  },
  selectItem: {
    width: "100%",
    paddingVertical: config.hp("1%"),
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.fade3,
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: config.hp("2.5%"),
    paddingBottom: config.hp("2%"),
  },
});

export default Frequency;
