import React, { useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const MsgCategory = ({ handleChange }) => {
  const data = [
    { name: "Transaction Dispute" },
    {
      name: "Fraud",
    },
    {
      name: "Receipt",
    },
    {
      name: "Statement",
    },
    {
      name: "Balance",
    },
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
            handleChange("category", item.name);
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
    ),
    []
  );
  return (
    <BottomSheetFlatList
      data={data}
      keyExtractor={(item, i) => i}
      renderItem={renderItem}
      //contentContainerStyle={styles.contentContainer}
    />
  );
};

export default MsgCategory;
