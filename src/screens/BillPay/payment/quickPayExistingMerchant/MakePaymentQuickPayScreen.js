import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { NewPayment } from "../../../../store/actions/MerchantActions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Xicon } from "../../../../components/Icons";
import Memo from "../paymentComponents/memo/Memo";
import TransferFrom from "../paymentComponents/TransferFrom/TransferFrom";
import ModalContent from "./modalContent/ModalContent";
import SuccessModal from "../../../../components/Modals/SuccessModal";
import { styles } from "./style";

const MakePaymentQuickPayScreen = (props) => {
  //Component State
  const dispatch = useDispatch();
  const merchants = useSelector((state) => state.merchants);
  const payments = useSelector((state) => state.billPays.history);
  const BillPayState = useSelector((state) => state.billPays);
  const [showModal, setShowModal] = useState(false);
  const [safeToSubmit, setSafeToSubmit] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [payload, setPayload] = useState({
    amount: undefined,
    accountfromid: "",
    date: "",
    merchantName: "",
    merchantAccount: "",
    memo: "",
  });

  //Input handler
  const handleChange = (name, value) => {
    setPayload({ ...payload, [name]: value });
  };

  //Disable Btn unless all fields are entered
  useEffect(() => {
    const { amount, accountfromid, date, merchantName, merchantAccount } =
      payload;
    if (
      amount !== "" &&
      amount > 0 &&
      accountfromid != "" &&
      date !== "" &&
      merchantName !== "" &&
      merchantAccount !== ""
    ) {
      setSafeToSubmit(true);
    } else {
      setSafeToSubmit(false);
    }

    if (payload.merchantName) {
      let selectedMerchant = merchants.merchants?.filter(
        (item) => item.merchantName == payload.merchantName
      );
      setPayload({
        ...payload,
        merchantAccount: selectedMerchant[0],
      });
    }
  }, [payload]);

  //Get all payments for selected merchant
  const selectedPayments = payments?.filter(
    (item) => item.merchantName === payload.merchantName
  );

  //Get Most Recent Payment from list of payments
  const payment = selectedPayments?.sort(
    (a, b) => new Date(b.paydate) - new Date(a.paydate)
  );
  //Format Last Payment Date
  const lastDate = payment[0]
    ? new Date(payment[0]?.paydate).toLocaleDateString("en-US")
    : "";

  //Display Last Payment Date if Last Payment
  const LastPayment = () => {
    if (payment) {
      return <Text style={styles.latestPaymentRight}>{lastDate}</Text>;
    } else {
      return <Text style={styles.latestPaymentRight}>No Recent Payment</Text>;
    }
  };

  //Request to backend
  const submit = () => {
    if (safeToSubmit === true) {
      let requestData = {
        amount: Number(payload.amount),
        accountId: payload.accountfromid,
        date: payload.date,
        merchantName: payload.merchantName,
        memo: payload.memo,
      };
      dispatch(NewPayment(requestData));
    }
  };
  const closeModal = () => {
    props.navigation.goBack();
    setShowSuccessModal(false);
  };

  function toggleModal() {
    setShowModal(!showModal);
  }

  useEffect(() => {
    if (BillPayState.status == true) {
      setShowSuccessModal(true);
    }
  }, [BillPayState]);

  return (
    <View style={styles.backGroundContainer}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Pay Existing Merchant</Text>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <Xicon height={7} width={7} />
          </TouchableOpacity>
        </View>

        <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.topContainer}>
            <View style={styles.merchantContainer}>
              <Text style={styles.merchantText} numberOfLines={1}>
                Merchant:
              </Text>

              <TouchableOpacity
                onPress={toggleModal}
                style={styles.merchantRight}
              >
                <Text style={styles.merchantTextSelect}>
                  {payload.merchantName
                    ? payload.merchantName
                    : "Select Merchant"}
                </Text>
                <Icon name="chevron-down" style={styles.icon} />
              </TouchableOpacity>
            </View>
            <View style={styles.latestPaymentContainer}>
              {payload?.merchantName !== "" && (
                <>
                  <Text style={styles.latestPaymentLeft}>Last Payment:</Text>
                  <LastPayment />
                </>
              )}
            </View>
          </View>
          <Amount handleChange={handleChange} amount={payload.amount} />
          <TransferFrom
            handleChange={handleChange}
            accountTransferFrom={payload?.accountfromid}
          />
          <Memo handleChange={handleChange} />
          <CalendarSection handleChange={handleChange} date={payload.date} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={
                safeToSubmit
                  ? [styles.button, styles.buttonSafe]
                  : styles.button
              }
              disabled={!safeToSubmit}
              onPress={submit}
            >
              <Text style={styles.buttonText}>Send Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonClear}
              onPress={() => {
                props.navigation.goBack();
              }}
            >
              <Text style={styles.buttonText2}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
      <SuccessModal
        showSuccessModal={showSuccessModal}
        message="Payment Successfully Submitted"
        closeModal={closeModal}
      ></SuccessModal>
      <Modal visible={showModal} animationType={"slide"}>
        <ModalContent
          handleChange={handleChange}
          toggleModal={toggleModal}
          data={merchants?.merchants}
        />
      </Modal>
    </View>
  );
};

export default MakePaymentQuickPayScreen;
