import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import LottieView from "lottie-react-native";
import { AntDesign } from "@expo/vector-icons";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { registerStyles } from "../registerStyles";
import { useAppDispatch, useAppSelector } from "../../../store/Store";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BottomSheets from "../../../components/bottomSheets/BottomSheets";
import { GetCode, reset } from "../../../store/actionReducers/auth";
import { GetTwoFactorCode } from "../../../../types/auth/authTypes";
import { SetUserID } from "../../../store/actions/ProfileAction";
import {
  GetContactInfo,
  GetProfilePic,
} from "../../../store/actionReducers/profile";
import { GetAccounts, GetOrder } from "../../../store/actions/AccountActions";
import { GetSubscriptions } from "../../../store/actionReducers/subscriptions";
import { GetReminders } from "../../../store/actionReducers/reminders";
import { GetMessages } from "../../../store/actions/MessageActions";

const TwoFactor = ({ navigation }) => {
  const state = useAppSelector((state) => state.register);
  const [showTextContainer, setShowTextContainer] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [sheet, setSheet] = useState<string>();
  const [payload, setPayload] = useState({
    selectedProvider: {
      value: undefined,
      text: undefined,
    },
    address: undefined,
    code: undefined,
  });
  const dispatch = useAppDispatch();
  const bottomSheetRef = useRef(null);

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

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
    },
    [payload]
  );

  const submitTwoFactor = () => {
    let data: GetTwoFactorCode = {
      channel: "APP",
      selectedProvider: payload.selectedProvider.value,
      address: payload.address,
    };

    dispatch(GetCode(data));
  };

  const ValidateCode = () => {
    let data = {
      channel: "APP",
      code: payload.code,
    };
    dispatch(ValidateCode(data));
  };

  async function loginSuccessActions() {
    dispatch(SetUserID(state.username));
    dispatch(GetProfilePic());
    dispatch(GetContactInfo());
    dispatch(GetOrder());
    dispatch(GetAccounts());
    dispatch(GetSubscriptions());
    dispatch(GetReminders());
    dispatch(GetMessages());
    navigation.navigate("Main"); //Navigate to home screen

    return;
  }

  useEffect(() => {
    if (payload.selectedProvider && payload.address) {
      setDisabled(false);
    }
  }, [payload]);

  useEffect(() => {
    if (state.error || state.status == "Error") {
      dispatch(reset());
    }

    if (state.status == true) {
      loginSuccessActions();
      dispatch(reset());
    }
  }, [state]);

  return (
    <>
      <KeyboardAwareScrollView
        style={{
          flex: 1,
          paddingVertical: config.hp("2%"),
          paddingHorizontal: config.wp("2%"),
        }}
      >
        <Text style={registerStyles.title}>Two Factor Authentication</Text>
        <Text style={{ marginBottom: config.hp("2%") }}>
          We use Two-Factor Authentication to increase your account security.
        </Text>

        {state.loading ? (
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
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                paddingBottom: config.hp("20%"),
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  width: "100%",
                  textAlign: "left",
                  color: theme.colors.primary,
                  fontSize: 18,
                }}
              >
                Verification Code
              </Text>
              <Text style={{ marginBottom: config.hp("4%") }}>
                We will send you a code to your contect method of choice
              </Text>

              <TouchableOpacity
                onPress={() => toggleSheet("Two Factor")}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: config.wp("2%"),
                  marginBottom: config.hp("2%"),
                }}
              >
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{ fontSize: 18 }}
                >
                  {payload.selectedProvider.text
                    ? payload.selectedProvider.text
                    : "Choose Two Factor Method"}
                </Text>
                <AntDesign
                  name="caretdown"
                  size={24}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>

              <TextInput
                onChangeText={(text) => handleChange("address", text)}
                placeholder={"Verify contact"}
                style={{
                  width: "75%",
                  backgroundColor: "white",
                  borderRadius: 7,
                  borderColor: theme.colors.faded,
                  height: config.hp("5%"),
                  paddingHorizontal: 5,
                }}
              />
              <View style={styles.verificationContainer}>
                <View style={styles.inputContainer}>
                  <TextInput
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    keyboardType={"number-pad"}
                    style={
                      inputFocused
                        ? [styles.input, styles.inputFocused]
                        : styles.input
                    }
                    placeholder={inputFocused ? "" : "Enter Verification Code"}
                    importantForAutofill={"no"}
                    maxLength={6}
                  />
                </View>
                <Text style={styles.inputHelp}>
                  Didn’t Receive Verification Code?
                </Text>
                <Text
                  style={styles.inputHelp2}
                  onPress={() => {
                    setShowTextContainer(false);
                  }}
                >
                  Try Another Method
                </Text>
              </View>
            </View>
            <View style={registerStyles.buttonContainer}>
              <TouchableOpacity
                //disabled={disabled}
                onPress={ValidateCode}
                style={
                  disabled
                    ? {
                        ...registerStyles.submitButton,
                        backgroundColor: theme.colors.faded,
                      }
                    : registerStyles.submitButton
                }
              >
                <Text style={registerStyles.submitButtonText}>
                  Request Code
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAwareScrollView>
      <BottomSheets
        bottomSheetRef={bottomSheetRef}
        closeSheet={closeSheet}
        handleChange={handleChange}
        sheet={sheet}
      />
    </>
  );
};

export default TwoFactor;
const styles = StyleSheet.create({
  textContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: config.hp(".5%"),
  },
  textTitle: {
    fontSize: config.hp("2.25%"),
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  textSecondary: {
    lineHeight: config.hp("2.7%"),
    fontSize: config.hp("1.95%"),
    textTransform: "capitalize",
  },
  arrowIcon: {
    fontSize: config.hp("2.5%"),
    color: theme.colors.faded,
    paddingVertical: config.hp(".2%"),
  },
  verificationTypesContainer: {
    marginVertical: config.hp("2%"),
  },
  verificationType: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: config.hp("1%"),
    borderBottomWidth: config.hp(".05%"),
    marginVertical: config.hp(".5%"),
  },
  verificationRightSide: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minWidth: "30%",
  },

  verificationTextMain: {
    fontSize: config.hp("2.1%"),
  },
  verificationTextSecondary: {
    color: theme.colors.primary,
    fontSize: config.hp("2.1%"),
  },
  verificationContainer: {
    paddingVertical: config.hp("3%"),
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    paddingVertical: config.hp("2.5%"),
    fontSize: config.hp("2.5%"),
    borderColor: theme.colors.primary,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: config.hp("1%"),
    paddingLeft: config.wp("2%"),
    letterSpacing: config.wp(".8%"),
  },
  inputFocused: {
    letterSpacing: config.wp("5%"),
  },
  inputHelp: {
    width: "100%",
    textAlign: "center",
    fontSize: config.hp("2.1%"),
    color: theme.colors.primary,
  },
  inputHelp2: {
    width: "100%",
    textAlign: "center",
    fontSize: config.hp("2.1%"),
    marginTop: config.hp("1%"),
    color: theme.colors.primary,
    fontWeight: "bold",
  },
});
