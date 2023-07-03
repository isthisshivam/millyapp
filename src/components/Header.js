import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { config } from "../config/Config";
import { setStatusBarStyle, StatusBar } from "expo-status-bar";

//const logoUri = require("../../assets/NewHeader1.png");
//const logoUri = require("../../assets/swab.png");
const logoUri = require("../../assets/Logo.png");
//const logoUri = require("../../assets/worldwide.png");
const unionLogo = require("../../assets/unionLogo.jpg");
//import logo from "../../assets/spco.jpg";

const Header = () => {
  setStatusBarStyle("dark");
  return (
    <Image
      style={{
        height: 40,
        width: 120,
      }}
      source={logoUri}
      //resizeMethod="auto"
      resizeMode="contain"
    />
  );
};

export default Header;
