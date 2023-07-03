import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

const AlertActions = ({ handleChange, closeSheet }) => {
  let actions = [
    { name: "Alert", value: 0 },
    { name: "Alert and Transfer", value: 1 },
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
            handleChange("action", item.value), closeSheet();
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
          <Text style={{ fontSize: 18 }}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }, []);
  return (
    <BottomSheetFlatList
      data={actions}
      keyExtractor={(i) => i.name}
      renderItem={renderItem}
      //contentContainerStyle={styles.contentContainer}
    />
  );
};

export default AlertActions;
