import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import Button from "../../components/Button";
import { theme } from "../../config/Theme";
import { config } from "../../config/Config";
import { styles } from "./style";

const SecurityQuestionSection = ({ onSubmit, handleBack }) => {
  const [showModal, setShowModal] = useState(false);
  const [safe, setSafe] = useState(true);
  const [payload, setPayload] = useState({
    question: undefined,
    answer: undefined,
  });

  function toggleModal() {
    setShowModal(!showModal);
  }

  function handleChange(name, value) {
    setPayload({ ...payload, [name]: value });
  }
  //Clear answer when question changes
  useEffect(() => {
    setPayload({
      ...payload,
      answer: "",
    });
  }, [payload.question]);

  //Validation
  // useEffect(() => {
  //   if (payload.question !== undefined && payload.answer !== "") {
  //     setSafe(true);
  //   } else {
  //     setSafe(false);
  //   }
  // }, [payload]);

  function submit() {
    //Dispatch Action
  }

  const questions = [
    "In what city were you born?",
    "What is the name of your favorite pet?",
    "What is your mother's maiden name?",
    "What high school did you attend?",
    "What is the name of your first school?",
    "What was the make of your first car?",
    "What was your favorite food as a child?",
    "What was your childhood nickname?",
    "In what city did you meet your spouse/significant other?",
    "What is the name of your favorite childhood friend?",
    "What street did you live on in third grade?",
    "What is your oldest sibling’s birthday month and year? (e.g., January 1900)",
    "What is the middle name of your youngest child?",
    "What is your oldest sibling's middle name?",
    "What school did you attend for sixth grade?",
    "What was your childhood phone number including area code? (e.g., 000-000-0000)",
    "What is your oldest cousin's first and last name?",
    "What was the name of your first stuffed animal?",
  ];

  return (
    <>
      <View style={{ height: config.hp("50%") }}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Create Security Question</Text>
          <Text
            style={{
              fontSize: 18,
            }}
          >
            This security question is used to reset your password incase you
            forget it.
          </Text>
        </View>
        <View
          style={{
            marginBottom: config.hp("4%"),
          }}
        >
          <TouchableOpacity
            onPress={toggleModal}
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ fontSize: 20 }}
            >
              {payload.question ? payload.question : "Choose Security Question"}
            </Text>
            <AntDesign name="caretdown" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{}}>
          <TextInput
            onChangeText={(value) => handleChange("answer", value)}
            value={payload.answer}
            placeholder="Answer"
            style={{ height: config.hp("6%"), margin: config.hp("1%") }}
          ></TextInput>
        </View>
      </View>
      <Button
        text="Confirm"
        background={!safe ? theme.colors.inActive : theme.colors.primary}
        color="white"
        height={50}
        width="100%"
        fontSize={20}
        radius={7}
        disabled={!safe}
        onPress={onSubmit}
      ></Button>
      <TouchableOpacity
        // disabled={!formOneIsFilled}
        activeOpacity={0.85}
        style={{
          backgroundColor: "black",
          borderRadius: config.hp(".5%"),
          paddingVertical: config.hp("1.35%"),
          width: "100%",
          elevation: config.hp(".5%"),
          marginTop: config.hp("2%"),
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          handleBack();
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Back</Text>
      </TouchableOpacity>
      <Modal visible={showModal} animationType="fade" transparent={true}>
        <View
          style={{
            //backgroundColor: "white",
            flexDirection: "column",
            alignItems: "center",
            padding: 10,
            justifyContent: "flex-end",
            height: "100%",
          }}
        >
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Select Question</Text>
            </View>

            <SafeAreaView style={styles.scrollContainer}>
              <FlatList
                data={questions}
                keyExtractor={(item) => item.toString()}
                ItemSeparatorComponent={() => <View style={styles.seperator} />}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.selectItem}
                    onPress={() => {
                      handleChange("question", item);
                      toggleModal();
                    }}
                  >
                    <Text style={styles.itemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </SafeAreaView>
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
    </>
  );
};

export default SecurityQuestionSection;
