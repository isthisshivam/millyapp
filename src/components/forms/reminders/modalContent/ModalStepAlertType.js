import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

const ModalStepAlertType = ({ handleChange, toggleModal }) => {
  const frequencyOptions = [
    { name: "Once" },
    {
      name: "Daily",
    },
    {
      name: "Weekly",
    },
    {
      name: "Bi-Weekly",
    },
    {
      name: "Monthly",
    },
    {
      name: "Bi-Monthly",
    },
    {
      name: "Semi-Anually",
    },
    {
      name: "Anually",
    },
  ];
  return (
    <>
      <View style={styles.modalInfoContainer}>
        {frequencyOptions.map((item, i) => (
          <TouchableOpacity
            activeOpacity={0.935}
            style={[styles.button, styles.topButton]}
            onPress={() => {
              handleChange("frequency", item.name);
              toggleModal();
            }}
          >
            <Text style={[styles.buttonText, styles.greenText]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
        {/* <TouchableOpacity
          activeOpacity={0.935}
          style={[styles.button, styles.middleButton]}
          onPress={() => {
            handleChange("frequency", "Weekly");
            toggleModal();
          }}
        >
          <Text style={[styles.buttonText, styles.greenText]}>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.935}
          style={[styles.button, styles.middleButton]}
          onPress={() => {
            handleChange("frequency", "Bi-Weekly");
            toggleModal();
          }}
        >
          <Text style={[styles.buttonText, styles.greenText]}>Bi-Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.935}
          style={[styles.button, styles.bottomButton]}
          onPress={() => {
            handleChange("frequency", "Monthly");
            toggleModal();
          }}
        >
          <Text style={[styles.buttonText, styles.greenText]}>Monthly</Text>
        </TouchableOpacity> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    paddingVertical: config.hp("2%"),
    paddingHorizontal: config.wp("1%"),
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomButton: {
    borderBottomRightRadius: config.hp("1%"),
    borderBottomLeftRadius: config.hp("1%"),
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  greenText: {
    color: theme.colors.primary,
  },
  middleButton: {
    borderBottomWidth: config.hp(".1%"),
    borderBottomColor: theme.colors.disabled,
  },
  modalInfoContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "100%",
  },
  topButton: {
    borderTopRightRadius: config.hp("1%"),
    borderTopLeftRadius: config.hp("1%"),
    borderBottomWidth: config.hp(".1%"),
    borderBottomColor: theme.colors.disabled,
  },
});

export default ModalStepAlertType;
