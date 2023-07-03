import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import * as Progress from "react-native-progress";
import { FontAwesome5 } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as ScreenOrientation from "expo-screen-orientation";
import Button from "../../../components/Button";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const CaptureImageModal = ({
  modalVisible,
  toggleModal,
  loading,
  type,
  capture,
  orientationIsLandscape,
  setOrientation,
}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (type) {
      function changeScreenOrientation() {
        if (orientationIsLandscape == true) {
          ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
          );
        } else if (orientationIsLandscape == false) {
          ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT
          );
        }
      }
      const toggleOrientation = () => {
        setOrientation(!orientationIsLandscape);
        changeScreenOrientation();
      };
    }
  }, []);

  if (hasPermission === null || hasPermission == false) {
    return (
      <View>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <Modal
      visible={modalVisible}
      presentationStyle="fullScreen"
      supportedOrientations={["portrait", "landscape"]}
    >
      <Camera
        onMountError={() => console.log("Camera could not mount")}
        ref={(ref) => setCamera(ref)}
        style={{
          ...styles.camera,
          alignItems: type == "Selfie" ? "flex-end" : "flex-start",
          justifyContent: "center",
        }}
        type={type == "Selfie" ? "front" : "back"}
      >
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
      <View style={styles.buttonContainer}>
        <Button
          text="Cancel"
          onPress={toggleModal}
          color="white"
          fontSize={22}
          background={"#f44336"}
          height={34}
          width={100}
          radius={16}
          fontWeight="bold"
        ></Button>

        <TouchableOpacity style={styles.button} onPress={() => capture(camera)}>
          <FontAwesome5 name="camera" size={40} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    zIndex: 10,
    height: "15%",
    width: "100%",
    bottom: 0,
    paddingHorizontal: config.wp("12%"),
    backgroundColor: "#bdbdbd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  camera: {
    height: "100%",
    width: "100%",
    position: "relative",
    flexDirection: "row",
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

export default CaptureImageModal;
