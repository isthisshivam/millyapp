import axios from "axios";
import {
  CLIENT_SETTINGS_ATTEMPT,
  CLIENT_SETTINGS_FAIL,
  CLIENT_SETTINGS_SUCCESS,
  CLEAR_CLIENT_STATE,
} from "../constants/clientConstants";
const SET_CLIENT_INFO = "SET_CLIENT_INFO";

// axios.defaults.withCredentials = true;
export const getClientPayLoad = () => async (dispatch) => {
  try {
    await dispatch({ type: CLIENT_SETTINGS_ATTEMPT });

    const { data } = await axios.get(
      "https://testenv.w-w-i-s.com/iteller21/api/client/AHHRV"
    );

    await dispatch({ type: CLIENT_SETTINGS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CLIENT_SETTINGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getClientInfo = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://testenv.w-w-i-s.com/iteller21/api/client/AHHRV/UIMessages/MB51/EN/Info/AddressInfo"
    );

    await dispatch({ type: SET_CLIENT_INFO, payload: response.data[0] });
  } catch (error) {
    console.log(error);
  }
};
