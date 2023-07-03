import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";

const AccountCard = ({ navigation }) => {
  const [selected, setSelected] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      <Text style={styles.question}>Choose an account</Text>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={{
            ...styles.card,
            borderColor: selected === 1 ? "black" : undefined,
            borderWidth: selected === 1 ? 2 : undefined,
          }}
          onPress={() => setSelected(1)}
        >
          <Text style={styles.acctName}>Draft</Text>
          <Text style={styles.info}>
            Checkless banking with no minimum balance
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.card,
            borderColor: selected === 2 ? "black" : undefined,
            borderWidth: selected === 2 ? 2 : undefined,
          }}
          onPress={() => setSelected(2)}
        >
          <Text style={styles.acctName}>Share Draft</Text>
          <Text style={styles.info}>
            Checkless banking with no minimum balance
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          disabled={selected === 0 ? true : false}
          style={selected === 0 ? styles.disabled : styles.button}
          onPress={() => {
            navigation.navigate("NewMemberForms");
          }}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          // disabled={!formOneIsFilled}
          activeOpacity={0.85}
          style={styles.blackButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  acctName: {
    color: "white",
    fontSize: 20,
  },
  blackButton: {
    backgroundColor: theme.colors.black,
    borderRadius: config.hp(".5%"),
    paddingVertical: config.hp("1.35%"),
    width: "100%",
    elevation: config.hp(".5%"),
    marginTop: config.hp("2%"),
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: config.hp(".5%"),
    paddingVertical: config.hp("1.35%"),
    width: "100%",
    elevation: config.hp(".5%"),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: config.hp("1%"),
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: config.hp("2.35%"),
    textAlign: "center",
  },

  container: {
    alignItems: "center",
  },
  card: {
    backgroundColor: theme.colors.primary,
    height: config.hp("15%"),
    width: config.wp("45%"),
    alignItems: "center",
    paddingVertical: config.hp("1%"),
    paddingHorizontal: config.wp("3%"),
    borderRadius: 12,
    elevation: config.hp("1%"),
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: "black",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: config.hp("35%"),
    paddingTop: config.hp("4%"),
  },

  disabled: {
    backgroundColor: theme.colors.inActive,
    borderRadius: config.hp(".5%"),
    paddingVertical: config.hp("1.35%"),
    width: "100%",
    elevation: config.hp(".5%"),
  },
  info: {
    color: "white",
    paddingTop: config.hp("1%"),
    textAlign: "center",
  },
  question: {
    fontSize: 22,
  },
  title: {},
});

export default AccountCard;
