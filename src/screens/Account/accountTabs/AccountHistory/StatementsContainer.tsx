import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import Icon from "react-native-vector-icons/Ionicons";
import Statement from "./Statements";

const StatementsContainer = ({ navigation, statements }) => {
  const [searchString, setSearchString] = useState("");
  const [searchResults, Results] = useState(statements);
  const [results, setResults] = useState();

  useEffect(() => {
    if (statements) {
      const results = statements.filter((item) => {
        return Object.keys(item).some((key) =>
          item[key].toLowerCase().includes(searchString.toLowerCase())
        );
      });
      setResults(results);
    }

    Results(results);
    // Results(results);
  }, [searchString]);

  const styles = StyleSheet.create({
    container: {
      paddingTop: config.deviceHeight * 0.025,
      paddingBottom: config.deviceHeight * 0.025,
      paddingHorizontal: config.deviceWidth * 0.035,
      width: "100%",
      backgroundColor: theme.colors.faded,
      // height: 400,
    },
    topContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: config.deviceHeight * 0.015,
    },
    topRightContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      color: theme.colors.primary,
      fontWeight: "bold",
      fontSize: 20,
    },
    topRightText: {
      color: theme.colors.primary,
      fontSize: 16,
    },
    icon: {
      color: theme.colors.faded,
      fontSize: 25,
    },
    statementContainer: {
      display: "flex",
      width: "100%",
      justifyContent: "space-evenly",
    },
    activity: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: config.deviceHeight * 0.005,
    },
    activityName: {
      fontSize: 16,
    },
    activityDate: {
      fontSize: 16,
      color: theme.colors.faded,
    },
    searchSection: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      marginBottom: config.deviceHeight * 0.01,
    },
    searchIcon: {
      padding: 5,
    },
    input: {
      width: "100%",
      backgroundColor: "#fff",
      color: "#424242",
    },
    errorContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 10,
    },
    errorMessage: {
      fontSize: 20,
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Statements</Text>
      </View>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Search Statements History"
          placeholder="Search"
          keyboardType="default"
          onChangeText={(text) => {
            setSearchString(text);
          }}
          right={
            <TextInput.Icon
              name={() => <Icon name="ios-search" color="#0EA44B" size={25} />} // where <Icon /> is any component from vector-icons or anything else
            />
          }
        />
      </View>
      <View style={styles.statementContainer}>
        {!searchResults ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorMessage}>Sorry No results Found</Text>
          </View>
        ) : (
          searchResults.map((item, index) => {
            return (
              <Statement key={index} item={item} navigation={navigation} />
            );
          })
        )}
      </View>
    </View>
  );
};

export default StatementsContainer;
