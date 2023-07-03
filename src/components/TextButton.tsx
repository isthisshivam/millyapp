import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import * as SMS from "expo-sms";
import { config } from "../config/Config";
import { theme } from "../config/Theme";
import { useNavigation } from "@react-navigation/native";

const TextButton = () => {
  const [show, setShow] = useState(false);
  const navigation = useNavigation();

  const toggle = () => {
    setShow(!show);
  };

  const CreateText = async () => {
    toggle();
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(
        ["4071234567"],
        "My sample HelloWorld message"
      );

      // console.log(result);
    } else {
      // misfortune... there's no SMS available on this device
    }
  };

  return (
    <View
      style={{
        position: "absolute",
        bottom: 100,
        right: config.wp("4%"),
        alignItems: "flex-end",
      }}
    >
      {show ? (
        <>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CreateMsg");
              toggle();
            }}
            style={{
              alignItems: "center",
              backgroundColor: "white",
              borderWidth: 1,
              padding: 5,
              borderRadius: 7,
              marginBottom: config.hp("2%"),
              width: config.wp("30%"),
            }}
          >
            <Text style={{ fontSize: 16 }}>Send E-Msg</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={CreateText}
            style={{
              alignItems: "center",
              backgroundColor: "white",
              borderWidth: 1,
              padding: 5,
              borderRadius: 7,
              marginBottom: config.hp("2%"),
              width: config.wp("30%"),
            }}
          >
            <Text style={{ fontSize: 16 }}>Send Text</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggle}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: 60,
              height: 60,
              paddingVertical: config.hp("2%"),
              paddingHorizontal: config.wp("2%"),
              backgroundColor: theme.colors.primary,
              borderRadius: 100,
            }}
          >
            <FontAwesome name="pencil-square-o" size={32} color="white" />
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          onPress={toggle}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: 60,
            height: 60,
            paddingVertical: config.hp("2%"),
            paddingHorizontal: config.wp("2%"),
            backgroundColor: theme.colors.primary,
            borderRadius: 100,
          }}
        >
          <FontAwesome name="pencil-square-o" size={32} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TextButton;

const styles = StyleSheet.create({});
