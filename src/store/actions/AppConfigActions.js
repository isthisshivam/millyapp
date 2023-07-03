import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Get_Config = "Get_Config";
const Get_BitPanel = "Get_BitPanel";

export const GetImages = () => async (dispatch) => {
  try {
    //Get accounts from api
    const { data } = await axios.get(
      "https://testenv.w-w-i-s.com/iTeller21/api/client/AHHRV/BannerImages",
      {
        headers: {
          "Content-type": "application/json; charset=utf-8",
        },
        withCredentials: true,
      }
    );
    const mobileAppData = data.filter(
      (item) => item.type == 3 || item.type == 4
    );
    //Send data to reducer to add to state
    dispatch({ type: Get_Config, payload: mobileAppData });
  } catch (error) {
    console.log(error);
  }
};
export const GetBitPanel = () => async (dispatch) => {
  try {
    //Get accounts from api
    const { data } = await axios.get(
      "https://testenv.w-w-i-s.com/iTeller21/api/client/AHHRV",
      {
        headers: {
          "Content-type": "application/json; charset=utf-8",
        },
        withCredentials: true,
      }
    );

    dispatch({ type: Get_BitPanel, payload: data });
  } catch (error) {
    console.log(error);
  }
};
