import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";
import { Ionicons } from "@expo/vector-icons";

const Users = ({ navigation, route }) => {
  const state = useSelector((state) => state.commercial);
  const [showModal, setShowModal] = useState(false);
  const [accounts, setAccounts] = useState([]);

  function showAddUser() {
    setShowModal(!showModal);
  }

  useEffect(() => {
    setAccounts(state.users);
  }, [state]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("editAccount", { item: item })}
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          paddingHorizontal: config.wp("3%"),
          paddingVertical: config.hp("2%"),
          backgroundColor: "white",
          borderColor: theme.colors.faded,
          borderWidth: 1,
          borderRadius: 12,
          marginBottom: config.hp("2%"),
        }}
      >
        <View style={{ flexDirection: "row", marginBottom: config.hp("1%") }}>
          <View style={{ marginRight: config.wp("4%"), width: "40%" }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: theme.colors.primary,
              }}
            >
              Username
            </Text>
            <Text style={{ fontSize: 18 }}>{item.userName}</Text>
          </View>
          <View style={{ marginRight: config.wp("4%") }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: theme.colors.primary,
              }}
            >
              Billpay
            </Text>
            {item.billPay ? (
              <Ionicons name="checkmark" size={24} color="black" />
            ) : undefined}
          </View>
          <View style={{ marginRight: config.wp("4%") }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: theme.colors.primary,
              }}
            >
              eSafe
            </Text>
            {item.eSafe ? (
              <Ionicons name="checkmark" size={24} color="black" />
            ) : undefined}
          </View>
          <View style={{ marginRight: config.wp("4%") }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: theme.colors.primary,
              }}
            >
              Admin
            </Text>
            {item.admin ? (
              <Ionicons name="checkmark" size={24} color="black" />
            ) : undefined}
          </View>
        </View>

        {/* <Text style={{ width: "35%" }}>
          {item.lastName}, {item.firstName}
        </Text> */}
        {/* <Text style={{ width: "20%" }}>{item.role}</Text> */}
        <View
          style={{
            width: "100%",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <Ionicons name="ios-trash" size={24} color="black" />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        paddingHorizontal: config.wp("2%"),
        paddingVertical: config.hp("2%"),
        flex: 1,
      }}
    >
      <View
        style={{
          paddingHorizontal: config.hp("1%"),
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            color: theme.colors.primary,
          }}
        >
          Commercial
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "400" }}>
          Users and Entitlements
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: config.hp("2%"),
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View
          style={{
            width: "50%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        ></View>
        <View
          style={{
            width: "50%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingHorizontal: config.wp("2%"),
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Add User")}
            style={{
              backgroundColor: theme.colors.primaryLight,
              borderRadius: 7,
              paddingHorizontal: config.wp("4%"),
            }}
          >
            <Text
              style={{
                color: "white",
                paddingVertical: config.hp("1%"),
                fontSize: 18,
              }}
            >
              Add New User +
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: config.wp("2%"),
          paddingVertical: config.hp("2%"),
          backgroundColor: theme.colors.primaryLight,
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7,
        }}
      >
        <Text style={styles.bannerTitle}>Access ID</Text>
        <Text style={{ ...styles.bannerTitle, width: "35%" }}>Name</Text>
        <Text style={{ ...styles.bannerTitle, width: "20%" }}>Role</Text>
        <Text style={styles.bannerTitle}>Delete</Text>
      </View> */}
      <FlatList
        data={accounts}
        renderItem={renderItem}
        keyExtractor={(item) => item.userName}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: config.wp("4%") }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bannerTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    width: "30%",
    textAlign: "left",
  },
});

export default Users;
