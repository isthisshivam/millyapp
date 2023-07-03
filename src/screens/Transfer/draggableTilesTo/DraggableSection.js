import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DraxProvider, DraxList } from "react-native-drax";
import { arrayMoveImmutable } from "array-move";
import AccountCard from "./AccountCard";
import { OrderTiles } from "../../../../utils/utils";
import { UpdateToOrder } from "../../../store/actions/TransferActions";

const DraggableSection = ({ navigation }) => {
  const state = useSelector((state) => state.accounts);
  const order = useSelector((state) => state.transfers.toOrder);
  const accounts = state.accounts.filter((item) => item.isLoan == true);
  const [data, setData] = useState(OrderTiles(accounts, order));
  const dispatch = useDispatch();

  const orderChanged = (data) => {
    let order = data.map((item) => {
      return item.accountId;
    });
    let array = { accountIds: order };
    dispatch(UpdateToOrder(array));
  };

  useEffect(() => {
    setData(OrderTiles(accounts, order));
  }, [order]);

  return (
    <DraxProvider>
      <View style={{ width: "100%" }}>
        <DraxList
          //onTouchMove={true}
          //maintainVisibleContentPosition={true}
          contentContainerStyle={{ width: "100%" }}
          data={data}
          renderItemContent={({ item }) => (
            <AccountCard account={item} navigation={navigation}></AccountCard>
          )}
          onItemReorder={({ fromIndex, toIndex }) => {
            //setData(arrayMoveImmutable(items, fromIndex, toIndex));
            orderChanged(arrayMoveImmutable(data, fromIndex, toIndex));
          }}
          keyExtractor={(item) => item.accountId?.toString()}
        />
      </View>
    </DraxProvider>
  );
};

export default DraggableSection;
