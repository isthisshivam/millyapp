import { View, Text } from "react-native";
import React, { useRef, useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { theme } from "../../../../config/Theme";
import { config } from "../../../../config/Config";
import Request from "./components/Request";

const Transmit = ({ navigation }) => {
  const data = useSelector((state) => state.commercial.pending);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        paddingVertical: config.hp("2%"),
        paddingHorizontal: config.wp("2%"),
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
        Transmit
      </Text>
      <Text style={{ marginBottom: config.hp("2%") }}>
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
          Requests Pending Transmit
        </Text>
        {data?.map((item, i) => {
          return (
            <Request key={i} item={item} navigation={navigation}></Request>
          );
        })}
      </View>
    </View>
  );
};

export default Transmit;
