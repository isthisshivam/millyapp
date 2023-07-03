import { View, Text, FlatList } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Request from "./Request";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

const AchRequests = ({ navigation }) => {
  const state = useSelector((state) => state.commercial);
  const data = state.achRequests;
  const renderItem = ({ item }) => (
    <Request item={item} navigation={navigation} />
  );

  return (
    <View
      style={{
        paddingHorizontal: config.wp("2%"),
        paddingVertical: config.hp("1%"),
        height: "100%",
      }}
    >
      <Text
        style={{
          color: theme.colors.primary,
          fontSize: 20,
          fontWeight: "500",
          width: "100%",
          textAlign: "left",
        }}
      >
        ACH Requests
      </Text>
      <Text style={{ marginBottom: config.hp("4%") }}>
        To approve, view details, or delete a request, click the the appropriate
        request below. All approvals must be received for a request before it
        will be transmitted.
      </Text>
      <View style={{ width: "100%" }}>
        <Text
          style={{
            width: "100%",
            textAlign: "left",
            fontSize: 18,
            marginBottom: config.hp("2%"),
          }}
        >
          ACH Requests Pending Approval
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.recordId?.toString()}
      />
    </View>
  );
};

export default AchRequests;
