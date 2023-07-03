import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { useSelector } from "react-redux";
import Template from "./components/Template";

const TemplateApproval = ({ navigation }) => {
  const state = useSelector((state) => state.commercial);

  const templates = state?.templates;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TemplateApproval</Text>
      <Text style={{ marginBottom: config.hp("2%") }}>
        You can approve, edit, or deny templates submitted by users.
      </Text>

      <Text
        style={{
          fontSize: 16,
          fontWeight: "400",
          marginBottom: config.hp("1%"),
        }}
      >
        Templates Awaiting Approval
      </Text>

      {templates?.map((item, i) => {
        return (
          <Template key={i} item={item} navigation={navigation}></Template>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingVertical: config.hp("2%"),
    paddingHorizontal: config.wp("2%"),
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: theme.colors.primary,
  },
});

export default TemplateApproval;
