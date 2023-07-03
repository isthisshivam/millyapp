import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StatusBar,
} from "react-native";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

import { styles } from "./style";
const SPACING = config.hp("2%");
const ITEM_SIZE = SPACING * 4.9;
const ModalContent = ({ toggleModal, handleChange }) => {
  const frequencyOptions = [
    { name: "Once" },
    {
      name: "Daily",
    },
    {
      name: "Weekly",
    },
    {
      name: "Bi-Weekly",
    },
    {
      name: "Monthly",
    },
    {
      name: "Bi-Monthly",
    },
    {
      name: "Semi-Anually",
    },
    {
      name: "Anually",
    },
  ];
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
    <>
      <View style={styles.modalContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              // disabled={!formOneIsFilled}
              disabled={true}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Choose Frequency</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icon}
              onPress={toggleModal}
              activeOpacity={0.9}
            >
              {/* <Xicon height={7.5} width={7.5} /> */}
            </TouchableOpacity>
          </View>
        </View>
        <Animated.FlatList
          data={frequencyOptions}
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
                  handleChange("frequency", item.name);
                  toggleModal(false);
                }}
              >
                <Text style={styles.modalText}>{item.name}</Text>
              </AnimatedTouchable>
            );
          }}
        />
      </View>
    </>
  );
};

export default ModalContent;
