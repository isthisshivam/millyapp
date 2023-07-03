import React, { useEffect, useState, useRef } from "react";
import { View, Modal, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import LottieView from "lottie-react-native";

import CalendarSection from "../../../Transfer/transferComponents/calendar/CalendarSection";
import FrequencyModal from "./transferComponents/modalContent/FrequencyModal";
import Frequency from "./transferComponents/modalContent/Frequency/Frequency";
import { SendTransfer } from "../../../../store/actions/TransferActions";
import SuccessModal from "../../../../components/Modals/SuccessModal";
import ErrorModal from "../../../../components/Modals/ErrorModal";

import AmountTransfer from "./AmountTransfer";
import ModalContent from "./ModalContent";
import SubmitTransfer from "./SubmitTransfer";
import TransferFrom from "./TransferFrom";
import TransferTo from "./TransferTo";
import { useAppDispatch, useAppSelector } from "../../../../store/Store";

const AccountTransferSection = (props) => {
  const data = useAppSelector((state) => state.accounts.accounts);
  const state = useAppSelector((state) => state.transfers);
  const nonLoanAccounts = data.filter((item) => item.isLoan == false);

  const [isSafeToTransfer, setIsSafeToTransfer] = useState(false); ///Form Validation
  const [showSuccessModal, setShowSuccessModal] = useState(false); //Success Modal
  const [showFrequency, setShowFrequency] = useState(false); //Frequency Modal
  const [visibleModal, setVisibleModal] = useState(false); //Frequency Period MOdal
  const [showError, setShowError] = useState(false); //Error Modal
  const [loading, setLoading] = useState(false); //Loading Spinner
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState();
  const scrollViewRef = useRef();
  const dispatch = useAppDispatch();

  const [payload, setPayload] = useState({
    frequency: 1, //number of payments
    frequencyperiod: "Once", //weekly, bi-weekly, monthly, etc
    amount: 0,
    startdate: "", //StartDate
    accounttoid: undefined,
    accountfromid: undefined,
    principal: false,
    intereset: false,
    condition: "", //nnumofpayments, maxamount, enddate,
  });

  const toggleModal = () => {
    setVisible(!visible);
  };

  function toggleFrequency() {
    setShowFrequency(!showFrequency);
  }
  function toggleLoading() {
    setLoading(!loading);
  }

  function toggleError() {
    setShowError(!showError);
  }

  const handleChange = (name, value) => {
    setPayload({ ...payload, [name]: value });
  };

  useEffect(() => {
    if (
      payload.accounttoid !== null &&
      payload.accountfromid !== null &&
      payload.amount > 0 &&
      payload.accountfromid !== payload.accounttoid
    ) {
      setIsSafeToTransfer(true);
    } else {
      setIsSafeToTransfer(false);
    }
  }, [payload]);

  const handleSubmit = () => {
    if (isSafeToTransfer) {
      toggleLoading();
      dispatch(SendTransfer(payload));
    }
  };

  function closeModal() {
    setPayload({
      accountTo: {
        id: null,
        account: null,
      },
      accountFrom: { id: null, account: null },
      amount: 0,
      principle: false,
    });
    setShowSuccessModal(false);
  }

  useEffect(() => {
    if (state.status == true) {
      toggleLoading();
      setShowSuccessModal(true);
    }
    if (state.status == "Error") {
      toggleLoading();
      setError(state.error);
      setShowError(true);
    }
    //console.log(state.status);
  }, [state]);
  return (
    <>
      <ScrollView ref={scrollViewRef}>
        {loading ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "flex-start",
              height: "100%",
              paddingTop: 25,
            }}
          >
            <LottieView
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
            <TransferFrom
              data={nonLoanAccounts}
              {...props}
              accountTransferFrom={payload.accountfromid}
              handleChange={handleChange}
            />
            <AmountTransfer
              {...props}
              setPayload={setPayload}
              payload={payload}
            />

            <TransferTo
              data={data}
              {...props}
              accountTransferTo={payload.accounttoid}
              handleChange={handleChange}
              amount={payload.amount}
            />
            <CalendarSection
              startdate={payload.startdate}
              handleChange={handleChange}
            ></CalendarSection>
            <SubmitTransfer
              {...props}
              isSafeToTransfer={isSafeToTransfer}
              handleChange={handleChange}
              principal={payload.principal}
              handleSubmit={handleSubmit}
              payload={payload}
              frequency={payload.frequency}
              setVisibleModal={setVisibleModal}
              frequencyperiod={payload.frequencyperiod}
              toggleFrequency={toggleFrequency}
            />
          </>
        )}

        <Modal visible={showFrequency} animationType="fade" transparent={true}>
          <Frequency
            toggleFrequency={toggleFrequency}
            handleChange={handleChange}
          />
        </Modal>
        <Modal
          visible={visibleModal}
          transparent={true}
          animationType={"slide"}
        >
          <FrequencyModal
            setShowModal={setVisibleModal}
            handleChange={handleChange}
            frequency={payload.frequency}
          />
        </Modal>
        {/* <SuccessModal
          showSuccessModal={showSuccessModal}
          closeModal={closeModal}
          message={`Transfer request has been successfully submitted.`}
        ></SuccessModal>
        <ErrorModal
          showErrorModal={showError}
          error={error}
          closeErrorModal={toggleError}
        ></ErrorModal> */}
      </ScrollView>
    </>
  );
};

export default AccountTransferSection;
