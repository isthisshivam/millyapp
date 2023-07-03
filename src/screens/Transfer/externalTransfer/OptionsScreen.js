import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  GetFromOrder,
  GetToOrder,
} from "../../../store/actions/TransferActions";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { GetExternalHistory } from "../../../store/actionReducers/transfers";

const OptionsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetFromOrder());
    dispatch(GetToOrder());
    dispatch(GetExternalHistory());
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>External Transfers</Text>
      <Text>How do you want to transfer?</Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
          onPress={() => navigation.navigate("External History")}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: theme.colors.primary,
              paddingRight: 5,
            }}
          >
            History
          </Text>
          <MaterialIcons
            name="history"
            size={28}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: config.hp("4%") }}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate("Send Money")}
        >
          <Text style={styles.boxTitle}>Send Money</Text>
          <Text style={styles.info}>Completes in 0-3 business days.</Text>
          <Text style={styles.description}>
            Send money to an external account. Requires routing and account
            number.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate("Receive Money")}
        >
          <Text style={styles.boxTitle}>Recieve Money</Text>
          <Text style={styles.info}>Completes in 0-3 business days.</Text>
          <Text style={styles.description}>
            Recieve money from an external account. Requires routing and account
            number.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 9,
    padding: "4%",
    marginBottom: config.hp("4%"),
    paddingVertical: config.hp("3%"),
  },
  boxTitle: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    paddingHorizontal: config.wp("4%"),
    paddingVertical: config.hp("2%"),
  },
  description: {
    paddingTop: config.hp("1%"),
  },
  info: {
    color: "gray",
    fontSize: 14,
  },
  title: {
    fontSize: 22,
    color: theme.colors.primary,
    fontWeight: "bold",
  },
});

export default OptionsScreen;
