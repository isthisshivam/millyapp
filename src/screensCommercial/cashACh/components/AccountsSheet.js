import { View, Text, TouchableOpacity, Image } from "react-native";
import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Ionicons, Feather } from "@expo/vector-icons";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { handleType } from "../../components/functions";
import { useSelector } from "react-redux";

const AccountsSheet = ({
  payload,
  showAccounts,
  handleChange,
  setShowAccounts,
  accountSheetRef,
}) => {
  const accountSheetRef = useRef(); // ref
  const snapPoints = useMemo(() => [" 50%"], []); // variables
  const handleClosePress = () => accountSheetRef.current.close();
  const handleExpand = () => accountSheetRef.current.expand();
  let accounts = useSelector((state) => state.accounts.accounts);

  useEffect(() => {
    if (showAccounts) {
      handleExpand();
    } else {
      handleClosePress();
    }
  }, [showAccounts]);

  function select(id) {
    handleChange("debitAccount", id);
    //setShowAccounts(false);
    handleClosePress();
  }

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        onPress={() => select(item.accountId)}
        style={{
          width: "100%",
          alignItems: "center",
          marginBottom: config.hp("1%"),
          borderBottomColor: theme.colors.faded,
          borderBottomWidth: 1,
          paddingVertical: config.hp("1%"),
        }}
      >
        <Text style={{ fontSize: 16 }}>{item.accountName}</Text>
      </TouchableOpacity>
    ),
    []
  );
  return (
    <>
      <BottomSheet
        ref={accountSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        //onClose={() => setShow(false)}
      >
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
              onPress={() => handleClosePress()}
              style={{ position: "absolute", right: 8, top: 0 }}
              name="close"
              size={28}
              color="black"
            />
          </View>
          <BottomSheetFlatList
            data={accounts}
            keyExtractor={(item) => item.accountNumber?.toString()}
            renderItem={renderItem}
            contentContainerStyle={{}}
          />
        </View>
      </BottomSheet>
    </>
  );
};

export default AccountsSheet;
