import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { Ionicons } from "@expo/vector-icons";

const CheckBoxes = ({ payload, handleChange }) => {
  const [permissions, setPermissions] = useState({
    billPay: false,
    eSafe: false,
    createACH: false,
    approveACH: false,
    submitACH: false,
  });

  useEffect(() => {
    handleChange("entitlements", permissions);
  }, [permissions]);

  useEffect(() => {
    setPermissions({
      ...payload.entitlements,
    });
  }, []);

  function updatePermissions(name) {
    switch (name) {
      case "billPay":
        setPermissions({
          ...permissions,
          billPay: !permissions.billPay,
        });
        return;
      case "eSafe":
        setPermissions({
          ...permissions,
          eSafe: !permissions.eSafe,
        });
        return;
      case "createACH":
        setPermissions({
          ...permissions,
          createACH: !permissions.createACH,
        });
        return;
      case "approveACH":
        setPermissions({
          ...permissions,
          approveACH: !permissions.approveACH,
        });
        return;
      case "submitACH":
        setPermissions({
          ...permissions,
          submitACH: !permissions.submitACH,
        });
        return;
    }
  }
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-around",
        paddingVertical: config.hp("2%"),
        flex: 1,
      }}
    >
      <View
        style={{
          width: "50%",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          paddingHorizontal: config.wp("1%"),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: config.hp("1%"),
          }}
        >
          <Text style={{ marginRight: 5 }}>Bill Pay Access</Text>
          <TouchableOpacity
            onPress={() => updatePermissions("billPay")}
            style={{
              borderWidth: 1,
              width: 25,
              height: 25,
              borderColor: theme.colors.fadedDark,
              backgroundColor: permissions.billPay
                ? theme.colors.primaryLight
                : theme.colors.fadedLight,
              borderRadius: 4,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {permissions.billPay ? (
              <Ionicons name="checkmark" size={24} color="white" />
            ) : undefined}
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginRight: 10,
            justifyContent: "space-between",
            width: "100%",
            marginBottom: config.hp("1%"),
          }}
        >
          <Text style={{ marginRight: 5 }}>eSafe Access</Text>
          <TouchableOpacity
            onPress={() => updatePermissions("eSafe")}
            style={{
              borderWidth: 1,
              width: 25,
              height: 25,
              borderColor: theme.colors.fadedDark,
              backgroundColor: permissions.eSafe
                ? theme.colors.primaryLight
                : theme.colors.fadedLight,
              borderRadius: 4,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {permissions.eSafe ? (
              <Ionicons name="checkmark" size={24} color="white" />
            ) : undefined}
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: "50%",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          paddingHorizontal: config.wp("1%"),
          //marginBottom: config.hp("8%"),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginRight: 10,
            justifyContent: "space-between",
            width: "100%",
            marginBottom: config.hp("1%"),
          }}
        >
          <Text style={{ marginRight: 5 }}>Create ACH Request</Text>
          <TouchableOpacity
            onPress={() => updatePermissions("createACH")}
            style={{
              borderWidth: 1,
              width: 25,
              height: 25,
              borderColor: theme.colors.fadedDark,
              backgroundColor: permissions.createACH
                ? theme.colors.primaryLight
                : theme.colors.fadedLight,
              borderRadius: 4,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {permissions.createACH ? (
              <Ionicons name="checkmark" size={24} color="white" />
            ) : undefined}
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginRight: 10,
            justifyContent: "space-between",
            width: "100%",
            marginBottom: config.hp("1%"),
          }}
        >
          <Text style={{ marginRight: 5 }}>Approve ACH Request</Text>
          <TouchableOpacity
            onPress={() => updatePermissions("approveACH")}
            style={{
              borderWidth: 1,
              width: 25,
              height: 25,
              borderColor: theme.colors.fadedDark,
              backgroundColor: permissions.approveACH
                ? theme.colors.primaryLight
                : theme.colors.fadedLight,
              borderRadius: 4,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {permissions.approveACH ? (
              <Ionicons name="checkmark" size={24} color="white" />
            ) : undefined}
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginRight: 10,
            justifyContent: "space-between",
            width: "100%",
            marginBottom: config.hp("1%"),
          }}
        >
          <Text style={{ marginRight: 5 }}>Submit ACH Request</Text>
          <TouchableOpacity
            onPress={() => updatePermissions("submitACH")}
            style={{
              borderWidth: 1,
              width: 25,
              height: 25,
              borderColor: theme.colors.fadedDark,
              backgroundColor: permissions.submitACH
                ? theme.colors.primaryLight
                : theme.colors.fadedLight,
              borderRadius: 4,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {permissions.submitACH ? (
              <Ionicons name="checkmark" size={24} color="white" />
            ) : undefined}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CheckBoxes;
