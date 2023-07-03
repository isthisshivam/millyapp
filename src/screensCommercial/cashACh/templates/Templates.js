import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { theme } from "../../../config/Theme";
import { config } from "../../../config/Config";
import Template from "./components/Template";
import { Feather } from "@expo/vector-icons";
import { GetTemplates } from "../../../store/actions/CommercialActions";

const Templates = ({ navigation }) => {
  const state = useSelector((state) => state.commercial.templates);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const renderItem = ({ item }) => (
    <Template item={item} navigation={navigation} />
  );

  useEffect(() => {
    if (state?.length > 0) {
      setData(state);
    }
  }, [state]);
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          textAlign: "left",
          width: "100%",
          color: theme.colors.primary,
        }}
      >
        Templates
      </Text>
      <Text>UI Messaging goes here</Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100%",
          //paddingTop: config.hp("1%"),
          marginBottom: config.hp("2%"),
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Add Template")}
          style={styles.boxContainer}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Add Template</Text>
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.recordId?.toString()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: theme.colors.primaryLight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    //width: config.wp("45%"),
    paddingVertical: config.hp("1%"),
    paddingHorizontal: config.wp("2%"),
    borderRadius: 7,
  },
  container: {
    paddingHorizontal: config.wp("2%"),
    paddingVertical: config.hp("2%"),
    height: "100%",
  },
});

export default Templates;
