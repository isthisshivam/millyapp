import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
  SafeAreaView,
} from "react-native";

import { Xicon } from "../../../../../components/Icons";
import { config } from "../../../../../config/Config";
import { theme } from "../../../../../config/Theme";
import { styles } from "./style";

const SPACING = config.hp("2%");

const ModalContent = ({ toggleModal, handleChange, data }) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.inputContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            // disabled={!formOneIsFilled}
            disabled={true}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Choose Merchant</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => toggleModal()}
            activeOpacity={0.9}
          >
            <Xicon height={7.5} width={7.5} />
          </TouchableOpacity>
        </View>
      </View>
      <SafeAreaView style={styles.scrollContainer}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.merchantAccount.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.selectItem}
              onPress={() => {
                handleChange("merchantName", item.merchantName);
                toggleModal();
              }}
            >
              <Text style={styles.itemText}>{item.merchantName}</Text>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </View>
  );
};

export default ModalContent;
