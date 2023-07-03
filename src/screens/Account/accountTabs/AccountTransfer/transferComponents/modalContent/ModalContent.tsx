import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

import { styles } from "./style";

const ModalContent = ({ toggleModal, payload, setShowSuccessModal }) => {
  const closeModal = () => {
    toggleModal();
    setShowSuccessModal(true);
  };
  return (
    <View style={styles.modalContainer}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Please Confirm Everything Is Right</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Text style={styles.infoTitle}>Transfering From:</Text>
            <Text numberOfLines={1} style={styles.infoTitle}>
              {payload?.accountFrom?.account}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTitle}>Transfering To:</Text>
            <Text numberOfLines={1} style={styles.infoTitle}>
              {payload?.accountTo?.account}
            </Text>
          </View>
          {payload?.frequency !== null && (
            <View style={styles.info}>
              <Text style={styles.infoTitle}>Frequency</Text>
              <Text numberOfLines={1} style={styles.infoTitle}>
                {payload?.frequency}
              </Text>
            </View>
          )}

          {payload?.principle !== null && (
            <View style={styles.info}>
              <Text style={styles.infoTitle}>Principle Only:</Text>
              <Text numberOfLines={1} style={styles.infoTitle}>
                {payload?.principal ? "yes" : "no"}
              </Text>
            </View>
          )}

          <View style={styles.info}>
            <Text style={styles.infoTitle}>Amount Transfering:</Text>
            <Text numberOfLines={1} style={styles.infoAmount}>
              ${payload?.amount}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={toggleModal}
            style={[styles.button, styles.cancelButton]}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={closeModal}
            style={[styles.button, styles.acceptButtton]}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ModalContent;
