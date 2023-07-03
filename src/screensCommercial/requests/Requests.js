import { View, Text, FlatList } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Request from "./components/Request";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";

const Requests = () => {
  const state = useSelector((state) => state.commercial);
  const renderItem = ({ item }) => <Request item={item} />;

  return (
    <View
      style={{
        paddingHorizontal: config.wp("2%"),
        paddingVertical: config.hp("2%"),
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "600",
          color: theme.colors.primary,
        }}
      >
        Commercial
      </Text>
      <Text style={{ marginBottom: config.hp("2%") }}>Pending Approval</Text>
      <FlatList
        data={state.request}
        renderItem={renderItem}
        keyExtractor={(item) => item.confirmation?.toString()}
      />
    </View>
  );
};

export default Requests;
