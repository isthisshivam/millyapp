import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { styles } from "./styles";

const AlertBalance = ({
  account,
  balance,
  accountNumber,
  id,
  transferFrom,
  toggleModal,
  handleChange,
}) => {
  return (
    <View style={styles.slide}>
      <TouchableOpacity
        style={
          id && id === transferFrom
            ? [styles.card, styles.cardIsSelected]
            : styles.card
        }
        onPress={() => {
          // handleTransferFromTouch(id);
          handleChange("selectAccount", { id, account });
          toggleModal();
        }}
      >
        <View style={styles.cardTop}>
          <View>
            <Text style={styles.titleMain}>Available Balance </Text>
          </View>
        </View>
        <View style={styles.balanceContainer}>
          <Text style={styles.balance}>${balance}</Text>
        </View>

        <View style={styles.accountContainer}>
          <View style={styles.accountContainer2}>
            <Text style={styles.titleMain}> {account} </Text>
            <Text style={styles.accountNumber}>{accountNumber}</Text>
          </View>
          {id && id === transferFrom ? (
            <AntDesignIcon
              name="checksquare"
              size={25}
              style={styles.iconSelected}
            />
          ) : (
            <AntDesignIcon name="checksquare" size={25} style={styles.icon} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AlertBalance;
