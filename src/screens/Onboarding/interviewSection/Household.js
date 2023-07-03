import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { DraxProvider, DraxView } from "react-native-drax";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

import man from "../../../../assets/onboarding/spouse-male.png";
import woman from "../../../../assets/onboarding/spouse-woman.png";
import Grad from "../../../../assets/onboarding/grad.png";
import toddler from "../../../../assets/onboarding/baby.png";
import girl from "../../../../assets/onboarding/child-female.png";
import boy from "../../../../assets/onboarding/child-male.png";
import pregnant from "../../../../assets/onboarding/expecting.png";
import baby from "../../../../assets/onboarding/baby-solid.svg";
import seniorMale from "../../../../assets/onboarding/senior-male.png";
import seniorWoman from "../../../../assets/onboarding/senior-woman.png";
import Handicap from "../../../../assets/onboarding/disabled.png";

import { CreateHousehold } from "../../../store/actions/HouseActions";
import ButtonContainer from "../ButtonContainer";
import StatusHandler from "../../../../utils/StatusHandler";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const Household = ({ step, next, back, handleChange }) => {
  const state = useSelector((state) => state.house);
  const [staged, setStaged] = React.useState([]);
  const dispatch = useDispatch();

  const [status, setStatus] = useState({
    loading: false,
    error: false,
    message: undefined,
  });

  let data1 = [
    { name: "Spouse", image: man },
    { name: "Spouse", image: woman },
    { name: "College (17-25)", image: Grad },
    { name: "Child (6-16)", image: boy },
    { name: "Child (6-16)", image: girl },
  ];

  let data2 = [
    { name: "Baby (0-5)", image: toddler },
    { name: "Senior (65+)", image: seniorMale },
    { name: "Senior (65+)", image: seniorWoman },
    { name: "Expecting", image: pregnant },
    { name: "Disability", image: Handicap },
  ];

  function handleHouseChange(event) {
    if (staged.length < 15) {
      setStaged([...staged, event?.dragged?.payload]);
    }
  }

  function Continue() {
    // setStatus({
    //   ...status,
    //   loading: true,
    // });
    //

    if (staged.length > 0) {
      let data = staged.map((item, i) => {
        let obj = {
          name: `${item.name} - ${i + 1}`,
          age: 0,
          income: "",
          race: "",
          gender: "",
        };
        return obj;
      });
      handleChange("household", data);
    }
    if (staged.length == 0) {
      let data = [
        {
          name: `Account Holder`,
          age: 0,
          income: "",
          race: "",
          gender: "",
        },
      ];
      handleChange("household", data);
    }
    next();
  }

  // useEffect(() => {
  //   if (state.status == true) {
  //     next();
  //   }
  // }, [state]);

  return (
    <>
      <DraxProvider style={{ flex: 1 }}>
        <View style={styles.container}>
          <View
            style={{
              height: "45%",
            }}
          >
            <View
              style={{
                paddingHorizontal: config.wp("2%"),
              }}
            >
              <Text
                style={{
                  color: theme.colors.primary,
                  fontSize: 24,
                  fontWeight: "bold",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                Household
              </Text>

              <Text style={styles.question}>What is your household size? </Text>
              <Text>
                Drag and drop to build what best resembles your household
              </Text>
            </View>
            <View
              style={{
                paddingBottom: config.hp("5%"),
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                paddingHorizontal: config.wp("2%"),
              }}
            >
              {data1.map((item, i) => (
                <DraxView
                  key={i}
                  style={[
                    styles.centeredContent,
                    styles.draggableBox,
                    styles.green,
                  ]}
                  draggingStyle={styles.dragging}
                  dragReleasedStyle={styles.dragging}
                  hoverDraggingStyle={styles.hoverDragging}
                  dragPayload={item}
                  longPressDelay={0}
                >
                  <View style={{ alignItems: "center", width: "100%" }}>
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                      }}
                      source={item.image}
                      alt="Man"
                      resizeMethod="resize"
                      resizeMode="contain"
                    ></Image>
                    <Text>{item.name}</Text>
                  </View>
                </DraxView>
              ))}
            </View>
            <View
              style={{
                height: "25%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                paddingHorizontal: config.wp("2%"),
              }}
            >
              {data2.map((item, i) => (
                <DraxView
                  key={i}
                  style={[
                    styles.centeredContent,
                    styles.draggableBox,
                    styles.green,
                  ]}
                  draggingStyle={styles.dragging}
                  dragReleasedStyle={styles.dragging}
                  hoverDraggingStyle={styles.hoverDragging}
                  dragPayload={item}
                  longPressDelay={0}
                >
                  <View style={{ alignItems: "center", width: "100%" }}>
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                      }}
                      source={item.image}
                      alt="Man"
                      resizeMethod="resize"
                      resizeMode="contain"
                    ></Image>
                    <Text>{item.name}</Text>
                  </View>
                </DraxView>
              ))}
            </View>
          </View>
          {status.loading ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "flex-start",
                height: "100%",
                paddingTop: 25,
              }}
            >
              <LottieView
                loop
                autoPlay
                style={{
                  width: 160,
                  height: 160,
                }}
                source={require("../../../components/ui/loading-spinner.json")}
              />
            </View>
          ) : (
            <DraxView
              style={{
                width: "100%",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
              renderContent={({ viewState }) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "#B0BEC5",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignItems: "center",
                        //height: "100%",
                        width: "100%",
                      }}
                    >
                      {staged.map((item, index) => (
                        <Image
                          key={index}
                          source={item.image}
                          alt={item}
                          style={{ height: 65, width: 35, margin: 5 }}
                          resizeMode="contain"
                        ></Image>
                      ))}
                    </View>

                    <TouchableOpacity
                      onPress={() => setStaged([])}
                      style={{ position: "absolute", top: 15, right: 15 }}
                    >
                      <FontAwesome name="refresh" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                );
              }}
              onReceiveDragDrop={(event) => handleHouseChange(event)}
            />
          )}

          <View
            style={{
              alignItems: "center",
              justifyContent: "flex-end",
              height: config.hp("9%"),
              paddingBottom: config.hp("1%"),
              //flex: 1,
            }}
          >
            <TouchableOpacity
              style={{
                width: "80%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.colors.primary,
                paddingVertical: config.hp("1%"),
                borderRadius: 12,
                marginBottom: 5,
              }}
              onPress={Continue}
            >
              <Text style={{ color: "white", fontSize: 16 }}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{}} onPress={back}>
              <Text style={{ fontSize: 16 }}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </DraxProvider>
      <StatusHandler
        state={state}
        status={status}
        setStatus={setStatus}
        navigation={undefined}
        hideSuccess={true}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: config.hp("2%"),
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: config.wp("12%"),
  },
  container: {
    //paddingVertical: config.hp("4%"),
    paddingHorizontal: config.wp("2%"),
    //alignItems: "center",
    flex: 1,
  },
  gradient: {
    width: config.wp("20%"),
    borderRadius: 12,
  },
  questionContainer: {
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
  questionContainer2: {
    alignItems: "flex-start",
  },
  question: {
    fontSize: config.hp("2%"),
    //marginBottom: config.hp("2%"),
    width: "100%",
  },
  receivingZone: {
    height: 200,
    borderRadius: 10,
  },
  receiving: {
    borderColor: "red",
    borderWidth: 2,
  },
  incomingPayload: {
    marginTop: 10,
    fontSize: 24,
  },
  received: {
    marginTop: 10,
    fontSize: 18,
  },
  draggableBox: {
    width: 65,
    height: 50,
    //borderRadius: 10,
  },
  dragging: {
    opacity: 0.2,
  },
  hoverDragging: {
    borderColor: "magenta",
    borderWidth: 2,
  },
  stagedCount: {
    fontSize: 18,
  },
  dragging: {
    opacity: 0.2,
  },
  hoverDragging: {
    borderColor: "magenta",
    borderWidth: 2,
  },
  stagedCount: {
    fontSize: 18,
  },
});
export default Household;
