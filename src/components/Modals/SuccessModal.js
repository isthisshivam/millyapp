import React, { useEffect } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../config/Theme";
import { config } from "../../config/Config";
import Button from "../Button";

const SuccessModal = ({ showSuccessModal, message, message2, closeModal }) => {
  return (
    <Modal animationType="slide" transparent visible={showSuccessModal}>
      <View
        style={{ width: "100%", height: "100%", backgroundColor: "#FFFFFF99" }}
      >
        <View
          style={{
            ...styles.centeredView,
          }}
        >
          <View
            style={{
              ...styles.modalView,
              height:
                message2 == undefined ? config.hp("45%") : config.hp("55%"),
            }}
          >
            <Text style={styles.modalText}>{message}</Text>
            <LottieView
              loop={false}
              autoPlay
              style={{
                width: 160,
                height: 160,
              }}
              source={require("../ui/79952-successful.json")}
            />
            {message2 ? (
              <Text style={styles.modalText}>{message2}</Text>
            ) : undefined}

            <View
              style={{
                height: "30%",
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Button
                text="Success"
                color="white"
                background={theme.colors.primary}
                height={50}
                width={200}
                radius={12}
                fontSize={20}
                onPress={() => closeModal()}
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
    width: config.wp("95%"),
  },
});

export default SuccessModal;
