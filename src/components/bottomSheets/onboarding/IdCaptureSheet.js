import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const IdCaptureSheet = ({ handleChange, setShowCamera, type }) => {
  const [hasPermission, setHasPermission] = useState(null);

  const camera = useRef(null);
  const [orientation, setOrientation] = useState(1);

  //console.log(orientation);

  function handleScreenChange(event) {
    event.preventDefault();
    //console.log(event);
  }

  const capture = async () => {
    let result = await camera.current.takePictureAsync({ base64: true });
    handleChange(type, result.base64);
    setShowCamera(false);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Modal
      visible={true}
      supportedOrientations={["landscape", "portrait"]}
      onOrientationChange={(event) => handleScreenChange(event)}
      presentationStyle="fullScreen"
      style={{
        position: "absolute",
        //flex: 1,
        width: "100%",
        height: "100%",

        //backgroundColor: "blue",
      }}
    >
      <Camera
        ref={camera}
        style={{
          flex: 1,
          paddingHorizontal: config.wp("2%"),
          paddingVertical: config.hp("4%"),
        }}
        type={type == "faceImage" ? CameraType.front : CameraType.back}
      >
        <View
          style={{
            width: "100%",
            alignItems: "center",
            paddingHorizontal: config.wp("2%"),
            //paddingVertical: config.hp("2%"),
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity style={{}} onPress={() => setShowCamera(false)}>
            <MaterialCommunityIcons name="close" size={32} color="white" />
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={{}}
            onPress={() => {
              setType(
                type === CameraType.back ? CameraType.front : CameraType.back
              );
            }}
          >
            <MaterialCommunityIcons
              name="camera-flip-outline"
              size={32}
              color="white"
            />
          </TouchableOpacity> */}
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: config.hp("2%"),
          }}
        >
          <TouchableOpacity
            onPress={capture}
            style={{
              backgroundColor: theme.colors.primary,
              width: orientation == "portrait" ? "80%" : "45%",
              alignItems: "center",
              paddingVertical: config.hp("1%"),
              borderRadius: 12,
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
              Capture
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </Modal>
  );
};

export default IdCaptureSheet;
