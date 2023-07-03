import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect, useCallback, useRef } from "react";
import LottieView from "lottie-react-native";
import { AntDesign } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../../../store/Store";
import { ValidateSelfie } from "../../../../store/actionReducers/register";
import BottomSheets from "../../../../components/bottomSheets/onboarding/BottomSheets";
import StatusHandler from "../../../../../utils/StatusHandler";
import { theme } from "../../../../config/Theme";
import { config } from "../../../../config/Config";
import { registerStyles } from "../../registerStyles";

const SelfieScan = ({ handleNext }) => {
  const state = useAppSelector((state) => state.register);
  const [type, setType] = useState<string>();
  const [sheet, setSheet] = useState<string>(undefined);
  const bottomSheetRef = useRef(null);
  const dispatch = useAppDispatch();

  const [payload, setPayload] = useState({
    faceImage: undefined,
    documentType: 0,
    captureMethod: 0,
  });

  const [status, setStatus] = useState({});

  const closeSheet = useCallback(() => {
    setSheet(undefined);
    bottomSheetRef.current?.close();
  }, []);

  const expandSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleChange = (name: string, value: any) => {
    setPayload({
      ...payload,
      [name]: value,
    });
    closeSheet();
  };

  const toggleSheet = (name: string, changeName: string) => {
    setSheet(name);
    setType(changeName);
    expandSheet();
  };

  function verify() {
    dispatch(ValidateSelfie(payload));
    handleNext();
  }

  // useEffect(() => {
  //   if (payload.faceImage) {
  //     //verify();

  //   }
  // }, [payload]);

  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={{ marginBottom: config.hp("8%") }}>
          <Text style={{ fontSize: 16 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi totam
            ipsum nobis esse corrupti quis culpa aperiam voluptates
          </Text>
        </View>
        {state.loading == true ? (
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
              source={require("../../../../components/ui/loading-spinner.json")}
            />
            <Text>Verifying. This may take a while, please wait...</Text>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            {payload.faceImage ? (
              <TouchableOpacity
                onPress={() => {
                  toggleSheet("Image", "faceImage");
                }}
                style={{
                  alignItems: "center",
                  //flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  marginBottom: config.hp("12%"),
                }}
              >
                <Image
                  resizeMode="cover"
                  resizeMethod="scale"
                  source={{ uri: `data:image/png;base64,${payload.faceImage}` }}
                  style={{
                    width: config.wp("90%"),
                    height: config.hp("25%"),
                    borderRadius: 25,
                  }}
                ></Image>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  //flex: 1,
                  alignItems: "center",
                  paddingHorizontal: config.wp("20%"),
                  justifyContent: "center",
                  borderRightColor: "gray",
                  borderWidth: 1,
                  borderRadius: 25,
                  paddingVertical: config.hp("2%"),
                  marginBottom: config.hp("6%"),
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    toggleSheet("Image", "faceImage");
                  }}
                  style={{ alignItems: "center" }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: theme.colors.primary,
                      fontWeight: "600",
                      marginBottom: 8,
                    }}
                  >
                    Selfie
                  </Text>
                  <View
                    style={{
                      backgroundColor: "lightgray",
                      padding: 5,
                      borderRadius: 50,
                      marginBottom: 8,
                    }}
                  >
                    <AntDesign
                      name="user"
                      size={60}
                      color={theme.colors.primary}
                    />
                  </View>
                  <Text style={{ fontSize: 18, textAlign: "center" }}>
                    Please take a selfie picture for verification
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {payload.faceImage ? (
              <View style={registerStyles.buttonContainer}>
                <TouchableOpacity
                  onPress={verify}
                  style={{
                    backgroundColor: theme.colors.primary,
                    borderRadius: 12,
                    width: "80%",
                    paddingVertical: config.hp("1%"),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: 16, fontWeight: "500", color: "white" }}
                  >
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            ) : undefined}
          </View>
        )}
      </View>
      <BottomSheets
        type={type}
        sheet={sheet}
        bottomSheetRef={bottomSheetRef}
        closeSheet={closeSheet}
        handleChange={handleChange}
      />
      <StatusHandler
        state={state}
        status={status}
        setStatus={setStatus}
        navigation={undefined}
        deleteItem={undefined}
        hideSuccess={true}
      />
    </>
  );
};

export default SelfieScan;
