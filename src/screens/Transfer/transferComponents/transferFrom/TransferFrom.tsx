import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "../../../../components/Carousel/Carousel";
import { styles } from "./style";
import { theme } from "../../../../config/Theme";
import { OrderTiles } from "../../../../../utils/utils";
import { useAppSelector } from "../../../../store/Store";

const TransferFrom = ({
  data,
  navigation,
  accountTransferFrom,
  handleChange,
}) => {
  const order = useAppSelector((state) => state.transfers.fromOrder);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    setAccounts(OrderTiles(data, order));
  }, [order]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Transfer From:</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>Press and hold to rearrange account tiles.</Text>
          <Ionicons name="ios-shuffle" size={24} color={theme.colors.primary} />
        </View>
      </View>
      <View style={styles.Cards}>
        <Carousel
          items={accounts}
          navigation={navigation}
          type={"account-transfer-from"}
          accountTransferFrom={accountTransferFrom}
          handleChange={handleChange}
        />
      </View>
    </View>
  );
};

export default TransferFrom;
