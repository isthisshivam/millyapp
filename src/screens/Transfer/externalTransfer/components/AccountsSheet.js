import { View, Text, TouchableOpacity } from "react-native";
import React, { useRef, useMemo, useCallback } from "react";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

const AccountsSheet = ({ bottomSheetRef, handleChange, handleClose }) => {
  const snapPoints = useMemo(() => ["50%"], []);
  const accounts = useSelector((state) => state.accounts.accounts);

  function handleSheetChange(name, value) {
    handleChange(name, value);
    handleClose();
  }

  // render
  const renderItem = useCallback(({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handleSheetChange("accountId", item.accountId)}
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
          <Text style={{ fontSize: config.hp("1.9%") }}>{item.accountId}</Text>
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
    >
      <BottomSheetFlatList
        data={accounts}
        //keyExtractor={(item, i) => i.toString()}
        renderItem={renderItem}
        //contentContainerStyle={styles.contentContainer}
      />
    </BottomSheet>
  );
};

export default AccountsSheet;
