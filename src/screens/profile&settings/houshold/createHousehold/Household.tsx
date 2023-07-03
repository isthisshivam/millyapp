import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { DraxProvider, DraxView } from "react-native-drax";
import { FontAwesome } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import StatusHandler from "../../../../../utils/StatusHandler";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import { useAppDispatch, useAppSelector } from "../../../../store/Store";
import { MemberType } from "../../../../store/types/household/type";
import {
  man,
  woman,
  Grad,
  toddler,
  girl,
  boy,
  pregnant,
  baby,
  seniorMale,
  seniorWoman,
  Handicap,
} from "./icons";
import {
  CreateHousehold,
  reset,
} from "../../../../store/actionReducers/household";
import globalStyles from "../../../../globalStyles/styles";

const Household = ({ navigation }) => {
  const state = useAppSelector((state) => state.house);
  const [status, setStatus] = useState({});
  const [staged, setStaged] = React.useState([]);
  const dispatch = useAppDispatch();

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
    if (staged.length > 0) {
      let data: MemberType[] = staged.map((item, i) => {
        let obj: MemberType = {
          type: `${item.name} - ${i + 1}`,
          age: 0,
          income: "",
          race: "",
          gender: "",
          image: "",
        };
        return obj;
      });
      dispatch(CreateHousehold(data));
      return;
    }
    //handleNext();
  }

  useEffect(() => {
    if (state.status == "Error" || state.error) {
      dispatch(reset());
    }

    if (state.status == true) {
      dispatch(reset());
    }
  }, [state]);

  return (
    <>
      <DraxProvider style={{ flex: 1 }}>
        <View style={styles.container}>
          <View
            style={{
              height: "50%",
              marginBottom: config.hp("2%"),
            }}
          >
            <View
              style={{
                paddingHorizontal: config.wp("2%"),
                marginBottom: config.hp("2%"),
              }}
            >
              <Text style={globalStyles.title}>Household</Text>

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
                    //styles.centeredContent,
                    styles.draggableBox,
                    //styles.green,
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
                      // alt="Man"
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
                    //styles.centeredContent,
                    styles.draggableBox,
                    //styles.green,
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
                      //alt="Man"
                      resizeMethod="resize"
                      resizeMode="contain"
                    ></Image>
                    <Text>{item.name}</Text>
                  </View>
                </DraxView>
              ))}
            </View>
          </View>
          {state.loading ? (
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
                source={require("../../../../components/ui/loading-spinner.json")}
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
                          //alt={item}
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
        </View>
      </DraxProvider>
      <View style={globalStyles.submitButtonContainer}>
        <TouchableOpacity style={globalStyles.submitButton} onPress={Continue}>
          <Text style={globalStyles.submitButtonText}>Continue</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={{}} onPress={handleBack}>
          <Text style={{ fontSize: 16 }}>Back</Text>
        </TouchableOpacity> */}
      </View>
      <StatusHandler
        state={state}
        status={status}
        setStatus={setStatus}
        navigation={navigation}
        hideSuccess={false}
        deleteItem={undefined}
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
});
export default Household;
