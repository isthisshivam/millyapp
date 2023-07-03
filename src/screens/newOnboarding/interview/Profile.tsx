import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import AnimatedLottieView from "lottie-react-native";
import { useAppDispatch, useAppSelector } from "../../../store/Store";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import BottomSheets from "../../../components/bottomSheets/BottomSheets";
import { UpdatePic } from "../../../store/actions/ProfileAction";
import { reset } from "../../../store/actionReducers/onboarding";

const Profile = ({ onboardingStyles, handleBack, handleNext }) => {
  const state = useAppSelector((state) => state.onboarding);
  const profilePic = useAppSelector((state) => state.register.profilePic);
  const [sheet, setSheet] = useState<string>();
  const bottomSheetRef = useRef(null);
  const dispatch = useAppDispatch();

  const [payload, setPayload] = useState({
    image: undefined,
    gender: undefined,
    race: undefined,
    education: undefined,
    income: undefined,
    maritalStatus: undefined,
  });

  const [status, setStatus] = useState({
    disabled: true,
  });

  const closeSheet = useCallback(() => {
    setSheet(undefined);
    bottomSheetRef.current?.close();
  }, []);

  const expandSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const toggleSheet = useCallback((name: string) => {
    setSheet(name);
    expandSheet();
  }, []);

  const handleChange = useCallback(
    (name: string, value: any) => {
      setPayload({
        ...payload,
        [name]: value,
      });
      closeSheet();
    },
    [payload]
  );

  const clearPic = useCallback(() => {
    setPayload({
      ...payload,
      image: undefined,
    });
  }, []);

  const Submit = useCallback(() => {
    handleNext();
    // dispatch(UpdatePic({ image: payload.image }));
  }, [payload]);

  useEffect(() => {
    if (state.error || state.status == "Error") {
      dispatch(reset());
    }

    if (state.selfie) {
      setPayload({
        ...payload,
        image: state.selfie,
      });
    }

    if (state.status == true) {
      dispatch(reset());
      handleNext();
    }
  }, [state]);

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={{ flex: 1 }}>
        <View style={{ marginBottom: config.hp("4%") }}>
          <Text style={onboardingStyles.title}>Personal Info</Text>
        </View>
        {state.loading ? (
          <>
            <View
              style={{
                alignItems: "center",
                justifyContent: "flex-start",
                height: "100%",
                paddingTop: 25,
              }}
            >
              <AnimatedLottieView
                loop
                autoPlay
                style={{
                  width: 160,
                  height: 160,
                }}
                source={require("../../../components/ui/loading-spinner.json")}
              />
            </View>
          </>
        ) : (
          <>
            <View
              style={{
                alignItems: "center",
                //marginBottom: config.hp("2%"),
                flex: 1,
              }}
            >
              <TouchableOpacity
                onPress={() => toggleSheet("Image")}
                style={{
                  position: "relative",
                  alignItems: "center",
                  //marginBottom: 10,
                }}
              >
                {payload.image ? (
                  <>
                    <Image
                      source={{
                        uri: `data:image/png;base64, ${payload.image}`,
                      }}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        borderWidth: 1,
                        borderColor: theme.colors.faded,
                      }}
                    />
                  </>
                ) : profilePic ? (
                  <>
                    <Image
                      source={{
                        uri: `data:image/png;base64, ${profilePic}`,
                      }}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        borderWidth: 1,
                        borderColor: theme.colors.faded,
                      }}
                    />
                  </>
                ) : (
                  <>
                    <Ionicons
                      name="person-circle"
                      size={config.wp("20%")}
                      color="gray"
                    />
                    <Ionicons
                      name="camera"
                      size={30}
                      color="black"
                      style={styles.camera}
                    />
                  </>
                )}
              </TouchableOpacity>
              {payload.image ? (
                <TouchableOpacity onPress={clearPic}>
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>Clear</Text>
                </TouchableOpacity>
              ) : undefined}
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "center",
                  color: "gray",
                  marginBottom: config.hp("4%"),
                }}
              >
                Add a profile picture to personalize your experience
              </Text>
              {/* <TouchableOpacity
          style={styles.dropDownLabel}
          onPress={() => {
            toggleSheet("Gender");
          }}
        >
          <Text style={styles.label}>Gender</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "50%",
              justifyContent: "flex-end",
            }}
          >
            {!payload.gender ? (
              <Text style={styles.selectText}>Select Gender</Text>
            ) : (
              <Text numberOfLines={1} style={styles.selectedText}>
                {payload.gender}
              </Text>
            )}

            <AntDesign
              name="caretdown"
              size={24}
              color={theme.colors.primary}
            />
          </View>
        </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.dropDownLabel}
                onPress={() => {
                  toggleSheet("Race");
                }}
              >
                <Text style={styles.label}>Ethnicity</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "50%",
                    justifyContent: "flex-end",
                  }}
                >
                  {!payload.race ? (
                    <Text style={styles.selectText}>Select Ethnicity</Text>
                  ) : (
                    <Text numberOfLines={1} style={styles.selectedText}>
                      {payload.race}
                    </Text>
                  )}
                  <AntDesign
                    name="caretdown"
                    size={24}
                    color={theme.colors.primary}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dropDownLabel}
                onPress={() => {
                  toggleSheet("Income");
                }}
              >
                <Text style={styles.label}>Income</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "50%",
                    justifyContent: "flex-end",
                  }}
                >
                  {!payload.income ? (
                    <Text style={styles.selectText}>Select Income</Text>
                  ) : (
                    <Text numberOfLines={1} style={styles.selectedText}>
                      {payload.income}
                    </Text>
                  )}
                  <AntDesign
                    name="caretdown"
                    size={24}
                    color={theme.colors.primary}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dropDownLabel}
                onPress={() => {
                  toggleSheet("Education");
                }}
              >
                <Text style={styles.label}>Education</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "50%",
                    justifyContent: "flex-end",
                  }}
                >
                  {!payload.education ? (
                    <Text style={styles.selectText}>Select Education</Text>
                  ) : (
                    <Text numberOfLines={1} style={styles.selectedText}>
                      {payload.education}
                    </Text>
                  )}
                  <AntDesign
                    name="caretdown"
                    size={24}
                    color={theme.colors.primary}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dropDownLabel}
                onPress={() => {
                  toggleSheet("Marital Status");
                }}
              >
                <Text style={styles.label}>Marital Status</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "50%",
                    justifyContent: "flex-end",
                  }}
                >
                  {!payload.maritalStatus ? (
                    <Text style={styles.selectText}>Select Status</Text>
                  ) : (
                    <Text numberOfLines={1} style={styles.selectedText}>
                      {payload.maritalStatus}
                    </Text>
                  )}

                  <AntDesign
                    name="caretdown"
                    size={24}
                    color={theme.colors.primary}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  marginTop: config.hp("4%"),
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 12 }}>
                  By continuing, you agree with our
                </Text>
                <Text style={{ fontSize: 12 }}>
                  Terms & Conditions and Privacy Policy
                </Text>
              </View>
            </View>

            <View style={onboardingStyles.buttonContainer}>
              <TouchableOpacity
                style={{ paddingVertical: 12 }}
                onPress={handleNext}
              >
                <Text style={{ fontSize: 16, color: theme.colors.fadedDark }}>
                  Skip
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={Submit}
                style={onboardingStyles.button}
              >
                <Text style={onboardingStyles.buttonText}>Continue</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleBack}>
                <Text style={{ fontSize: 16 }}>Back</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>

      <BottomSheets
        sheet={sheet}
        closeSheet={closeSheet}
        bottomSheetRef={bottomSheetRef}
        handleChange={handleChange}
        attachments={[]}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: config.wp("4%"),
    flex: 1,
  },
  camera: {
    position: "absolute",
    left: 55,
    top: 5,
  },

  dropDownLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: config.hp("2%"),
    width: "100%",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.primary,
  },

  label: {
    //marginBottom: config.hp("1%"),
    fontSize: 18,
    color: "black",
    //width: "100%",
  },
  selectText: {
    fontSize: 18,
    color: theme.colors.fadedDark,
    marginRight: 10,
  },
  selectedText: {
    //width: "75%",
    fontSize: 18,
    color: "black",
    paddingRight: 10,
  },
});

export default Profile;
