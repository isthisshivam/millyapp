import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useRef, useMemo, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import LottieView from "lottie-react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import BottomSheets from "../../../components/bottomSheets/BottomSheets";

const Input = ({ payload, handleChange, submit }) => {
  const [inputSize, setInputSize] = useState(50);
  const bottomSheetRef = useRef();
  const attchmentSheetRef = useRef(); // ref

  const snapPoints = useMemo(() => [" 35%"], []); // variables
  const handleClosePress = () => bottomSheetRef.current.close();
  const handleExpand = () => bottomSheetRef.current.expand();
  const handleClose = () => attchmentSheetRef.current.close();
  const expand = () => attchmentSheetRef.current.expand();
  const [image, setImage] = useState(null);
  let imageHeight = image ? inputSize + 40 + 260 : inputSize + 40;
  const [loading, setLoading] = useState(false);
  const route = useRoute();

  function toggleSheet(name) {
    setSheet(name);
    handleExpand();
  }

  // const pickImage = async () => {
  //   setLoading(true);

  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: false,
  //     quality: 1,
  //     base64: true,
  //   });

  //   //console.log(result);

  //   if (!result.canceled) {
  //     setImage(result.assets[0]);
  //     setLoading(false);
  //     let attachments = [
  //       {
  //         data: result.assets[0],
  //         contentType: "image/png",
  //         fileName: "eMsg attachment",
  //       },
  //     ];
  //     handleChange("attachments", attachments);
  //   }
  // };

  // function clearImage() {
  //   setImage(undefined);
  //   setLoading(false);
  //   let attachments = [];
  //   handleChange("attachments", attachments);
  // }

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={[imageHeight]}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        handleComponent={() => {
          return <View style={{ height: 10 }}></View>;
        }}
      >
        {image && loading ? (
          <View
            style={{
              height: "100%",
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
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
          </View>
        ) : image && !loading ? (
          <View style={{ width: "100%", alignItems: "center" }}>
            <View
              style={{
                position: "relative",
                width: 220,
                height: 260,
                paddingVertical: config.hp("1%"),
                marginBottom: 10,
                borderBottomColor: theme.colors.faded,
                borderBottomWidth: 1,
              }}
            >
              <Image
                resizeMode="cover"
                source={{ uri: `data:image/png;base64,${image}` }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 25,
                }}
              ></Image>
              <View
                style={{
                  backgroundColor: theme.colors.fadedLight,
                  borderRadius: 50,
                  position: "absolute",
                  top: 15,
                  right: 10,
                  borderColor: theme.colors.fadedDark,
                  borderWidth: 1,
                }}
              >
                <Ionicons
                  onPress={() => clearImage()}
                  name="close"
                  size={30}
                  style={{}}
                ></Ionicons>
              </View>
            </View>
          </View>
        ) : undefined}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            bottom: 0,
            width: "100%",
            paddingHorizontal: config.wp("1%"),
          }}
        >
          <Feather
            onPress={() => expand()}
            name="paperclip"
            size={30}
            color={theme.colors.primary}
            style={{ marginRight: 10 }}
          />
          <BottomSheetTextInput
            multiline={true}
            value={payload.message}
            onChangeText={(value) => handleChange("messagecontent", value)}
            onContentSizeChange={(event) => {
              setInputSize(event.nativeEvent.contentSize.height);
            }}
            style={{
              width: "85%",
              height: inputSize,
              paddingRight: 25,
            }}
          ></BottomSheetTextInput>

          <Ionicons
            onPress={submit}
            name="md-paper-plane"
            size={32}
            style={{
              position: "absolute",
              right: config.wp("2%"),
              bottom: 0,
            }}
            color={theme.colors.primary}
          />
        </View>
      </BottomSheet>
      <BottomSheets
        bottomSheetRef={attchmentSheetRef}
        handleChange={handleChange}
        closeSheet={handleClose}
        sheet={"eMsg Attachemnts"}
        attachments={payload.attachments}
      />

      {/* <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        //onClose={() => setShow(false)}
      >
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View
            style={{
              position: "relative",
              marginBottom: config.hp("2%"),
            }}
          >
            <Text
              style={{
                width: "100%",
                textAlign: "center",
                fontSize: 20,
              }}
            >
              Attach
            </Text>
            <Ionicons
              onPress={() => handleClosePress()}
              style={{ position: "absolute", right: 8, top: 0 }}
              name="close"
              size={28}
              color="black"
            />
          </View>

          <View style={{ width: "100%", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                pickImage(), handleClosePress();
              }}
              style={{
                borderBottomColor: theme.colors.faded,
                height: config.hp("6%"),
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderBottomWidth: 1,
                width: "80%",
                marginBottom: config.hp("1%"),
              }}
            >
              <Text style={{ fontSize: 18 }}>Take Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                pickImage(), handleClosePress();
              }}
              style={{
                borderBottomColor: theme.colors.faded,
                height: config.hp("6%"),
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderBottomWidth: 1,
                width: "80%",
              }}
            >
              <Text style={{ fontSize: 18 }}>Upload from library</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet> */}
    </>
  );
};

export default Input;
