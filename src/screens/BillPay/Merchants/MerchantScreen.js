import React, { useEffect, useState } from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView } from "react-native";
import { useSelector, dispatch, useDispatch } from "react-redux";
import { DeleteMerchant } from "../../../store/actions/MerchantActions";
import TopNav from "../topNav/TopNav";
import MerchantItem from "./MerchantItem/MerchantItem";
import { styles } from "./style";
import { config } from "../../../config/Config";
import SuccessModal from "../../../components/Modals/SuccessModal";
import ErrorModal from "../../../components/Modals/ErrorModal";
import LottieView from "lottie-react-native";

const MerchantScreen = (props) => {
  const state = useSelector((state) => state.merchants);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  function toggleLoading() {
    setLoading(!loading);
  }
  function toggleSuccess() {
    setShowSuccessModal(!showSuccessModal);
  }

  function toggleError() {
    setShowError(!showError);
  }
  const deleteMerchant = (payload) => {
    toggleLoading();
    dispatch(DeleteMerchant(payload));
  };

  useEffect(() => {
    if (state.merchants?.length > 0) {
      setMerchants(state.merchants);
    }
  }, [state]);

  useEffect(() => {
    if (state.deleteStatus == true) {
      toggleLoading();
      toggleSuccess();
      return;
    }
    if (state.status == "Error") {
      setError(state.error);
      toggleError();
      return;
    }
  }, [state.status, state.deleteStatus]);

  return (
    <>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <TopNav {...props} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Merchants</Text>
          <TouchableOpacity
            style={styles.rightButton}
            activeOpacity={0.5}
            onPress={() => props.navigation.navigate("AddNewMerchant")}
          >
            <Text style={styles.rightButtonText}>Add Merchant</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={{
            ...styles.scrollContainer,
            paddingTop: config.hp("2%"),
            paddingBottom: config.hp("5%"),
          }}
        >
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
              {merchants?.map((merchant, index) => {
                return (
                  <MerchantItem
                    key={index}
                    merchant={merchant}
                    {...props}
                    deleteMerchant={deleteMerchant}
                  />
                );
              })}
            </>
          )}
        </ScrollView>
        <SuccessModal
          showSuccessModal={showSuccessModal}
          message=" Merchant Successfully Deleted!"
          closeModal={toggleSuccess}
        ></SuccessModal>
        <ErrorModal
          closeErrorModal={toggleError}
          showErrorModal={showError}
          error={error}
        ></ErrorModal>
      </View>
    </>
  );
};

export default MerchantScreen;
