import React, { useState, useRef, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "react-native-paper";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";

import ProgressBar from "./progressBar/ProgressBar";
import RegisterForm1 from "./registerForm1/RegisterForm1";
import RegisterForm2 from "./registerForm2/RegisterForm2";
import RegisterForm3 from "./registerForm3/RegisterForm3";
import RegisterForm4 from "./registerForm4/RegisterForm4";
import RegisterTop from "./registerTopContainer/RegisterTop";
import { userLoginMain } from "../../store/actions/authActions";

const NewMemberFormContainer = ({ navigation }) => {
  const [formOneIsFilled, setFormOneIsFilled] = useState(false);
  const [strengthBadgeColor, setStrengthBadgeColor] = useState();
  const [strengthBadgeText, setStrengthBadgeText] = useState();
  const [activeStep, setActiveStep] = useState(0);
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const scrollViewRef = useRef();

  const [user, setUser] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    ssn: "",
    account: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    mobilePhone: "",
    workPhone: "",
    homePhone: "",
    dob: "",
    disclosures: {},
  });

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    scrollViewRef.current?.scrollTo({ y: 0, x: 0, animated: true | false });
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
    scrollViewRef.current?.scrollTo({ y: 0, x: 0, animated: false });
  };

  const handleChange = (name, value) => {
    if (typeof value === "object") {
      setUser({ ...user, disclosures: { ...user.disclosures, ...value } });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  useEffect(() => {
    setActiveStep(0);
  }, []);

  ////////////////////////////////////////////////////PASSWORD//////////////////////////////////////////////////////

  //Check if there is a number return true or false
  function isNumber(s) {
    var boolToReturn = false;
    if (s) {
      s.split("").forEach((item) => {
        if (!isNaN(item)) {
          boolToReturn = true;
        }
      });
    }
    return boolToReturn;
  }
  const hasNumber = isNumber(user.password);

  let strongPassword = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  let mediumPassword = new RegExp(
    "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
  );
  //Password Strength Checker
  function StrengthChecker(password) {
    // We then change the badge's color and text based on the password strength
    if (strongPassword.test(password)) {
      setStrengthBadgeColor(theme.colors.primary);
      setStrengthBadgeText("Strong");
    } else if (mediumPassword.test(password)) {
      setStrengthBadgeColor("blue");
      setStrengthBadgeText("Medium");
    } else {
      setStrengthBadgeColor("red");
      setStrengthBadgeText("Weak");
    }
  }

  useEffect(() => {
    StrengthChecker(user.password);
  }, [user.password]);

  ///////////////////////////////////////////////////////////Validation////////////////////////////////////////////////
  // useEffect(() => {
  //   if (
  //     user.userId !== "" &&
  //     user.password !== "" &&
  //     user.password.length >= 8 &&
  //     user.password.length <= 32 &&
  //     user.confirmPassword !== "" &&
  //     user.password == user.confirmPassword &&
  //     hasNumber == true
  //   ) {
  //     setFormOneIsFilled(true);
  //   }
  // }, [user]);

  //Send register request to backend
  const onSubmit = () => {
    dispatch(userLoginMain(user));
  };

  //Redirect to main on success
  useEffect(() => {
    //Auth Successful
    if (auth.success) {
      navigation.navigate("Main"); //Navigate to home screen

      setLoading(false); //Remove Loading Spinner

      //Auth Failed
    } else if (auth.success === false && auth.error) {
      setLoading(false); //Remove Loading Spinner
      setShowErrorModal(true); //Show Error Modal
      //Reset Username
      setUser({
        userId: "",
        password: "",
        confirmPassword: "",
        ssn: "",
        account: "",
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        email: "",
        mobilePhone: "",
        workPhone: "",
        homePhone: "",
        dob: "",
        disclosures: {},
      });
    }
  }, [auth]);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <>
            <RegisterForm2
              colors={colors}
              handleChange={handleChange}
              handleNext={handleNext}
              navigation={navigation}
              user={user}
              setUser={setUser}
            />
          </>
        );

      case 1:
        return (
          <>
            <RegisterForm1
              handleChange={handleChange}
              formOneIsFilled={formOneIsFilled}
              handleNext={handleNext}
              navigation={navigation}
              user={user}
              strengthBadgeColor={strengthBadgeColor}
              strengthBadgeText={strengthBadgeText}
            />
          </>
        );
      case 2:
        return (
          <>
            <RegisterForm3
              user={user}
              colors={colors}
              handleChange={handleChange}
              handleNext={handleNext}
              handleBack={handleBack}
            />
          </>
        );
      case 3:
        return (
          <>
            <RegisterForm4
              colors={colors}
              handleChange={handleChange}
              handleNext={handleNext}
              handleBack={handleBack}
              navigation={navigation}
              onSubmit={onSubmit}
            />
          </>
        );
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <RegisterTop
        colors={colors}
        navigation={navigation}
        activeStep={activeStep}
      />
      <ProgressBar activeStep={activeStep} />
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.viewContainer}
      >
        <>{getStepContent(activeStep)}</>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    paddingHorizontal: config.wp("3.5%"),
    paddingVertical: config.hp("1%"),
    minHeight: "100%",
    backgroundColor: "white",
  },
});

export default NewMemberFormContainer;
