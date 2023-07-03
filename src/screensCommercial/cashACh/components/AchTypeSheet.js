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

const AchTypeSheet = ({
  payload,
  setPayload,
  showType,
  setShowType,
  handleChange,
}) => {
  const bottomSheetRef = useRef(); // ref
  const snapPoints = useMemo(() => [" 50%"], []); // variables
  const handleClosePress = () => bottomSheetRef.current.close();
  const handleExpand = () => bottomSheetRef.current.expand();
  let type = handleType(payload.requestType);
  let types = useSelector((state) => state.commercial.requestTypes);

  useEffect(() => {
    if (showType) {
      handleExpand();
    } else {
      handleClosePress();
    }
  }, [showType]);

  function select(id) {
    handleChange("requestType", id.toString());
    handleClosePress();
  }

  // render
  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        onPress={() => select(item.id)}
        style={{
          width: "100%",
          alignItems: "center",
          marginBottom: config.hp("1%"),
          borderBottomColor: theme.colors.faded,
          borderBottomWidth: 1,
          paddingVertical: config.hp("1%"),
        }}
      >
        <Text style={{ fontSize: 16 }}>{item.description}</Text>
      </TouchableOpacity>
    ),
    []
  );

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
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
              Select ACH Type
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
            data={types}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{}}
          />
        </View>
      </BottomSheet>
    </>
  );
};

export default AchTypeSheet;
