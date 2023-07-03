import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";
import ServicesModal from "./servicesModal/ServicesModal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import globalStyles from "../../globalStyles/styles";

const ChooseAccountScreen = ({ navigation }) => {
  const [showServices, setShowServices] = useState();

  const [payload, setPayload] = useState({
    firstName: undefined,
    lastName: undefined,
    phone: undefined,
    email: undefined,
    service: undefined,
    message: undefined,
    timeToContact: undefined,
  });

  function handleChange(name, value) {
    setPayload({
      ...payload,
      [name]: value,
    });
  }

  return (
    <>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text style={globalStyles.title}>Contact Form</Text>
        <Text style={{ marginBottom: config.hp("4%") }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
          blanditiis consectetur id ex! Nostrum qui officiis laborum dignissimos
          cupiditate quod ut consectetur, rerum autem! Repellendus corporis
          veniam similique nisi distinctio.
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            autoCompleteType={"name"}
            label="First Name"
            placeholder="First Name"
            onChangeText={(value) => handleChange("firstName", value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            autoCompleteType={"name"}
            label="Last Name"
            placeholder="Last Name"
            onChangeText={(value) => handleChange("lastName", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            autoComplete={"tel"}
            placeholder="Phone Number"
            keyboardType="number-pad"
            onChangeText={(value) => handleChange("phone", value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            autoComplete={"email"}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(value) => handleChange("email", value)}
          />
        </View>

        <TouchableOpacity
          style={styles.inputExample2}
          onPress={() => {
            setShowServices(true);
          }}
        >
          {payload?.service !== undefined ? (
            <>
              <Text style={styles.stateTitle2}>{payload?.service}</Text>
            </>
          ) : (
            <Text style={styles.stateTitle}>Select a Reason</Text>
          )}
        </TouchableOpacity>

        <View style={{ ...styles.inputContainer }}>
          <TextInput
            multiline={true}
            maxLength={120}
            style={{ ...styles.input, height: config.hp("20%") }}
            // autoComplete={"email"}
            placeholder="Additional questions or concerns"
            onChangeText={(value) => handleChange("email", value)}
          />
        </View>
      </KeyboardAwareScrollView>
      <View style={globalStyles.submitButtonContainer}>
        <TouchableOpacity style={globalStyles.submitButton}>
          <Text style={globalStyles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={showServices == true}
        animationType="fade"
        transparent={true}
      >
        <ServicesModal
          handleChange={handleChange}
          setShowModal={setShowServices}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: config.wp("4%"),

    //alignItems: "center",
    paddingVertical: config.hp("2%"),
    flex: 1,
  },
  input: {
    backgroundColor: "white",
    fontSize: config.hp("2.05%"),
    width: config.wp("80%"),
    height: config.hp("6%"),
    borderRadius: 12,
    paddingHorizontal: 5,
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputExample2: {
    paddingVertical: config.hp(".95%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingLeft: config.wp("2%"),
    fontSize: config.hp("2.05%"),
    width: config.wp("80%"),
    height: config.hp("6%"),
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 10,
  },
  stateTitle: {
    color: "black",
    fontSize: config.hp("1.9%"),
  },
  stateTitle2: {
    fontSize: config.hp("1.9%"),

    color: "black",
  },
});

export default ChooseAccountScreen;
