import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AnimatedLottieView from "lottie-react-native";
import { AntDesign } from "@expo/vector-icons";
import { config } from "../../../../config/Config";
import globalStyles from "../../../../globalStyles/styles";
import { theme } from "../../../../config/Theme";
import BottomSheets from "../../../../components/bottomSheets/BottomSheets";
import { useAppDispatch } from "../../../../store/Store";
import Confirmation from "./Confirmation";

type Payload = {
  accountId: string;
  amount: number;
  description: string;
};

const CheckWithdrawal = () => {
  const state = {};
  const [sheet, setSheet] = useState<string>();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [payload, setPayload] = useState<Payload>({
    accountId: undefined,
    amount: undefined,
    description: undefined,
  });
  const bottomSheetRef = useRef(null);
  const dispatch = useAppDispatch();

  const closeSheet = useCallback(() => {
    setSheet(undefined);
    bottomSheetRef.current?.close();
  }, []);

  const expandSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
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
  const handleBack = useCallback(() => {
    setShowConfirmation(false);
  }, []);

  const toggleSheet = useCallback((name: string) => {
    setSheet(name);
    expandSheet();
  }, []);

  const handleSubmit = useCallback(() => {
    console.log("submitted");
  }, [payload]);

  useEffect(() => {
    if (payload.accountId && payload.amount && payload.description) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [payload]);

  //console.log(payload);

  return (
    <>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Text style={globalStyles.title}>Check Withdrawal</Text>
        <Text style={{ marginBottom: config.hp("4%") }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
          recusandae? In aspernatur consequuntur, dolores et fugit illum natus
          velit blanditiis vitae delectus exercitationem nihil asperiores totam
          nobis nesciunt? Quia, deserunt!
        </Text>

        {showConfirmation ? (
          <Confirmation
            handleSubmit={handleSubmit}
            payload={payload}
            handleBack={handleBack}
          />
        ) : (
          <>
            <View style={{ flex: 1, paddingHorizontal: config.wp("2%") }}>
              <View style={globalStyles.inputContainer}>
                <Text style={globalStyles.inputLabel}>From Account:</Text>
                <TouchableOpacity
                  style={{ width: "50%" }}
                  onPress={() => {
                    toggleSheet("Accounts");
                  }}
                >
                  {!payload.accountId ? (
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{ fontSize: 16, color: theme.colors.fadedDark }}
                      >
                        Select Account
                      </Text>
                      <AntDesign
                        name="caretright"
                        size={24}
                        color={theme.colors.primary}
                      />
                    </View>
                  ) : (
                    <Text
                      style={{
                        fontSize: 18,
                        color: theme.colors.primary,
                        fontWeight: "500",
                        textAlign: "right",
                      }}
                    >
                      {payload.accountId ? payload.accountId : undefined}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              <View style={globalStyles.inputContainer}>
                <Text style={globalStyles.inputLabel}>Amount</Text>
                <TextInput
                  onChangeText={(text) => handleChange("amount", text)}
                  keyboardType="decimal-pad"
                  style={globalStyles.input}
                />
              </View>

              <View style={globalStyles.inputContainer}>
                <Text style={globalStyles.inputLabel}>Description: </Text>
                {payload.description == "other" ? (
                  <View
                    style={{
                      // flexDirection: "row",
                      alignItems: "center",
                      width: "50%",
                    }}
                  >
                    <TextInput
                      multiline
                      numberOfLines={3}
                      onChangeText={(text) => handleChange("description", text)}
                      keyboardType="default"
                      style={{
                        ...globalStyles.input,
                        width: "100%",
                        //marginRight: 10,
                        height: config.hp("8%"),
                      }}
                    />
                    <AntDesign
                      onPress={() => toggleSheet("CheckWithdrawal")}
                      name="caretdown"
                      size={24}
                      color={theme.colors.primary}
                      style={{ position: "absolute", right: 10 }}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    style={{ width: "50%" }}
                    onPress={() => {
                      toggleSheet("CheckWithdrawal");
                    }}
                  >
                    {!payload.description ? (
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            color: theme.colors.fadedDark,
                          }}
                        >
                          Select description
                        </Text>
                        <AntDesign
                          name="caretright"
                          size={24}
                          color={theme.colors.primary}
                        />
                      </View>
                    ) : (
                      <Text
                        style={{
                          fontSize: 18,
                          color: theme.colors.primary,
                          fontWeight: "500",
                          textAlign: "right",
                        }}
                      >
                        {payload.description ? payload.description : undefined}
                      </Text>
                    )}
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={globalStyles.submitButtonContainer}>
              <TouchableOpacity
                // disabled={disabled}
                onPress={() => setShowConfirmation(true)}
                style={
                  disabled
                    ? {
                        ...globalStyles.submitButton,
                        backgroundColor: theme.colors.faded,
                      }
                    : globalStyles.submitButton
                }
              >
                <Text style={globalStyles.submitButtonText}>Continue</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={{ fontSize: 16 }}>Cancel</Text>
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
        attachments={[]}
      />
    </>
  );
};

export default CheckWithdrawal;

const styles = StyleSheet.create({
  container: {
    paddingVertical: config.hp("2%"),
    paddingHorizontal: config.wp("2%"),
    flex: 1,
  },
});
