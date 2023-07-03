import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useCallback, useRef, useMemo, useState } from "react";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { AntDesign } from "@expo/vector-icons";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

const DeleteAccount = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  const [reason, setReason] = useState(undefined);
  const sheetRef = useRef(null);

  function handleSheetExpand() {
    sheetRef.current.expand();
  }
  function handleSheetClose() {
    sheetRef.current.close();
  }

  function selectReason(item) {
    setReason(item);
    handleSheetClose();
  }
  let options = [
    "Not enjoying it",
    "No longer need it",

    "App needs to be better",
    "Not enough features",
    "Too many features",
    "Another Reason",
  ];

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        onPress={() => selectReason(item)}
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 5,
          paddingVertical: config.hp("1%"),
          borderBottomColor: theme.colors.faded,
          borderBottomWidth: 1,
        }}
      >
        <Text style={{ fontSize: 18 }}>{item}</Text>
      </TouchableOpacity>
    ),
    []
  );
  return (
    <View style={styles.container}>
      <Text
        style={{ fontSize: 18, fontWeight: "500", color: theme.colors.primary }}
      >
        Delete Account Permanantly
      </Text>

      <Text
        style={{
          marginBottom: config.hp("4%"),
          fontSize: 16,
          fontWeight: "300",
        }}
      >
        If you would like to delete you account please be aware this will be
        permanant and effective immediately. All account information including
        purchased beats, contact info and other personal info will be deleted.
        We advise you download your beats before you delete your account.
      </Text>

      <Text style={{ fontSize: 18, fontWeight: "500" }}>
        We're sorry to see you go.
      </Text>
      <Text
        style={{
          marginBottom: config.hp("2%"),
          fontSize: 16,
          fontWeight: "300",
        }}
      >
        We'd love to know why you want to delete your account, so we can imporve
        the app and support our community .
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 18 }}>Reason:</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "50%",
            borderBottomColor: theme.colors.faded,
            borderBottomWidth: 1,
          }}
        >
          <TouchableOpacity onPress={handleSheetExpand}>
            <Text style={{ fontSize: 18, paddingRight: 20 }}>
              {reason ? reason : "Select Reason"}
            </Text>
          </TouchableOpacity>
          <AntDesign name="caretdown" size={24} color="black" />
        </View>
      </View>

      <View
        style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: config.hp("2%"),
            paddingHorizontal: config.wp("2%"),
          }}
        >
          <TouchableOpacity onPress={() => setChecked(!checked)}>
            <View
              style={{
                backgroundColor: checked
                  ? theme.colors.primary
                  : theme.colors.faded,
                width: 28,
                height: 28,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: theme.colors.fadedDark,
              }}
            ></View>
          </TouchableOpacity>
          <View style={{ paddingHorizontal: config.wp("2%") }}>
            <Text>
              By continuing you reviewed the disclousure above and wish to have
              your account deleted.
            </Text>
          </View>
        </View>
        <TouchableOpacity
          disabled={!checked}
          style={{
            backgroundColor: checked
              ? theme.colors.primary
              : theme.colors.faded,
            width: config.wp("75%"),
            marginBottom: 10,
            alignItems: "center",
            paddingVertical: config.hp("1.2%"),
            borderRadius: 7,
          }}
        >
          <Text style={{ fontSize: 16 }}>Delete Account</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={["35%"]}
        enablePanDownToClose
        //onChange={handleSheetChange}
      >
        <BottomSheetFlatList
          data={options}
          keyExtractor={(i) => i}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: config.wp("12%") }}
        />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: config.hp("2%"),
    paddingHorizontal: config.wp("2%"),
    flex: 1,
  },
});

export default DeleteAccount;
