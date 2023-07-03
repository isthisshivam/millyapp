import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { SelectTemplate } from "../../../../store/actions/CommercialActions";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import { handleType } from "../../../components/functions";

const Template = ({ item, navigation }) => {
  let type = handleType(item.requestType);
  const dispatch = useDispatch();

  function selectTemplate() {
    dispatch(SelectTemplate(item));
    navigation.navigate("Edit Template");
  }

  return (
    <TouchableOpacity
      onPress={selectTemplate}
      style={{
        width: "100%",
        backgroundColor: "white",
        paddingVertical: config.hp("1%"),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: config.wp("2%"),
        borderRadius: 7,
        marginBottom: config.hp("1%"),
        //height: config.hp("20%"),
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: config.hp("1%"),
        }}
      >
        <View
          style={{ height: "100%", justifyContent: "flex-start", width: "60%" }}
        >
          <Text
            style={{
              fontSize: 18,
              textTransform: "capitalize",
              color: theme.colors.primary,
            }}
          >
            {item.templateName}
          </Text>

          <Text style={{ fontSize: 18, textAlign: "left" }}>
            {item.companyId}
          </Text>
        </View>
        <View style={{ height: "100%" }}>
          <Text style={{ fontSize: 18, color: theme.colors.primary }}>
            {type}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {/* <View
          style={{
            width: "45%",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={{ fontSize: 16 }}>Entered By:</Text>
            <Text style={{ fontSize: 16 }}>{item.debitAccount}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          ></View>
        </View> */}
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-end",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "50%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16 }}>Max Amount: </Text>
            <Text style={{ fontSize: 16 }}>${item.maxTxAmount}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "50%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16 }}>Account: </Text>
            <Text style={{ fontSize: 16 }}>{item.debitAccount}</Text>
          </View>
        </View>
      </View>
      {/* 
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Ionicons name="trash" size={28} style={{ color: "#f44336" }} />
      </View> */}
    </TouchableOpacity>
  );
};

export default Template;
