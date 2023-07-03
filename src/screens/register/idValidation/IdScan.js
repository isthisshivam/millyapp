import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { VerifyID, VerifySelfie } from "../../../store/actions/RegisterActions";
import CaptureImageModal from "./CaptureImageModal";
import { pickImage, capture } from "../../../../utils/cameraUtils";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import OptionsModal from "./component/OptionsModal";
import IDScan from "./component/IDScan";
import SelfieScan from "./SelfieScan";
import ErrorModal from "../../../components/Modals/ErrorModal";

const IdScan = ({
  handleNext,
  navigation,
  handleChange,
  user,
  handleBack,
  setUser,
}) => {
  const state = useSelector((state) => state.register);
  const [hasPermission, setHasPermission] = useState(null);
  //const [orientationIsLandscape, setOrientation] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [idVerified, setIdVerified] = useState(false);
  const [type, setType] = useState("Front");
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    frontImage: undefined,
    backImage: undefined,
    DocumentType: 1,
    faceImage: undefined,
    captureMethod: 0,
    //ssn:""
  });

  //console.log(payload);

  const [status, setStatus] = useState({
    error: false,
    showSuccess: false,
    showError: false,
    attempts: 0,
    state: false,
    message: undefined,
    showDelete: false,
    disabled: true,
    loading: false,
    idVerified: false,
  });

  function toggleModal() {
    setModalVisible(!modalVisible);
  }
  function toggleOptions() {
    setShowOptions(!showOptions);
  }

  function closeError() {
    setStatus({
      ...status,
      error: false,
    });
  }

  ///Take a Picture: Front, Back, and Selfie
  const capture = async (camera) => {
    try {
      const data = await camera.takePictureAsync({ base64: true, quality: 0 });
      if (type == "Front") {
        setPayload({ ...payload, frontImage: data.base64 });
        toggleModal();
      }
      if (type == "Back") {
        setPayload({ ...payload, backImage: data.base64 });
        toggleModal();
      }
      if (type == "Selfie") {
        setPayload({ ...payload, faceImage: data.base64 });
        toggleModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  function verify() {
    dispatch(VerifyID(payload));
    setPayload({
      ...payload,
      frontImage: undefined,
      backImage: undefined,
    });
    setStatus({
      ...status,
      loading: true,
    });
  }

  useEffect(() => {
    if (payload.frontImage && payload.backImage && !status.loading) {
      verify();
      return;
    }

    if (payload.faceImage && state.requestId) {
      let data = { faceImage: payload.faceImage, requestId: state.requestId };
      dispatch(VerifySelfie(data));

      setStatus({
        ...status,
        loading: true,
      });
    }

    if (payload.faceImage) {
      setUser({
        ...user,
        profilePic: payload.faceImage,
      });
    }
  }, [payload, state]);

  useEffect(() => {
    if (state.idVerified) {
      setStatus({
        ...status,
        loading: false,
        verified: true,
        attempts: state.attempts,
        idVerified: true,
      });
      setPayload({
        ...payload,
        frontImage: undefined,
        backImage: undefined,
        faceImage: undefined,
      });

      if (state.info) {
        let data = {
          country: state.info.abbr3Country,
          firstName: state.info.firstName,
          lastName: state.info.familyName,
          state: state.info.state,
          zip: state.info.zip,
          birthday: state.info.dob,
          city: state.info.city,
          address: state.info.address,
        };
        handleChange("info", data);
      }
    }

    if (state.failedVerify) {
      setPayload({
        ...payload,
        frontImage: undefined,
        backImage: undefined,
        faceImage: undefined,
      });
      setStatus({
        ...status,
        loading: false,
        verified: true,
        attempts: state.attempts,
        error: true,
      });

      handleNext();
    }

    if (state.disabled) {
      setStatus({
        ...status,
        disabled: true,
        loading: false,
      });
    }
    if (state.selfieVerified || state.selfieVerified == false) {
      setPayload({
        ...payload,
        frontImage: undefined,
        backImage: undefined,
        faceImage: undefined,
      });
      handleNext();
    }

    if (state.error) {
      setStatus({
        ...status,
        error: true,
        loading: false,
      });
    }
    return;
  }, [state]);

  async function getPermissions() {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  }

  useEffect(() => {
    getPermissions();
  }, []);

  if (hasPermission === null || false) {
    getPermissions();
    return <Text>No access to camera</Text>;
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
      <View style={{ marginBottom: config.hp("4%") }}>
        <Text
          style={{
            width: "100%",
            fontSize: 22,
            color: theme.colors.primary,
            fontWeight: "500",
            // marginBottom: config.hp("4%"),
          }}
        >
          Verification
        </Text>

        {status.attempts > 0 ? (
          <Text style={{ fontSize: 16, color: "red" }}>
            You have 1 more attempt remaining.
          </Text>
        ) : undefined}
      </View>
      {status.loading == true ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
            height: "100%",
            paddingTop: 25,
          }}
        >
          <LottieView
            loop
            autoPlay
            style={{
              width: 160,
              height: 160,
            }}
            source={require("../../../components/ui/loading-spinner.json")}
          />
          <Text>Verifying. This may take a while, please wait...</Text>
        </View>
      ) : status.idVerified ? (
        <SelfieScan
          setType={setType}
          toggleOptions={toggleOptions}
          handleNext={handleNext}
          status={status}
          payload={payload}
        ></SelfieScan>
      ) : (
        <IDScan
          payload={payload}
          setType={setType}
          toggleOptions={toggleOptions}
        ></IDScan>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          disabled={!status.idVerified}
          style={
            !status.idVerified
              ? { ...styles.button, backgroundColor: "lightgray" }
              : { ...styles.button }
          }
          onPress={() => {
            handleNext();
          }}
        >
          {!status.idVerified ? (
            <Text
              style={{
                color: "white",
                fontSize: config.hp("2.35%"),
                textAlign: "center",
              }}
            >
              Continue
            </Text>
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.blackButton}
          onPress={handleBack}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <OptionsModal
        toggleOptions={toggleOptions}
        toggleModal={toggleModal}
        showModal={showOptions}
        pickImage={pickImage}
        setPayload={setPayload}
        type={type}
        ImagePicker={ImagePicker}
        payload={payload}
      ></OptionsModal>
      <CaptureImageModal
        modalVisible={modalVisible}
        toggleModal={toggleModal}
        capture={capture}
        payload={payload}
        setPayload={setPayload}
        loading={loading}
        setLoading={setLoading}
        type={type}
        // orientationIsLandscape={orientationIsLandscape}
        // setOrientation={setOrientation}
      ></CaptureImageModal>
      <ErrorModal
        closeErrorModal={closeError}
        showErrorModal={status.error}
        error={"Please try again"}
      ></ErrorModal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  blackButton: {
    backgroundColor: "black",
    borderRadius: config.hp(".5%"),
    paddingVertical: config.hp("1.35%"),
    width: "100%",
    elevation: config.hp(".5%"),
    marginTop: config.hp("2%"),
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: config.hp(".5%"),
    paddingVertical: config.hp("1.35%"),
    width: "100%",
    elevation: config.hp(".5%"),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingVertical: config.hp("1%"),
    flex: 1,
  },
  buttonText: {
    color: "white",
    fontSize: config.hp("2.35%"),
    textAlign: "center",
  },
});

export default IdScan;
