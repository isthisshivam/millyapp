import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import LottieView from "lottie-react-native";
import GameFinishModal from "./GameFinishModal";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import TransactionCard from "./TransactionCard";
import HealthBar from "./HealthBar";
import Avatar from "./Avatar";

const TransactionGame = ({ toggleGame }) => {
  let data = useSelector((state) => state.transactions);

  var increment = 10;
  const [begin, setBegin] = useState(0);
  const [end, setEnd] = useState(begin + increment);
  const [transactions, setTransactions] = useState(
    data.filter((item) => item.type === "debt").slice(begin, end)
  );
  const [transaction, setTransaction] = useState(transactions[0]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showBad, setShowBad] = useState(false);
  const [showGood, setShowGood] = useState(false);
  const [moving, setMoving] = useState(false);
  const [goodTx, setGoodTx] = useState(0);
  const [badTx, setBadTx] = useState(0);
  const [index, setIndex] = useState(0);
  const [state, setState] = useState();
  const [expanded, setExpanded] = useState(false);
  const [health, setHealth] = useState(1.0);
  const anim = useRef(new Animated.Value(0));

  const y = new Animated.Value(0);
  const translateX = new Animated.Value(0);
  const translateY = new Animated.Value(0);
  const windowHeight = Dimensions.get("window").height;

  let next = transaction
    ? transactions.filter((item) => item.name !== transaction.name)
    : undefined;

  const TopOrBottom = y.interpolate({
    inputRange: [0, windowHeight / 2 - 1, windowHeight / 2],
    outputRange: [1, 1, -1],
    extrapolate: "clamp",
  });

  const rotate = Animated.multiply(translateX, TopOrBottom).interpolate({
    inputRange: [-1000, 1000],
    outputRange: [`-270deg`, `270deg`],
    extrapolate: "clamp",
  });

  const handlePan = Animated.event(
    [
      {
        nativeEvent: { translationX: translateX, translationY: translateY, y },
      },
    ],
    { useNativeDriver: true }
  );

  const reset = Animated.parallel([
    Animated.timing(translateX, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }),
    Animated.timing(translateY, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }),
  ]);

  const handlePanStateChange = ({ nativeEvent }) => {
    const { state, translationX } = nativeEvent;
    setState(state);

    if (state == 2) {
      //User is moving card
      setMoving(true);
    }
    //When the user takes their finger off the screen
    if (state === 5) {
      setMoving(false);
      if (translationX > 150 || translationX < -15) {
        if (translationX > 150) {
          setShowGood(true);
          setGoodTx(goodTx + 1);
        } else {
          setShowBad(true);
          setBadTx(badTx + 1);
          takeDamage();
        }
        if (index < 10) {
          setIndex(index + 1);
          let tx = transactions.shift();
          next = transactions.filter((item) => item.name !== transaction.name);
          setTransaction(transactions[0]);
        }
      } else {
        reset.start();
      }
    }
  };

  const shake = useCallback(() => {
    // makes the sequence loop
    Animated.loop(
      // runs the animation array in sequence
      Animated.sequence([
        // shift element to the left by 2 units
        Animated.timing(translateX, {
          toValue: -15,
          duration: 200,
          useNativeDriver: true,
        }),
        // shift element to the right by 2 units
        Animated.timing(translateX, {
          toValue: 15,
          duration: 200,
          useNativeDriver: true,
        }),
        // bring the element back to its original position
        Animated.timing(translateX, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      // loops the above animation config 2 times
      { iterations: 2 }
    ).start();
  }, []);

  function openModal() {
    setShowModal(true);
    setLoading(false);
  }
  function closeModal() {
    setShowModal(false);
  }

  function playAgain() {
    setShowModal(false);
    //Increment +10 for slice()
    let newInc = end + increment;
    setBegin(end);
    setEnd(newInc);

    //get next 10 transactions from data
    setTransactions(
      data.filter((item) => item.type === "debt").slice(end, newInc)
    );
    //Reset index and health
    setIndex(0);
    setHealth(1);
  }

  function toggleExpanded() {
    setExpanded(!expanded);
  }

  function takeDamage() {
    setHealth(health - (0.11).toFixed(2));
  }

  useEffect(() => {
    setTransaction(transactions[0]);
  }, [transactions]);

  useEffect(() => {
    shake();
  }, []);

  return (
    <View style={styles.container}>
      {transaction ? (
        <View style={{ flexDirection: "column" }}>
          <View style={{ alignItems: "center", paddingBottom: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 25,
                width: "100%",
                paddingHorizontal: config.wp("2%"),
              }}
            >
              <HealthBar health={health}></HealthBar>
            </View>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Are you happy with this purchase?
            </Text>
          </View>
          {transaction !== undefined ? (
            <View style={styles.rowContainer}>
              <View style={styles.directionContainer}>
                {showBad ? (
                  <LottieView
                    speed={2}
                    loop={false}
                    autoPlay
                    onAnimationFinish={() => setShowBad(false)}
                    style={{
                      width: 60,
                      height: 60,
                    }}
                    source={require("../../../components/ui/bad.json")}
                  />
                ) : (
                  <Text style={{ ...styles.direction, color: "red" }}>Bad</Text>
                )}
              </View>
              <TransactionCard
                handlePan={handlePan}
                handlePanStateChange={handlePanStateChange}
                expanded={expanded}
                toggleExpanded={toggleExpanded}
                moving={moving}
                translateX={translateX}
                translateY={translateY}
                rotate={rotate}
                transaction={transaction}
              ></TransactionCard>
              <View style={styles.directionContainer}>
                {showGood ? (
                  <LottieView
                    speed={2}
                    loop={false}
                    autoPlay
                    onAnimationFinish={() => setShowGood(false)}
                    style={{
                      width: 60,
                      height: 60,
                    }}
                    source={require("../../../components/ui/happy.json")}
                  />
                ) : (
                  <Text
                    style={{ ...styles.direction, color: theme.colors.primary }}
                  >
                    Good
                  </Text>
                )}
              </View>
            </View>
          ) : undefined}
          {next ? (
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                height: 300,
                position: "relative",
              }}
            >
              {next.map((item, i) => (
                <View
                  key={i}
                  style={{
                    ...styles.card,
                    backgroundColor: "#bdbdbd",
                    // transform: [
                    //   { translateX: new Animated.Value(0) },
                    //   { translateY: new Animated.Value(0) },
                    //   { rotate },
                    // ],

                    opacity:
                      i == 0
                        ? 1
                        : i == 1
                        ? 0.7
                        : i == 2
                        ? 0.6
                        : i == 3
                        ? 0.5
                        : i >= 4
                        ? 0.4
                        : undefined,
                  }}
                >
                  <Text>{item.name}</Text>
                </View>
              ))}
            </View>
          ) : undefined}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <LottieView
            loop={false}
            autoPlay
            style={{
              width: "100%",
              height: 250,
              position: "absolute",
            }}
            source={require("../../../components/ui/confetti.json")}
          />
          <LottieView
            loop={false}
            autoPlay
            speed={1.5}
            onAnimationFinish={() => setLoading(true)}
            style={{
              width: "100%",
              height: 250,
              position: "absolute",
            }}
            source={require("../../../components/ui/fireworks.json")}
          />
          {loading ? (
            <LottieView
              loop={false}
              autoPlay
              speed={1.5}
              onAnimationFinish={() => openModal()}
              style={{
                width: "100%",
                height: 250,
                position: "absolute",
              }}
              source={require("../../../components/ui/loading-spinner.json")}
            />
          ) : undefined}
          <GameFinishModal
            showSuccessModal={showModal}
            closeModal={closeModal}
            playAgain={playAgain}
            goodTx={goodTx}
            badTx={badTx}
            toggleGame={toggleGame}
          ></GameFinishModal>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",

    width: "100%",
  },
  card: {
    backgroundColor: "white",
    width: config.wp("55%"),
    height: 50,
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
  currentCard: {
    width: config.wp("60%"),
    height: config.hp("12%"),
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
  direction: {
    fontWeight: "bold",
    fontSize: 20,
  },
  directionContainer: {
    width: config.wp("15%"),
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  secondaryTitle: {
    color: theme.colors.primary,
    fontSize: config.hp("2.6%"),
    fontWeight: "bold",
  },
  secondaryTitleContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: config.hp("8%"),
    alignItems: "flex-start",
  },
  summary: {
    fontSize: config.hp("1.9%"),
    color: "black",
  },
  text: {
    textAlign: "center",
    fontSize: 22,
    backgroundColor: "transparent",
  },
  tinderContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: config.hp("12%"),
  },
  titleContainer: {
    paddingVertical: config.hp("1%"),
  },

  title: {
    fontSize: config.hp("3.5%"),
    fontWeight: "bold",
    color: "black",
  },
});

export default TransactionGame;
