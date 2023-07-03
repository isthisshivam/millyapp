import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { config } from "../../../../config/Config";
import globalStyles from "../../../../globalStyles/styles";
import { useAppSelector } from "../../../../store/Store";
import { ExternalHistoryItem } from "../../../../../types/transfer/types";
import { theme } from "../../../../config/Theme";

type Props = {};

const ExternalHistory = (props: Props) => {
  const state = useAppSelector((state) => state.transferHistory);
  const [data, setData] = useState<ExternalHistoryItem[]>([]);

  const Item = ({ item }) => {
    let historyItem: ExternalHistoryItem = item;
    return (
      <View
        style={{
          height: config.hp("4%"),
          borderBottomColor: theme.colors.primary,
          borderBottomWidth: 1,
        }}
      >
        <Text>{historyItem.destAccountRequests[0].amount}</Text>
      </View>
    );
  };

  useEffect(() => {
    if (state.externalHistory.length > 1) {
      setData(state.externalHistory);
    }
  }, [state]);

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: config.hp("2%"),
        paddingHorizontal: config.wp("4%"),
      }}
    >
      <Text style={globalStyles.title}>External Transfer History</Text>

      <FlatList
        data={data}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item, i) => i.toString()}
      />
    </View>
  );
};

export default ExternalHistory;

const styles = StyleSheet.create({});
