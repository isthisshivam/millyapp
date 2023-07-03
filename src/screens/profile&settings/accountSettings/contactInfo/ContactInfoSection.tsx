import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { formatBirthday, formatPhoneNumber } from "../../../../../utils/utils";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import { useAppSelector } from "../../../../store/Store";
import { ContactInfoType } from "../../../../../types/profile/types";

const ContactInfoSection = ({ navigation }) => {
  const state = useAppSelector((state) => state.profile);

  const [payload, setpayLoad] = useState<ContactInfoType>({
    fullName: undefined,
    address1: undefined,
    address2: undefined,
    city: undefined,
    state: undefined,
    zip: undefined,
    birthDay: undefined,
    email: undefined,
    cellPhone: undefined,
    homePhone: undefined,
    workPhone: undefined,
  });

  useEffect(() => {
    setpayLoad({
      ...state.info,
    });
  }, [state]);

  return (
    <View style={styles.contactContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Contact Information</Text>
        <TouchableOpacity
          style={styles.contactRightContainer}
          onPress={() => {
            navigation.navigate("editContactInfo");
          }}
        >
          <Text style={styles.editText}>Edit</Text>
          <Icon name="chevron-forward" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.contactInfoContainer}>
        <View style={styles.contactInfo}>
          <View style={styles.contactInfoItem1}>
            <Text style={styles.contactInfoLabel}>Address</Text>
          </View>
          <View style={styles.contactInfoItem2}>
            <Text style={styles.contactInfoText} numberOfLines={2}>
              {`${payload?.address1}, ${payload?.address2}, 
              `}
            </Text>
          </View>
        </View>
        <View
          style={{
            ...styles.contactInfo,
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <View style={{ ...styles.contactInfoItem1 }}>
            <Text style={styles.contactInfoLabel}>Mobile Phone</Text>
          </View>
          <View style={{ ...styles.contactInfoItem2 }}>
            <Text style={styles.contactInfoText}>
              {formatPhoneNumber(payload.cellPhone)}
            </Text>
          </View>
        </View>
        <View
          style={{
            ...styles.contactInfo,
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <View style={{ ...styles.contactInfoItem1 }}>
            <Text style={styles.contactInfoLabel}>Home Phone</Text>
          </View>
          <View style={{ ...styles.contactInfoItem2 }}>
            <Text style={styles.contactInfoText}>
              {formatPhoneNumber(payload.homePhone)}
            </Text>
          </View>
        </View>
        <View
          style={{
            ...styles.contactInfo,
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <View style={{ ...styles.contactInfoItem1 }}>
            <Text style={styles.contactInfoLabel}>Work Phone</Text>
          </View>
          <View style={{ ...styles.contactInfoItem2 }}>
            <Text style={styles.contactInfoText}>
              {formatPhoneNumber(payload.workPhone)}
            </Text>
          </View>
        </View>
        <View style={{ ...styles.contactInfo, paddingRight: 40 }}>
          <View style={styles.contactInfoItem1}>
            <Text style={styles.contactInfoLabel}>Email</Text>
          </View>
          <View style={styles.contactInfoItem2}>
            <Text numberOfLines={2} style={styles.contactInfoText}>
              {payload?.email}
            </Text>
          </View>
        </View>
        <View style={styles.contactInfo}>
          <View style={styles.contactInfoItem1}>
            <Text style={styles.contactInfoLabel}>Birthday</Text>
          </View>
          <View style={styles.contactInfoItem2}>
            <Text style={styles.contactInfoText}>
              {formatBirthday(payload?.birthDay)}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          height: config.hp("12%"),
          alignItems: "center",
          justifyContent: "center",
          //paddingTop: 20,
          marginBottom: 20,
        }}
      >
        <TouchableOpacity>
          <Text>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contactContainer: {
    flex: 1,
  },
  titleContainer: {
    paddingVertical: config.hp(".5%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: config.hp("2%"),
  },
  title: {
    fontSize: config.hp("2.30%"),
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  contactRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "50%",
  },
  editText: {
    fontSize: config.hp("2%"),
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  icon: {
    fontSize: config.hp("2.75%"),
    lineHeight: config.hp("3%"),
    color: theme.colors.backdrop,
  },
  contactInfoContainer: {
    flex: 1,
  },
  contactInfo: {
    height: config.hp("6%"),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: config.hp(".05%"),
    borderBottomColor: theme.colors.faded,
  },
  contactInfoLabel: {
    fontSize: config.hp("2%"),
    fontWeight: "bold",
  },
  contactInfoItem1: {
    width: "35%",
    display: "flex",
    //flexWrap: "wrap",
  },
  contactInfoItem2: {
    width: "65%",
    alignItems: "flex-end",
  },
  contactInfoText: {
    color: theme.colors.primary,
    fontSize: config.hp("2.25%"),
    //  flexWrap: "wrap",

    //width: "50%",
  },
});

export default ContactInfoSection;
