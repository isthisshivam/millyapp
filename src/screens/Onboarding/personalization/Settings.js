import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { AntDesign } from "@expo/vector-icons";
import ButtonContainer from "../ButtonContainer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Settings = ({
  handleChange,
  payload,
  step,
  next,
  back,
  cancel,
  Submit,
  changeForm,
}) => {
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ flex: 1 }}
    >
      <Text
        style={{
          fontSize: 24,
          color: theme.colors.primary,
          fontWeight: "bold",
          textAlign: "left",
          marginBottom: config.hp("4%"),
        }}
      >
        Preferences
      </Text>
      <View
        style={{
          //width: "100%",
          marginBottom: config.hp("4%"),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: theme.colors.primary,
            fontWeight: "500",
            width: "45%",
          }}
        >
          Security Question
        </Text>
        <TouchableOpacity
          style={{ width: "70%" }}
          onPress={() => changeForm("Questions")}
        >
          {payload.passwordQuestion?.question ? (
            <Text style={{ fontSize: 16, width: "80%" }}>
              {payload.passwordQuestion?.question}
            </Text>
          ) : (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16, paddingRight: 10 }}>
                Select a question
              </Text>
              <AntDesign
                name="caretdown"
                size={20}
                style={{ color: theme.colors.primary }}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View
        style={{
          //width: "100%",
          marginBottom: config.hp("4%"),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: theme.colors.primary,
            fontWeight: "500",
          }}
        >
          Security Answer
        </Text>
        <TextInput
          onChangeText={(text) => handleChange("passwordAnswer", text)}
          placeholder="answer"
          style={{
            width: "55%",
            backgroundColor: "white",
            height: config.hp("4%"),
            borderRadius: 7,
            borderColor: theme.colors.faded,
            borderWidth: 1,
            paddingHorizontal: 5,
          }}
        />
      </View>

      <View style={{ flex: 3, justifyContent: "flex-end" }}>
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: config.hp("2%"),
          }}
        >
          <Text style={{ fontSize: 20 }}>Enable Push Notifications</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggle}
            value={isEnabled}
          />
        </View> */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: config.hp("2%"),
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 20 }}>Remember UserID</Text>
            <Text>Remember UserID for faster login.</Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: theme.colors.primary }}
            thumbColor={payload.rememberUserId ? "white" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(value) => handleChange("rememberUserId", value)}
            value={payload.rememberUserId}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: config.hp("2%"),
            width: "100%",
          }}
        >
          <View style={{ flexDirection: "column", width: "70%" }}>
            <Text style={{ fontSize: 20 }}>Enable Biometrics</Text>
            <Text style={{}}>
              Enable Biometrics to save time and increase security
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: theme.colors.primary }}
            thumbColor={"white"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(value) => handleChange("rememberDevice", value)}
            value={payload.rememberDevice}
          />
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          flex: 1,
        }}
      >
        <ButtonContainer
          step={step}
          next={next}
          back={back}
          cancel={cancel}
          navigation={null}
          Submit={Submit}
        ></ButtonContainer>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: config.wp("4%"),
    width: "100%",
  },
});

export default Settings;
