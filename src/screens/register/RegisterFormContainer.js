import React, { useState, useRef, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "react-native-paper";
import Help from "../landing/Help";
import BackButton from "./backButton/BackButton";
import ProgressBar from "./progressBar/ProgressBar";
import RegisterForm1 from "./registerForm1/RegisterForm1";
import IdScan from "./idValidation/IdScan";
import RegisterForm2 from "./registerForm2/RegisterForm2";
import RegisterForm3 from "./registerForm3/RegisterForm3";
import RegisterForm4 from "./registerForm4/RegisterForm4";
import RegisterTop from "./registerTopContainer/RegisterTop";
import SecurityQuestionSection from "./SecurityQuestion";
import { styles } from "./style";
import { theme } from "../../config/Theme";
import { userLoginMain } from "../../store/actions/authActions";
import SelfieScan from "./idValidation/SelfieScan";
import { formatPhoneNumber } from "../../../utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UpdatePic } from "../../store/actions/ProfileAction";

const RegisterFormContainer = ({ navigation }) => {
  const { colors } = useTheme();
  const scrollViewRef = useRef();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formOneIsFilled, setFormOneIsFilled] = useState(true);
  const [strengthBadgeColor, setStrengthBadgeColor] = useState();
  const [strengthBadgeText, setStrengthBadgeText] = useState();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    ssn: "",
    account: "",
    info: {
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      mobilePhone: "",
      birthday: "",
    },

    dob: "",
    disclosures: {},
    profilePic: undefined,
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
    setUser({ ...user, [name]: value });
  };

  const infoChange = (name, value) => {
    setUser({
      ...user,
      info: {
        ...user.info,
        [name]: value,
      },
    });
  };

  function numberChange(name, value) {
    let number = formatPhoneNumber(value);
    setUser({ ...user, [name]: number });
  }

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

  const onSubmit = async () => {
    dispatch(userLoginMain({ userId: "Demos1234", password: "Demos1234" }));
    await AsyncStorage.setItem("profilePic", user.profilePic);
  };
  //Redirect to main on success
  useEffect(() => {
    //Auth Successful
    if (auth.success) {
      navigation.navigate("Main"); //Navigate to home screen
      setLoading(false); //Remove Loading Spinner
      setUser({
        userId: "",
        password: "",
        confirmPassword: "",
        ssn: "",
        account: "",
        info: {
          firstName: "",
          lastName: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          zip: "",
          country: "",
          mobilePhone: "",
          birthday: "",
        },

        dob: "",
        disclosures: {},
      });

      //Auth Failed
    } else if (auth.success === false && auth.error) {
      setLoading(false); //Remove Loading Spinner
      //setShowErrorModal(true); //Show Error Modal
      //Reset Username
      setUser({
        userId: "",
        password: "",
        confirmPassword: "",
        ssn: "",
        info: {
          firstName: "",
          lastName: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          zip: "",
          country: "",
          mobilePhone: "",
          birthday: "",
        },
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
            <RegisterForm1
              handleChange={handleChange}
              formOneIsFilled={formOneIsFilled}
              handleNext={handleNext}
              navigation={navigation}
              strengthBadgeColor={strengthBadgeColor}
              strengthBadgeText={strengthBadgeText}
              user={user}
            />
          </>
        );
      case 1:
        return (
          <>
            <IdScan
              handleChange={handleChange}
              formOneIsFilled={formOneIsFilled}
              handleNext={handleNext}
              handleBack={handleBack}
              navigation={navigation}
              strengthBadgeColor={strengthBadgeColor}
              strengthBadgeText={strengthBadgeText}
              user={user}
              setUser={setUser}
            />
          </>
        );

      case 2:
        return (
          <>
            <RegisterForm2
              colors={colors}
              infoChange={infoChange}
              handleNext={handleNext}
              handleBack={handleBack}
              user={user}
              setUser={setUser}
              numberChange={numberChange}
            />
          </>
        );
      case 3:
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
      case 4:
        return (
          <>
            <SecurityQuestionSection
              colors={colors}
              handleChange={handleChange}
              handleNext={handleNext}
              navigation={navigation}
              handleBack={handleBack}
              onSubmit={onSubmit}
            />
          </>
        );
      case 5:
        return (
          <>
            <RegisterForm4
              colors={colors}
              handleChange={handleChange}
              handleNext={handleNext}
              navigation={navigation}
              onSubmit={onSubmit}
            />
            <BackButton handleBack={handleBack} />
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

export default RegisterFormContainer;
