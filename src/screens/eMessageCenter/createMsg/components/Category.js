import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import React, {
  useRef,
  useMemo,
  useCallback,
  useState,
  useEffect,
} from "react";
import { Ionicons } from "@expo/vector-icons";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

const Category = ({ showCategory, setShowCategory, handleChange }) => {
  const bottomSheetRef = useRef(); // ref
  const snapPoints = useMemo(() => [" 65%"], []); // variables
  const handleClosePress = () => bottomSheetRef.current.close();
  const handleExpand = () => bottomSheetRef.current.expand();

  function toggleBottomSheet() {
    setShowCategory(!showCategory);
    handleExpand();
  }
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
      <TouchableOpacity
        onPress={() => {
          handleChange("category", item.name),
            handleClosePress(),
            setShowCategory(false);
        }}
        style={styles.itemContainer}
      >
        <Text style={{ fontSize: 18 }}>{item.name}</Text>
      </TouchableOpacity>
    ),
    []
  );
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={showCategory ? 0 : -1}
      snapPoints={snapPoints}
      //onChange={handleSheetChanges}
      enablePanDownToClose
    >
      <View style={{ position: "relative", height: config.hp("6%") }}>
        <Text
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: 20,
            marginBottom: config.hp("2%"),
          }}
        >
          Select category
        </Text>
        <Ionicons
          onPress={() => {
            handleClosePress(), setShowCategory();
          }}
          style={{ position: "absolute", right: 8, top: 0 }}
          name="close"
          size={28}
          color="black"
        />
      </View>
      <BottomSheetFlatList
        data={data}
        keyExtractor={(i) => i.name}
        renderItem={renderItem}
      />
    </BottomSheet>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: config.wp("2%"),
    paddingVertical: config.hp("2%"),
    flexDirection: "column",
    alignItems: "center",
    //justifyContent: "center",
    paddingTop: config.hp("5%"),
    //padding: 24,
    //backgroundColor: "grey",
  },
  contentContainer: {
    //flex: 1,
    //alignItems: "center",
    //paddingHorizontal: config.wp("2%"),
  },
  itemContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: config.wp("2%"),
    paddingVertical: config.hp("2%"),
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
});

export default Category;
