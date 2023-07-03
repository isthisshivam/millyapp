import { View, Text, TouchableOpacity } from "react-native";
import React, { useRef, useMemo, useCallback } from "react";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import data from "./vehicleData";

const ModelSheet = ({ handleChange, payload }) => {
  const snapPoints = useMemo(() => ["50%"], []);

  const vehicles = data
    .filter((item) => item.year.toString() == payload.year)
    .filter((item) => item.make == payload.make);

  function handleSheetChange(name, value) {
    handleChange(name, value);
  }

  // render
  const renderItem = useCallback(({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handleSheetChange("model", item.model)}
        style={{
          width: "100%",
          alignItems: "center",
          marginBottom: config.hp("2%"),
        }}
      >
        <View
          style={{
            width: "75%",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: config.hp("1%"),
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.faded,
          }}
        >
          <Text style={{ fontSize: config.hp("1.9%") }}>{item.model}</Text>
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {vehicles.length > 0 ? (
        <BottomSheetFlatList
          data={vehicles}
          keyExtractor={(item, i) => i}
          renderItem={renderItem}
          //contentContainerStyle={styles.contentContainer}
        />
      ) : (
        <Text>Select year and make first</Text>
      )}
    </View>
  );
};

export default ModelSheet;
