import React, { useState, useEffect } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Camera } from "expo-camera";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import {
  handleCheckImage1,
  handleCheckImage2,
} from "../../../store/actions/CheckImagesActions";

import Button from "../../../components/Button";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import client from "../../../../utils/client";

const CaptureImageModal = ({
  modalVisible,
  setModalVisible,
  cancelModal,
  view,
  popup,
  setPopup,
  setPayload,
  payload,
}) => {
  const [camera, setCamera] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const checksState = useSelector((state) => state.checkImages);
  const loadingState = checksState.loading;

  const capture = async () => {
    try {
      setLoading(true);
      if (camera) {
        if (view === "Front") {
          const data = await camera.takePictureAsync();
          setPayload({ ...payload, checkImage1: data.uri });
          dispatch(handleCheckImage1(data.uri));
          cancelModal();
          setModalVisible(false);
        } else {
          const data = await camera.takePictureAsync();
          setPayload({ ...payload, checkImage2: data.uri });
          dispatch(handleCheckImage2(data.uri));
          cancelModal();
          setModalVisible(false);
        }
      }
      if (loadingState === false) {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Popup = () => (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: config.hp("12%"),
        alignItems: "center",
        justifyContent: "center",
        height: config.hp("50%"),
      }}
    >
      <View style={styles.popupContainer}>
        <Text style={{ fontSize: 16, paddingBottom: 4 }}>
          Please make sure that
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "500",
            paddingBottom: 4,
            color: theme.colors.primary,
          }}
        >
          For mobile deposit at
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "500",
            paddingBottom: 4,
            color: theme.colors.primary,
          }}
        >
          {client.clientName}
        </Text>
        <Text style={{ fontSize: 16 }}>is written below your signature</Text>
        <View style={{ marginTop: 25 }}>
          <Button
            text="OK"
            radius={12}
            fontSize={20}
            background={theme.colors.primary}
            color="white"
            height={35}
            width={125}
            onPress={() => setPopup(false)}
          ></Button>
        </View>
      </View>
    </View>
  );

  return (
    <Modal
      style={{ flex: 1 }}
      visible={modalVisible}
      presentationStyle="fullScreen"
      supportedOrientations={["landscape", "portrait"]}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <Camera
        onMountError={() => console.log("Camera could not mount")}
        ref={(ref) => setCamera(ref)}
        style={styles.camera}
        type="back"
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

        {/* {popup == true && view == "Back" ? <Popup></Popup> : undefined} */}
      </Camera>
      <View style={styles.buttonContainer}>
        <Button
          text="Cancel"
          onPress={() => setModalVisible(false)}
          color="white"
          fontSize={22}
          background={"#f44336"}
          height={34}
          width={100}
          radius={16}
          fontWeight="bold"
        ></Button>

        <TouchableOpacity style={styles.button} onPress={capture}>
          <FontAwesome5 name="camera" size={40} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
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
    position: "absolute",
    bottom: 0,
    zIndex: 20,
  },
  camera: {
    flex: 1,
    position: "relative",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  popupContainer: {
    height: config.hp("25%"),
    width: "90%",
    borderRadius: 12,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: config.hp("2%"),
    flexDirection: "column",
    borderWidth: 1,
  },
});

export default CaptureImageModal;
