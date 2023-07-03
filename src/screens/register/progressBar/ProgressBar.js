import React from "react";
import { View, Text } from "react-native";
import { styles } from "./style";

const ProgressBar = ({ activeStep }) => {
  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <View style={styles.leftShape}>
          <Text>{""}</Text>
        </View>
        <View
          style={
            activeStep >= 1
              ? [styles.middleShape, styles.selected]
              : [styles.middleShape, styles.notSelected]
          }
        >
          <Text>{""}</Text>
        </View>
        <View
          style={
            activeStep >= 2
              ? [styles.middleShape, styles.selected]
              : [styles.middleShape, styles.notSelected]
          }
        >
          <Text>{""}</Text>
        </View>
        <View
          style={
            activeStep >= 3
              ? [styles.middleShape, styles.selected]
              : [styles.middleShape, styles.notSelected]
          }
        >
          <Text>{""}</Text>
        </View>
        <View
          style={
            activeStep >= 4
              ? [styles.rightShape, styles.selected]
              : [styles.rightShape, styles.notSelected]
          }
        >
          <Text>{""}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProgressBar;
