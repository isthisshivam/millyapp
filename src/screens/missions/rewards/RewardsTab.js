import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { config } from "../../../config/Config";
import award from "../../../../assets/award.png";
import * as Progress from "react-native-progress";

const RewardsTab = ({ rewards }) => {
  return (
    <View
      style={{
        paddingHorizontal: config.wp("4%"),
        width: "100%",
        marginTop: config.hp("4%"),
      }}
    >
      <View style={styles.container}>
        {rewards?.map((item, i) => (
          <View key={i}>
            <View style={styles.card}>
              <Image
                source={award}
                style={styles.icon}
                resizeMode="contain"
              ></Image>
              <View>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.info}>{item.info}</Text>
                <Progress.Bar progress={item.progress} width={200} />
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: config.wp("4%"),
              }}
            >
              <View
                style={{
                  borderBottomColor: "gray",
                  borderBottomWidth: 1,
                  paddingHorizontal: config.wp("7%"),
                }}
              ></View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: config.hp("10%"),
    paddingHorizontal: config.wp("2%"),
    alignItems: "center",
    flexDirection: "row",
  },
  container: {
    backgroundColor: "white",
    width: "100%",

    borderRadius: 12,
    paddingVertical: config.hp("1%"),
  },
  icon: {
    height: config.hp("16%"),
    width: config.wp("16%"),
  },
  title: {
    fontSize: 20,
  },
});

export default RewardsTab;
