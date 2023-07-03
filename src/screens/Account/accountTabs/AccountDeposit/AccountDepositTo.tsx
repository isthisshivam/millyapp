import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Carousel from "../../../../components/Carousel/Carousel";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import { useAppSelector } from "../../../../store/Store";

const accountDepositTo = ({
  navigation,

  handleChange,
  depositAccount,
}) => {
  const data = useAppSelector((state) => state.accounts.accounts);

  const styles = StyleSheet.create({
    Cards: {
      height: "100%",
      overflow: "hidden",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: config.hp("1%"),
      paddingHorizontal: config.wp("1%"),
    },
    container: {
      width: "100%",
      backgroundColor: "white",
      paddingHorizontal: config.wp("3%"),
      height: config.hp("35%"),
      paddingTop: config.hp("1%"),
    },
    titleContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: config.hp(".5%"),
      paddingLeft: config.wp("1%"),
    },
    title: {
      color: theme.colors.primary,
      fontWeight: "bold",
      fontSize: config.hp("2.15%"),
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Deposit To:</Text>
      </View>
      <View style={styles.Cards}>
        <Carousel
          items={data}
          navigation={navigation}
          type={"account-deposit-from"}
          handleChange={handleChange}
          depositAccount={depositAccount}
        />
      </View>
    </View>
  );
};

export default accountDepositTo;
