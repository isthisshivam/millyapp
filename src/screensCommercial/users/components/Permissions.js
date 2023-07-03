import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckBoxes from "./CheckBoxes";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import CardSection from "./CardSection";

const Permission = ({
  navigation,
  handleBack,
  setStep,
  payload,
  handleChange,
}) => {
  // function handleChange(name, value) {
  //   setPayload({
  //     ...payload,
  //     [name]: value,
  //   });
  // }

  // function submit() {
  //   setStatus({
  //     ...status,
  //     loading: true,
  //   });

  //   dispatch(UpdatePermissions(payload));
  // }

  // useEffect(() => {
  //   let user = state.users?.filter((item) => item.id == id);
  //   // setPayload({
  //   //   ...payload,
  //   //   ...user[0],
  //   // });
  // }, []);

  //console.log(payload);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      {/* <Text
        style={{ fontSize: 22, color: theme.colors.primary, fontWeight: "500" }}
      >
        New Users
      </Text> */}
      {/* <Text style={{ fontSize: 18, color: theme.colors.primary }}>
        Entitlements
      </Text> */}
      <CheckBoxes payload={payload} handleChange={handleChange}></CheckBoxes>

      <Text style={{ fontSize: 18 }}>Account Permissions</Text>
      <Text>Click on an account card below to edit permissions.</Text>

      <CardSection navigation={navigation} setStep={setStep}></CardSection>
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
      >
        <TouchableOpacity
          onPress={() => submit()}
          style={{
            backgroundColor: theme.colors.primary,
            width: config.wp("75%"),
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 7,
            paddingVertical: config.hp(".5%"),
            marginBottom: config.hp("1%"),
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleBack}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Permission;
