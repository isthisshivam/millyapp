import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const ForgotPassword = ({ navigation }) => {
  const [showQuestions, setShowQuestions] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const auth = useSelector((state) => state.auth);
  const [input, setInput] = useState(undefined);
  const [answer, setAnswer] = useState(undefined);
  const dispatch = useDispatch();

  //INPUT HANDLER
  const handleChange = (value) => {
    setInput(value);
  };
  //INPUT HANDLER
  const answerChange = (value) => {
    setAnswer(value);
  };

  //Send username to api
  function submit() {
    dispatch(checkUsername(input));
  }

  //Api Sends Back Security Question
  //Send Answers To Api
  function submitAnswers() {
    //Send data to api
    dispatch(checkAnswer());
  }
  //Success Redirect to Login
  function redirect() {
    navigation.navigate("Login");
    dispatch(clearState());
  }

  //Failed Add strike

  useEffect(() => {
    //Get response from api
    //Success
    if (auth.usernameSuccess) {
      setShowQuestions(true);
    }
    if (auth.questionsSuccess) {
      setShowAnimation(true);
    }

    //Failed
    //Show Failed Ui
    //Add strike to strike blocking
  }, [auth]);

  useEffect(() => {
    setInput(undefined);
    dispatch(clearState());
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Reset Password</Text>
        <Text>
          Submit your username and answer your security questions to get a
          password reset sent to your email
        </Text>
        {!showQuestions ? (
          <View style={styles.inputContainer}>
            <Text style={{ fontSize: 20 }}>Verify UserId</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: config.wp("4%"),
                paddingTop: config.hp("2%"),
              }}
            >
              <TextInput
                keyboardType={"default"}
                placeholder="Enter Your UserID"
                textContentType={"username"}
                underlineColor="gray"
                label="UserId"
                value={input}
                style={styles.input}
                onChangeText={(value) => handleChange(value)}
              ></TextInput>
              {/* <Button
                text="Submit"
                fontSize={22}
                height={40}
                width={100}
                background={
                  !input ? theme.colors.inActive : theme.colors.primary
                }
                color={"white"}
                fontWeight="bold"
                radius={10}
                onPress={submit}
                disabled={!input}
              ></Button> */}
            </View>
          </View>
        ) : !showAnimation && showQuestions ? (
          <View style={styles.questionContainer}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Security Questions
            </Text>

            <View style={{ paddingTop: config.hp("4%") }}>
              <Text style={styles.question}>
                What was the make of your first car?
              </Text>
              <TextInput
                keyboardType={"default"}
                placeholder="Answer"
                textContentType={"username"}
                underlineColor="gray"
                label="UserId"
                value={answer}
                style={styles.input}
                onChangeText={(value) => answerChange(value)}
              ></TextInput>
            </View>
            {/* <Button
              text="Submit"
              onPress={submitAnswers}
              background={
                !answer ? theme.colors.inActive : theme.colors.primary
              }
              fontSize={20}
              fontWeight="bold"
              color="white"
              height={40}
              width={config.wp("90%")}
              marginTop={20}
              disabled={!answer}
            ></Button> */}
          </View>
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: "80%",
            }}
          >
            {/* <LottieView
              loop={false}
              speed={1.5}
              autoPlay
              style={{
                width: 160,
                height: 160,
              }}
              source={require("../../../components/ui/unlock.json")}
              onAnimationFinish={() => redirect()}
            /> */}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: config.wp("4%"),
    paddingVertical: config.hp("4%"),
  },
  input: {
    height: 50,
    borderColor: "black",
    borderBottomWidth: 1,

    width: 175,

    fontSize: 20,
    paddingHorizontal: config.wp("2%"),
  },
  inputContainer: {
    paddingVertical: config.hp("4%"),
  },
  question: {
    fontSize: 20,
  },
  questionContainer: {
    paddingVertical: config.hp("7%"),
  },
  title: { fontSize: 22, fontWeight: "bold" },
});
export default ForgotPassword;
