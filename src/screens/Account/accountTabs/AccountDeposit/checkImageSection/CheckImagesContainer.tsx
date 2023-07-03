import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { Camera } from "expo-camera";
import * as ScreenOrientation from "expo-screen-orientation";
import Ionicon from "react-native-vector-icons/Ionicons";
import {
  clearCheckImage1,
  clearCheckImage2,
} from "../../../../../store/actions/CheckImagesActions.js";

import { styles } from "./style";
import { config } from "../../../../../config/Config";
import Button from "../../../../../components/Button";
import CaptureImageModal from "../../../../deposit/checkImages/CaptureImageModal";
import { useAppDispatch } from "../../../../../store/Store.js";

const CheckImagesContainer = ({ setPayload, payload }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [popup, setPopup] = useState(false);
  const [view, setView] = useState("Front");
  const dispatch = useAppDispatch();

  //Get users permission to acces photos
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
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
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
    setModalVisible(true);
  };
  //Cancel image modal
  const cancelModal = async () => {
    setModalVisible(false);
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  };

  return (
    <View style={styles.container}>
      <View style={styled.titleContainer}>
        <Text style={styles.title}>Remote Deposit Capture</Text>
        <Text style={styles.helperText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod
          tempor incididunt ut labore.
        </Text>
      </View>
      <View style={styles.frontCheckContainer}>
        <Text style={styles.text}>Front of Check:</Text>

        {payload.checkImage1 ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              style={styled.frontCheckImage}
              source={{ uri: payload.checkImage1 }}
            />
            <Button
              text="Clear Image"
              color="black"
              height={50}
              width={150}
              radius={12}
              fontSize={18}
              marginTop={10}
              onPress={clearFrontImage}
            ></Button>
          </View>
        ) : (
          <View style={{ height: "100%", width: "100%" }}>
            <TouchableOpacity
              style={styled.checkFront}
              onPress={() => {
                setView("Front");
                toggleModal();
              }}
            >
              <Ionicon
                name="md-camera"
                size={32}
                style={styles.cameraIcon}
                color="black"
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.frontCheckContainer}>
        <Text style={styles.text}>Back of Check:</Text>

        {payload.checkImage2 ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              style={styled.frontCheckImage}
              source={{ uri: payload.checkImage2 }}
            />
            <Button
              text="Clear Image"
              color="black"
              height={50}
              width={150}
              radius={12}
              fontSize={18}
              marginTop={10}
              onPress={clearBackImage}
            ></Button>
          </View>
        ) : (
          <View style={{ height: "100%", width: "100%" }}>
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
    height: "80%",
    width: "100%",
  },
  camera: {
    height: "80%",
    width: "100%",
  },
  checkFront: {
    height: config.hp("30%"),
    width: config.wp("90%"),
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
  },
  frontCheckImage: {
    height: config.hp("30%"),
    width: config.wp("90%"),
  },
  frontCheckContainer: {
    paddingVertical: config.hp("4%"),
  },
  text: {},
  titleContainer: {
    marginBottom: 25,
  },
});

export default CheckImagesContainer;
