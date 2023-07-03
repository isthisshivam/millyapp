import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { SubscriptionType } from "../../../../types/subscriptions/types";

type Props = {
  item: SubscriptionType;
};

const Subscription = ({ item }: Props) => {
  const handleSubscription = () => {
    switch (item.name) {
      case "Netflix":
        return (
          <View style={{ borderRadius: 25, paddingRight: 10 }}>
            <Image
              source={require("../../../../assets/netflixbrand.png")}
              style={{ width: 125 }}
              resizeMethod="resize"
              resizeMode="contain"
            ></Image>
          </View>
        );

      case "Disney Plus":
        return (
          <View style={{ borderRadius: 25 }}>
            <Image
              source={require("../../../../assets/disney.jpg")}
              style={{
                width: 125,
                borderRadius: 12,
                height: "100%",
              }}
              resizeMethod="resize"
              resizeMode="contain"
            ></Image>
          </View>
        );
      case "Spotify":
        return (
          <View style={{ borderRadius: 25, paddingHorizontal: 10 }}>
            <Image
              source={require("../../../../assets/spotifyLineup.png")}
              style={{
                width: 125,
              }}
              resizeMethod="resize"
              resizeMode="contain"
            ></Image>
          </View>
        );

      case "Apple Music":
        return (
          <View style={{ borderRadius: 25, paddingHorizontal: 10 }}>
            <Image
              source={require("../../../../assets/appleLogo.png")}
              style={{
                height: "100%",
              }}
              resizeMode="contain"
            ></Image>
          </View>
        );

      default:
        return (
          <View style={{ borderRadius: 25, paddingHorizontal: 10 }}>
            <Text
              style={{
                color: "black",
                fontSize: 22,
              }}
            >
              {item.name}
            </Text>
          </View>
        );
    }
  };
  return (
    <View
      style={{
        width: "100%",
        height: config.hp("8%"),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        marginBottom: 10,
        paddingRight: 10,
        borderRadius: 12,
        position: "relative",
      }}
    >
      {handleSubscription()}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{ color: "black", fontSize: 16, textTransform: "capitalize" }}
        >
          {item.frequency}/
        </Text>
        <Text style={{ color: "black", fontSize: 18 }}>${item.amount}</Text>
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     height: config.hp("9%"),
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "gray",
//     width: "100%",
//     borderRadius: 25,
//     paddingHorizontal: config.wp("12%"),
//     marginBottom: 10,
//   },
// });

export default Subscription;
