import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { educationList } from "../interviewSection/Options";

const Education = ({ handleChange, toggleBottomSheet }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Education Level</Text>
      </View>

      <BottomSheetFlatList
        data={educationList}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.selectItem}
            onPress={() => {
              handleChange("Education", item);
              toggleBottomSheet();
            }}
          >
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.contentContainer}
      />
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
    flex: 1,
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
    paddingVertical: config.hp(".5%"),
  },

  titleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
  },

  title: {
    fontSize: 20,
    color: theme.colors.primary,
    fontWeight: "500",
    //paddingBottom: config.hp("2%"),
  },
});

export default Education;
