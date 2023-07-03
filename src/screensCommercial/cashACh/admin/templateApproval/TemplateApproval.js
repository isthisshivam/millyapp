import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import { useSelector } from "react-redux";
import Template from "./components/Template";

const TemplateApproval = ({ navigation }) => {
  const state = useSelector((state) => state.commercial);
  const [templates, setTemplates] = useState([]);

  const renderItem = ({ item }) => (
    <Template item={item} navigation={navigation}></Template>
  );

  useEffect(() => {
    if (state.templates?.length > 0) {
      setTemplates(state.templates);
    }
  }, [state]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Template Approval</Text>
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
      <FlatList
        data={templates}
        renderItem={renderItem}
        keyExtractor={(item) => item.recordId?.toString()}
      />
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
