import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import { useSelector } from "react-redux";

import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import * as Device from "expo-device";

import { styles } from "./style";
import StateModal from "./modalContent/StateModal";

import { theme } from "../../../config/Theme";
import { config } from "../../../config/Config";

const RegisterForm2 = ({
  handleNext,
  handleChange,
  user,

  setUser,
  navigation,
}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const bitPanel = useSelector((state) => state.config);
  const secureSSN = bitPanel.bitPanel.maskSSN;
  const [scanned, setScanned] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    city: "",
    state: "",
    zip: "",
    dob: "",
  });

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await BarCodeScanner.requestPermissionsAsync();
  //     setHasPermission(status === "granted");
  //   })();
  // }, []);

  // const handleBarCodeScanned = ({ data }) => {
  //   setScanned(true);
  //   const parsed = parse(data, options);
  //   const temp = JSON.stringify(parsed, null, 2);
  //   setInfo(JSON.parse(temp));

  //   alert("Scanned Successfully");
  //   setScanning(false);
  // };

  useEffect(() => {
    setUser({
      ...user,
      firstName: info.firstName ? info.firstName : "",
      lastName: info.lastName ? info.lastName : "",
      address1: info.addressStreet ? info.addressStreet : "",
      city: info.addressCity ? info.addressCity : "",
      state: info.addressState ? info.addressState : "",
      zip: info.addressPostalCode ? info.addressPostalCode : "",
      dob: info.dateOfBirth ? info.dateOfBirth : "",
    });
  }, [info]);
  const options = {
    suppressErrors: true,
  };

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const toggleScanner = () => {
    setScanning(!scanning);
    if (scanning === false) {
      setScanned(false);
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Device.osName == "ios" ? "padding" : "height"}
      >
        <ScrollView style={{ flex: 1, paddingVertical: config.hp("4%") }}>
          <View style={[styles.textContainerWelcome, styles.textContainer]}>
            <Text style={styles.textTitle}>Personal Info</Text>
            <Text style={styles.textSecondary}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliquaenim ad
              minim veniamquis.
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={toggleScanner}
              style={{ alignItems: "center" }}
            >
              <AntDesign name="idcard" size={40} color={theme.colors.primary} />
              <Text style={{ fontSize: 18 }}>PrePopulate using</Text>
              <Text style={{ fontSize: 18 }}>ID/Drivers License</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              value={user.firstName}
              style={styles.input}
              autoCompleteType={"name"}
              label="First Name"
              placeholder="Enter your first name"
              onChangeText={(value) => handleChange("firstName", value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={user.lastName}
              style={styles.input}
              autoCompleteType={"name"}
              label="Last Name"
              placeholder="Enter your last name"
              onChangeText={(value) => handleChange("lastName", value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={user.address1}
              style={styles.input}
              autoCompleteType={"street-address"}
              label="Address Line 1"
              placeholder="Enter your Address"
              onChangeText={(value) => handleChange("address1", value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={user.address2}
              style={styles.input}
              autoCompleteType={"street-address"}
              label="Address Line 2"
              placeholder="Enter your Address"
              onChangeText={(value) => handleChange("address2", value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={user.city}
              style={styles.input}
              label="City"
              textContentType="addressCity"
              placeholder="Enter your city"
              onChangeText={(value) => handleChange("city", value)}
            />
          </View>
          <View style={styles.flexContainer}>
            <TouchableOpacity
              style={styles.inputExample2}
              onPress={() => {
                setShowModal(true);
              }}
              activeOpacity={0.85}
            >
              <Text style={styles.stateTitle}>State</Text>
              {user?.state !== "" && (
                <Text style={styles.stateTitle2}>{user.state}</Text>
              )}
            </TouchableOpacity>
            <TextInput
              value={user.zip}
              maxLength={5}
              keyboardType={"numeric"}
              style={styles.inputExample}
              autoCompleteType={"postal-code"}
              label="Zip-Code"
              placeholder="Enter your Zip Code"
              onChangeText={(value) => handleChange("zip", value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              value={user.email}
              keyboardType={"email-address"}
              autoCompleteType={"email"}
              style={styles.input}
              label="Email"
              placeholder="Enter your email address"
              onChangeText={(value) => handleChange("email", value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={user.mobilePhone}
              keyboardType={"phone-pad"}
              autoCompleteType={"tel"}
              style={styles.input}
              label="Mobile Phone"
              placeholder="Enter your Mobile Phone Number"
              onChangeText={(value) => handleChange("mobilePhone", value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={user.homePhone}
              keyboardType={"phone-pad"}
              style={styles.input}
              label="Home Phone"
              placeholder="Enter your Home Phone Number"
              onChangeText={(value) => handleChange("homePhone", value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={user.ssn}
              keyboardType={"numeric"}
              style={styles.input}
              label="SSN/TaxId"
              placeholder="Enter your SSN/TaxId"
              onChangeText={(value) => handleChange("ssn", value)}
              secureTextEntry={secureSSN}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={user.dob}
              keyboardType={"numeric"}
              style={styles.input}
              label="Date of birth"
              placeholder="Enter your date of birth"
              onChangeText={(value) => handleChange("dob", value)}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              // disabled={!formOneIsFilled}
              activeOpacity={0.85}
              style={styles.button}
              onPress={() => {
                handleNext();
              }}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity
              // disabled={!formOneIsFilled}
              activeOpacity={0.85}
              style={styles.blackButton}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Modal visible={showModal} animationType="fade" transparent={true}>
        <StateModal
          handleChange={handleChange}
          user={user}
          setShowModal={setShowModal}
        />
      </Modal>
      <Modal visible={scanning} transparent>
        {/* <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.barcodeScanner}
        >
          <View
            style={{ position: "absolute", alignItems: "center", top: 150 }}
          >
            <Text
              style={{
                fontSize: 20,
                backgroundColor: "white",
                textAlign: "center",
                padding: 5,
              }}
            >
              Scan the barcode on back of your
            </Text>
            <Text
              style={{
                fontSize: 20,
                backgroundColor: "white",
                textAlign: "center",
                padding: 5,
              }}
            >
              ID/License
            </Text>
            <SimpleLineIcons
              name="frame"
              size={config.hp("40%")}
              color="black"
              style={{ width: "100%", textAlign: "center" }}
            />
          </View>
          <TouchableOpacity
            onPress={toggleScanner}
            style={{
              position: "absolute",

              bottom: 100,
              backgroundColor: "#ffb300",
              paddingHorizontal: config.wp("4%"),
              paddingVertical: config.hp("1%"),
              borderRadius: 12,
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Cancel</Text>
          </TouchableOpacity>
        </BarCodeScanner> */}
      </Modal>
    </>
  );
};

export default RegisterForm2;
