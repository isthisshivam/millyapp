import React from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { Camera } from "expo-camera";
import Button from "../../../../components/Button";
import { theme } from "../../../../config/Theme";
import { config } from "../../../../config/Config";

const CameraModal = ({
  showCamera,
  setCamera,
  toggleCamera,
  capture,
  loading,
}) => {
  return (
    <Modal
      visible={showCamera}
      supportedOrientations={["portrait", "landscape"]}
    >
      <Camera ref={(ref) => setCamera(ref)} style={styles.camera} type="back">
        <View style={styles.buttonContainer}>
          <View style={{ width: 150, alignItems: "center" }}>
            <Button
              text="Cancel"
              onPress={toggleCamera}
              color="white"
              fontSize={22}
              background={"#f44336"}
              height={34}
              width={100}
              radius={16}
              fontWeight="bold"
            ></Button>
          </View>

          <View style={{ width: 150, alignItems: "center" }}>
            <TouchableOpacity style={styles.button} onPress={capture}>
              <FontAwesome5
                name="camera"
                size={40}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.loadingContainer}>
          {loading ? (
            <Progress.Circle
              size={60}
              indeterminate={true}
              thickness={9}
              color={theme.colors.primary}
              borderWidth={6}
            />
          ) : undefined}
        </View>
      </Camera>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: "15%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: config.wp("12%"),
    backgroundColor: "#bdbdbd",
  },
  camera: {
    height: "100%",
    width: "100%",
  },
  centeredView: {
    height: "100%",
    width: "100%",
    backgroundColor: "gray",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  popupContainer: {
    height: config.hp("25%"),
    width: config.wp("120%"),
    borderRadius: 12,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CameraModal;
