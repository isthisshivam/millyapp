import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import RedeemModal from "./modals/RedeemModal";
import { Ionicons } from "@expo/vector-icons";

import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const RedeemTab = () => {
  const treasure = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  function redeem() {
    treasure.current.play();
    setShowFireworks(true);
  }

  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          paddingHorizontal: config.wp("4%"),
        }}
      >
        <Text
          style={{
            fontSize: 24,
            color: "white",
            fontWeight: "bold",
          }}
        >
          Treasure Chest
        </Text>
        <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
          Each treasure chest contains a Bitcoin Reward
        </Text>
      </View>

      <LottieView
        ref={treasure}
        speed={2}
        loop={false}
        onAnimationFinish={toggleModal}
        style={{
          width: config.wp("30%"),
          height: config.hp("30%"),
        }}
        source={require("../../../components/ui/treasure.json")}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: config.hp("4%"),
        }}
      >
        <Ionicons name="star-sharp" size={32} color="#ffff8d" />
        <Text style={{ fontSize: 22 }}>25 Points</Text>
      </View>
      <TouchableOpacity style={styles.redeemButton} onPress={redeem}>
        <Text style={{ fontSize: 22, color: "white", fontWeight: "bold" }}>
          Redeem Now
        </Text>
      </TouchableOpacity>
      {showFireworks ? (
        <LottieView
          speed={2}
          loop={false}
          autoPlay={true}
          style={{
            width: config.wp("25%"),
            height: config.hp("25%"),
            bottom: 120,
          }}
          source={require("../../../components/ui/fireworks.json")}
        />
      ) : undefined}
      <RedeemModal
        showModal={showModal}
        toggleModal={toggleModal}
      ></RedeemModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", paddingVertical: config.hp("3%") },
  redeemButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: config.hp("1%"),
    paddingHorizontal: config.wp("28%"),
    alignItems: "center",
    borderRadius: 12,
  },
  treasure: {
    height: config.hp("35%"),
    width: config.wp("35%"),
  },
});

export default RedeemTab;
