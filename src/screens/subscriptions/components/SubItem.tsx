import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Rating, AirbnbRating } from "react-native-ratings";
import { Ionicons } from "@expo/vector-icons";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { SubscriptionType } from "../../../../types/subscriptions/types";

type Props = {
  item: SubscriptionType;
  navigation: {
    navigate: (name: string, params: any) => void;
  };
};

const SubItem = ({ item, navigation }: Props) => {
  const { name, amount, frequency, id } = item;
  let date = new Date(item.startDate).toLocaleDateString();

  const STAR = <Ionicons name="star" size={24} color="black" />;
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      activeOpacity={0.55}
      onPress={() => navigation.navigate("Edit Subscription", { item: item })}
    >
      <View>
        <Text style={styles.itemName}>{name}</Text>

        <Text style={{ fontSize: 16 }}>{date}</Text>
      </View>

      <View>
        <AirbnbRating
          defaultRating={item.rating}
          //selectedColor={theme.colors.primary}
          size={16}
          showRating={false}
        />
        <Text style={styles.rightSideNames}>
          ${amount}/{frequency}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: config.hp(".05%"),
    borderBottomColor: theme.colors.faded,
    height: config.hp("9%"),
  },
  itemName: {
    fontSize: config.hp("2.15%"),
    marginBottom: 5,
  },
  rightSideNames: {
    fontSize: config.hp("2.15%"),
    color: theme.colors.primary,

    textTransform: "capitalize",
  },
});
export default SubItem;
