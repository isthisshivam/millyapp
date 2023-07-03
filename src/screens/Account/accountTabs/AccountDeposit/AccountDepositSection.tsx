import React, { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { SendDeposit } from "../../../../store/actions/DepositActions";
import CheckImagesContainer from "./checkImageSection/CheckImagesContainer";
import AccountDepositTo from "./AccountDepositTo";
import AccountDepositAmount from "./AccountDepositAmount";

import SuccessModal from "../../../../components/Modals/SuccessModal";
import { theme } from "../../../../config/Theme";
import { config } from "../../../../config/Config";
import { useAppDispatch, useAppSelector } from "../../../../store/Store";

const AccountDepositSection = (props) => {
  const scrollViewRef = useRef();
  const dispatch = useAppDispatch();
  const checkImages = useAppSelector((state) => state.checkImages);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isValidDeposit, setIsValidDeposit] = useState(false);

  const [payload, setPayload] = useState({
    depositAccount: "",
    amount: 0.0,
    principle: false,
    status: "Pending",
    date: "",
    confirmation: "",
    checkImage1: null,
    checkImage2: null,
  });

  //Add images from redux to payload
  useEffect(() => {
    if (checkImages) {
      setPayload({
        ...payload,
        checkImage1: checkImages.check1,
        checkImage2: checkImages.check2,
      });
    }
  }, [checkImages]);

  // const handleScreenChange = () => {
  //   scrollViewRef.current?.scrollTo({ y: 0, animated: false });
  // };
  const handleChange = (name: string, value: any) => {
    setPayload({ ...payload, [name]: value });
  };

  //Field validation
  useEffect(() => {
    if (
      payload.depositAccount !== "" &&
      payload.amount > 0 &&
      payload.checkImage1 != null &&
      payload.checkImage2 !== null
    ) {
      setIsValidDeposit(true);
    }
  }, [payload]);

  //On success show modal, reset payload
  const successfulDeposit = () => {
    setPayload({
      depositAccount: "",
      amount: "",
      principle: false,
      status: "Pending",
      date: "",
      confirmation: "",
      checkImage1: "",
      checkImage2: "",
    });
    //   handleScreenChange();
  };
  //Submit deposit to backend
  const submit = async () => {
    try {
      let data = {
        depositAccount: payload.depositAccount,
        amount: payload.amount,
        principle: false,
        status: "Pending",
        date: new Date().toLocaleDateString("en-US"),
        checkImage1: payload.checkImage1,
        checkImage2: payload.checkImage2,
      };
      //Dispatch redux
      dispatch(SendDeposit(data));
      setShowSuccessModal(true);
    } catch (error) {
      //console.log(error);
    }
  };

  const closeModal = () => {
    successfulDeposit();
    setShowSuccessModal(false);
  };

  return (
    <>
      <AccountDepositTo
        {...props}
        handleChange={handleChange}
        depositAccount={payload.depositAccount}
      />
      <AccountDepositAmount
        {...props}
        handleChange={handleChange}
        amount={payload.amount}
      />
      <CheckImagesContainer setPayload={setPayload} payload={payload} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={submit}
          style={isValidDeposit ? styles.buttonIsActive : styles.button}
          disabled={!isValidDeposit}
        >
          <Text style={styles.buttonText}>Deposit Funds</Text>
        </TouchableOpacity>
      </View>
      <SuccessModal
        showSuccessModal={showSuccessModal}
        closeModal={closeModal}
        message="Deposit Successfully Submitted."
        message2="We will notify you when funds become available within 2 business days."
      ></SuccessModal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.inActive,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: config.hp("1.5%"),
    paddingVertical: config.hp("2%"),
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: config.wp("4%"),
    paddingBottom: config.hp("4%"),
    backgroundColor: "white",
  },
  buttonText: {
    fontSize: config.hp("2.5%"),
    color: "white",
    fontWeight: "bold",
  },
  buttonIsActive: {
    backgroundColor: theme.colors.primary,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: config.hp("1.5%"),
    paddingVertical: config.hp("2%"),
  },
});

export default AccountDepositSection;
