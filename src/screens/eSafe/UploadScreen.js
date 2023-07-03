import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ScreenOrientation from "expo-screen-orientation";
import { Camera } from "expo-camera";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

import { UploadItem, GetESafe } from "../../store/actions/eSafeActions";
import CategoryModal from "./CategoryModal";
import SuccessModal from "../../components/Modals/SuccessModal";
import ErrorModal from "../../components/Modals/ErrorModal";

import { theme } from "../../config/Theme";
import { config } from "../../config/Config";
import ButtonContainer from "./buttonContainer/ButtonContainer";
import Button from "../../components/Button";

const UploadScreen = (props) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [formFilled, setFormFilled] = useState(false);
  const status = useSelector((state) => state.eSafe);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const [camera, setCamera] = useState(null);

  const [payload, setPayload] = useState({
    title: "",
    category: "",
    data: "",
  });

  const handleChange = (name, value) => {
    setPayload({ ...payload, [name]: value });
  };

  function toggleError() {
    setShowErrorModal(!showErrorModal);
  }

  const handleScreenChange = () => {
    //Scroll to top on screen change
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
  };
  // //Upload item to redux/backend
  const upload = () => {
    setLoading(true);
    let data = {
      filename: payload.title,
      data: payload.data,
      category: payload.category,
    };
    dispatch(UploadItem(data));
  };

  const closeModal = () => {
    props.navigation.navigate("items");
    setLoading(false);
    setShowSuccessModal(false);
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      setHasPermission(status == "granted");
    })();
  }, [camera]);

  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  const openCamera = async () => {
    setShowCamera(true);
    // await ScreenOrientation.unlockAsync();
    // await ScreenOrientation.lockAsync(
    //   ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    // );
  };

  const closeCamera = async () => {
    // await ScreenOrientation.unlockAsync();
    // await ScreenOrientation.lockAsync(
    //   ScreenOrientation.OrientationLock.PORTRAIT_UP
    // );
    setShowCamera(false);
  };

  const capture = async () => {
    //setLoading(true);
    const data = await camera.takePictureAsync({
      quality: 1,
      base64: true,
      aspect: [4, 3],
    });
    setPayload({ ...payload, data: data?.base64 });
    // await ScreenOrientation.unlockAsync();
    // await ScreenOrientation.lockAsync(
    //   ScreenOrientation.OrientationLock.PORTRAIT_UP
    // );
    setShowCamera(false);
  };

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    setPayload({
      ...payload,
      data: pickerResult.base64,
    });
  };

  useEffect(() => {
    if (payload.data !== "" && payload.title !== "") {
      setFormFilled(true);
    }
  }, [payload]);

  useEffect(() => {
    if (status.uploadStatus == true) {
      setShowSuccessModal(true);

      setPayload({
        title: "",
        category: "",
        data: "",
      });
    }
    if (status.error) {
      setError(error);
      toggleError();
    }
  }, [status]);

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <ButtonContainer
          isSelected={true}
          {...props}
          handleScreenChange={handleScreenChange}
        />

        <View style={styles.container}>
          <Text style={styles.text}>eSafe</Text>
          <Text style={{ marginBottom: 20 }}>
            You can upload a copy of your receipts, transactions, mobile deposit
            checks, or even your passport or ID to have it securely saved for
            wen you need it{" "}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              text="Choose File"
              width={150}
              height={50}
              fontSize={18}
              background={theme.colors.primary}
              color="white"
              radius={12}
              onPress={openImagePickerAsync}
              marginBottom={config.hp("2%")}
            ></Button>
            <Button
              text="Take Picture"
              width={150}
              height={50}
              fontSize={18}
              background={theme.colors.primary}
              color="white"
              radius={12}
              onPress={openCamera}
              marginBottom={config.hp("2%")}
            ></Button>
          </View>

          {loading ? (
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
                source={require("../../components/ui/loading-spinner.json")}
              />
            </View>
          ) : (
            <>
              <View style={styles.inputContainer}>
                <Text style={{ fontSize: 20, paddingTop: config.hp("2%") }}>
                  Title
                </Text>
                <TextInput
                  keyboardType="default"
                  label="Title"
                  placeholder="Title"
                  onChangeText={(value) =>
                    setPayload({
                      ...payload,
                      title: value,
                    })
                  }
                  style={styles.input}
                ></TextInput>

                <View style={{ paddingTop: config.hp("6%"), width: "100%" }}>
                  <Button
                    text={
                      payload.category ? payload.category : "Select Category"
                    }
                    onPress={() => setShowModal(true)}
                    fontSize={20}
                  ></Button>
                </View>
              </View>

              <View style={styles.divider}></View>
              <View style={{ alignItems: "center", width: "100%" }}>
                {payload.data ? (
                  <Image
                    source={{ uri: `data:image/jpg;base64,${payload.data}` }}
                    resizeMode="contain"
                    style={styles.image}
                  ></Image>
                ) : undefined}
              </View>
              <View style={styles.uploadContainer}>
                <Button
                  text="Upload"
                  height={65}
                  width={300}
                  background={
                    !formFilled ? theme.colors.faded : theme.colors.primary
                  }
                  color="white"
                  radius={12}
                  fontSize={22}
                  onPress={upload}
                  disabled={!formFilled}
                ></Button>
              </View>
            </>
          )}
        </View>

        <Modal visible={showModal} transparent={true} animationType={"fade"}>
          <CategoryModal
            setShowModal={setShowModal}
            handleChange={handleChange}
          ></CategoryModal>
        </Modal>
        <SuccessModal
          showSuccessModal={showSuccessModal}
          message="Item Successfully Saved to eSafe!"
          closeModal={closeModal}
        ></SuccessModal>
      </ScrollView>
      <ErrorModal
        error={error}
        showErrorModal={showErrorModal}
        closeErrorModal={toggleError}
      ></ErrorModal>
      <Modal
        visible={showCamera}
        presentationStyle="pageSheet"
        supportedOrientations={["landscape", "portrait"]}
      >
        <Camera
          onMountError={() => console.log("Camera could not mount")}
          style={styles.camera}
          ref={(ref) => setCamera(ref)}
          type="back"
        >
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
                onPress={closeCamera}
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
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  camera: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  chooseButton: {
    backgroundColor: theme.colors.primaryLight,
  },
  container: {
    paddingHorizontal: config.wp("4%"),
    paddingVertical: config.hp("4%"),
    paddingBottom: config.hp("12%"),
  },
  divider: {
    width: "90%",
    height: 4,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginBottom: 10,
    alignSelf: "center",
  },
  input: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    height: config.hp("7%"),
    fontSize: 22,
  },
  inputContainer: {
    justifyContent: "center",
    paddingVertical: config.hp("2%"),
  },
  image: {
    height: 200,
    width: 400,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  text: {
    fontSize: 24,

    fontWeight: "bold",
  },

  uploadContainer: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  uploadText: {
    color: "white",
    fontSize: 20,
    fontWeight: "400",
  },
});

export default UploadScreen;
