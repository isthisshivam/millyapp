import { Dimensions } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
const { width, height } = Dimensions.get("screen");

export const config = {
  deviceWidth: width,
  deviceHeight: height,
  hp: hp,
  wp: wp,
};
