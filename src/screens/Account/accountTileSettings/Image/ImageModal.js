import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Modal,
} from "react-native";

import { theme } from "../../../../config/Theme";
import { config } from "../../../../config/Config";

const ImageModal = ({ toggleModal, showModal, pickImage, toggleCamera }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          {/* <View style={styles.titleContainer}>
            <Text style={styles.title}>Select Vehicle Year</Text>
          </View> */}
          <View style={styles.scrollContainer}>
            <TouchableOpacity
              onPress={() => (toggleModal(), pickImage())}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Upload Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => (toggleModal(), toggleCamera())}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Take Picture</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={toggleModal}
              style={[styles.button, styles.cancelButton]}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    width: config.wp("80%"),
    paddingVertical: config.hp(".8%"),
    borderRadius: config.hp(".5%"),
    elevation: config.hp(".5%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    marginBottom: 10,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: config.hp("2.10%"),
  },
  cancelButton: {
    backgroundColor: theme.colors.danger,
  },

  container: {
    width: config.wp("100%"),
    height: config.hp("45%"),
    backgroundColor: "white",
    borderRadius: config.hp("1%"),
    paddingVertical: config.hp("2%"),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  itemText: {
    fontSize: config.hp("2.5%"),
    textAlign: "center",
    paddingVertical: config.hp("1%"),
  },
  modalContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  scrollContainer: {
    paddingHorizontal: config.wp("5%"),
    backgroundColor: theme.colors.fadedBackground,
    flex: 1,
    marginBottom: config.hp("1%"),
    width: "100%",
    alignItems: "center",
  },

  separator: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.fade3,
  },

  selectItem: {
    width: "100%",
    paddingVertical: config.hp("1%"),
  },
  title: {
    fontSize: config.hp("2.5%"),
    paddingBottom: config.hp("2%"),
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ImageModal;
