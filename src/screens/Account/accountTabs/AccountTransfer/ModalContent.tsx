import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { config } from "../../../../config/Config";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { theme } from "../../../../config/Theme";

const ModalContent = ({ toggleModal, payload }) => {
  const submit = () => {
    toggleModal();
  };
  const { colors } = theme;
  const styles = StyleSheet.create({
    container: {
      width: wp("90%"),
      height: hp("50%"),
      backgroundColor: "white",
      borderRadius: 20,
      paddingVertical: config.deviceHeight * 0.025,
      paddingHorizontal: config.deviceWidth * 0.025,

      flexDirection: "column",
      justifyContent: "space-between",
    },
    titleContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    infoContainer: {
      height: "70%",

      flexDirection: "column",
      justifyContent: "space-evenly",
    },
    info: {
      flex: 0.25,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",

      width: "100%",
    },
    infoTitle: {
      fontSize: hp("2.25%"),
      fontWeight: "bold",
      textTransform: "capitalize",
      textAlign: "left",
    },
    infoAmount: {
      fontSize: hp("3.7%"),
      color: "red",
      fontWeight: "bold",
    },
    title: {
      fontSize: hp("2.5%"),
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    button: {
      width: "40%",
      color: "red",
      borderRadius: 5,
      overflow: "hidden",
    },
  });
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 200,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Please Confirm Everything Is Right</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Text style={styles.infoTitle}> Transfering From:</Text>
            <Text style={styles.infoTitle}>{payload.accountFrom.account}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTitle}> Transfering To:</Text>
            <Text style={styles.infoTitle}>{payload.accountTo.account}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTitle}>Principle Only:</Text>
            <Text style={styles.infoTitle}>
              {payload.principle ? "yes" : "no"}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTitle}>Amount Transfering:</Text>
            <Text style={styles.infoAmount}>${payload.amount}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={toggleModal} color="red" />
          </View>

          <View style={styles.button}>
            <Button title="Accept" onPress={submit} color={colors.primary} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ModalContent;
