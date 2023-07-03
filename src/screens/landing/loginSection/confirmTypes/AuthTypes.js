import React, { useState } from "react";
import { TextInput, View, TouchableOpacity, Text } from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";

import { styles } from "./style";
import Type from "./Type";

axios.defaults.withCredentials = true;

const AuthTypes = () => {
  const user = useSelector((state) => state.user);

  console.log(user);
  const [payload, setPayload] = useState({ type: "Email" });
  const [placeHolderMessage, setPlaceHolderMessage] = useState(
    "Confirm Your Email Address"
  );
  const { message } = user;

  const data = [
    { type: "Phone", text: "408-36*-****" },
    { type: "Email", text: "ap**********nt@worldwideinteractiveservices.com" },
    { type: "Text", text: "-36*-****" },
  ];

  const handleChange = (value) => {
    setPayload({ type: value });
    if (value === "Email") {
      setPlaceHolderMessage("Confirm Your Email Address");
    }
    if (value === "Phone") {
      setPlaceHolderMessage("Confirm Your Phone Number to receive a call");
    }
    if (value === "Text") {
      setPlaceHolderMessage("Confirm Your Phone Number to recieve a text");
    }
  };
  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json; charset=utf-8",
        },
        xhrFields: { withCredentials: true },
      };
      const response = await axios.post(
        "https://testenv.w-w-i-s.com/iTeller21/UserAccount/SendCode/?entity=AHHRV",
        {
          channel: "iTeller",
          selectedprovider: "-1768017817",
          address: "appdevelopment@worldwideinteractiveservices.com",
        },
        config
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {data.map((type, index) => {
        return (
          <Type
            {...type}
            key={index}
            handleChange={handleChange}
            payload={payload}
          />
        );
      })}
      <View style={styles.textContainer}>
        <TextInput style={styles.input} placeholder={placeHolderMessage} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          // disabled={!formOneIsFilled}
          activeOpacity={0.85}
          style={styles.button}
        >
          <Text style={styles.buttonText} onPress={handleSubmit}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthTypes;
