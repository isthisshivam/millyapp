import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";

const ModalContent = ({ setShowModal, navigation }) => {
  return (
    <View style={styles.backGroundContainer}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("QuickPayExisting");
              setShowModal(false);
            }}
          >
            <Text style={styles.buttonText}>Existing Merchant</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("AddNewMerchantWithPay");
              setShowModal(false);
            }}
          >
            <Text style={styles.buttonText}>New Merchant</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cancelButtonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              console.log("click");
              setShowModal(false);
            }}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ModalContent;
