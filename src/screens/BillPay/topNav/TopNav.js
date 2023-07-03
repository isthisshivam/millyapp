import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";

const TopNav = ({ route: { name }, navigation }) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate("Create BillPay")}
        style={styles.titleContainer}
      >
        <Text style={styles.title}>BillPay</Text>
      </TouchableOpacity>
      <View style={styles.navContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("TabBillPay")}
          style={
            name === "TabBillPay"
              ? [styles.link, styles.isSelected]
              : styles.link
          }
        >
          <Text
            style={
              name === "TabBillPay"
                ? [styles.linkText, styles.isSelectedText]
                : styles.linkText
            }
          >
            Quick Pay
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            name === "BillPayPending"
              ? [styles.link, styles.isSelected]
              : styles.link
          }
          onPress={() => navigation.navigate("BillPayPending")}
        >
          <Text
            style={
              name === "BillPayPending"
                ? [styles.linkText, styles.isSelectedText]
                : styles.linkText
            }
          >
            Pending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            name === "BillPayMerchants"
              ? [styles.link, styles.isSelected]
              : styles.link
          }
          onPress={() => navigation.navigate("BillPayMerchants")}
        >
          <Text
            style={
              name === "BillPayMerchants"
                ? [styles.linkText, styles.isSelectedText]
                : styles.linkText
            }
          >
            Merchants
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            name === "BillPayHistory"
              ? [styles.link, styles.isSelected]
              : styles.link
          }
          onPress={() => navigation.navigate("BillPayHistory")}
        >
          <Text
            style={
              name === "BillPayHistory"
                ? [styles.linkText, styles.isSelectedText]
                : styles.linkText
            }
          >
            History
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TopNav;
