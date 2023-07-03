import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserInfo from "./components/UserInfo";
import UserDetails from "./components/UserDetails";
import Permission from "../components/Permissions";
import EditPermissions from "../components/EditPermissions";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { AddUser } from "../../../store/actions/CommercialActions";

const AddNewUser = ({ navigation }) => {
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    userId: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    birthday: new Date().toLocaleDateString("en-US"),
    mobileNumber: undefined,
    homeNumber: undefined,
    address1: undefined,
    address2: undefined,
    city: undefined,
    state: undefined,
    zip: undefined,
    entitlements: {
      billPay: false,
      eSafe: false,
      admin: false,
      createACH: false,
      approveACH: false,
      submitACH: false,
    },
    permissions: [],
  });

  const [status, setStatus] = useState({
    loading: false,
    error: undefined,
    message: undefined,
  });

  function handleChange(name, value) {
    setPayload({
      ...payload,
      [name]: value,
    });
  }

  function handleNext() {
    setStep(step + 1);
  }
  function handleBack() {
    setStep(step - 1);
  }

  function handleCancel() {
    navigation.goBack();
  }
  function submit() {
    setStatus({
      ...status,
      loading: true,
    });
    dispatch(AddUser(payload));
  }

  function handleStep() {
    switch (step) {
      case 0:
        return (
          <UserInfo
            handleCancel={handleCancel}
            handleChange={handleChange}
            handleNext={handleNext}
            payload={payload}
          ></UserInfo>
        );

      case 1:
        return (
          <UserDetails
            handleChange={handleChange}
            handleNext={handleNext}
            handleBack={handleBack}
            payload={payload}
            submit={submit}
          ></UserDetails>
        );

      case 2:
        return (
          <Permission
            handleChange={handleChange}
            handleNext={handleNext}
            handleBack={handleBack}
            payload={payload}
            navigation={navigation}
            setStep={setStep}
            submit={submit}
          ></Permission>
        );

      case "Account Permissions":
        return (
          <EditPermissions
            navigation={navigation}
            setStep={setStep}
            submit={submit}
          ></EditPermissions>
        );
    }
  }
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        paddingVertical: config.hp("2%"),
        paddingHorizontal: config.wp("2%"),
      }}
    >
      {handleStep()}
    </View>
  );
};

export default AddNewUser;
