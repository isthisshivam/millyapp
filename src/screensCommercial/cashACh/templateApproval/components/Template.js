import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { SelectTemplate } from "../../../../store/actions/CommercialActions";

const Template = ({ item, navigation }) => {
  const dispatch = useDispatch();

  function selectTemplate() {
    dispatch(SelectTemplate(item));
    navigation.navigate("TemplateRequestDetails");
  }
  return (
    <TouchableOpacity
      onPress={selectTemplate}
      style={{
        width: "100%",
        backgroundColor: "white",
        paddingVertical: config.hp("2%"),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: config.wp("2%"),
        borderRadius: 7,
        marginBottom: config.hp("1%"),
      }}
    >
      <View>
        <Text style={{}}>Template Name</Text>
        <Text style={{ fontSize: 18, textTransform: "capitalize" }}>
          {item.name}
        </Text>
      </View>
      <View>
        <Text>Company</Text>
        <Text style={{ fontSize: 18 }}>{item.companyId}</Text>
      </View>

      <View>
        <Text>Amount</Text>
        <Text style={{ fontSize: 18 }}>${item.maxAmount}</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons
          name="md-pencil"
          size={24}
          style={{ color: theme.colors.yellow, marginRight: 5 }}
        />
        <Ionicons name="trash" size={24} style={{ color: "#f44336" }} />
      </View>
    </TouchableOpacity>
  );
};

export default Template;
