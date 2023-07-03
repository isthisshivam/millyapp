import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../store/Store";
import { styles } from "./style";

const TopNav = ({ route: { name }, navigation }) => {
  const profile = useAppSelector((state) => state.profile.info);
  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Commercial</Text>
        <Text style={{ fontWeight: "400", textTransform: "capitalize" }}>
          Welcome, {profile?.fullName}{" "}
        </Text>
        <Text style={{ fontWeight: "400" }}>
          Last Login: {new Date().toLocaleDateString()}{" "}
        </Text>
        <Text style={{ marginTop: 10 }}>
          The Administration section facilitates communication with the credit
          union, alert maintenance, and administration activities.
        </Text>
      </View>
      <View style={styles.navContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Users")}
          style={
            name === "Users"
              ? { ...styles.link, ...styles.isSelected, borderRightWidth: 1 }
              : { ...styles.link, borderRightWidth: 1 }
          }
        >
          <Text
            style={
              name === "Users"
                ? [styles.linkText, styles.isSelectedText]
                : styles.linkText
            }
          >
            Entitlements
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            name === "Transactions"
              ? { ...styles.link, ...styles.isSelected, borderRightWidth: 1 }
              : { ...styles.link, borderRightWidth: 1 }
          }
          onPress={() => navigation.navigate("Transactions")}
        >
          <Text
            style={
              name === "Transactions"
                ? [styles.linkText, styles.isSelectedText]
                : styles.linkText
            }
          >
            Transactions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            name === "CashACH" ? [styles.link, styles.isSelected] : styles.link
          }
          onPress={() => navigation.navigate("CashACH")}
        >
          <Text
            style={
              name === "CashACH"
                ? [styles.linkText, styles.isSelectedText]
                : styles.linkText
            }
          >
            ACH
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            name === "CashACH" ? [styles.link, styles.isSelected] : styles.link
          }
          onPress={() => navigation.navigate("CashACH")}
        >
          <Text
            style={
              name === "CashACH"
                ? [styles.linkText, styles.isSelectedText]
                : styles.linkText
            }
          >
            Reports
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TopNav;
