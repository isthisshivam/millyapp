import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "../../../../components/Carousel/Carousel";
import { styles } from "./style";
import { theme } from "../../../../config/Theme";
import { OrderTiles } from "../../../../../utils/utils";

const TransferTo = ({ data, navigation, handleChange, accountTransferTo }) => {
  const order = useSelector((state) => state.transfers.toOrder);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    setAccounts(OrderTiles(data, order));
  }, [order]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Transfer To:</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>Press and hold tile to rearrange account order.</Text>
          <Ionicons name="ios-shuffle" size={24} color={theme.colors.primary} />
        </View>
      </View>
      <View style={styles.Cards}>
        <Carousel
          items={accounts}
          navigation={navigation}
          type={"account-transfer-to"}
          handleChange={handleChange}
          accountTransferTo={accountTransferTo}
        />
      </View>
    </View>
  );
};

export default TransferTo;
