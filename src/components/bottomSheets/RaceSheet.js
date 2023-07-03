import React, { useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";

const RaceSheet = ({ handleChange, closeSheet }) => {
  let data = [
    "White",
    "Black / African American",
    "Asian",
    "American Indian",
    "Native Hawaiian and other Pacific Islander",
    "Two or more Races",
    "Hispanic or Latino",
    "Other",
    "Prefer not to Disclose",
  ];
  const renderItem = useCallback(
    ({ item }) => (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            handleChange("race", item);
            closeSheet();
          }}
          style={{
            flexDirection: "row",
            itemsc: "center",
            justifyContent: "center",
            marginBottom: config.hp("1%"),
            borderBottomColor: theme.colors.faded,
            borderBottomWidth: 1,
            width: "80%",
            paddingVertical: config.hp("1%"),
          }}
        >
          <Text style={{ fontSize: 18 }}>{item}</Text>
        </TouchableOpacity>
      </View>
    ),
    []
  );
  return (
    <BottomSheetFlatList
      data={data}
      keyExtractor={(i) => i}
      renderItem={renderItem}
      //contentContainerStyle={styles.contentContainer}
    />
  );
};

export default RaceSheet;
