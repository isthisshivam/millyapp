import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import User from "./components/User";
import Permissions from "../components/Permissions";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import EditPermissions from "../components/EditPermissions";
import { UpdatePermissions } from "../../../store/actions/CommercialActions";

const EditAccount = ({ navigation, route }) => {
  let item = route.params?.item;
  const state = useSelector((state) => state.commercial);
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [account, setAccount] = useState();
  const [payload, setPayload] = useState({
    userName: undefined,
    view: [],
    transferFrom: [],
    transferTo: [],
    billPay: undefined,
    eSafe: undefined,
    userId: undefined,
    // firstName: undefined,
    // lastName: undefined,
    // email: undefined,
    // birthday: undefined,
    // mobileNumber: undefined,
    // homeNumber: undefined,
    // address1: undefined,
    // address2: undefined,
    // city: undefined,
    // state: undefined,
    // zip: undefined,
    // entitlements: {
    //   billPay: false,
    //   eSafe: false,
    //   admin: false,
    //   createACH: false,
    //   approveACH: false,
    //   submitACH: false,
    // },
    // permissions: [],
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

    dispatch(UpdatePermissions(payload));
  }

  useEffect(() => {
    if (!item) {
      handleCancel();
    }

    setPayload({
      ...item,
    });
    return;
  }, []);

  function handleStep() {
    switch (step) {
      // case 0:
      //   return (
      //     <User
      //       setStep={setStep}
      //       handleCancel={handleCancel}
      //       payload={payload}
      //       handleNext={handleNext}
      //       navigation={navigation}
      //     ></User>
      //   );

      case 0:
        return (
          <Permissions
            handleChange={handleChange}
            handleNext={handleNext}
            payload={payload}
            // navigation={navigation}
            // handleBack={handleBack}
            //setStep={setStep}
            submit={submit}
          ></Permissions>
        );
      case "Account Permissions":
        return (
          <EditPermissions
            navigation={navigation}
            setStep={setStep}
            submit={submit}
            setAccount={setAccount}
          ></EditPermissions>
        );
    }
  }

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: config.wp("3%"),
        paddingVertical: config.hp("2%"),
        flex: 1,
      }}
    >
      <Text
        style={{ fontSize: 20, color: theme.colors.primary, fontWeight: "500" }}
      >
        Edit User and Entitlements
      </Text>
      {handleStep()}
    </SafeAreaView>
  );
};

export default EditAccount;
