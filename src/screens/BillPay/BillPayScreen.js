import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useSelector, useDispatch } from "react-redux";
import LottieView from "lottie-react-native";

import {
  GetBillPayHistory,
  GetBillPayAccounts,
  GetPendingHistory,
} from "../../store/actions/BillPayAction";
import { GetMerchants } from "../../store/actions/MerchantActions";
import ModalContent from "./modalContent/ModalContent";
import { styles } from "./style";
import TopNav from "./topNav/TopNav";

const BillPayScreen = ({ navigation, route }) => {
  const merchants = useSelector((state) => state.merchants.merchants);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (merchants?.length > 0) {
      setLoading(false);
    }
  }, [merchants]);

  useEffect(() => {
    dispatch(GetBillPayHistory());
    dispatch(GetMerchants());
    dispatch(GetBillPayAccounts());
    dispatch(GetPendingHistory());
  }, []);

  return (
    <>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <TopNav navigation={navigation} route={route} />
        <View style={styles.container}>
          <Text style={styles.helperText}>
            Payments must be scheduled 5 business days before payment due date
            to ensure an on-time arrival and 7 days during the holidays.
          </Text>
          {/* <View style={styles.payContainer}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.85}
              onPress={() => setShowModal(true)}
            >
              <Text style={styles.buttonText}>Pay Bill</Text>
              <FeatherIcon style={styles.icon} name="chevron-right" />
            </TouchableOpacity>
          </View> */}
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {loading ? (
            <View
              style={{
                width: "100%",
                height: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LottieView
                loop
                autoPlay
                style={{
                  width: 160,
                  height: 160,
                }}
                source={require("../../components/ui/loading-spinner.json")}
              />
            </View>
          ) : (
            <View>
              {merchants?.map((merchant, index) => {
                return (
                  <TouchableOpacity
                    style={styles.button2}
                    key={index}
                    activeOpacity={0.85}
                    onPress={() =>
                      navigation.navigate("PayMerchant", {
                        merchantName: merchant?.merchantName,
                        merchantAccount: merchant?.merchantAccount,
                      })
                    }
                  >
                    <Text style={styles.buttonText}>
                      {merchant?.merchantName}
                    </Text>
                    <FeatherIcon style={styles.icon} name="chevron-right" />
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </ScrollView>
        <Modal visible={showModal} transparent={true} animationType={"fade"}>
          <ModalContent setShowModal={setShowModal} navigation={navigation} />
        </Modal>
      </View>
    </>
  );
};

export default BillPayScreen;
