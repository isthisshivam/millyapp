import React, { useEffect, useRef, useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import Banner from "./banner/Banner";
import CardContainer from "./CardContainer";
import SubscriptionContainer from "./subscriptions/SubscriptionContainer";
import ChartContainer from "./ChartContainer";
import ErrorModal from "../../components/Modals/ErrorModal";
import SubscriptionNotification from "../../components/Modals/SubscriptionNotification";
import { GetAccounts } from "../../store/actions/AccountActions";
import { GetFromOrder, GetToOrder } from "../../store/actions/TransferActions";
import { useAppDispatch, useAppSelector } from "../../store/Store";
import { GetSubscriptionPopup } from "../../store/actionReducers/subscriptions";

const HomeScreen = ({ navigation }) => {
  const subscriptions = useAppSelector((state) => state.subscriptions);
  const [refreshing, setRefreshing] = React.useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [subscriptionModal, setSubscriptionModal] = useState(false);
  const scrollViewRef = useRef();
  const dispatch = useAppDispatch();

  const closeErrorModal = () => {
    setShowErrorModal(false);
    navigation.navigate("Auth");
  };

  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(GetAccounts());
    wait(2000).then(() => setRefreshing(false));
  }, []);

  //////////////////////Launch Subscription Notification/////////////////////////////////
  function openSubscription() {
    setSubscriptionModal(true);
  }
  function closeModal() {
    setSubscriptionModal(false);
  }

  // function goToOnboarding() {
  //   navigation.navigate("Onboarding");
  // }

  useEffect(() => {
    dispatch(GetFromOrder());
    dispatch(GetToOrder());
    dispatch(GetSubscriptionPopup());
  }, []);

  useEffect(() => {
    if (subscriptions.subscriptionsToPopup?.length > 0) {
      openSubscription();
    }
  }, [subscriptions]);

  //////////////////////////////////////////Session Timeout///////////////////////////////////////////
  // useEffect(() => {
  //   if (!accounts.length) {
  //     getCookie();
  //   }

  //   // wait(9000).then(() => alert("Session expiring"));
  //   // wait(45000).then(() => wait(45000).then(() => logout()));
  // }, [accounts]);

  return (
    <ScrollView
      ref={scrollViewRef}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Banner navigation={navigation} />
      <CardContainer navigation={navigation} />
      <SubscriptionContainer
        openSubscription={openSubscription}
        navigation={navigation}
      />
      {/* <ChartContainer /> */}
      <ErrorModal
        error="Session has expired please login to continue"
        showErrorModal={showErrorModal}
        closeErrorModal={closeErrorModal}
        error2={null}
      ></ErrorModal>
      <SubscriptionNotification
        modalVisible={subscriptionModal}
        closeModal={closeModal}
      ></SubscriptionNotification>
      {/* <UpComingContainer navigation={navigation} />
       */}
    </ScrollView>
  );
};

export default HomeScreen;
