import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
//import CurrencyFormat from "react-currency-format";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import LottieView from "lottie-react-native";

const Review = ({
  payload,
  handleBack,
  requestType,
  handleSubmit,
  status,
  handleChange,
}) => {
  let total = 0;
  function getTotal() {
    if (payload.total == undefined) {
      for (let i = 0; i < payload.destAccounts?.length; i++) {
        const account = payload.destAccounts[i];
        total = total + Number(account.amount);
      }
      handleChange("total", total);
    }
  }

  useEffect(() => {
    getTotal();
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={{ fontSize: 20, color: theme.colors.primary, fontWeight: "500" }}
      >
        Review
      </Text>
      <Text style={{ marginBottom: config.hp("4%") }}>
        Please review the details below and confirm the information is correct.
      </Text>
      {status.loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <LottieView
            loop
            autoPlay
            style={{
              width: 160,
              height: 160,
            }}
            source={require("../../../../components/ui/loading-spinner.json")}
          />
          <Text style={{ fontSize: 20, color: theme.colors.primary }}>
            Submitting this request for approval
          </Text>
        </View>
      ) : (
        <View style={styles.infoContainer}>
          <View style={styles.row}>
            <Text style={styles.text}>Request Type: </Text>
            <Text style={styles.text}>
              {`${payload.achType} ${payload.requestType}`}
            </Text>
          </View>
          <View
            style={{
              ...styles.row,
              marginBottom: config.hp("4%"),
              borderBottomWidth: 1,
              paddingBottom: config.hp("1%"),
            }}
          >
            <Text style={styles.text}>Company/Id: </Text>
            <Text style={styles.text}> {payload.company}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.text}>Destination Accounts: </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.text}>{payload?.destAccounts.length}</Text>
              <Ionicons name="ios-person" size={22} color="black" />
            </View>
          </View>
          <View
            style={{
              ...styles.row,
              marginBottom: config.hp("4%"),
              borderBottomWidth: 1,
              paddingBottom: config.hp("1%"),
            }}
          >
            <Text style={styles.text}>Effective Date: </Text>
            <Text style={styles.text}>{payload?.effectiveDate}</Text>
          </View>
          <View
            style={{
              width: "100%",
              marginBottom: config.hp("4%"),
              borderBottomWidth: 1,
              paddingBottom: config.hp("1%"),
            }}
          >
            <Text numberOfLines={4} ellipsizeMode="tail" style={styles.text}>
              Description:
            </Text>
            <Text> {payload.description}</Text>
          </View>
          <View style={styles.row}>
            <Text style={{ fontSize: 20 }}>
              {payload?.achType == "Send" ? "Debit " : "Credit "}Account:
            </Text>
            <Text style={{ fontSize: 20 }}> {payload?.account}</Text>
          </View>
          <View
            style={{
              ...styles.row,
            }}
          >
            <Text style={{ fontSize: 20 }}>Total Amount:</Text>

            {/* <CurrencyFormat
              value={payload.total}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              renderText={(value) => (
                <Text
                  style={{
                    fontSize: 20,
                    color: payload?.achType == "Send" ? "red" : "green",
                  }}
                >
                  {value}
                </Text>
              )}
            /> */}
          </View>
        </View>
      )}
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
          flexDirection: "column",
        }}
      >
        {requestType == "AddTemplate" ? (
          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "80%",
              backgroundColor: theme.colors.primary,
              borderRadius: 7,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "white",
                paddingVertical: config.hp(".5%"),
                width: "100%",
                textAlign: "center",
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        ) : requestType == "OneTime" ? (
          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "80%",
              backgroundColor: theme.colors.primary,
              borderRadius: 7,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "white",
                paddingVertical: config.hp(".5%"),
                width: "100%",
                textAlign: "center",
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "80%",
              backgroundColor: theme.colors.primary,
              borderRadius: 7,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "white",
                paddingVertical: config.hp(".5%"),
                width: "100%",
                textAlign: "center",
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={handleBack}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "black",
              paddingVertical: config.hp(".5%"),
              width: "100%",
              textAlign: "center",
            }}
          >
            Back
          </Text>
        </TouchableOpacity>
      </View>
      {/* <StatusHandler
        state={state}
        status={status}
        setStatus={setStatus}
        navigation={navigation}
      ></StatusHandler> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: config.wp("2%"),
    paddingVertical: config.hp("1%"),
  },
  infoContainer: {
    backgroundColor: "white",
    borderRadius: 7,
    paddingHorizontal: config.wp("2%"),
    paddingVertical: config.hp("1%"),
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
  row: {
    marginBottom: config.hp("1%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});

export default Review;
