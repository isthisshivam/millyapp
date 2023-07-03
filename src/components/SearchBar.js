import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ query, onTermChange, onSubmit }) => {
  return (
    <View style={styles.background}>
      <Ionicons name="search" style={styles.icon} />
      <TextInput
        placeholder="Search"
        style={styles.input}
        value={query}
        onChangeText={(newQuery) => onTermChange(newQuery)}
        onSubmitEditing={() => onSubmit()}
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#F0EEEE",
    height: 50,
    borderRadius: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    marginTop: 15,
  },
  icon: {
    alignSelf: "center",
    fontSize: 35,
    marginHorizontal: 15,
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
});

export default SearchBar;
