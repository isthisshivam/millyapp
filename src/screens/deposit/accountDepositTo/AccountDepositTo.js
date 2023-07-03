import React from "react";
import { View, Text } from "react-native";
import Carousel from "../../../components/Carousel/Carousel";
import { styles } from "./style";
const AccountDepositTo = ({
  data,
  navigation,
  handleChange,
  depositAccount,
}) => {
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

export default AccountDepositTo;
