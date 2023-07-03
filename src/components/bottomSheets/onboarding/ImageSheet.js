import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const ImageSheet = ({ handleChange, setShowCamera, closeSheet, type }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 0,
      base64: true,
    });

    // console.log(result);

    if (result) {
      //  setImage(result.base64);
      handleChange(type, result?.assets[0]?.base64);
    }
  };

  if (permission === null) {
    return <View />;
  }
  if (permission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={pickImage}
          style={{
            flexDirection: "row",
            itemsc: "center",
            justifyContent: "center",
            marginBottom: config.hp("1%"),
            borderBottomColor: theme.colors.faded,
            borderBottomWidth: 1,
            width: "80%",
            paddingVertical: config.hp("1%"),
          }}
        >
          <Text style={{ fontSize: 18 }}>Upload</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setShowCamera(true), closeSheet();
          }}
          style={{
            flexDirection: "row",
            itemsc: "center",
            justifyContent: "center",
            marginBottom: config.hp("1%"),
            borderBottomColor: theme.colors.faded,
            borderBottomWidth: 1,
            width: "80%",
            paddingVertical: config.hp("1%"),
          }}
        >
          <Text style={{ fontSize: 18 }}>Capture</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImageSheet;
