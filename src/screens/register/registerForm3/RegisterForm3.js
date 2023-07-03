import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import RenderHtml from "react-native-render-html";
import axios from "axios";
import { theme } from "../../../config/Theme";
import { config } from "../../../config/Config";
import { styles } from "./style";

const RegisterForm3 = ({ handleNext, handleBack, handleChange, user }) => {
  const [state, setState] = useState(null);
  const { width } = useWindowDimensions();
  const [agreed, setAgreed] = useState(false);

  const getDisclosure = async () => {
    let response = await axios.get(
      "https://testenv.w-w-i-s.com/iteller21/api/client/AHHRV/uimessages/IB40/EN/newuser2/disclosure"
    );

    let data = await response.data[0];
    data = data
      .replace(/<P>/, "")
      .replace(/<p>/, "")
      .replace(/<center>/g, "")
      .replace(/<\/center>/g, "")
      .replace(/<ul>/, "")
      .replace(/<\/ul>/, "")
      .replace(/font/g, "p");

    setState(data);
  };
  useEffect(() => {
    getDisclosure();
  }, []);

  const source = { html: `${state}` };

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
      alignItems: "center",
      flex: 1,
    },
    p: {
      fontSize: 16,
    },
    P: {
      fontSize: 16,
    },
    b: {
      fontWeight: "bold",
    },
    ul: {
      fontSize: 22,
      alignItems: "center",
    },
  };

  return (
    <>
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>Disclosures</Text>
      </View>

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
        <Text style={styles.switchText}>I Agree</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          // disabled={!formOneIsFilled}
          activeOpacity={0.85}
          style={styles.button}
          onPress={() => {
            handleNext();
          }}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          // disabled={!formOneIsFilled}
          activeOpacity={0.85}
          style={{
            backgroundColor: "black",
            borderRadius: config.hp(".5%"),
            paddingVertical: config.hp("1.35%"),
            width: "100%",
            elevation: config.hp(".5%"),
            marginTop: config.hp("1%"),
          }}
          onPress={() => {
            handleBack();
          }}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.whitePadding} />
    </>
  );
};

export default RegisterForm3;
