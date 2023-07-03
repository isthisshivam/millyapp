import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import { AntDesign } from "@expo/vector-icons";
import { reset, ValidateId } from "../../../../store/actionReducers/register";
import BottomSheets from "../../../../components/bottomSheets/onboarding/BottomSheets";
import StatusHandler from "../../../../../utils/StatusHandler";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import { useAppDispatch, useAppSelector } from "../../../../store/Store";
import { registerStyles } from "../../registerStyles";

type PayloadType = {
  frontImage: string;
  backImage: string;
  DocumentType: 1;
  captureMethod: 0;
  ssn: string;
};

const IdScan = ({ handleNext }) => {
  const state = useAppSelector((state) => state.register);
  const [type, setType] = useState<string>();
  const dispatch = useAppDispatch();

  const [payload, setPayload] = useState<PayloadType>({
    frontImage: undefined,
    backImage: undefined,
    DocumentType: 1,
    captureMethod: 0,
    ssn: "1234567",
  });

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

  const [sheet, setSheet] = useState<string>(undefined);

  const bottomSheetRef = useRef(null);

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
    handleNext();
    //dispatch(ValidateId(payload));
  }

  useEffect(() => {
    if (payload.frontImage && payload.backImage) {
      dispatch(ValidateId(payload));
    }
  }, [payload]);

  useEffect(() => {
    if (state.error || state.status == "Error") {
      dispatch(reset());
    }

    if (state.idVerified || state.attempts == 2) {
      setStatus({
        ...status,
        disabled: false,
      });
    }
  }, [state]);

  return (
    <>
      <View
        style={{
          flex: 1,
        }}
      >
        <View style={{ marginBottom: config.hp("4%") }}>
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
          <>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                flex: 1,
              }}
            >
              {payload.frontImage ? (
                <View
                  style={{
                    alignItems: "center",
                    //paddingHorizontal: config.wp("20%"),
                    justifyContent: "center",
                    borderRightColor: "gray",
                    borderWidth: 1,
                    borderRadius: 25,
                    marginBottom: config.hp("4%"),
                    //paddingVertical: config.hp("2%"),
                    // backgroundColor: payload.frontImage
                    //   ? "white"
                    //   : theme.colors.fadedLight,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      toggleSheet("Image", "frontImage");
                    }}
                    style={{ alignItems: "center" }}
                  >
                    <Image
                      resizeMode="cover"
                      resizeMethod="scale"
                      source={{
                        uri: `data:image/png;base64,${payload.frontImage}`,
                      }}
                      style={{
                        width: config.wp("90%"),
                        height: config.hp("25%"),
                        borderRadius: 25,
                      }}
                    ></Image>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    alignItems: "center",
                    paddingHorizontal: config.wp("20%"),
                    justifyContent: "center",
                    borderRightColor: "gray",
                    borderWidth: 1,
                    borderRadius: 25,
                    marginBottom: config.hp("4%"),
                    paddingVertical: config.hp("2%"),
                    backgroundColor: payload.frontImage
                      ? "white"
                      : theme.colors.fadedLight,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      toggleSheet("Image", "frontImage");
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
                      Front
                    </Text>
                    <AntDesign
                      name="idcard"
                      size={70}
                      color={theme.colors.primary}
                      style={{ marginBottom: 8 }}
                    />
                    <Text style={{ fontSize: 18, textAlign: "center" }}>
                      Please take a picture of the front of your Id
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {payload.backImage ? (
                <View
                  style={{
                    alignItems: "center",
                    //paddingHorizontal: config.wp("20%"),
                    justifyContent: "center",
                    borderRightColor: "gray",
                    borderWidth: 1,
                    borderRadius: 25,
                    marginBottom: config.hp("4%"),
                    //paddingVertical: config.hp("2%"),
                    // backgroundColor: payload.frontImage
                    //   ? "white"
                    //   : theme.colors.fadedLight,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      toggleSheet("Image", "backImage");
                    }}
                    style={{ alignItems: "center" }}
                  >
                    <Image
                      resizeMode="cover"
                      resizeMethod="scale"
                      source={{
                        uri: `data:image/png;base64,${payload.backImage}`,
                      }}
                      style={{
                        width: config.wp("90%"),
                        height: config.hp("25%"),
                        borderRadius: 25,
                      }}
                    ></Image>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    alignItems: "center",
                    paddingHorizontal: config.wp("20%"),
                    justifyContent: "center",
                    borderRightColor: "gray",
                    borderWidth: 1,
                    borderRadius: 25,
                    paddingVertical: config.hp("2%"),
                    marginBottom: config.hp("1%"),
                    backgroundColor: payload.backImage
                      ? "white"
                      : theme.colors.fadedLight,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      toggleSheet("Image", "backImage");
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
                      Back
                    </Text>
                    <AntDesign
                      name="idcard"
                      size={70}
                      color={theme.colors.primary}
                      style={{ marginBottom: 8 }}
                    />
                    <Text style={{ fontSize: 18, textAlign: "center" }}>
                      Please take a picture of the back of your Id
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <View style={registerStyles.buttonContainer}>
                <TouchableOpacity
                  disabled={status.disabled}
                  style={
                    status.disabled
                      ? {
                          ...registerStyles.submitButton,
                          backgroundColor: theme.colors.faded,
                        }
                      : { ...registerStyles.submitButton }
                  }
                  onPress={() => {
                    verify();
                  }}
                >
                  <Text style={registerStyles.submitButtonText}>Continue</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                activeOpacity={0.85}
                style={styles.blackButton}
                onPress={handleBack}
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity> */}
              </View>
            </View>
          </>
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

const styles = StyleSheet.create({
  blackButton: {
    backgroundColor: "black",
    borderRadius: config.hp(".5%"),
    paddingVertical: config.hp("1.35%"),
    width: "100%",
    elevation: config.hp(".5%"),
    marginTop: config.hp("2%"),
  },
});

export default IdScan;
