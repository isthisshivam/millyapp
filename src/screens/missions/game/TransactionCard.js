import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const TransactionCard = ({
  transaction,
  expanded,
  toggleExpanded,
  moving,
  translateX,
  translateY,
  rotate,
  handlePan,
  handlePanStateChange,
}) => {
  const date = new Date(transaction.date);
  const price = Math.abs(transaction.amount);
  return (
    <>
      {expanded ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <PanGestureHandler
            onGestureEvent={handlePan}
            onHandlerStateChange={handlePanStateChange}
          >
            <Animated.View
              style={{
                ...styles.currentCard,
                backgroundColor: moving ? "gray" : "white",
                transform: [{ translateX }, { translateY }, { rotate }],
                height: config.hp("25%"),
              }}
            >
              <TouchableOpacity
                onPress={toggleExpanded}
                style={styles.expanded}
              >
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{ fontSize: 20 }}
                >
                  {transaction ? transaction.name : undefined}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    marginTop: config.hp("2%"),
                  }}
                >
                  <Text style={{ color: "black", fontSize: 18 }}>Amount:</Text>
                  <Text
                    style={{
                      ...styles.price,
                      color:
                        transaction.type == "credit"
                          ? theme.colors.primary
                          : "red",
                    }}
                  >
                    -${price.toFixed(2)}
                  </Text>
                </View>
                <Text style={{ color: "black", fontSize: 18 }}>
                  Date: {date.toLocaleDateString("en-US")}
                </Text>
                <Text style={{ color: "black", fontSize: 16 }}>
                  Remaining Balance: ${transaction.remainingBalance}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </PanGestureHandler>
        </View>
      ) : (
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <PanGestureHandler
            onGestureEvent={handlePan}
            onHandlerStateChange={handlePanStateChange}
          >
            <Animated.View
              style={{
                ...styles.currentCard,
                backgroundColor: moving ? "gray" : "white",
                transform: [{ translateX }, { translateY }, { rotate }],
                height: config.hp("20%"),
              }}
            >
              <TouchableOpacity
                onPress={toggleExpanded}
                style={{
                  flex: 1,
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{ fontSize: 18 }}
                >
                  {transaction ? transaction.name : undefined}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      ...styles.price,
                      color:
                        transaction.type == "credit"
                          ? theme.colors.primary
                          : "red",
                    }}
                  >
                    ${transaction.amount}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          </PanGestureHandler>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  currentCard: {
    width: config.wp("60%"),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: config.wp("2%"),
    elevation: config.hp("1%"),
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: "black",
    marginBottom: 10,
  },
  expanded: {
    flex: 1,
    alignContent: "center",
    justifyContent: "flex-start",
    paddingVertical: config.hp("4%"),
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default TransactionCard;
