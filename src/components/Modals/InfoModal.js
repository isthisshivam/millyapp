import React, { useState } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../config/Theme";
import { config } from "../../config/Config";
import Button from "../Button";

const InfoModal = ({ showModal, closeInfoModal, info }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <View
        style={{ width: "100%", height: "100%", backgroundColor: "#00000099" }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Ionicons
              name="warning"
              size={60}
              color="#ffb300"
              style={{ paddingTop: config.hp("2%") }}
            />
            <Text style={styles.modalText}>{info}</Text>

            <View
              style={{
                height: "30%",
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Button
                text="Continue"
                color="white"
                background="#ffb300"
                height={50}
                width={200}
                radius={12}
                fontSize={20}
                onPress={closeInfoModal}
              ></Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    paddingTop: config.hp("4%"),
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: config.hp("45%"),
    width: config.wp("95%"),
  },
});

export default InfoModal;
