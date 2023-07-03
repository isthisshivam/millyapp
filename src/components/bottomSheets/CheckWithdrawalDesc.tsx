import React, { useCallback } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";
import globalStyles from "../../globalStyles/styles";

const CheckWithdrawalDesc = ({ handleChange, closeSheet }) => {
  const options = [
    "Description 1",
    "Description 2",
    "Description 3",
    "Description 4",
    "other",
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
            handleChange("description", item), closeSheet();
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
          <Text style={{ fontSize: 18 }}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  }, []);
  return (
    <>
      {/* <TextInput
        onChangeText={(text) => handleChange()}
        style={{ ...globalStyles.input }}
      /> */}
      <BottomSheetFlatList
        data={options}
        keyExtractor={(i) => i}
        renderItem={renderItem}
        //contentContainerStyle={styles.contentContainer}
      />
    </>
  );
};

export default CheckWithdrawalDesc;
