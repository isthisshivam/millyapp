import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Carousel from "../../../../../../components/Carousel/Carousel";
import { styles } from "./style";
const TransferTo = ({ data, navigation, handleChange, accountTransferTo }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Transfer To:</Text>
      </View>
      <View style={styles.Cards}>
        <Carousel
          items={data}
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
