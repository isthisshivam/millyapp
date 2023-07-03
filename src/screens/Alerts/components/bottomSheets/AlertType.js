import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import { AlertTypeEnum } from "../../../../../types/alerts/alertTypes";

const AlertType = ({ handleChange, closeSheet }) => {
  let types = [
    AlertTypeEnum.AccountAlert,
    AlertTypeEnum.EventAlert,
    AlertTypeEnum.SmartAlert,
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
            handleChange("type", item), closeSheet();
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
          <Text style={{ fontSize: 18 }}>
            {item == AlertTypeEnum.AccountAlert
              ? "Account Alert"
              : item == AlertTypeEnum.EventAlert
              ? "Event Alert"
              : "Smart Alert"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }, []);
  return (
    <BottomSheetFlatList
      data={types}
      keyExtractor={(item, i) => i.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ paddingTop: config.hp("1%") }}
    />
  );
};

export default AlertType;
