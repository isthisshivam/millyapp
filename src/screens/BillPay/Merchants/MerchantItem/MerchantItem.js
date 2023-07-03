import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { styles } from "./style";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

import DeleteModal from "./DeleteModal";

FontAwesomeIcon.loadFont();

const MerchantItem = ({ merchant, navigation, deleteMerchant }) => {
  const [showExtra, setShowExtra] = useState(false);
  const MerchantState = useSelector((state) => state.merchants);
  const { merchantName, memo, address1, address2, merchantAccount } = merchant;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  function toggleDelete() {
    setShowDeleteModal(!showDeleteModal);
  }

  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.topItemInfo}
        onPress={() => setShowExtra(!showExtra)}
      >
        <Text style={styles.merchantName}>{merchantName}</Text>
        {!showExtra ? (
          <FontAwesomeIcon
            size={25}
            name="plus"
            style={styles.plusIcon}
            onPress={() => setShowExtra(true)}
          />
        ) : (
          <FontAwesomeIcon
            size={25}
            name="minus"
            style={styles.plusIcon}
            onPress={() => setShowExtra(false)}
          />
        )}
      </TouchableOpacity>
      {/* <FontAwsomeIcon size={25} name="minus" style={styles.plusIcon} /> */}
      {showExtra && (
        <View style={styles.itemContent}>
          <>
            <View style={styles.infoContainer}>
              <Text style={styles.leftText}>Address :</Text>
              <Text style={styles.rightText} numberOfLines={3}>
                {address1}, {address2}
              </Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.leftText}>Account :</Text>
              <Text style={styles.rightText}>{merchantAccount}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={{ ...styles.button, ...styles.button1 }}
                onPress={() => {
                  navigation.navigate("PayMerchant", {
                    merchantAccount: merchantAccount,
                    merchantName: merchantName,
                  });
                }}
              >
                <Text style={styles.buttonText}>Send Payment</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.button, ...styles.button2 }}
                onPress={() => {
                  navigation.navigate("EditMerchant", {
                    merchantAccount: merchantAccount,
                  });
                }}
              >
                <AntDesign name="edit" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.button, ...styles.button2 }}
                onPress={() => toggleDelete()}
              >
                <FontAwesome5 name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </>
        </View>
      )}
      <DeleteModal
        showDeleteModal={showDeleteModal}
        toggleDelete={toggleDelete}
        deleteMerchant={deleteMerchant}
        merchantAccount={merchantAccount}
        merchantName={merchantName}
      ></DeleteModal>
    </View>
  );
};

export default MerchantItem;
