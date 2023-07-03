import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import AnimatedLottieView from "lottie-react-native";
import { useAppDispatch, useAppSelector } from "../../../store/Store";
import { QuestionPayloadType } from "../../../store/types/register/type";
import {
  SetPasswordQuestions,
  reset,
} from "../../../store/actionReducers/register";

import BottomSheets from "../../../components/bottomSheets/BottomSheets";
import StatusHandler from "../../../../utils/StatusHandler";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { registerStyles } from "../registerStyles";

const SecuirtyQuestions = ({ handleNext }) => {
  const state = useAppSelector((state) => state.register);
  const [sheet, setSheet] = useState<string>();
  const dispatch = useAppDispatch();
  const bottomSheetRef = useRef(null);

  const [payload, setPayload] = useState<QuestionPayloadType>({
    id: undefined,
    question: undefined,
    answer: undefined,
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

  function handleChange(name: string, value: any) {
    if (name == "question") {
      setPayload({
        ...payload,
        question: value.question,
        id: value.id,
      });
      return;
    }
    setPayload({ ...payload, [name]: value });
  }

  const handleSubmit = useCallback(() => {
    let data: QuestionPayloadType = {
      id: payload.id,
      question: payload.question,
      answer: payload.answer,
    };
    dispatch(SetPasswordQuestions(data));
  }, [payload]);

  //Clear answer when question changes
  // useEffect(() => {
  //   setPayload({
  //     ...payload,
  //     answer: "",
  //   });
  // }, [payload.id]);

  useEffect(() => {
    if (payload.id != undefined && payload.answer != undefined) {
      setStatus({
        ...status,
        disabled: false,
      });
    } else {
      setStatus({
        ...status,
        disabled: true,
      });
    }
  }, [payload]);

  useEffect(() => {
    if (state.status == true) {
      handleNext();
    }

    if (state.error || state.status == "Error") {
      dispatch(reset());
    }
  }, [state]);

  return (
    <>
      <View
        style={{
          flex: 1,
          paddingVertical: config.hp("2%"),
          paddingHorizontal: config.wp("2%"),
        }}
      >
        <Text style={registerStyles.title}>Create Security Question</Text>
        <Text
          style={{
            fontSize: 18,
          }}
        >
          This security question is used to reset your password incase you
          forget it.
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
        ) : (
          <>
            <View style={{ height: config.hp("50%"), flex: 1 }}>
              <View
                style={{
                  marginBottom: config.hp("4%"),
                  paddingTop: config.hp("4%"),
                }}
              >
                <TouchableOpacity
                  onPress={() => toggleSheet("Questions")}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: config.wp("2%"),
                  }}
                >
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ fontSize: 18 }}
                  >
                    {payload.question
                      ? payload.question
                      : "Choose Security Question"}
                  </Text>
                  <AntDesign
                    name="caretdown"
                    size={24}
                    color={theme.colors.primary}
                  />
                </TouchableOpacity>
              </View>
              <View style={{}}>
                <TextInput
                  onChangeText={(value) => handleChange("answer", value)}
                  value={payload.answer}
                  placeholder="Answer"
                  style={{ height: config.hp("6%"), margin: config.hp("1%") }}
                ></TextInput>
              </View>
            </View>

            <View style={registerStyles.buttonContainer}>
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={status.disabled}
                activeOpacity={0.85}
                style={
                  status.disabled
                    ? {
                        ...registerStyles.submitButton,
                        backgroundColor: theme.colors.faded,
                      }
                    : registerStyles.submitButton
                }
              >
                <Text style={registerStyles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      <BottomSheets
        sheet={sheet}
        closeSheet={closeSheet}
        bottomSheetRef={bottomSheetRef}
        handleChange={handleChange}
        attachments={[]}
      />
      <StatusHandler
        state={state}
        status={status}
        setStatus={setStatus}
        navigation={null}
        deleteItem={null}
        hideSuccess={true}
      />
    </>
  );
};

export default SecuirtyQuestions;
