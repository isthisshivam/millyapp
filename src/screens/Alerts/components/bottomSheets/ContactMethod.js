import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import { useSelector } from "react-redux";

const ContactMethod = ({ handleChange, closeSheet }) => {
  let methods = ["Email", "Text", "Phone"];
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
            handleChange(
              item == "Email" ? "email" : item == "Phone" ? "phone" : "text",
              true
            ),
              closeSheet();
          }}
          style={{
            flexDirection: "row",
            itemsc: "center",
            justifyContent: "center",
            marginBottom: config.hp("1%"),
            borderBottomColor: theme.colors.faded,
            borderBottomWidth: 1,
            width: "80%",
            paddingVertical: config.hp("2%"),
          }}
        >
          <Text style={{ fontSize: 18 }}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  }, []);
  return (
    <BottomSheetFlatList
      data={methods}
      keyExtractor={(i) => i}
      renderItem={renderItem}
      //contentContainerStyle={styles.contentContainer}
    />
  );
};

export default ContactMethod;
