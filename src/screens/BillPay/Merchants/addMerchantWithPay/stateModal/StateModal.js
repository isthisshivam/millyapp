import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StatusBar,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { styles } from "./style";
import { config } from "../../../../../config/Config";
import { theme } from "../../../../../config/Theme";
import states from "./States";

const SPACING = config.hp("2%");
const ITEM_SIZE = SPACING * 4.9;

const StateModal = ({ setShowModal, handleChange }) => {
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.modalContainer}>
      <View style={styles.inputContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setShowModal(false)}
            activeOpacity={0.9}
          >
            <FontAwesome name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <Text style={styles.buttonText}>Select State</Text>
        </View>
      </View>
      <Animated.FlatList
        data={states}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{
          padding: SPACING,
          paddingHorizontal: config.wp("5%"),
          paddingTop: StatusBar.currentHeight || 42,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const scale = scrollY.interpolate({
            inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)],
            outputRange: [1, 1, 1, 0],
          });
          const opacity = scrollY.interpolate({
            inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 1)],
            outputRange: [1, 1, 1, 0],
          });
          return (
            <AnimatedTouchable
              activeOpacity={0.85}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.colors.fadedBackground,
                marginBottom: SPACING,
                padding: SPACING,
                borderRadius: config.hp("1%"),
                opacity,
                transform: [{ scale }],
              }}
              onPress={() => {
                handleChange("addressState", item.name);
                setShowModal(false);
              }}
            >
              <Text style={styles.modalText}>{item.name}</Text>
            </AnimatedTouchable>
          );
        }}
      />
    </View>
  );
};

export default StateModal;
