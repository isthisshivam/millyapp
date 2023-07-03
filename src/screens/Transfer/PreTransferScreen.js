import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { GetFromOrder, GetToOrder } from "../../store/actions/TransferActions";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";
import zelle from "../../../assets/Zelle.png";
import { useAppDispatch } from "../../store/Store";
import {
  GetExternalAccts,
  GetTransferHistory,
} from "../../store/actionReducers/transfers";

const PreTransferScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(GetFromOrder());
    dispatch(GetToOrder());
    dispatch(GetTransferHistory());
    dispatch(GetExternalAccts());
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How do you want to transfer?</Text>
      <View style={{ marginTop: config.hp("4%") }}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate("TransferMain")}
        >
          <Text style={styles.boxTitle}>
            Transfer Money between your accounts.
          </Text>
          <Text style={styles.info}>Completes in 0-3 business days.</Text>
          <Text style={styles.description}>
            Transfer between accounts, or pay your loans and credit cards.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate("External Options")}
        >
          <Text style={styles.boxTitle}>External Transfers</Text>
          <Text style={styles.info}>Completes in 0-3 business days.</Text>
          <Text>Send or Recieve money from an external account.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.box, position: "relative" }}
          //onPress={() => navigation.navigate("TransferMain")}
        >
          <Text style={styles.boxTitle}>Transfer money using Zelle.</Text>
          <Text style={styles.info}>Completes in minutes</Text>
          <Text style={styles.description}>
            Send money using email or phone number.
          </Text>

          <Image
            source={zelle}
            resizeMode="contain"
            style={{ width: "20%", position: "absolute", right: 8, bottom: 0 }}
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: "100%",
    height: config.hp("18%"),
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 9,
    //padding: "4%",
    marginBottom: config.hp("4%"),
    paddingHorizontal: config.hp("2%"),
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingVertical: config.hp("1%"),
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

export default PreTransferScreen;
