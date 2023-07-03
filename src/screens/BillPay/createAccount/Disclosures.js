import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const Disclosures = ({ submit }) => {
  const [agreed, setAgreed] = useState(false);
  return (
    <ScrollView style={styles.container}>
      <Text
        style={{
          fontSize: config.wp("5%"),
          fontWeight: "500",
          color: theme.colors.primary,
          marginBottom: config.hp("4%"),
        }}
      >
        Welcome to BillPay
      </Text>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 18, marginBottom: config.hp("1%") }}>
          Disclosures
        </Text>

        <Text style={{ marginBottom: config.hp("4%") }}>
          Excepteur officia sunt anim dolore. Incididunt elit sint laborum
          officia amet ea nulla adipisicing laborum. Ea quis qui pariatur
          cupidatat labore consequat ad. Sit sunt reprehenderit pariatur laboris
          amet amet fugiat deserunt occaecat duis voluptate sit. Dolor eiusmod
          excepteur sunt do ipsum minim excepteur cillum irure nostrud.
        </Text>
        <Text style={{ marginBottom: config.hp("4%") }}>
          Excepteur officia sunt anim dolore. Incididunt elit sint laborum
          officia amet ea nulla adipisicing laborum. Ea quis qui pariatur
          cupidatat labore consequat ad. Sit sunt reprehenderit pariatur laboris
          amet amet fugiat deserunt occaecat duis voluptate sit. Dolor eiusmod
          excepteur sunt do ipsum minim excepteur cillum irure nostrud.
        </Text>
        <Text style={{ marginBottom: config.hp("4%") }}>
          Excepteur officia sunt anim dolore. Incididunt elit sint laborum
          officia amet ea nulla adipisicing laborum. Ea quis qui pariatur
          cupidatat labore consequat ad. Sit sunt reprehenderit pariatur laboris
          amet amet fugiat deserunt occaecat duis voluptate sit. Dolor eiusmod
          excepteur sunt do ipsum minim excepteur cillum irure nostrud.
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: config.wp("4%"),
        }}
      >
        <TouchableOpacity
          onPress={() => setAgreed(!agreed)}
          style={{
            height: 30,
            width: 30,
            borderColor: "gray",
            borderRadius: 50,
            borderWidth: 1,
            backgroundColor: agreed ? theme.colors.primary : theme.colors.faded,
          }}
        />
        <Text style={{ fontSize: 16 }}>
          I agree to the terms and conditions
        </Text>
      </View>
      <View
        style={{
          height: config.hp("7%"),
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          onPress={submit}
          style={{
            backgroundColor: theme.colors.primary,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 12,
            width: "75%",
            paddingVertical: config.hp("1%"),
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: config.hp("2%"),
    paddingHorizontal: config.wp("2%"),
  },
  input: {
    backgroundColor: "white",
    width: "50%",
    paddingHorizontal: config.wp("1%"),
    borderRadius: 7,
    height: config.hp("4%"),
    borderWidth: 1,
    borderColor: theme.colors.faded,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: config.hp("2%"),
    paddingHorizontal: config.wp("4%"),
  },
  rowText: {
    fontSize: 16,
  },
});

export default Disclosures;
