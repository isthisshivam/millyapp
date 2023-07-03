import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import * as Progress from "react-native-progress";
import FirstScreen from "./FirstScreen";
import Household from "./interviewSection/Household";
import VehicleSection from "./vehicleDetailsSection/VehicleSection";
import Profile from "./interviewSection/Profile";
import Settings from "./personalization/Settings";
import VerifyEmail from "./VerifyEmail";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";
import BottomSheets from "../../components/bottomSheets/BottomSheets";
import Goals from "./personalization/Goals";
import { useDispatch } from "react-redux";
import {
  GetPasswordQuestions,
  SetPasswordQuestions,
} from "../../store/actions/authActions";

const OnboardingScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [sheet, setSheet] = useState();
  const [vehicles, setVehicles] = useState([]);
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    maritalStatus: null,
    household: null,
    race: null,
    gender: null,
    income: null,
    education: null,
    vehicles: undefined,
    goals: [],
    passwordQuestion: {
      questionIds: [],
      answers: [],
    },
    passwordAnswer: undefined,
    rememberUserId: false,
    rememberDevice: false,
  });
  const bottomSheetRef = useRef(null);

  const closeSheet = useCallback(() => {
    setSheet(undefined);
    bottomSheetRef.current?.close();
  }, []);
  const expandSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  function next() {
    if (step < 6) {
      setStep(step + 1);
    }
  }
  function back() {
    if (step > 0) {
      setStep(step - 1);
    }
  }
  function cancel() {
    navigation.navigate("Home");
  }

  //Input change handler
  const handleChange = (name, value) => {
    setPayload({ ...payload, [name]: value });
    closeSheet();
  };

  const vehicleHandler = (value) => {
    setPayload({
      ...payload,
      vehicles: [...payload.vehicles, value],
    });
  };
  const handleQuestionChange = (obj) => {
    setPayload({
      ...payload,
      passwordQuestion: obj,
    });
    closeSheet();
  };

  function changeForm(name) {
    setSheet(name);
    expandSheet();
  }

  function Submit() {
    let data = {
      ...payload,
      vehicles: vehicles,
    };
    navigation.navigate("Home");
    dispatch(
      SetPasswordQuestions({
        questionIds: payload.passwordQuestion.questionIds,
        answers: payload.passwordQuestion.answers,
      })
    );
  }
  //console.log(payload);

  useEffect(() => {
    dispatch(GetPasswordQuestions());
  }, []);

  function handleStep() {
    switch (step) {
      case 0:
        return (
          <FirstScreen step={step} next={next} cancel={cancel}></FirstScreen>
        );
      case 1:
        return (
          <Profile
            handleChange={handleChange}
            payload={payload}
            changeForm={changeForm}
            step={step}
            next={next}
            back={back}
            cancel={cancel}
          ></Profile>
        );
      case 2:
        return (
          <Household
            payload={payload}
            handleChange={handleChange}
            setPayload={setPayload}
            step={step}
            next={next}
            back={back}
            cancel={cancel}
            changeForm={changeForm}
          ></Household>
        );
      case 3:
        return (
          <VehicleSection
            vehicleHandler={vehicleHandler}
            vehicles={vehicles}
            step={step}
            next={next}
            back={back}
            cancel={cancel}
            changeForm={changeForm}
          ></VehicleSection>
        );
      case 4:
        return (
          <Goals
            handleChange={handleChange}
            payload={payload}
            setPayload={setPayload}
            step={step}
            next={next}
            back={back}
            cancel={cancel}
            navigation={navigation}
            Submit={Submit}
            changeForm={changeForm}
          ></Goals>
        );
      case 5:
        return (
          <VerifyEmail
            step={step}
            next={next}
            back={back}
            cancel={cancel}
            navigation={navigation}
            Submit={Submit}
          ></VerifyEmail>
        );
      case 6:
        return (
          <Settings
            step={step}
            next={next}
            back={back}
            cancel={cancel}
            navigation={navigation}
            Submit={Submit}
            changeForm={changeForm}
            handleQuestionChange={handleQuestionChange}
            payload={payload}
            handleChange={handleChange}
          ></Settings>
        );
    }
  }

  return (
    <>
      <View style={styles.container}>
        {step > 0 ? (
          <Progress.Bar
            progress={step / 6}
            width={config.wp("85%")}
            height={config.hp("2%")}
            borderRadius={12}
            color={theme.colors.primary}
            style={{ marginVertical: config.hp("1%") }}
          />
        ) : undefined}
        {handleStep()}
      </View>
      <BottomSheets
        bottomSheetRef={bottomSheetRef}
        closeSheet={closeSheet}
        sheet={sheet}
        handleChange={handleChange}
      ></BottomSheets>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default OnboardingScreen;
