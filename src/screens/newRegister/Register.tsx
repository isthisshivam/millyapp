import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FeatherIcons from "react-native-vector-icons/Feather";
import { TextInput } from "react-native-paper";
import AnimatedLottieView from "lottie-react-native";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";
import client from "../../../utils/client";
import { useAppDispatch, useAppSelector } from "../../store/Store";
import { RegisterPayload } from "../../../types/auth/authTypes";
import {
  StrengthChecker,
  isNumber,
  loginRequirements,
} from "../../../utils/auth/passwordStrength";
import { register } from "../../store/actionReducers/register";

type Props = {
  handleNext: () => void;
  navigation: {
    navigate: (screen: string) => void;
    goBack: () => void;
  };
  setCredentials: ({}) => void;
};

type StatusType = {
  showPasswordMeter: boolean;
  secureSSN: boolean;
  maskAcct: boolean;
  strengthBadgeColor: string;
  strengthBadgeText: string;
  disabled: boolean;
  // loading: boolean
};

const Register = ({ handleNext, navigation, setCredentials }: Props) => {
  const state = useAppSelector((state) => state.register);
  const bitPanel = useAppSelector((state) => state.client);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const showPasswordMeter = bitPanel?.bitPanel.passwordMeter;
  const secureSSN = bitPanel?.bitPanel?.maskSSN;
  const maskAcct = bitPanel?.bitPanel?.maskAccount;
  const dispatch = useAppDispatch();

  const [payload, setPayload] = useState<RegisterPayload>({
    ssn: undefined,
    username: null,
    password: null,
    confirmPassword: undefined,
    acctNumber: undefined,
  });

  const [status, setStatus] = useState<StatusType>({
    showPasswordMeter: false,
    secureSSN: false,
    maskAcct: false,
    strengthBadgeColor: "white",
    strengthBadgeText: "white",
    disabled: true,
  });

  const handleChange = useCallback((name: string, value: any) => {
    setPayload({ ...payload, [name]: value });
  }, []);

  const handleSubmit = useCallback(() => {
    setCredentials({
      username: payload.username,
      password: payload.password,
    });
    // dispatch(register(payload));
    handleNext();
  }, []);

  ////////////////////////////////////  PASSWORD VALIDATION /////////////////////////////////
  const passwordRequirements = bitPanel.bitPanel.minimumPasswordRequirements; //Get password requirements from bitPanel

  useEffect(() => {
    let strength = StrengthChecker(payload.password);
    setStatus({ ...status, ...strength });

    if (
      payload.password &&
      payload.confirmPassword &&
      payload.acctNumber &&
      payload.ssn
    ) {
      setStatus({
        ...status,
        disabled: false,
      });
    }
  }, [payload]);

  useEffect(() => {
    if (state.error || state.status == "Error") {
      dispatch({ type: "register/rest" });
    }

    if (state.status == true) {
      dispatch({ type: "register/rest" });
      handleNext();
    }
  }, [state]);

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
    >
      <View style={[styles.textContainer, styles.textContainerWelcome]}>
        <Text style={styles.textTitle}>
          Thank you for choosing {client.clientName}.
        </Text>

        <Text style={styles.welcomeTextSecondary}>
          To setup your account we just need a bit of information
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
              source={require("../../components/ui/loading-spinner.json")}
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.ssnContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.textTitle}>SSN/Tax Id</Text>
            </View>
            <TextInput
              style={styles.input}
              label="SSN/Tax Id#"
              placeholder="SSN/Tax Id#"
              onChangeText={(value) => handleChange("ssn", value)}
              keyboardType={"number-pad"}
              secureTextEntry={secureSSN}
            />
          </View>
          <View style={styles.acctContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.textTitle}>Acct Number</Text>
            </View>
            <TextInput
              style={styles.input}
              keyboardType={"number-pad"}
              label="Account"
              placeholder="Account"
              onChangeText={(value) => handleChange("acctNumber", value)}
              secureTextEntry={maskAcct}
            />
          </View>
          <View style={styles.usernameContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.textTitle}>Username</Text>
              <Text style={{ fontSize: 14 }}>
                Create a username to access you account online.
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                label="Username"
                placeholder="johnn234"
                onChangeText={(value) => handleChange("username", value)}
              />

              <Text style={{ fontSize: 12, paddingLeft: 8 }}>
                Must contain at least 1 letter and 1 number
              </Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Password</Text>
          </View>
          <View
            style={{ ...styles.inputContainer, marginBottom: config.hp("4%") }}
          >
            <TextInput
              style={styles.input}
              label="Password"
              placeholder="Password"
              secureTextEntry={!showPassword}
              onChangeText={(value) => handleChange("password", value)}
              right={
                <TextInput.Icon
                  name={() => (
                    <FeatherIcons
                      name={"eye"}
                      style={styles.eyeIcon}
                      onPress={() => {
                        setshowPassword(!showPassword);
                      }}
                    />
                  )}
                />
              }
            />
            {payload.password && isNumber(payload.password) ? undefined : (
              <View style={{}}>
                <Text style={{ color: "red" }}>
                  {passwordRequirements < loginRequirements.length &&
                  payload.password
                    ? loginRequirements[passwordRequirements]
                    : undefined}
                </Text>
                {payload.password?.length > 0 ? (
                  <Text style={{ color: "red" }}>
                    {payload.password?.length < 8 ||
                    payload.password?.length > 32
                      ? `Must be between ${bitPanel.minimumPasswordLength}-${bitPanel.maximumPasswordLength} characters long`
                      : undefined}
                  </Text>
                ) : undefined}
              </View>
            )}

            <TextInput
              value={payload.confirmPassword}
              style={styles.input}
              label="Confirm Password"
              placeholder="confirm Password"
              onChangeText={(value) => handleChange("confirmPassword", value)}
              secureTextEntry={!showConfirmPassword}
              right={
                <TextInput.Icon
                  name={() => (
                    <FeatherIcons
                      name={"eye"}
                      style={styles.eyeIcon}
                      onPress={() => {
                        setShowConfirmPassword(!showConfirmPassword);
                      }}
                    />
                  )}
                />
              }
            />
            {payload.password?.length > 1 &&
            payload.password == payload.confirmPassword &&
            showPasswordMeter ? (
              <View
                style={{ paddingHorizontal: config.hp("4%"), paddingTop: 10 }}
              >
                <View
                  style={{
                    backgroundColor: status.strengthBadgeColor,
                    paddingHorizontal: config.wp("12%"),
                    alignItems: "center",
                    paddingVertical: config.hp(".3%"),
                    borderRadius: 12,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >
                    {status.strengthBadgeText}
                  </Text>
                </View>
              </View>
            ) : undefined}
            {payload.password &&
            payload.password !== payload.confirmPassword ? (
              <Text
                style={{
                  color: "red",
                  fontSize: 16,
                  textAlign: "center",
                  paddingVertical: config.hp("1%"),
                }}
              >
                Passwords Must Match
              </Text>
            ) : undefined}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              //disabled={!}
              style={status.disabled ? styles.disabled : styles.button}
              onPress={() => {
                handleSubmit();
              }}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity
              //disabled={!formOneIsFilled}
              activeOpacity={0.85}
              style={styles.blackButton}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  acctContainer: {
    paddingBottom: config.hp("4%"),
  },
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
    alignItems: "center",
    paddingVertical: config.hp("1%"),
  },
  buttonText: {
    color: "white",
    fontSize: config.hp("2.35%"),
    textAlign: "center",
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  container: {
    //flex: 1,
    paddingHorizontal: config.wp("4%"),
    paddingVertical: config.hp("2%"),
  },
  disabled: {
    backgroundColor: theme.colors.inActive,
    borderRadius: config.hp(".5%"),
    paddingVertical: config.hp("1.35%"),
    width: "100%",
    elevation: config.hp(".5%"),
  },
  eyeIcon: {
    color: theme.colors.primary,
    fontSize: config.hp("3.5%"),
  },
  inputContainer: {
    marginBottom: config.hp("2%"),
  },
  input: {
    backgroundColor: "white",
    fontSize: config.hp("2.05%"),
  },
  ssnContainer: {
    paddingBottom: config.hp("4%"),
  },

  textContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: config.hp(".75%"),
  },
  textContainerWelcome: {
    marginBottom: config.hp("5.75%"),
  },
  textSecondary: {
    fontWeight: "bold",
    lineHeight: config.hp("2.7%"),
    fontSize: config.hp("1.95%"),
  },
  textTitle: {
    fontSize: config.hp("2.25%"),
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  welcomeTextSecondary: {
    fontSize: 14,
    lineHeight: config.hp("2.7%"),
  },
  usernameContainer: {
    paddingBottom: config.hp("4%"),
  },
});

export default Register;
