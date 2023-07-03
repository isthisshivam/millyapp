import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { config } from "../../../config/Config";
import { GetHistory } from "../../../store/actions/CommercialActions";
import Request from "./components/Request";

const History = ({ navigation }) => {
  const state = useSelector((state) => state.commercial.history);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const renderItem = ({ item }) => (
    <Request item={item} navigation={navigation} />
  );
  useEffect(() => {
    dispatch(GetHistory());
  }, []);

  useEffect(() => {
    setData(state);
  }, [state]);

  return (
    <View
      style={{
        paddingHorizontal: config.wp("2%"),
        paddingVertical: config.hp("1%"),
        flex: 1,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "500" }}>Commercial</Text>
      <Text style={{ marginBottom: config.hp("2%") }}>History</Text>
      <FlatList
        data={data}
        style={{ flex: 1 }}
        renderItem={renderItem}
        keyExtractor={(item) => item.recordId?.toString()}
      />
    </View>
  );
};

export default History;
