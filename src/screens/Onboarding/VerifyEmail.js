import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Touchable,
} from "react-native";
import LottieView from "lottie-react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import ButtonContainer from "./ButtonContainer";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";

const VerifyEmail = ({ step, next, back, cancel, submit }) => {
  const CELL_COUNT = 6;
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <View style={styles.container}>
      <LottieView
        speed={2}
        loop={true}
        autoPlay={true}
        style={{
          width: config.wp("60%"),
        }}
        source={require("../../components/ui/verify.json")}
      />
      <Text style={{ fontSize: 22 }}>Enter Code</Text>
      <Text>We sent a one-time code to your phone number.</Text>
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <View style={{ marginTop: config.hp("4%"), alignItems: "center" }}>
        <TouchableOpacity style={styles.submit}>
          <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
            Confirm
          </Text>
        </TouchableOpacity>
        <Text>Didn't receive a code?</Text>
        <TouchableOpacity>
          <Text>Resend code</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          flex: 1,
        }}
      >
        <ButtonContainer
          step={step}
          next={next}
          back={back}
          cancel={cancel}
          navigation={null}
          submit={submit}
        ></ButtonContainer>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 50,
    height: 50,
    lineHeight: 50,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#00000030",
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
  submit: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: config.wp("2%"),
    paddingVertical: config.hp("1%"),
    alignItems: "center",
    borderRadius: 12,
  },
});

export default VerifyEmail;
