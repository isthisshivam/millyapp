import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useRef, useCallback } from "react";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import BottomSheets from "../../../../components/bottomSheets/BottomSheets";

const Confirmation = ({
  handleApprove,
  handleBack,
  handleDeny,
  payload,
  status,
  handleChange,
  confirmationType,
}) => {
  const [sheet, setSheet] = useState();
  const [reason, setReason] = useState();
  const bottomSheetRef = useRef(null); // ref
  let total = 0;

  function handleDenialReson(value) {
    setReason(value);
    handleDeny(value);
  }

  const closeSheet = useCallback(() => {
    setSheet(undefined);
    bottomSheetRef.current?.close();
  }, []);

  function handleExpand() {
    setSheet(undefined);
    bottomSheetRef.current.expand();
  }

  function toggleDeny(name) {
    setSheet(name);
    handleExpand();
  }

  function getTotal() {
    if (payload.total == undefined) {
      for (let i = 0; i < payload.destAccounts?.length; i++) {
        const account = payload.destAccounts[i];
        total = total + Number(account.amount);
      }
      handleChange("total", total);
    }
  }
  console.log(payload);

  useEffect(() => {
    getTotal();
  }, []);
  return (
    <>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            color: theme.colors.primary,
            fontWeight: "500",
          }}
        >
          Review
        </Text>
        <Text style={{ marginBottom: config.hp("4%") }}>
          Please review the details below and confirm the information is
          correct.
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
            <View style={styles.section}>
              <View style={styles.row}>
                <Text style={styles.text}>Request Type: </Text>
                <Text style={styles.text}>
                  {payload.requestType}
                  {/* {`${payload.achType} ${payload.requestType}`} */}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.text}>Status: </Text>
                <Text style={styles.text}>
                  {payload.status}
                  {/* {`${payload.achType} ${payload.requestType}`} */}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>Submitted by: </Text>
                <Text style={styles.text}>
                  {payload.enteredBy}
                  {/* {`${payload.achType} ${payload.requestType}`} */}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>Submitted on: </Text>
                <Text style={styles.text}>
                  {payload.submitted}
                  {/* {`${payload.achType} ${payload.requestType}`} */}
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <View
                style={{
                  ...styles.row,
                }}
              >
                <Text style={styles.text}>Company/Id: </Text>
                <Text style={styles.text}>
                  {payload.companyId ? payload.companyId : "Not entered"}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>Destination Accounts: </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.text}>
                    {payload?.destAccounts?.length}
                  </Text>
                  <Ionicons name="ios-person" size={22} color="black" />
                </View>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>Effective Date: </Text>
                <Text style={styles.text}>{payload?.effectiveDate}</Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                marginBottom: config.hp("4%"),
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.faded,
                paddingBottom: config.hp("1%"),
              }}
            >
              <Text numberOfLines={4} ellipsizeMode="tail" style={styles.text}>
                Description:
              </Text>
              <Text> {payload.description}</Text>
            </View>
            <View style={{ marginBottom: config.hp("4%") }}>
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

                <Text
                  style={{
                    fontSize: 20,
                    color: payload?.achType == "Send" ? "red" : "green",
                  }}
                >
                  {payload.total}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                //height: config.hp("8%"),
                justifyContent: "space-between",
                width: "100%",
                marginBottom: config.hp("2%"),
              }}
            >
              <TouchableOpacity
                onPress={() => toggleDeny("Denial Reason")}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "48%",
                  backgroundColor: theme.colors.faded,
                  borderRadius: 7,
                  paddingVertical: config.hp("1%"),
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    //color: "white",
                    paddingVertical: config.hp(".5%"),
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  Deny
                </Text>
              </TouchableOpacity>
              {confirmationType == "Transmit" ? (
                <TouchableOpacity
                  onPress={handleApprove}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "48%",
                    backgroundColor: theme.colors.primaryLight,
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
                    Transmit
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handleApprove}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "48%",
                    backgroundColor: theme.colors.primaryLight,
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
                    Approve
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
        >
          <TouchableOpacity
            onPress={() => handleBack()}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
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
      </View>
      <BottomSheets
        closeSheet={closeSheet}
        sheet={sheet}
        handleChange={handleDenialReson}
        bottomSheetRef={bottomSheetRef}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: config.hp("1%") },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: config.hp("1%"),
  },
  section: {
    marginBottom: config.hp("2%"),

    paddingBottom: config.hp("1%"),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.faded,
  },
  text: {
    fontSize: 18,
  },
});

export default Confirmation;
