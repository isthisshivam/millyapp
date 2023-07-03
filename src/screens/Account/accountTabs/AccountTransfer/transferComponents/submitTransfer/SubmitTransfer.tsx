import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FlipToggle from "react-native-flip-toggle-button";
import Icon from "react-native-vector-icons/Ionicons";

import { styles } from "./style";
const SubmitTransfer = ({
  isSafeToTransfer,
  handleChange,
  principal,
  handleSubmit,
  setVisibleModal,
  frequency,
  frequencyperiod,
  toggleFrequency,
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
          value={principal}
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
