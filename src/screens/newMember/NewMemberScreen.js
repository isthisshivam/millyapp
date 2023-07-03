import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";
import ReasonModal from "./modals/ReasonModal";

const NewMemberScreen = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);

  function handleChange(name, value) {
    navigation.goBack();
    setShowModal(false);
    //console.log(name, value);
  }

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(
      "https://mysasb.com/deposits/"
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headerTitle}>New Member Account</Text>
          <Text style={{ fontSize: 16 }}>
            You must have an account to enroll in online banking.
          </Text>
        </View>

        <View style={styles.optionContainer}>
          <Text style={styles.title}>
            Would you like to open an account now?
          </Text>
          <View style={styles.buttonContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",

                width: "50%",
              }}
            >
              <TouchableOpacity
                style={styles.yes}
                onPress={() => _handlePressButtonAsync()}
              >
                <Text style={styles.optionTitle}>Yes</Text>
                <Text style={styles.option}>Open Account</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",

                width: "50%",
              }}
            >
              <TouchableOpacity
                style={styles.yes}
                onPress={() => navigation.navigate("ChooseAccount")}
              >
                <Text style={styles.optionTitle}>No</Text>
                <Text style={styles.option}>Not Ready</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{ fontSize: 18 }}>Return to Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showModal ? (
        <ReasonModal
          setShowModal={setShowModal}
          handleChange={handleChange}
        ></ReasonModal>
      ) : undefined}
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    marginTop: config.hp("6%"),
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  container: {
    paddingVertical: config.hp("4%"),
    //paddingHorizontal: config.wp("2%"),
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  heading: {
    paddingBottom: config.hp("4%"),
    paddingHorizontal: config.wp("1.2%"),
  },
  headerTitle: {
    color: theme.colors.primary,
    fontSize: 22,
    fontWeight: "bold",
  },
  loginButton: {
    marginTop: 25,
  },
  option: {
    color: "white",
  },
  optionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: config.hp("12%"),
  },
  optionTitle: {
    fontSize: 22,
    color: "white",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "500",
  },
  yes: {
    flexDirection: "column",
    alignItems: "center",
    color: "white",
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    paddingVertical: config.hp("2%"),
    paddingHorizontal: config.wp("2%"),
    width: config.wp("40%"),
    borderRadius: 12,
    elevation: config.hp("1%"),
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: "black",
  },
});

export default NewMemberScreen;
