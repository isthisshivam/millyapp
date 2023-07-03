import React from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import Button from "../../../components/Button";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const GameFinishModal = ({
  showSuccessModal,
  closeModal,
  goodTx,
  badTx,
  playAgain,
  toggleGame,
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSuccessModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.container}>
            <Text style={styles.title}>Results</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "50%",
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "red" }}
                >
                  Bad
                </Text>
                <Text style={styles.number}>{badTx}</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: theme.colors.primary,
                  }}
                >
                  Good
                </Text>
                <Text style={styles.number}>{goodTx}</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 16 }}>
                You had {badTx} bad transactions and {goodTx} good transactions.
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flex: 1,
                width: "100%",
                paddingHorizontal: config.wp("8%"),
              }}
            >
              <Button
                text="Play Again"
                background={theme.colors.primary}
                height={35}
                width={100}
                radius={12}
                color="white"
                fontWeight="bold"
                fontSize={18}
                onPress={playAgain}
              ></Button>
              <Button
                text="Continue"
                background={theme.colors.primary}
                height={35}
                width={100}
                radius={12}
                color="white"
                fontWeight="bold"
                fontSize={18}
                onPress={() => (toggleGame(), closeModal())}
              ></Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: config.hp("2%"),
    paddingHorizontal: config.wp("4%"),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: config.wp("80%"),
    height: config.hp("30%"),
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  number: {
    fontSize: 18,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    color: theme.colors.primary,
    fontSize: 24,
    marginBottom: 10,
  },
});

export default GameFinishModal;
