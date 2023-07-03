import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import * as ImagePicker from "expo-image-picker";
import ImageModal from "./Image/ImageModal";
import CameraModal from "./Image/CameraModal";
import { Camera } from "expo-camera";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const ImagePickerSection = ({
  image,
  setImage,
  backgroundColor,
  mainTextColor,
  secondaryTextColor,
}) => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [loading, setLoading] = useState(false);
  const [camera, setCamera] = useState(null);

  //Get users permission to access photos and camera
  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      setHasGalleryPermission(galleryStatus.status == "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log(status);

      setHasCameraPermission(status == "granted");
    })();
  }, []);

  // if (hasCameraPermission == false) {
  //   return <Text>No access to camera</Text>;
  // }

  //Upload Image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled && !result.base64) {
      console.log("File not base64, check that it is an image");
      //Add error handling
      return;
    }
    setImage(result?.base64);
  };

  const capture = async () => {
    setLoading(true);
    if (camera) {
      const data = await camera.takePictureAsync({
        quality: 1,
        base64: true,
        aspect: [4, 3],
      });

      setImage(data?.base64);
      setLoading(false);
      toggleCamera();
    }
  };

  function toggleModal() {
    setShowModal(!showModal);
  }

  async function toggleCamera() {
    if (!showCamera) {
      setShowCamera(!showCamera);
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    }
    if (showCamera) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
      setShowCamera(!showCamera);
    }
  }

  const styles = StyleSheet.create({
    accountContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      paddingHorizontal: config.wp("1.2%"),
    },
    accountNumber: {
      fontSize: config.hp("2.25%"),
      letterSpacing: config.wp(".2%"),
      color: secondaryTextColor,
    },
    balance: {
      fontSize: config.hp("4.5%"),
      letterSpacing: 1,
      color: secondaryTextColor,
    },
    balanceContainer: {
      marginBottom: config.hp("1.5%"),
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: config.hp("1%"),
      paddingHorizontal: config.wp("5%"),
      borderRadius: config.hp("1.5%"),
      elevation: config.hp(".5%"),
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      fontSize: config.hp("2.25%"),
      color: "white",
      fontWeight: "bold",
    },
    card: {
      backgroundColor: backgroundColor,
      width: config.wp("70%"),
      height: config.hp("20%"),
      shadowOffset: {
        width: 0,
        height: config.hp("2%"),
      },
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      borderRadius: config.hp("2%"),
      paddingHorizontal: config.wp("2%"),
      paddingVertical: config.hp("2%"),
      elevation: config.hp("1%"),
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      shadowColor: "black",
    },
    cardBody: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      paddingVertical: config.hp("2%"),
      height: "100%",
      width: "100%",
    },
    cardColumn1: { height: "100%", width: "60%" },
    cardColumn2: {
      height: "100%",
      width: "40%",
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
    cardTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: config.wp("1.2%"),
    },
    container: {
      backgroundColor: "white",
      paddingVertical: config.hp("2.5%"),
      borderBottomWidth: config.hp(".1%"),
    },

    slide: {
      paddingHorizontal: config.wp("1.5%"),
      paddingBottom: config.hp("2.5%"),
      flexBasis: "100%",
      flex: 1,
      maxWidth: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
    },
    titleMain: {
      fontSize: config.hp("2.5%"),
      fontWeight: "bold",
      textTransform: "capitalize",
      color: mainTextColor,
    },
  });
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        paddingVertical: config.hp("2%"),
      }}
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleModal}>
          <Text style={styles.buttonText}>Upload Image </Text>
        </TouchableOpacity>
      </View>
      <ImageModal
        toggleModal={toggleModal}
        showModal={showModal}
        pickImage={pickImage}
        toggleCamera={toggleCamera}
      ></ImageModal>
      <CameraModal
        showCamera={showCamera}
        toggleCamera={toggleCamera}
        setCamera={setCamera}
        capture={capture}
        loading={loading}
      ></CameraModal>
    </View>
  );
};

export default ImagePickerSection;
