import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Button from "./Button";
import { FontAwesome5 } from "@expo/vector-icons";
import { config } from "../config/Config";
import { theme } from "../config/Theme";

const CaptureImage = ({ handleBack, capture, setCamera }) => {
  return (
    <View style={{ flex: 1 }}>
      <Camera style={styles.camera} type="back">
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: config.wp("4%"),
            paddingTop: config.hp("2%"),
          }}
        >
          <View style={{ width: config.wp("40%") }}>
            <Button
              text="Cancel"
              onPress={handleBack}
              color="white"
              fontSize={22}
              background={"#f44336"}
              height={34}
              width={100}
              radius={16}
              fontWeight="bold"
            ></Button>
          </View>

          <View style={{ width: config.wp("40%"), alignItems: "center" }}>
            <TouchableOpacity
              style={{
                ...styles.button,
                paddingHorizontal: config.wp("4%"),
              }}
              onPress={capture}
            >
              <FontAwesome5 name="camera" size={32} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  camera: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default CaptureImage;
