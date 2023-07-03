import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LottieView from "lottie-react-native";
import StatusHandler from "../../../../utils/StatusHandler";
import { theme } from "../../../config/Theme";
import { config } from "../../../config/Config";
import Carousel from "../../../components/Carousel/Carousel";
import EffectiveDate from "../../../components/EffectiveDate";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  EditPendingPay,
  DeletePendingPay,
} from "../../../store/actions/BillPayAction";

const EditPending = ({ navigation, route }) => {
  const state = useSelector((state) => state.billPays);
  const item = route.params.item;
  const dispatch = useDispatch();

  //   let accounts = state.accounts.map((obj) => {
  //     if (obj.accountId == item.accountId) {
  //       return [obj, ...state.accounts];
  //     }
  //   });

  const [payload, setPayload] = useState({
    invoice: item.invoice,
    account: item.account,
    amount: item.amount,
    payDate: item.payDate,
    accountfromid: item.accountId,
    memo: item.memo,
    payee: item.payee,
  });

  const [status, setStatus] = useState({
    loading: false,
    error: undefined,
    message: undefined,
  });

  const handleChange = (name, value) => {
    setPayload({ ...payload, [name]: value });
  };

  function deletePending() {
    setStatus({ ...status, loading: true });
    let data = { invoice: item.invoice, account: item.account };

    dispatch(DeletePendingPay(data));
  }

  function updatePending() {
    setStatus({
      ...status,
      loading: true,
    });
    let requestData = {
      amount: Number(payload.amount),
      accountId: payload.accountfromid,
      payDate: payload.startDate,
      //memo: payload.memo,
      invoice: item.invoice,
      account: item.account,
    };

    dispatch(EditPendingPay(requestData));
  }
  useEffect(() => {
    return;
  }, [state]);

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        //flex: 1,
        paddingHorizontal: config.wp("2%"),
        paddingVertical: config.hp("2%"),
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "500",
          color: theme.colors.primary,
        }}
      >
        Edit Pending Payment
      </Text>
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
        <View style={{ height: "100%", width: "100%" }}>
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
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  //paddingHorizontal: config.wp("4%"),
                }}
              >
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontWeight: "500",
                    fontSize: 18,
                    marginRight: 15,
                  }}
                >
                  From:
                </Text>
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontWeight: "500",
                    fontSize: 18,
                  }}
                >
                  {payload.accountfromid}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  //paddingHorizontal: config.wp("4%"),
                }}
              >
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontWeight: "500",
                    fontSize: 18,
                    marginRight: 15,
                  }}
                >
                  To:
                </Text>
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontWeight: "500",
                    fontSize: 18,
                  }}
                >
                  {payload.payee}
                </Text>
              </View>
            </View>
            <Carousel
              navigation={undefined}
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
            <TextInput
              keyboardType="decimal-pad"
              onChangeText={(text) => handleChange("amount", text)}
              placeholder={payload.amount}
              placeholderTextColor={"black"}
              style={{
                width: "50%",
                borderRadius: 7,
                backgroundColor: "white",
                height: config.hp("5%"),
                paddingHorizontal: config.wp("1%"),
                borderWidth: 1,
                borderColor: theme.colors.faded,
              }}
            ></TextInput>
          </View>
          <View
            style={{ borderBottomWidth: 1, borderColor: theme.colors.faded }}
          >
            <EffectiveDate
              handleChange={handleChange}
              activeDate={payload.payDate}
            />
          </View>
          <View
            style={{
              width: "100%",
              //flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: config.hp("3%"),
              // borderBottomWidth: 1,
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
              placeholder={payload.memo}
              placeholderTextColor="black"
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
              //height: config.hp("12%"),
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
              paddingBottom: config.hp("2%"),
              marginBottoms: 100,
            }}
          >
            <TouchableOpacity
              onPress={() => updatePending()}
              style={{
                backgroundColor: theme.colors.primary,
                width: "80%",
                paddingVertical: config.hp("1%"),
                borderRadius: 12,
                marginBottom: config.hp("1.5%"),
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  textAlign: "center",
                  fontWeight: "500",
                }}
              >
                Update
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deletePending} style={{}}>
              <Text
                style={{
                  //color: "white",
                  fontSize: 16,
                  textAlign: "center",
                  fontWeight: "500",
                }}
              >
                Delete
              </Text>
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
    </KeyboardAwareScrollView>
  );
};

export default EditPending;

const styles = StyleSheet.create({});
