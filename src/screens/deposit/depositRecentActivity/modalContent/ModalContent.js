import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import EntypIcon from "react-native-vector-icons/Entypo";

import { styles } from "./style";

const ModalContent = ({
  toggleModal,
  account,
  accountNumber,
  date,
  description,
  amount,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.RowContainer}>
        <Text style={styles.mainText}>Account</Text>
        <Text style={styles.secondaryText}>{account}</Text>
      </View>
      <View style={styles.RowContainer}>
        <Text style={styles.mainText}>Account Number</Text>
        <Text style={styles.secondaryText}>{accountNumber}</Text>
      </View>
      <View style={styles.RowContainer}>
        <Text style={styles.mainText}>Date</Text>
        <Text style={styles.secondaryText}>{date}</Text>
      </View>
      <View style={styles.ColumnContainer}>
        <Text style={styles.mainText}>Amount</Text>
        <Text style={styles.description}>{amount}</Text>
      </View>
      <View style={styles.ColumnContainer}>
        <Text style={styles.mainText}>Description</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.helpContainer}>
        <AntIcon
          name="phone"
          style={styles.helpIcon}
          onPress={() => {
            Linking.openURL(`tel:407-288-6765`);
          }}
        />
        <EntypIcon
          name="message"
          style={styles.helpIcon}
          onPress={() => {
            Linking.openURL(
              `sms:321-202-1242?body=I have Question about this transaction : ${accountNumber} `
            );
          }}
        />
        <EntypIcon name="new-message" style={styles.helpIcon} />
      </View>
      <View style={styles.centerContainer}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => {
            toggleModal();
          }}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalContent;
