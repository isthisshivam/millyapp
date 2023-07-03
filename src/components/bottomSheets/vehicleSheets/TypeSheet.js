import { View, Text, TouchableOpacity } from "react-native";
import React, { useRef, useMemo, useCallback } from "react";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const TypeSheet = ({ handleChange }) => {
  const snapPoints = useMemo(() => ["50%"], []);

  const data = [{ name: "Primary" }, { name: "Secondary" }, { name: "Other" }];

  function handleSheetChange(name, value) {
    handleChange(name, value);
  }

  // render
  const renderItem = useCallback(({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handleSheetChange("type", item.name)}
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
          <Text style={{ fontSize: config.hp("1.9%") }}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <BottomSheetFlatList
      data={data}
      keyExtractor={(item, i) => i}
      renderItem={renderItem}
      //contentContainerStyle={styles.contentContainer}
    />
  );
};

export default TypeSheet;
