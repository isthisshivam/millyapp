import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import Register from "./Register";
import IdVerification from "./IdVerification/IdVerification";
import UserInfo from "./userInfo/UserInfo";
import TwoFactor from "./twoFactor/TwoFactor";
import SecurityQuestions from "./securityQuestions/SecurityQuestions";
import Disclosures from "./disclosures/Disclosures";
import { useAppDispatch } from "../../store/Store";
import { GetPasswordQuestions } from "../../store/actions/authActions";

const RegisterContainer = ({ navigation }) => {
  const [step, setStep] = useState<number>(0);
  const dispatch = useAppDispatch();
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  function handleNext() {
    if (step < 6) {
      setStep(step + 1);
    }
  }
  function handleBack() {
    if (step > 0) {
      setStep(step - 1);
    }
  }

  useEffect(() => {
    dispatch(GetPasswordQuestions());
  }, []);

  function handleSteps() {
    switch (step) {
      case 0:
        return (
          <>
            <Register
              handleNext={handleNext}
              navigation={navigation}
              setCredentials={setCredentials}
            />
          </>
        );
      case 1:
        return (
          <>
            <IdVerification handleNext={handleNext} />
          </>
        );

      case 2:
        return (
          <>
            <UserInfo handleNext={handleNext} />
          </>
        );
      case 3:
        return (
          <>
            <TwoFactor handleNext={handleNext} handleBack={handleBack} />
          </>
        );
      case 4:
        return (
          <>
            <SecurityQuestions handleNext={handleNext} />
          </>
        );
      case 5:
        return (
          <>
            <Disclosures
              handleBack={handleBack}
              navigation={navigation}
              credentials={credentials}
            />
          </>
        );
    }
  }
  return <View style={{ flex: 1 }}>{handleSteps()}</View>;
};

export default RegisterContainer;
