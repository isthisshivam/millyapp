import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import * as Device from "expo-device";

import { NewMerchant } from "../../../../store/actions/MerchantActions";
import StateModal from "./stateModal/StateModal";
import { styles } from "./style";

const AddMerchantWithPay = ({ navigation }) => {
  const merchants = useSelector((state) => state.merchants);
  const lastId = merchants.map((merchant) => merchant.id).sort((a, b) => b - a);

  //COMPONENT STATE
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isSafeToTransfer, setIsSafeToTransfer] = useState(false);
  const [payLoad, setPayLoad] = useState({
    merchantName: "",
    address1: "",
    address2: "",
    city: "",
    addressState: "",
    zip: "",
    account: "",
    id: lastId[0] + 1,
  });

  const handleChange = (name, value) => {
    setPayLoad({ ...payLoad, [name]: value });
  };

  ///REQUIRED FIELDS ENTERED? IF NOT DISABLE BUTTON
  useEffect(() => {
    if (
      payLoad.merchantName !== "" &&
      payLoad.address1 !== "" &&
      payLoad.city !== "" &&
      payLoad.zip !== "" &&
      payLoad.account !== "" &&
      payLoad.addressState !== ""
    ) {
      setIsSafeToTransfer(true);
    } else {
      setIsSafeToTransfer(false);
    }
  }, [payLoad]);

  //SAVE REQUEST TO BACKEND
  const requestData = {
    name: payLoad.merchantName,
    address1: payLoad.address1,
    address2: payLoad.address2,
    city: payLoad.city,
    addressState: payLoad.addressState,
    zip: payLoad.zip,
    account: payLoad.account,
    id: payLoad.id,
  };
  const submit = () => {
    dispatch(NewMerchant(requestData));
    navigation.navigate("PayMerchant", {
      company: payLoad.merchantName,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Device.osName == "ios" ? "padding" : "height"}
      style={styles.modalContainer}
    >
      <View style={styles.modalContentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Add Merchant</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>

          {isSafeToTransfer === true ? (
            <TouchableOpacity style={styles.saveButton} onPress={submit}>
              <Text style={styles.saveTextSafe}>Save</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity disabled={!isSafeToTransfer}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          )}
        </View>
        <ScrollView contentContainerStyle={styles.bodyContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              value={payLoad.merchantName}
              keyboardType={"default"}
              autoCompleteType={"name"}
              style={styles.input}
              placeholder="Merchant Name"
              onChangeText={(value) => handleChange("merchantName", value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={payLoad.address1}
              keyboardType={"default"}
              autoCompleteType={"street-address"}
              style={styles.input}
              placeholder="Address Line 1"
              onChangeText={(value) => handleChange("address1", value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={payLoad.address2}
              keyboardType={"default"}
              autoCompleteType={"street-address"}
              style={styles.input}
              placeholder="Address Line 2"
              onChangeText={(value) => handleChange("address2", value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={payLoad.city}
              keyboardType={"default"}
              autoCompleteType={"name"}
              style={styles.input}
              placeholder="City"
              onChangeText={(value) => handleChange("city", value)}
            />
          </View>
          <View style={styles.twoInputContainer}>
            <TouchableOpacity
              style={styles.inputExample2}
              onPress={() => setShowModal(true)}
            >
              <Text
                numberOfLines={1}
                style={
                  payLoad?.addressState !== ""
                    ? [styles.stateTitle, styles.stateTitleSelected]
                    : styles.stateTitle
                }
              >
                {payLoad?.addressState !== "" ? payLoad.addressState : "State"}
              </Text>
            </TouchableOpacity>
            <TextInput
              value={payLoad.zip}
              keyboardType={"number-pad"}
              style={styles.input2}
              placeholder="Zip"
              onChangeText={(value) => handleChange("zip", value)}
            />
          </View>

          <View
            behavior={Device.osName == "ios" ? "padding" : ""}
            style={styles.inputContainer}
          >
            <TextInput
              value={payLoad.account}
              keyboardType={"number-pad"}
              style={styles.input}
              placeholder="Account Number"
              onChangeText={(value) => handleChange("account", value)}
            />
          </View>
        </ScrollView>
        <Modal visible={showModal} transparent={true} animationType={"slide"}>
          <StateModal setShowModal={setShowModal} handleChange={handleChange} />
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddMerchantWithPay;
