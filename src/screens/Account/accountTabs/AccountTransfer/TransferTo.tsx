import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Carousel from "../../../../components/Carousel/Carousel";
import { config } from "../../../../config/Config";

const TransferTo = ({
  data,
  navigation,
  colors,
  handleChange,
  accountTransferTo,
}) => {
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

      height: 270,
      paddingTop: config.deviceHeight * 0.0125,
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
