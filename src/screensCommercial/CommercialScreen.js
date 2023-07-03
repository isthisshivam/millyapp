import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { config } from "../config/Config";
import { theme } from "../config/Theme";
import { useSelector } from "react-redux";

const CommercialScreen = ({ navigation }) => {
  const state = useSelector((state) => state.commercial);
  const translateY = new Animated.Value(0);
  const trans = {
    transform: [{ translateY: translateY }],
  };
  useEffect(() => {
    // makes the sequence loop
    Animated.loop(
      // runs the animation array in sequence
      Animated.sequence([
        // shift element to the left by 2 units
        Animated.timing(translateY, {
          toValue: -10,
          duration: 400,
          useNativeDriver: true,
        }),
        // shift element to the right by 2 units
        Animated.timing(translateY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        // // bring the element back to its original position
        // Animated.timing(translateY, {
        //   toValue: 0,
        //   duration: 200,
        //   useNativeDriver: true,
        // }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "600",
          width: "100%",
          textAlign: "left",

          color: theme.colors.primary,
        }}
      >
        Commercial
      </Text>
      <Text style={{ marginBottom: config.hp("4%"), width: "100%" }}>
        The Administration section facilitates communication with the credit
        union, alert maintenance, and administration activities.
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Users")}
          style={styles.boxContainer}
        >
          <View style={styles.circle}>
            <Text style={{ fontSize: 22, color: "black" }}>1</Text>
          </View>
          <Text style={styles.label}>Users</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("requests")}
          style={styles.boxContainer}
        >
          <Animated.View
            style={[
              {
                ...styles.circle,
                backgroundColor: "#ffc107",
              },
              trans,
            ]}
          >
            <Text style={{ fontSize: 22, color: "black" }}>
              {state.request?.length}
            </Text>
          </Animated.View>
          <Text style={styles.label}>Request</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("pending")}
          style={styles.boxContainer}
        >
          <View style={styles.circle}>
            <Text style={{ fontSize: 22, color: "black" }}>
              {state.pending?.length}
            </Text>
          </View>
          <Text style={styles.label}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ACH")}
          style={styles.boxContainer}
        >
          <View style={styles.circle}>
            <Text style={{ fontSize: 22, color: "black" }}>1</Text>
          </View>
          <Text style={styles.label}>ACH</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    backgroundColor: "white",
    borderRadius: 60,
    width: 50,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 24,
  },
  container: {
    alignItems: "center",
    width: "100%",
    paddingVertical: config.hp("2%"),
    paddingHorizontal: config.wp("2%"),
  },
  boxContainer: {
    width: config.wp("42%"),
    height: config.hp("16%"),
    backgroundColor: theme.colors.primaryLight,
    marginRight: config.wp("1.75%"),
    marginLeft: config.wp("1.75%"),
    marginBottom: config.hp("1.7%"),
    borderRadius: 3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    position: "relative",
  },
  label: {
    fontSize: 20,
    color: "white",
    position: "absolute",
    bottom: config.hp("3%"),
    textAlign: "center",
  },
});

export default CommercialScreen;
