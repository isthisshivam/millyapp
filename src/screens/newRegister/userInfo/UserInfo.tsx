import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AntDesign } from "@expo/vector-icons";
import AnimatedLottieView from "lottie-react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { useAppDispatch, useAppSelector } from "../../../store/Store";
import { UserInfoType } from "../../../store/types/onboarding/type";
import BottomSheets from "../../../components/bottomSheets/BottomSheets";
import EffectiveDate from "../../../components/EffectiveDate";
import { reset, SetContactInfo } from "../../../store/actionReducers/register";
import { ContactInfoType } from "../../../store/types/profile";
import { registerStyles } from "../registerStyles";
import { GetPasswordQuestions } from "../../../store/actionReducers/auth";

const UserInfo = ({ handleNext }) => {
  const state = useAppSelector((state) => state.onboarding);
  const [sheet, setSheet] = useState<string>();
  const bottomSheetRef = useRef(null);
  const dispatch = useAppDispatch();

  const [user, setUser] = useState<UserInfoType>({
    firstName: undefined,
    lastName: undefined,
    address1: undefined,
    address2: undefined,
    city: undefined,
    state: undefined,
    zip: undefined,
    country: undefined,
    mobilePhone: undefined,
    birthday: undefined,
    homePhone: undefined,
    workPhone: undefined,
    cellPhone: undefined,
    email: undefined,
    gender: undefined,
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

  const toggleSheet = (name: string) => {
    setSheet(name);
    expandSheet();
  };

  const handleChange = (name: string, value: any) => {
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleBirthday = (name: string, value: string) => {
    setUser({
      ...user,
      birthday: value,
    });
  };

  const Submit = () => {
    let data: ContactInfoType = {
      fullName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      birthDay: "",
      email: "",
      cellPhone: "",
      homePhone: "",
      workPhone: "",
    };
    //dispatch(SetContactInfo(data));
    handleNext();
    dispatch(GetPasswordQuestions());
  };

  //console.log(user);

  useEffect(() => {
    if (
      user.address1 &&
      user.firstName &&
      user.lastName &&
      user.city &&
      user.state &&
      user.birthday &&
      user.email &&
      user.mobilePhone
    ) {
      setStatus({
        ...status,
        disabled: false,
      });
    }
  }, [user]);

  useEffect(() => {
    if (state.info.firstName) {
      setUser({
        ...state.info,
      });
    }

    if (state.status == true) {
      handleNext();
      dispatch(reset());
    }
    if (state.error || state.status == "Error") {
      dispatch(reset());
    }
  }, [state]);

  return (
    <>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          //xsflex: 1,
          paddingVertical: config.hp("2%"),
          paddingHorizontal: config.wp("4%"),
        }}
      >
        <View style={{ marginBottom: config.hp("4%") }}>
          <Text style={registerStyles.title}>Contact Info</Text>
          <Text style={{ fontSize: 16 }}>
            Please add and verify your information below.
          </Text>
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
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: config.hp("1%"),
              }}
            >
              <View style={{ width: "48%" }}>
                <Text style={registerStyles.label}>First Name</Text>
                <TextInput
                  placeholderTextColor={theme.colors.faded}
                  placeholder={
                    user.firstName ? user.firstName : "Enter your first name"
                  }
                  style={registerStyles.input}
                  autoComplete="name-given"
                  keyboardType="default"
                  onChangeText={(value) => handleChange("firstName", value)}
                />
              </View>
              <View style={{ width: "48%" }}>
                <Text style={registerStyles.label}>Last Name</Text>
                <TextInput
                  placeholderTextColor={theme.colors.faded}
                  placeholder={
                    user.lastName ? user.lastName : "Enter your last name"
                  }
                  style={registerStyles.input}
                  autoComplete={"name"}
                  keyboardType="default"
                  onChangeText={(value) => handleChange("lastName", value)}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={registerStyles.label}>Address</Text>
              <TextInput
                placeholderTextColor={theme.colors.faded}
                placeholder={
                  user.address1 ? user.address1 : "Enter your Address"
                }
                style={registerStyles.input}
                autoComplete={"street-address"}
                keyboardType="default"
                onChangeText={(value) => handleChange("address1", value)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={registerStyles.label}>Address cont.</Text>
              <TextInput
                placeholderTextColor={theme.colors.faded}
                placeholder={
                  user.address2 ? user.address2 : "Enter your Address"
                }
                style={registerStyles.input}
                autoComplete={"street-address"}
                keyboardType="default"
                onChangeText={(value) => handleChange("address2", value)}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: config.hp("2%"),
                //height: config.hp("5%"),
              }}
            >
              <View style={{ width: "45%" }}>
                <Text style={registerStyles.label}>City</Text>
                <TextInput
                  placeholderTextColor={theme.colors.faded}
                  placeholder={user.city ? user.city : "Enter your city"}
                  style={registerStyles.input}
                  keyboardType="default"
                  textContentType="addressCity"
                  onChangeText={(value) => handleChange("city", value)}
                />
              </View>
              <View style={{ width: "45%" }}>
                <Text style={registerStyles.label}>State</Text>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",

                    justifyContent: "space-between",
                    ...registerStyles.input,
                  }}
                  onPress={() => toggleSheet("State")}
                >
                  {user.state == undefined ? (
                    <Text style={{ color: theme.colors.faded }}>
                      Select State
                    </Text>
                  ) : (
                    <Text>{user.state}</Text>
                  )}
                  <AntDesign
                    name="caretdown"
                    size={24}
                    color={theme.colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ width: "100%" }}>
              <EffectiveDate
                handleChange={handleBirthday}
                activeDate={user.birthday}
                label="Birthday"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={registerStyles.label}>Email Address</Text>
              <TextInput
                placeholderTextColor={theme.colors.faded}
                placeholder={
                  user.email ? user.email : "Enter your email address"
                }
                keyboardType={"email-address"}
                autoComplete={"email"}
                style={registerStyles.input}
                onChangeText={(value) => handleChange("email", value)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={registerStyles.label}>Mobile Number</Text>
              <TextInput
                placeholderTextColor={theme.colors.faded}
                placeholder={
                  user.mobilePhone
                    ? user.mobilePhone
                    : "Enter your Mobile Phone Number"
                }
                keyboardType={"phone-pad"}
                autoComplete={"tel"}
                style={registerStyles.input}
                //label="Mobile Phone"
                onChangeText={(value) => handleChange("mobilePhone", value)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={registerStyles.label}>Work Number</Text>
              <TextInput
                placeholderTextColor={theme.colors.faded}
                placeholder={
                  user.workPhone
                    ? user.workPhone
                    : "Enter your Work Phone Number"
                }
                keyboardType={"phone-pad"}
                style={registerStyles.input}
                //label="Work Phone"
                onChangeText={(value) => handleChange("workPhone", value)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={registerStyles.label}>Home Phone</Text>
              <TextInput
                textContentType="telephoneNumber"
                placeholderTextColor={theme.colors.faded}
                placeholder={
                  user.homePhone
                    ? user.homePhone
                    : "Enter your Home Phone Number"
                }
                keyboardType={"phone-pad"}
                style={registerStyles.input}
                //label="Home Phone"
                onChangeText={(value) => handleChange("homePhone", value)}
              />
            </View>
            <View style={registerStyles.buttonContainer}>
              <TouchableOpacity
                // disabled={status.disabled}
                activeOpacity={0.85}
                style={
                  status.disabled
                    ? {
                        ...registerStyles.submitButton,
                        backgroundColor: theme.colors.faded,
                      }
                    : registerStyles.submitButton
                }
                onPress={() => {
                  Submit();
                }}
              >
                <Text style={registerStyles.submitButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </KeyboardAwareScrollView>
      <BottomSheets
        sheet={sheet}
        closeSheet={closeSheet}
        bottomSheetRef={bottomSheetRef}
        handleChange={handleChange}
        attachments={null}
      />
    </>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: config.hp("1%"),
    //width: "100%",
    // borderRadius: 12,
  },
  flexContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: config.hp("1%"),
    marginTop: config.hp("1%"),
    height: config.hp("8%"),
  },
  inputExample: {
    width: "45%",
    backgroundColor: "white",
    fontSize: config.hp("2.05%"),
  },
  inputExample2: {
    height: "100%",
    flex: 0.7,
    paddingVertical: config.hp(".95%"),
    flexDirection: "column",
    justifyContent: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.faded,
    paddingLeft: config.wp("2%"),
    fontSize: config.hp("2.05%"),
  },
  stateTitle: {
    color: theme.colors.faded,
    fontSize: config.hp("1.9%"),
    marginTop: -config.hp("2%"),
  },
  stateTitle2: {
    color: theme.colors.faded,
    fontSize: config.hp("1.9%"),
    marginTop: config.hp("1%"),
    //color: "black",
  },
  icon: {
    fontSize: config.hp("2.5%"),
    maxWidth: "50%",
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: config.hp("1%"),
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: config.hp(".5%"),
    paddingVertical: config.hp("1.35%"),
    width: "100%",
    elevation: config.hp(".5%"),
  },
  buttonText: {
    color: "white",
    fontSize: config.hp("2.35%"),
    textAlign: "center",
  },
  dropDownText: {
    width: "45%",
  },
  textStyle: {
    fontSize: config.hp("2.5%"),
  },

  stateButton: {
    width: "100%",
  },
  blackButton: {
    backgroundColor: "black",
    borderRadius: config.hp(".5%"),
    paddingVertical: config.hp("1.35%"),
    width: "100%",
    elevation: config.hp(".5%"),
    marginTop: config.hp("2%"),
  },
  inputTouch: {
    paddingVertical: config.hp("1%"),
    borderBottomWidth: config.hp(".15%"),
    borderBottomColor: theme.colors.primary,
    paddingLeft: config.wp("1%"),

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  inputTouchText: {
    fontSize: config.hp("2.15%"),
    textAlign: "left",
    color: theme.colors.backdrop,

    paddingVertical: config.hp("1%"),
    paddingLeft: config.wp("1%"),
  },
  inputTouchTextSelected: {
    fontSize: config.hp("2.25%"),
    textAlign: "center",
    color: theme.colors.primary,
    fontWeight: "bold",
    paddingVertical: config.hp("1%"),
    paddingLeft: config.wp("1%"),
  },
  touchWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default UserInfo;
