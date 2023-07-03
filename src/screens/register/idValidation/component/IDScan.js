import { View, Text, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { theme } from "../../../../config/Theme";
import { config } from "../../../../config/Config";

const IDScan = ({ setType, toggleOptions, payload }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
      }}
    >
      {payload.frontImage ? (
        <View
          style={{
            alignItems: "center",
            //paddingHorizontal: config.wp("20%"),
            justifyContent: "center",
            borderRightColor: "gray",
            borderWidth: 1,
            borderRadius: 25,
            marginBottom: config.hp("4%"),
            //paddingVertical: config.hp("2%"),
            // backgroundColor: payload.frontImage
            //   ? "white"
            //   : theme.colors.fadedLight,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setType("Front");
              toggleOptions();
            }}
            style={{ alignItems: "center" }}
          >
            <Image
              resizeMode="cover"
              resizeMethod="scale"
              source={{ uri: `data:image/png;base64,${payload.frontImage}` }}
              style={{
                width: config.wp("90%"),
                height: config.hp("25%"),
                borderRadius: 25,
              }}
            ></Image>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            alignItems: "center",
            paddingHorizontal: config.wp("20%"),
            justifyContent: "center",
            borderRightColor: "gray",
            borderWidth: 1,
            borderRadius: 25,
            marginBottom: config.hp("4%"),
            paddingVertical: config.hp("1%"),
            backgroundColor: payload.frontImage
              ? "white"
              : theme.colors.fadedLight,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setType("Front");
              toggleOptions();
            }}
            style={{ alignItems: "center" }}
          >
            <Text
              style={{
                fontSize: 20,
                color: theme.colors.primary,
                fontWeight: "600",
                marginBottom: 8,
              }}
            >
              Front
            </Text>
            <AntDesign
              name="idcard"
              size={70}
              color={payload.frontImage ? theme.colors.primary : "white"}
              style={{ marginBottom: 8 }}
            />
            <Text style={{ fontSize: 18, textAlign: "center" }}>
              Please take a picture of the front of your Id
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {payload.backImage ? (
        <View
          style={{
            alignItems: "center",
            //paddingHorizontal: config.wp("20%"),
            justifyContent: "center",
            borderRightColor: "gray",
            borderWidth: 1,
            borderRadius: 25,
            marginBottom: config.hp("4%"),
            //paddingVertical: config.hp("2%"),
            // backgroundColor: payload.frontImage
            //   ? "white"
            //   : theme.colors.fadedLight,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setType("Front");
              toggleOptions();
            }}
            style={{ alignItems: "center" }}
          >
            <Image
              resizeMode="center"
              resizeMethod="scale"
              source={{ uri: `data:image/png;base64,${payload.backImage}` }}
              style={{
                width: config.wp("90%"),
                height: config.hp("25%"),
                borderRadius: 25,
              }}
            ></Image>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            alignItems: "center",
            paddingHorizontal: config.wp("20%"),
            justifyContent: "center",
            borderRightColor: "gray",
            borderWidth: 1,
            borderRadius: 25,
            paddingVertical: config.hp("1%"),
            marginBottom: config.hp("6%"),
            backgroundColor: payload.backImage
              ? "white"
              : theme.colors.fadedLight,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setType("Back");
              toggleOptions();
            }}
            style={{ alignItems: "center" }}
          >
            <Text
              style={{
                fontSize: 20,
                color: theme.colors.primary,
                fontWeight: "600",
                marginBottom: 8,
              }}
            >
              Back
            </Text>
            <AntDesign
              name="idcard"
              size={70}
              color={theme.colors.primary}
              style={{ marginBottom: 8 }}
            />
            <Text style={{ fontSize: 18, textAlign: "center" }}>
              Please take a picture of the back of your Id
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default IDScan;
