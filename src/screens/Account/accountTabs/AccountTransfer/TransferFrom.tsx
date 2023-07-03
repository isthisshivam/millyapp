import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Carousel from "../../../../components/Carousel/Carousel";
import { config } from "../../../../config/Config";
const TransferFrom = ({
  data,
  navigation,
  colors,
  handleTransferFromTouch,
  accountTransferFrom,
  handleChange,
}) => {
  config;
  const styles = StyleSheet.create({
    Cards: {
      height: "100%",
      overflow: "hidden",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
    },
    container: {
      width: "100%",
      backgroundColor: "white",
      paddingTop: config.deviceHeight * 0.0125,

      height: config.hp("35%"),
    },
    titleContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 5,
      paddingLeft: 10,
    },
    title: {
      color: colors.primary,
      fontWeight: "bold",
      fontSize: 18,
    },
  });
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
