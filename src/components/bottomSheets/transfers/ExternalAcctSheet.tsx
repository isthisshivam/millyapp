import React, { useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { FrequencyEnum, SavedAccount } from "../../../../types/transfer/types";
import { useAppSelector } from "../../../store/Store";
import AnimatedLottieView from "lottie-react-native";

type Props = {
  handleChange: (name: string, value: any) => void;
  closeSheet: () => void;
  toggleDelete: (item: SavedAccount) => void;
};

const ExternalAcctSheet = ({ handleChange, closeSheet, toggleDelete }) => {
  const state = useAppSelector((state) => state.transferHistory);

  const renderItem = useCallback(({ item }) => {
    // console.log(item);
    let account: SavedAccount = item;
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          borderBottomColor: theme.colors.faded,
          borderBottomWidth: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            handleChange("savedAccount", account), closeSheet();
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: config.hp("1%"),

            width: "80%",
            paddingVertical: config.hp("1%"),
          }}
        >
          <Text style={{ fontSize: 18 }}>{account.alias}</Text>
        </TouchableOpacity>
        <Ionicons
          onPress={() => toggleDelete(item)}
          name="trash"
          size={20}
          color="black"
        />
      </View>
    );
  }, []);
  return (
    <>
      {state.loading ? (
        <>
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
              source={require("../../ui/loading-spinner.json")}
            />
          </View>
        </>
      ) : (
        <BottomSheetFlatList
          data={state?.savedAccounts}
          keyExtractor={(item, i) => i?.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: config.wp("8%") }}
        />
      )}
    </>
  );
};

export default ExternalAcctSheet;
