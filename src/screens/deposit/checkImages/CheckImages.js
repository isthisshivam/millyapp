import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { styles } from "./style";
import Ionicon from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { Camera } from "expo-camera";
import * as ScreenOrientation from "expo-screen-orientation";
import {
  clearCheckImage1,
  clearCheckImage2,
} from "../../../store/actions/CheckImagesActions";

import CaptureImageModal from "./CaptureImageModal";
import { config } from "../../../config/Config";
import Button from "../../../components/Button";

const CheckImages = ({ setPayload, payload }) => {
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [popup, setPopup] = useState(false);
  const [view, setView] = useState("Front");

  //Get users permission to access photos
  useEffect(() => {
    try {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  //Clear Images
  const clearFrontImage = () => {
    setPayload({
      ...payload,
      checkImage1: "",
    });
    dispatch(clearCheckImage1());
  };
  const clearBackImage = () => {
    setPayload({
      ...payload,
      checkImage2: "",
    });
    dispatch(clearCheckImage2());
  };
  //Clear images on screen change
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        clearFrontImage();
        clearBackImage();
      };
    }, [])
  );

  //return error if no acces granted
  if (hasPermission === null) {
    return <View />;
  } else if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  //Toggle Modal Open/Close
  const toggleModal = async () => {
    try {
      // await ScreenOrientation.lockAsync(
      //   ScreenOrientation.OrientationLock.LANDSCAPE
      // );
      setModalVisible(true);
    } catch (error) {
      console.log(error);
    }
  };
  //Cancel image modal
  const cancelModal = async () => {
    try {
      setModalVisible(false);
      // await ScreenOrientation.lockAsync(
      //   ScreenOrientation.OrientationLock.PORTRAIT_UP
      // );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{}}>
        <Text style={styles.text}>Front of Check:</Text>

        {payload.checkImage1 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Image
              style={styled.frontCheckImage}
              source={{ uri: payload.checkImage1 }}
            />

            <TouchableOpacity onPress={clearFrontImage}>
              <Text style={{ fontSize: 16 }}>Clear Image</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ width: "100%", alignItems: "center" }}>
            <TouchableOpacity
              style={styled.checkFront}
              onPress={() => {
                setView("Front");
                toggleModal();
              }}
            >
              <Ionicon name="md-camera" size={32} style={styles.cameraIcon} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.frontCheckContainer}>
        <Text style={styles.text}>Back of Check:</Text>

        {payload.checkImage2 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Image
              style={styled.frontCheckImage}
              source={{ uri: payload.checkImage2 }}
            />
            <TouchableOpacity onPress={clearFrontImage}>
              <Text style={{ fontSize: 16 }}>Clear Image</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ width: "100%", alignItems: "center" }}>
            <TouchableOpacity
              style={styled.checkFront}
              onPress={() => {
                setView("Back");
                setPopup(true);
                toggleModal();
              }}
            >
              <Ionicon name="md-camera" size={32} style={styles.cameraIcon} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <CaptureImageModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        cancelModal={cancelModal}
        view={view}
        payload={payload}
        setPayload={setPayload}
        popup={popup}
        setPopup={setPopup}
      ></CaptureImageModal>
    </View>
  );
};

const styled = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  camera: {
    height: "80%",
    width: "100%",
  },
  checkFront: {
    height: config.hp("20%"),
    width: config.wp("80%"),
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  frontCheckImage: {
    height: config.hp("20%"),
    width: config.wp("80%"),
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  frontCheckContainer: {
    height: 100,
  },

  text: {
    marginBottom: config.hp("1%"),
  },
  titleContainer: {
    marginBottom: 25,
  },
});

export default CheckImages;
