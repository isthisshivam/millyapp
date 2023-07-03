import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import EntypIcon from "react-native-vector-icons/Entypo";

import { styles } from "./style";

const ModalContent = ({ date, setshowModal, company, amount }) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Bill pay History</Text>
        </View>
        <View style={styles.RowContainer}>
          <Text style={styles.mainText}>Date</Text>
          <Text style={styles.secondaryText}>{date}</Text>
        </View>
        <View style={styles.RowContainer}>
          <Text style={styles.mainText}>Company</Text>
          <Text style={styles.secondaryText}>{company}</Text>
        </View>
        <View style={styles.RowContainer}>
          <Text style={styles.mainText}>Amount</Text>
          <Text style={styles.secondaryText}>{amount}</Text>
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
                `sms:321-202-1242?body= I have Question about this Bill Pay transaction that occured on ${date}`
              );
            }}
          />
          <EntypIcon name="new-message" style={styles.helpIcon} />
        </View>
        <View style={styles.centerContainer}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
              setshowModal(false);
            }}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ModalContent;
