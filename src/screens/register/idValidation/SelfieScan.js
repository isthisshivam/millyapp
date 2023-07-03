import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const SelfieScan = ({ toggleOptions, setType, status, payload }) => {
  return (
    <View style={{}}>
      {status.loading == true ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
            height: "100%",
            paddingTop: 25,
          }}
        >
          <LottieView
            loop
            autoPlay
            style={{
              width: 160,
              height: 160,
            }}
            source={require("../../../components/ui/loading-spinner.json")}
          />
          <Text>Verifying. This may take a while, please wait...</Text>
        </View>
      ) : (
        <View>
          {payload.faceImage ? (
            <TouchableOpacity
              onPress={() => {
                setType("Selfie");
                toggleOptions();
              }}
              style={{ alignItems: "center" }}
            >
              <Image
                resizeMode="cover"
                resizeMethod="scale"
                source={{ uri: `data:image/png;base64,${payload.faceImage}` }}
                style={{
                  width: config.wp("90%"),
                  height: config.hp("25%"),
                  borderRadius: 25,
                }}
              ></Image>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                alignItems: "center",
                paddingHorizontal: config.wp("20%"),
                justifyContent: "center",
                borderRightColor: "gray",
                borderWidth: 1,
                borderRadius: 25,
                paddingVertical: config.hp("2%"),
                marginBottom: config.hp("6%"),
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setType("Selfie");
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
                  Selfie
                </Text>
                <View
                  style={{
                    backgroundColor: "lightgray",
                    padding: 5,
                    borderRadius: 50,
                    marginBottom: 8,
                  }}
                >
                  <AntDesign
                    name="user"
                    size={60}
                    color={theme.colors.primary}
                  />
                </View>
                <Text style={{ fontSize: 18, textAlign: "center" }}>
                  Please take a selfie picture for verification
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default SelfieScan;
