import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  Dimensions,
} from "react-native";
import RenderHtml from "react-native-render-html";
import axios from "axios";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { registerStyles } from "../registerStyles";
import { useAppDispatch, useAppSelector } from "../../../store/Store";
import { ScrollView } from "react-native-gesture-handler";
import AnimatedLottieView from "lottie-react-native";
import { LoginUser } from "../../../store/actionReducers/auth";

type Props = {
  credentials: {
    username: string;
    password: string;
  };
  navigation: {
    navigate: (route: string) => void;
  };
  handleBack: () => void;
};

const Disclosures = ({ handleBack, navigation, credentials }: Props) => {
  const state = useAppSelector((state) => state.register);
  const [data, setData] = useState(null);
  const { width } = useWindowDimensions();
  const [agreed, setAgreed] = useState(false);
  const dispatch = useAppDispatch();

  const getDisclosure = async () => {
    let response = await axios.get(
      "https://testenv.w-w-i-s.com/iteller21/api/client/AHHRV/uimessages/IB40/EN/newuser2/disclosure"
    );

    let reponseData = await response.data[0];
    let content = reponseData
      .replace(/<P>/, "")
      .replace(/<p>/, "")
      .replace(/<center>/g, "")
      .replace(/<\/center>/g, "")
      .replace(/<ul>/, "")
      .replace(/<\/ul>/, "")
      .replace(/font/g, "p");

    setData(content);
  };

  const handleSubmit = useCallback(() => {
    dispatch(
      LoginUser({
        channel: "mTeller",
        username: credentials.username,
        password: credentials.password,
      })
    );
    navigation.navigate("Onboarding");
  }, []);

  // useEffect(() => {
  //   if (state.error || state.status == "Error") {
  //   }

  //   if (state.status == true) {
  //     navigation.navigate("Onboarding");
  //   }
  // }, [state]);

  useEffect(() => {
    getDisclosure();
  }, []);

  const source = { html: `${data}` };

  const tagsStyles = {
    h3: {
      color: theme.colors.primary,
      fontSize: 20,
      padding: 0,
      margin: 0,
      paddingTop: config.hp("2%"),
    },
    h4: {
      padding: 0,
      margin: 0,
      paddingTop: config.hp("2%"),
    },
    li: {
      padding: 0,
      margin: 0,
      fontSize: 18,
      paddingVertical: 5,
      //alignItems: "center",
      flex: 1,
    },
    p: {
      fontSize: 16,
    },
    P: {
      fontSize: 16,
    },
    b: {
      // fontWeight: "bold",
    },
    ul: {
      fontSize: 22,
    },
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        paddingHorizontal: config.wp("2%"),
        paddingVertical: config.hp("2%"),
      }}
    >
      <Text style={registerStyles.title}>Disclosures</Text>

      {state.loading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
            height: "100%",
            paddingTop: 25,
          }}
        >
          <AnimatedLottieView
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
        <>
          <View style={{ flex: 1 }}>
            <RenderHtml
              contentWidth={width}
              source={source}
              tagsStyles={tagsStyles}
              ignoredDomTags={["center"]}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={() => setAgreed(!agreed)}
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                backgroundColor: agreed ? theme.colors.primary : "lightgray",
                marginRight: 10,
                borderWidth: 1,
                borderColor: "gray",
              }}
            ></TouchableOpacity>
            <Text style={{ fontSize: 16 }}>I Agree</Text>
          </View>
          <View style={registerStyles.buttonContainer}>
            <TouchableOpacity
              disabled={!agreed}
              style={
                !agreed
                  ? {
                      ...registerStyles.submitButton,
                      backgroundColor: theme.colors.faded,
                    }
                  : registerStyles.submitButton
              }
              onPress={() => {
                handleSubmit();
              }}
            >
              <Text style={registerStyles.submitButtonText}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleBack();
              }}
            >
              <Text style={{ fontSize: 16 }}>Back</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default Disclosures;

const styles = StyleSheet.create({
  textContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: config.hp("1.5%"),
  },
  textTitle: {
    fontSize: config.hp("2.25%"),
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  textSecondary: {
    fontWeight: "bold",
    lineHeight: config.hp("2.7%"),
    fontSize: config.hp("1.95%"),
  },

  disclosureContainer: {
    paddingVertical: config.hp("1.5%"),
  },
  disclosureContainer2: {
    paddingVertical: config.hp("5.5%"),
    paddingHorizontal: config.wp("1.5%"),
    backgroundColor: "red",
    height: "auto",
  },

  disclosure: {
    paddingVertical: config.hp(".5%"),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  disclosureContainerRight: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  radioButton: {
    width: "50%",
  },
  checkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: config.hp(".5%"),
    marginTop: config.hp("2.5%"),
    minHeight: config.hp("16%"),
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: config.hp(".5%"),
    paddingVertical: config.hp("1.35%"),
    width: "100%",
    elevation: config.hp(".5%"),
  },
  blackButton: {
    backgroundColor: "black",
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
  whitePadding: {
    height: config.hp("5%"),
    backgroundColor: "white",
  },
});
