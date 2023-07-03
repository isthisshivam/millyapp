import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import * as Device from "expo-device";
import { TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./style";
import StateModal from "./modalContent/StateModal";
import { theme } from "../../../config/Theme";
import { useSelector } from "react-redux";
import { KeyboardAvoidingView } from "react-native";
import DatePicker from "react-native-date-picker";

const RegisterForm2 = ({
  handleNext,
  infoChange,
  user,
  handleBack,
  setUser,
  numberChange,
}) => {
  const [showModal, setShowModal] = useState(false);
  const info = user.info;
  const [date, setDate] = useState(
    user?.info?.birthday ? new Date(user?.info?.birthday) : new Date()
  );
  const [open, setOpen] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Device.osName == "ios" ? "padding" : "padding"}
    >
      <View style={[styles.textContainerWelcome, styles.textContainer]}>
        <Text style={styles.textTitle}>Personal Info</Text>
        <Text style={styles.textSecondary}>
          Please verify your information below.
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder={
            user.info?.firstName ? user.info.firstName : "Enter your first name"
          }
          style={styles.input}
          autoCompleteType={"name"}
          //label="First Name"
          onChangeText={(value) => infoChange("firstName", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={
            user.info?.lastName ? user.info?.lastName : "Enter your last name"
          }
          style={styles.input}
          autoCompleteType={"name"}
          //label="Last Name"
          onChangeText={(value) => infoChange("lastName", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={
            user.info?.address ? user.info?.address : "Enter your Address"
          }
          style={styles.input}
          autoCompleteType={"street-address"}
          //label="Address Line 1"
          onChangeText={(value) => infoChange("address1", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={
            user.info?.address2 ? user.info?.address2 : "Enter your Address"
          }
          style={styles.input}
          autoCompleteType={"street-address"}
          //label="Address Line 2"
          onChangeText={(value) => infoChange("address2", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={user.info?.city ? user.info?.city : "Enter your city"}
          style={styles.input}
          //label="City"
          textContentType="addressCity"
          onChangeText={(value) => infoChange("city", value)}
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
            <Text style={styles.stateTitle2}>
              {user.info?.state ? user.info?.state : "Select State"}
            </Text>
          )}
        </TouchableOpacity>
        <TextInput
          placeholder={user.info?.zip ? user.info?.zip : "Enter your Zip Code"}
          maxLength={5}
          keyboardType={"numeric"}
          style={styles.inputExample}
          autoCompleteType={"postal-code"}
          //label="Zip-Code"
          onChangeText={(value) => infoChange("zip", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => setOpen(!open)} style={styles.input}>
          <Text style={{ fontSize: 22 }}>
            {user.info?.birthday
              ? user.info?.birthday
              : "Enter your date of birthday"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder={
            user.info?.email ? user.info?.email : "Enter your email address"
          }
          keyboardType={"email-address"}
          autoCompleteType={"email"}
          style={styles.input}
          //label="Email"
          onChangeText={(value) => infoChange("email", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={
            user.info?.mobilePhone
              ? user.info?.mobilePhone
              : "Enter your Mobile Phone Number"
          }
          keyboardType={"phone-pad"}
          autoCompleteType={"tel"}
          style={styles.input}
          //label="Mobile Phone"
          onChangeText={(value) => numberChange("mobilePhone", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={
            user.info?.workPhone
              ? user.info?.workPhone
              : "Enter your Work Phone Number"
          }
          keyboardType={"phone-pad"}
          style={styles.input}
          //label="Work Phone"
          onChangeText={(value) => numberChange("workPhone", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          textContentType="telephoneNumber"
          placeholder={
            user.info?.homePhone
              ? user.info?.homePhone
              : "Enter your Home Phone Number"
          }
          keyboardType={"phone-pad"}
          style={styles.input}
          //label="Home Phone"
          onChangeText={(value) => numberChange("homePhone", value)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          //disabled={!user.info?.firstName}
          activeOpacity={0.85}
          style={styles.button}
          onPress={() => {
            handleNext();
          }}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.blackButton}
          onPress={() => {
            handleBack();
          }}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={showModal} animationType="fade" transparent={true}>
        <StateModal
          infoChange={infoChange}
          user={user}
          setShowModal={setShowModal}
        />
      </Modal>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
          infoChange("birthday", date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default RegisterForm2;
