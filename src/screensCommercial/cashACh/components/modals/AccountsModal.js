import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StatusBar,
  StyleSheet,
  Modal,
} from "react-native";
import { useSelector } from "react-redux";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

const AccountsModal = ({ showAccounts, handleChange, toggleAccounts }) => {
  const SPACING = config.hp("2%");
  const ITEM_SIZE = SPACING * 4.9;
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const accounts = useSelector((state) => state.accounts.accounts);

  return (
    <>
      {showAccounts ? (
        <View style={styles.modalContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                // disabled={!formOneIsFilled}
                disabled={true}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Select Type</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icon}
                //onPress={() => setshowModal(false)}
                activeOpacity={0.9}
              >
                {/* <Xicon height={7.5} width={7.5} /> */}
              </TouchableOpacity>
            </View>
          </View>
          <Animated.FlatList
            data={accounts}
            keyExtractor={(item) => item.accountId.toString()}
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
                    handleChange("debitAccount", item.debitAccount);
                    toggleAccounts();
                  }}
                >
                  <Text style={styles.modalText}>
                    {item.nickName ? item.nickName : item.debitAccount}
                  </Text>
                </AnimatedTouchable>
              );
            }}
          />
          <TouchableOpacity onPress={toggleAccounts}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : undefined}
    </>
  );
};

export const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.70)",
    position: "absolute",
    bottom: 0,
    height: config.hp("45%"),
    width: "100%",
    paddingVertical: config.hp("2%"),
    paddingHorizontal: config.wp("1%"),
    flexDirection: "column",
    justifyContent: "flex-start",
  },

  modalInfoContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    //marginBottom: config.hp("1%"),
  },

  buttonText: {
    fontSize: config.hp("2.7%"),
    color: "white",
    fontWeight: "bold",
    letterSpacing: 1,
  },

  modalText: {
    fontSize: config.hp("2.5%"),
    textAlign: "center",
    //marginBottom: 2,
    fontWeight: "500",
    color: "black",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: config.hp("1%"),
    width: "80%",
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: config.hp(".5%"),
    paddingVertical: config.hp("1.35%"),
    width: "100%",
    elevation: config.hp(".5%"),
  },
  buttonText: {
    color: "white",
    fontSize: config.hp("2.35%"),
    textAlign: "center",
  },
});

export default AccountsModal;
