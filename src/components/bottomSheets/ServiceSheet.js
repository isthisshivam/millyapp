import React, { useCallback, useRef, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";

const ServiceSheet = ({ streaming, selectStreaming }) => {
  //console.log(streaming);
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
          onPress={() => selectStreaming(item.title)}
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
          <Text style={{ fontSize: 18 }}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }, []);
  return (
    <BottomSheetFlatList
      data={streaming}
      keyExtractor={(i) => i.title}
      renderItem={renderItem}
      //contentContainerStyle={styles.contentContainer}
    />
  );
};

export default ServiceSheet;
