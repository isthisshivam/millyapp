import { View, Text, FlatList } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { config } from "../../config/Config";
import PendingItem from "./components/PendingItem";
import { theme } from "../../config/Theme";

const Pending = () => {
  const state = useSelector((state) => state.commercial);
  const renderItem = ({ item }) => <PendingItem item={item} />;
  return (
    <View
      style={{
        paddingHorizontal: config.wp("2%"),
        paddingVertical: config.hp("2%"),
      }}
    >
      <Text
        style={{ fontSize: 24, fontWeight: "500", color: theme.colors.primary }}
      >
        Commercial
      </Text>
      <Text style={{ marginBottom: config.hp("2%") }}>Pending Approval</Text>
      <FlatList
        data={state.pending}
        renderItem={renderItem}
        keyExtractor={(item) => item.confirmation?.toString()}
      />
    </View>
  );
};

export default Pending;
