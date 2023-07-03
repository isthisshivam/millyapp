import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Touchable,
} from "react-native";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

const RedeemModal = ({ showModal, toggleModal }) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.centeredView}>
          <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.title}>Congratulations</Text>
              <Text>You Just earned 0.00123 Bitcoin</Text>
              <Image
                source={{ uri: "../../../../assets/bitcoin.png" }}
                height="64"
                width="64"
              />
            </View>
            <View
              style={{
                height: "100%",
                alignItems: "flex-end",
                paddingTop: config.hp("4%"),
              }}
            >
              <TouchableOpacity
                onPress={toggleModal}
                style={{
                  backgroundColor: theme.colors.primary,
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{
                    paddingVertical: config.hp("2%"),
                    paddingHorizontal: config.wp("8%"),
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 22,
                  }}
                >
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  container: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    width: config.wp("80%"),
    height: config.hp("40%"),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    color: theme.colors.primary,
    fontWeight: "bold",
  },
});

export default RedeemModal;
