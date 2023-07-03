import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import LottieView from "lottie-react-native";
import Button from "../../../components/Button";
import { styles } from "./style";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const RegisterForm4 = ({ onSubmit }) => {
  const [showTextContainer, setShowTextContainer] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>Two Factor Authentication</Text>
        <Text style={styles.textSecondary}>
          {showTextContainer
            ? showTextContainer?.message
            : "Where should we send your Verification Code?"}
        </Text>
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
            source={require("../../../components/ui/loading-spinner.json")}
          />
        </View>
      ) : (
        <View>
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
          <View
            style={{
              alignItems: "center",
              paddingTop: config.hp("4%"),
              width: "100%",
            }}
          >
            <Button
              text="Submit"
              height={50}
              width={config.wp("93%")}
              background={theme.colors.primary}
              color="white"
              radius={7}
              onPress={() => {
                onSubmit(), setLoading(true);
              }}
              fontSize={22}
            ></Button>
          </View>
        </View>
      )}
    </View>
  );
};

export default RegisterForm4;
