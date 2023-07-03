import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../../../config/Theme";
import { config } from "../../../config/Config";
import client from "../../../../utils/client";

const FirstScreen = ({ handleNext, onboardingStyles }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: theme.colors.primary,
              marginBottom: config.hp(".5%"),
            }}
          >
            Account successfully created.
          </Text>
          <Text style={{ fontSize: 16, marginBottom: config.hp("4%") }}>
            Thank you for choosing {client.clientName}. We still need some
            information to tailor our app to your specific financial situation
            and to provide you with a more personalized experience that matches
            your lifestyle.
          </Text>
          <View style={{ width: "100%", alignItems: "center" }}>
            <Image
              source={require("../../../../assets/wallet.png")}
              style={styles.image}
              resizeMode="contain"
            ></Image>
          </View>
        </View>
      </View>
      <View style={onboardingStyles.buttonContainer}>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, marginBottom: 10 }}>
            Lets set up your personalized experience.
          </Text>
        </View>
        <TouchableOpacity onPress={handleNext} style={onboardingStyles.button}>
          <Text style={onboardingStyles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    //alignItems: "center",
    paddingVertical: config.hp("4%"),
    paddingHorizontal: config.wp("4%"),
    backgroundColor: "white",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    elevation: config.hp("1%"),
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: "black",
    //height: config.hp("40%"),
    width: "100%",
    marginBottom: config.hp("4%"),
  },
  image: {
    width: config.wp("75%"),
    height: 200,
  },
});

export default FirstScreen;
