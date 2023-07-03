import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Carousel from "../../../../../../components/Carousel/Carousel";
import { styles } from "./style";
const TransferFrom = ({
  data,
  navigation,
  handleTransferFromTouch,
  accountTransferFrom,
  handleChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Transfer From:</Text>
      </View>
      <View style={styles.Cards}>
        <Carousel
          items={data}
          navigation={navigation}
          type={"account-transfer-from"}
          handleTransferFromTouch={handleTransferFromTouch}
          accountTransferFrom={accountTransferFrom}
          handleChange={handleChange}
        />
      </View>
    </View>
  );
};

export default TransferFrom;
