import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import ButtonContainer from "../ButtonContainer";

const Profile = ({ changeForm, payload, step, next, back, cancel }) => {
  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            alignItems: "center",
            marginBottom: config.hp("2%"),
          }}
        >
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: "gray",
              marginBottom: config.hp("1%"),
            }}
          >
            Add a profile picture to personalize your experience
          </Text>
          <TouchableOpacity
            onPress={() => changeForm("Image")}
            style={{ position: "relative" }}
          >
            {payload.image ? (
              <Image
                source={{ uri: `data:image/png;base64, ${payload.image}` }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: theme.colors.faded,
                }}
              />
            ) : (
              <>
                <Ionicons
                  name="person-circle"
                  size={config.wp("20%")}
                  color="gray"
                />
                <Ionicons
                  name="camera"
                  size={30}
                  color="black"
                  style={styles.camera}
                />
              </>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.dropDownLabel}
          onPress={() => {
            changeForm("Gender");
          }}
        >
          <Text style={styles.label}>Gender</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "50%",
              justifyContent: "flex-end",
            }}
          >
            {!payload.gender ? (
              <Text style={styles.selectText}>Select Gender</Text>
            ) : (
              <Text numberOfLines={1} style={styles.selectedText}>
                {payload.gender}
              </Text>
            )}

            <AntDesign name="caretdown" style={styles.icon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dropDownLabel}
          onPress={() => {
            changeForm("Race");
          }}
        >
          <Text style={styles.label}>Ethnicity</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "50%",
              justifyContent: "flex-end",
            }}
          >
            {!payload.race ? (
              <Text style={styles.selectText}>Select Ethnicity</Text>
            ) : (
              <Text numberOfLines={1} style={styles.selectedText}>
                {payload.race}
              </Text>
            )}
            <AntDesign name="caretdown" style={styles.icon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dropDownLabel}
          onPress={() => {
            changeForm("Income");
          }}
        >
          <Text style={styles.label}>Income</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "50%",
              justifyContent: "flex-end",
            }}
          >
            {!payload.income ? (
              <Text style={styles.selectText}>Select Income</Text>
            ) : (
              <Text numberOfLines={1} style={styles.selectedText}>
                {payload.income}
              </Text>
            )}
            <AntDesign name="caretdown" style={styles.icon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dropDownLabel}
          onPress={() => {
            changeForm("Education");
          }}
        >
          <Text style={styles.label}>Education</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "50%",
              justifyContent: "flex-end",
            }}
          >
            {!payload.education ? (
              <Text style={styles.selectText}>Select Education</Text>
            ) : (
              <Text numberOfLines={1} style={styles.selectedText}>
                {payload.education}
              </Text>
            )}
            <AntDesign name="caretdown" style={styles.icon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dropDownLabel}
          onPress={() => {
            changeForm("Marital Status");
          }}
        >
          <Text style={styles.label}>Marital Status</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "50%",
              justifyContent: "flex-end",
            }}
          >
            {!payload.maritalStatus ? (
              <Text style={styles.selectText}>Select Status</Text>
            ) : (
              <Text numberOfLines={1} style={styles.selectedText}>
                {payload.maritalStatus}
              </Text>
            )}

            <AntDesign name="caretdown" style={styles.icon} />
          </View>
        </TouchableOpacity>

        <View
          style={{
            marginTop: config.hp("4%"),
            //width: "100%",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 12 }}>
            By continuing, you agree with our
          </Text>
          <Text style={{ fontSize: 12 }}>
            Terms & Conditions and Privacy Policy
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-end",
            flex: 1,
          }}
        >
          <ButtonContainer
            step={step}
            next={next}
            back={back}
            cancel={cancel}
            navigation={null}
            submit={null}
          ></ButtonContainer>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  camera: {
    position: "absolute",
    left: 55,
    top: 5,
  },
  container: {
    paddingHorizontal: config.wp("4%"),
    // alignItems: "center",
    width: "100%",
    //height: "100%",
    flex: 1,
  },
  dropDownLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: config.hp("2%"),
    width: "100%",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.primary,
  },

  label: {
    //marginBottom: config.hp("1%"),
    fontSize: 18,
    color: "black",
    //width: "100%",
  },
  selectText: {
    fontSize: 18,
    color: theme.colors.fadedDark,
    // marginRight: 10,
  },
  selectedText: {
    //width: "75%",
    fontSize: 18,
    color: "black",
    paddingRight: 10,
  },
});

export default Profile;
