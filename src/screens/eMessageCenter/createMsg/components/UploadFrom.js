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

const UploadFrom = ({
  showOptions,
  setShowOptions,
  handleChange,
  pickImage,
  openCamera,
}) => {
  const bottomSheetRef = useRef(); // ref
  const snapPoints = useMemo(() => [" 35%"], []); // variables
  const handleClosePress = () => {
    bottomSheetRef.current.close();
    setShowOptions(false);
  };

  const handleExpand = () => bottomSheetRef.current.expand();

  function toggleBottomSheet() {
    setShowOptions(!showOptions);
    handleExpand();
  }
  const data = [
    { name: "Upload from library", type: "upload" },
    // {
    //   name: "Take a picture",
    //   type: "capture",
    // },
  ];
  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        onPress={() => {
          item.type == "upload" ? pickImage() : openCamera(),
            handleClosePress();
        }}
        style={styles.itemContainer}
      >
        <Text style={{ fontSize: 18, textAlign: "center", width: "100%" }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    ),
    []
  );
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={showOptions ? 0 : -1}
      snapPoints={snapPoints}
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
          Attach Image
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
    paddingHorizontal: config.wp("8%"),
    paddingVertical: config.hp("2%"),
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
});

export default UploadFrom;
