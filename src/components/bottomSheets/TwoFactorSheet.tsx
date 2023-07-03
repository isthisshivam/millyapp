import React, { useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";
import { useAppSelector } from "../../store/Store";
import { TwoFactorType } from "../../../types/auth/authTypes";

const TwoFactorSheet = ({ handleChange, closeSheet }) => {
  const state = useAppSelector((state) => state.auth);
  const renderItem = useCallback(({ item }) => {
    let data: TwoFactorType = item;
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
            handleChange("selectedProvider", data), closeSheet();
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: config.hp("1%"),
            borderBottomColor: theme.colors.faded,
            borderBottomWidth: 1,
            width: "80%",
            paddingVertical: config.hp("1%"),
          }}
        >
          <Text style={{ fontSize: 18 }}>{data.text}</Text>
        </TouchableOpacity>
      </View>
    );
  }, []);
  return (
    <BottomSheetFlatList
      data={state.twoFactorOptions}
      keyExtractor={(i: TwoFactorType) => i.value}
      renderItem={renderItem}
      //contentContainerStyle={styles.contentContainer}
    />
  );
};

export default TwoFactorSheet;
