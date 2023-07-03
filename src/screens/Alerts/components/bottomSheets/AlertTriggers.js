import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import {
  AlertTypeEnum,
  ComparisonOperators,
} from "../../../../../types/alerts/alertTypes";

const AlertTriggers = ({ handleChange, closeSheet }) => {
  let triggers = [
    { name: "Less than", value: ComparisonOperators.LessThan, id: 0 },
    { name: "Greater than", value: ComparisonOperators.GreaterThan, id: 1 },
    //{ name: "Equal to", value: "=", id: 2 },
  ];
  const renderItem = useCallback(({ item }) => {
    return (
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
            handleChange("comparisonOperator", item.value), closeSheet();
          }}
          style={{
            flexDirection: "row",
            itemsc: "center",
            justifyContent: "center",
            marginBottom: config.hp("1%"),
            borderBottomColor: theme.colors.faded,
            borderBottomWidth: 1,
            width: "80%",
            paddingVertical: config.hp("1.5%"),
          }}
        >
          <Text style={{ fontSize: 18 }}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }, []);
  return (
    <BottomSheetFlatList
      data={triggers}
      keyExtractor={(i) => i.name}
      renderItem={renderItem}
      contentContainerStyle={{ paddingTop: config.hp("1%") }}
    />
  );
};

export default AlertTriggers;
