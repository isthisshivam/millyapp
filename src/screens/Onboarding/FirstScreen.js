import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";
import ButtonContainer from "./ButtonContainer";

const FirstScreen = ({ step, next, cancel }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={require("../../../assets/wallet.png")}
          style={styles.image}
          resizeMode="contain"
        ></Image>
      </View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          Lets get started
        </Text>
        <Text>We make banking simple, easy, and intuitive.</Text>
        <Text>Lets set up your personalized experience.</Text>
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
          cancel={cancel}
        ></ButtonContainer>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: config.hp("4%"),
    backgroundColor: "white",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    elevation: config.hp("1%"),
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: "black",
    height: config.hp("40%"),
    width: "100%",
    marginBottom: config.hp("4%"),
  },
  image: {
    width: config.wp("75%"),
    height: 200,
  },
});

export default FirstScreen;
