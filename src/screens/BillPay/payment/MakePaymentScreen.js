import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import LottieView from "lottie-react-native";
import { NewPayment } from "../../../store/actions/BillPayAction";
import Carousel from "../../../components/Carousel/Carousel";
import StatusHandler from "../../../../utils/StatusHandler";
import EffectiveDate from "../../../components/EffectiveDate";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { styles } from "./style";
import { formatDateYYMMDD } from "../../../../utils/utils";
import CurrencyInput from "react-native-currency-input";

const MakePaymentScreen = ({ route, navigation }) => {
  const { merchantAccount, merchantName } = route.params;
  const state = useSelector((state) => state.billPays);
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    amount: undefined,
    accountfromid: "",
    startDate: undefined,
    merchantAccount: merchantAccount,
    merchantName: merchantName,
    memo: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    error: undefined,
    message: undefined,
    safeToSubmit: false,
  });

  //Input change handler
  const handleChange = (name, value) => {
    setPayload({ ...payload, [name]: value });
  };

  //Check if all fields are entered
  useEffect(() => {
    const { amount, accountfromid, startDate } = payload;
    if (amount != undefined && accountfromid != "" && startDate != "") {
      setStatus({
        ...status,
        safeToSubmit: true,
      });
    } else {
      setStatus({
        ...status,
        safeToSubmit: false,
      });
    }
  }, [payload]);

  //SUBMIT REQUEST DATA
  const submit = () => {
    setStatus({
      ...status,
      loading: true,
    });
    let requestData = {
      amount: Number(payload.amount),
      accountId: payload.accountfromid,
      date: formatDateYYMMDD(payload.startDate),
      merchantAccount: payload.merchantAccount,
      memo: payload.memo,
      merchantName: merchantName,
    };

    dispatch(NewPayment(requestData));
  };

  useEffect(() => {
    if (state.status === true) {
      setStatus({
        ...status,
        loading: false,
      });
    }
    if (state.status == "Error") {
      setStatus({
        ...status,
        loading: false,
        error: state.error,
      });
    }
  }, [state]);

  // //Get all payments for selected merchant
  // const selectedPayments = payments.filter(
  //   (item) => item.company === payload.company
  // );

  // //Get Most Recent Payment from list of payments
  // const payment = selectedPayments.sort(
  //   (a, b) => new Date(b.date) - new Date(a.date)
  // );

  // //Format Last Payment Date
  // const lastDate = payment[0]
  //   ? new Date(payment[0].date).toLocaleDateString("en-US")
  //   : "";

  // //If last date return date else n recent payments
  // const LastPayment = () => {
  //   if (payment[0] !== undefined) {
  //     return <Text style={styles.latestPaymentRight}>{lastDate}</Text>;
  //   } else {
  //     return <Text style={styles.latestPaymentRight}>No Recent Payment</Text>;
  //   }
  // };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pay {merchantName}</Text>

      {status.loading ? (
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
        <View style={{ height: "100%" }}>
          <View
            style={{
              width: "100%",
              paddingTop: config.hp("1%"),
              borderBottomColor: theme.colors.faded,
              borderBottomWidth: 1,
              //marginBottom: config.hp("2%"),
              paddingBottom: config.hp("2%"),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                //paddingHorizontal: config.wp("4%"),
              }}
            >
              <Text
                style={{
                  color: theme.colors.primary,
                  fontWeight: "500",
                  fontSize: 18,
                }}
              >
                From:
              </Text>
            </View>
            <Carousel
              navigation={navigation}
              items={state.accounts}
              type={"billpay-from"}
              accountTransferFrom={payload.accountfromid}
              handleChange={handleChange}
            />
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: config.hp("3%"),
              borderBottomWidth: 1,
              marginBottom: config.hp("2%"),
              borderBottomColor: theme.colors.faded,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: theme.colors.primary,
                fontWeight: "500",
              }}
            >
              Amount:
            </Text>
            <CurrencyInput
              onChangeValue={(value) => handleChange("amount", value)}
              keyboardType="decimal-pad"
              //onChangeText={(value) => handleChange("amount", value)}
              style={{
                width: "50%",
                borderRadius: 7,
                backgroundColor: "white",
                height: config.hp("5%"),
                paddingHorizontal: config.wp("1%"),
                borderWidth: 1,
                borderColor: theme.colors.faded,
              }}
              value={Number(payload.amount)}
              prefix="$"
              delimiter=","
              separator="."
              precision={2}
              minValue={0}
              placeholder={"$000.00"}
              // placeholderTextColor={payload.amount ? "black" : undefined}
            />
            {/* <TextInput
              onChangeText={(text) => handleChange("amount", text)}
              placeholder="123456789"
              keyboardType="decimal-pad"
              style={{
                width: "50%",
                borderRadius: 7,
                backgroundColor: "white",
                height: config.hp("5%"),
                paddingHorizontal: config.wp("1%"),
                borderWidth: 1,
                borderColor: theme.colors.faded,
              }}
            ></TextInput> */}
          </View>
          <View
            style={{ borderBottomWidth: 1, borderColor: theme.colors.faded }}
          >
            <EffectiveDate
              handleChange={handleChange}
              activeDate={payload.startDate}
            />
          </View>
          <View
            style={{
              width: "100%",
              //flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: config.hp("3%"),
              borderBottomWidth: 1,
              marginBottom: config.hp("2%"),
              borderBottomColor: theme.colors.faded,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: theme.colors.primary,
                fontWeight: "500",
                width: "100%",
                marginBottom: config.hp("2%"),
              }}
            >
              Memo:
            </Text>
            <TextInput
              onChangeText={(text) => handleChange("memo", text)}
              placeholder="Description for your clarity"
              style={{
                width: "50%",
                borderRadius: 7,
                backgroundColor: "white",
                height: config.hp("5%"),
                paddingHorizontal: config.wp("1%"),
                borderWidth: 1,
                borderColor: theme.colors.faded,
                width: "100%",
              }}
            ></TextInput>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
              marginBottom: config.hp("4%"),
            }}
          >
            <TouchableOpacity
              style={
                status.safeToSubmit
                  ? [styles.button, styles.buttonSafe]
                  : styles.button
              }
              //disabled={!status.safeToSubmit}
              onPress={submit}
            >
              <Text style={styles.buttonText}>Send Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonClear}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={styles.buttonText2}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <StatusHandler
        state={state}
        status={status}
        navigation={navigation}
        setStatus={setStatus}
      />
    </ScrollView>
  );
};

export default MakePaymentScreen;
