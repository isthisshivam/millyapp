import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const TabContainer = ({ tab, setTab }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View
          style={{
            ...styles.buttonContainer,

            borderBottomWidth: tab === 0 ? config.hp(".75%") : undefined,
            borderBottomColor: tab === 0 ? theme.colors.primary : undefined,
          }}
        >
          <TouchableOpacity
            onPress={() => setTab(0)}
            style={{ ...styles.button, borderBottomLeftRadius: 32 }}
          >
            <Text
              style={{
                color: tab == 0 ? "black" : "gray",
                fontSize: config.hp("2.25%"),
              }}
            >
              Rewards
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            ...styles.buttonContainer,
            borderBottomWidth: tab === 1 ? config.hp(".75%") : undefined,
            borderBottomColor: tab === 1 ? theme.colors.primary : undefined,
          }}
        >
          <TouchableOpacity onPress={() => setTab(1)} style={styles.button}>
            <Text
              style={{
                color: tab == 1 ? "black" : "gray",
                fontSize: config.hp("2.25%"),
              }}
            >
              Redeem
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            ...styles.buttonContainer,

            borderBottomWidth: tab === 2 ? config.hp(".75%") : undefined,
            borderBottomColor: tab === 2 ? theme.colors.primary : undefined,
          }}
        >
          <TouchableOpacity
            onPress={() => setTab(2)}
            style={{ ...styles.button, borderBottomRightRadius: 32 }}
          >
            <Text
              style={{
                color: tab === 2 ? "black" : "gray",
                fontSize: config.hp("2.25%"),
              }}
            >
              Stats
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: config.hp("6.5%"),
  },
  container: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
  },

  buttonContainer: {
    height: "100%",
    width: "33%",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    borderStyle: "solid",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  isSelected: {
    borderBottomWidth: config.hp(".75%"),
    borderBottomColor: theme.colors.primary,
  },
  isSelectedText: {
    color: "black",
  },

  border: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "grey",
  },
  button: {
    backgroundColor: "white",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabContainer;
