import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Switch,
} from "react-native";
import FlipToggle from "react-native-flip-toggle-button";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

const SubmitTransfer = ({
  isSafeToTransfer,
  handleSubmit,
  payload,
  handleChange,
  frequency,
  frequencyperiod,
  principal,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.fieldItem,
          borderBottomColor: "grey",
          borderBottomWidth: 0.2,
        }}
      >
        <Text style={styles.fieldText}>Number of payments</Text>
        <TouchableOpacity
          style={styles.dropDownContainer}
          onPress={() => toggleFrequency(true)}
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
          onPress={() => setVisibleModal(true)}
        >
          <Text style={styles.dropDownText}>{frequencyperiod}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fieldItem}>
        <Text style={styles.fieldText}>Principal Only</Text>
        <FlipToggle
          value={false}
          buttonWidth={150}
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={
            isSafeToTransfer ? [styles.button, styles.isSafe] : styles.button
          }
          disabled={!isSafeToTransfer}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Transfer funds</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SubmitTransfer;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    paddingTop: config.deviceHeight * 0.0125,
    paddingHorizontal: config.deviceWidth * 0.05,

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
  },
  fieldText: {
    fontSize: 22,
    fontWeight: "bold",
    width: "60%",
  },
  dropDownContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
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
