import { View, Text, TouchableOpacity } from "react-native";
import React, { useRef, useMemo, useCallback } from "react";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";

const AccountsSheet = ({ handleChange, closeSheet }) => {
  const snapPoints = useMemo(() => ["50%"], []);
  const accounts = useSelector((state) => state.accounts.accounts);

  function handleSheetChange(name, value) {
    handleChange(name, value);
    closeSheet();
  }

  // render
  const renderItem = useCallback(({ item }) => {
    // console.log(item);
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
          <Text style={{ fontSize: config.hp("1.9%") }}>
            {item.nickname ? item.nickname : item.accountNAme}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <View
        style={{
          position: "relative",
          marginBottom: config.hp("2%"),
        }}
      >
        <Text
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: 20,
            color: theme.colors.primary,
            fontWeight: "500",
          }}
        >
          Select Account
        </Text>
        <Ionicons
          onPress={() => closeSheet()}
          style={{ position: "absolute", right: 8, top: 0 }}
          name="close"
          size={28}
          color="black"
        />
      </View>
      <BottomSheetFlatList
        data={accounts}
        keyExtractor={(item, i) => i}
        renderItem={renderItem}
        contentContainerStyle={{}}
      />
    </View>
  );
};

export default AccountsSheet;
