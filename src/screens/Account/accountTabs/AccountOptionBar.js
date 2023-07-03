import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const AccountOptionBar = ({ handlePageAction, page, navigation }) => {
  return (
    <View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={
            page === 0
              ? [styles.buttonOptions, styles.isSelected]
              : styles.buttonOptions
          }
          onPress={() => {
            handlePageAction(0);
          }}
        >
          <Text
            style={
              page === 0
                ? [styles.buttonText, styles.isSelectedText]
                : styles.buttonText
            }
          >
            History
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            page === 1
              ? [styles.buttonOptions, styles.isSelected]
              : styles.buttonOptions
          }
          onPress={() => {
            navigation.navigate("Deposit");
          }}
        >
          <Text
            style={
              page === 1
                ? [styles.buttonText, styles.isSelectedText]
                : styles.buttonText
            }
          >
            Deposit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            page === 2
              ? [styles.buttonOptions, styles.isSelected]
              : styles.buttonOptions
          }
          onPress={() => {
            navigation.navigate("transferTab");
          }}
        >
          <Text
            style={
              page === 2
                ? [styles.buttonText, styles.isSelectedText]
                : styles.buttonText
            }
          >
            Transfer
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={
            page === 3
              ? [styles.bottomButtonOptions, styles.isSelected]
              : styles.bottomButtonOptions
          }
          onPress={() => {
            navigation.navigate("Stop Payment");
          }}
        >
          <Text
            style={
              page === 3
                ? [styles.buttonText, styles.isSelectedText]
                : styles.buttonText
            }
          >
            Stop Payment
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            page === 4
              ? [styles.bottomButtonOptions, styles.isSelected]
              : styles.bottomButtonOptions
          }
          onPress={() => {
            navigation.navigate("Check Withdrawal");
          }}
        >
          <Text
            style={
              page === 4
                ? [styles.buttonText, styles.isSelectedText]
                : styles.buttonText
            }
          >
            Check Withdrawal
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonText: {
    color: "rgba(0.24, 0.24, 0.26, 0.6)",
    textAlign: "center",
    fontSize: 18,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: config.hp("5%"),
  },
  buttonOptions: {
    width: "33.33%",
    backgroundColor: "white",
    borderRadius: 1,
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "grey",
  },
  bottomButtonOptions: {
    width: "50%",
    backgroundColor: "white",
    borderRadius: 1,
    //paddingVertical: config.hp("1%"),
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "grey",
    alignItems: "center",
    justifyContent: "center",
  },
  isSelected: {
    borderBottomWidth: 5,
    borderBottomColor: theme.colors.primary,
  },
  isSelectedText: {
    color: "rgba(0.24, 0.24, 0.26, 0.6)",
    color: "black",
  },
});

export default AccountOptionBar;
