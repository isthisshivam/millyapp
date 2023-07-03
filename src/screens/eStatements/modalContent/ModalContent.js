import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { styles } from "./style";
const ModalContent = ({ toggleModal, account, enabled }) => {
  return (
    <View style={styles.backGroundContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {`${account.account}'s E-statements are now ${
            enabled ? "enabled" : "disabled"
          }`}
        </Text>
        <TouchableOpacity
          style={styles.closeButton}
          activeOpacity={0.65}
          onPress={() => toggleModal()}
        >
          <Text style={styles.buttonText}>Ok</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalContent;
