import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FlipToggle from "react-native-flip-toggle-button";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import globalStyles from "../../../../globalStyles/styles";
import EffectiveDate from "../EffectiveDate";

const SubmitTransfer = ({
  status,
  handleChange,
  principal,
  handleSubmit,
  toggleSheet,
  frequency,
  frequencyperiod,
  payload,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.fieldItem,
          borderBottomColor: "grey",
          borderBottomWidth: 0.2,
        }}
      >
        <Text style={styles.fieldText}>Number of transfers:</Text>
        <TouchableOpacity
          style={styles.dropDownContainer}
          onPress={() => toggleSheet("NumOfPayments")}
        >
          <Text style={styles.dropDownText}>{frequency}</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          ...styles.fieldItem,
          borderBottomColor: "grey",
          borderBottomWidth: 0.2,
        }}
      >
        <Text style={styles.fieldText}>Repeat</Text>
        <TouchableOpacity
          style={styles.dropDownContainer}
          onPress={() => toggleSheet("Frequency Period")}
        >
          <Text style={styles.dropDownText}>{frequencyperiod}</Text>
        </TouchableOpacity>
      </View>
      <EffectiveDate
        handleChange={handleChange}
        payload={payload}
      ></EffectiveDate>

      <View style={styles.fieldItem}>
        <Text style={styles.fieldText}>Principal Only</Text>
        <FlipToggle
          value={principal}
          buttonWidth={80}
          buttonHeight={30}
          buttonRadius={60}
          changeToggleStateOnLongPress={true}
          buttonOffColor="#797979"
          buttonOnColor="#0EA44B"
          sliderOffColor="white"
          sliderOnColor="white"
          onLabel={"On"}
          offLabel={"Off"}
          onToggle={() => {
            handleChange("principal", !principal);
          }}
        />
      </View>

      <View style={globalStyles.submitButtonContainer}>
        <TouchableOpacity
          style={
            !status.disabled
              ? [globalStyles.submitButton, styles.isSafe]
              : {
                  ...globalStyles.submitButton,
                  backgroundColor: theme.colors.faded,
                }
          }
          disabled={status.disabled}
          onPress={handleSubmit}
        >
          <Text style={globalStyles.submitButtonText}>Transfer funds</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    paddingTop: config.deviceHeight * 0.0125,
    paddingHorizontal: config.wp("5%"),
    height: "100%",
    flexDirection: "column",
    //   justifyContent: "space-around",
  },
  fieldContainer: {
    height: "70%",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  fieldItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: config.hp("2%"),
    height: config.hp("5%"),
    width: "100%",
  },
  fieldText: {
    fontSize: 18,
    fontWeight: "500",
    color: theme.colors.primary,
    //width: "100%",
  },
  dropDownContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    //width: "50%",
    paddingVertical: config.hp(".5%"),
  },
  buttonContainer: {
    width: "100%",
    paddingTop: config.hp("2%"),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.colors.inActive,
    borderRadius: config.hp("1.5%"),
    alignItems: "center",
    height: config.hp("8%"),
    width: "100%",
  },
  buttonText: {
    fontSize: config.hp("2.5%"),
    color: "white",
    fontWeight: "bold",
    textTransform: "capitalize",
    letterSpacing: config.wp(".5%"),
  },
  isSafe: {
    backgroundColor: theme.colors.primary,
  },
  icon: {
    fontSize: config.hp("3%"),
    marginLeft: config.wp("2%"),
  },
  dropDownText: {
    fontSize: config.hp("2.5%"),
  },
});

export default SubmitTransfer;
