import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  USER_LOGIN_ATTEMPT,
  USER_LOGIN_SUCCESS1,
  USER_LOGIN_FAIL,
  CLEAR_LOGIN_STATE,
} from "../authConstants";

import ApiCalls from "../../../utils/ApiCalls";
import { useNavigation } from "@react-navigation/native";
const Global = require("../../../utils/env");

const CHECK_USERNAME_SUCCESS = "CHECK_USERNAME_SUCCESS";
const CHECK_ANSWER_SUCCESS = "CHECK_ANSWER_SUCCESS";
const UPDATE_PASSWORD_FAILED = "UPDATE_PASSWORD_FAILED";
const UPDATE_PASSWORD_SUCCESS = "UPDATE_PASSWORD_SUCCESS";
const REMEMBER_DEVICE = "REMEMBER_DEVICE";
const GET_PASSWORD_QUESTIONS = "GET_PASSWORD_QUESTIONS";

const SET_PASSWORD_QUESTIONS = "SET_PASSWORD_QUESTIONS";
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

axios.defaults.withCredentials = true;
//const navigate = useNavigation();

/////////////////////////////////LOGIN ACTIONs///////////////////////////////////////////////
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export const userLoginMain = (payload) => async (dispatch) => {
  const { userId, password } = payload;

  try {
    const requestData = {
      channel: "mTeller",
      username: "Demos1234",
      password: "Demos1234",
    };
    // const requestData = {
    //   channel: "mTeller",
    //   username: userId,
    //   password: password,
    // };

    let response = await ApiCalls.PostRequest(Global.LoginLink, requestData);

    if (response.status == 200) {
      //await AsyncStorage.setItem("cookie", response.headers["set-cookie"][0]);
      dispatch({
        type: USER_LOGIN_SUCCESS1,
        payload: true,
        userId: requestData.username,
      });
      await AsyncStorage.setItem("cookie", response.headers["set-cookie"][0]);
      wait(50).then(() =>
        dispatch({
          type: CLEAR_LOGIN_STATE,
        })
      );
    }
  } catch (error) {
    //console.log(error);
    //Too many login attempts, account is blocked
    if (error.response?.data?.errorCode == 102) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: {
          error:
            "Too many incorrect login attempts, your account has been restricted. Please contact us to unlock your account",
          status: 102,
        },
      });
      wait(50).then(() =>
        dispatch({
          type: CLEAR_LOGIN_STATE,
        })
      );
      return;
    }

    switch (error?.response?.status) {
      case 400: //login failed something went wrong
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: {
            error: "Sorry but our servers maybe down, please try again later",
            status: error?.response?.status,
          },
        });
        wait(50).then(() =>
          dispatch({
            type: CLEAR_LOGIN_STATE,
          })
        );
        return;
      case 401: //Password incorrect
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: {
            error: "Username or Password incorrect. Please try again",
            status: 401,
          },
        });
        wait(50).then(() =>
          dispatch({
            type: CLEAR_LOGIN_STATE,
          })
        );
        return;
      case 404: //Username not found
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: {
            error:
              "Username did not match any account. If you do not have an account please create a new one ",
            status: 404,
          },
        });
        wait(50).then(() =>
          dispatch({
            type: CLEAR_LOGIN_STATE,
          })
        );
        return;
      case 500: //server error
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: {
            error:
              "Something went wrong, our systems maybe down, try again later",
            status: 404,
          },
        });
        wait(50).then(() =>
          dispatch({
            type: CLEAR_LOGIN_STATE,
          })
        );
        return;

      default:
        dispatch({
          type: USER_LOGIN_FAIL,
          payload:
            error?.response && error?.response?.data?.message
              ? error?.response?.data?.message
              : error?.message,
        });
        wait(50).then(() =>
          dispatch({
            type: CLEAR_LOGIN_STATE,
          })
        );
        return;
    }
  }
};

export const TokenLogin = (payload) => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(Global.LoginLink, payload);

    if (response.status == 200) {
      dispatch({ type: USER_LOGIN_SUCCESS1, payload: true });
      await AsyncStorage.setItem("cookie", response.headers["set-cookie"][0]);
      wait(50).then(() =>
        dispatch({
          type: CLEAR_LOGIN_STATE,
        })
      );
    }
  } catch (error) {
    if (error.response?.data?.errorCode == 102) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: {
          error:
            "Too many incorrect login attempts, your account has been restricted. Please contact us to unlock your account",
          status: 102,
        },
      });
      wait(50).then(() =>
        dispatch({
          type: CLEAR_LOGIN_STATE,
        })
      );
      return;
    }

    switch (error?.response?.status) {
      case 400: //login failed something went wrong
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: {
            error: "Sorry but our servers maybe down, please try again later",
            status: error?.response?.status,
          },
        });
        wait(50).then(() =>
          dispatch({
            type: CLEAR_LOGIN_STATE,
          })
        );
        return;
      case 401: //Password incorrect
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: {
            error: "Username or Password incorrect. Please try again",
            status: 401,
          },
        });
        wait(50).then(() =>
          dispatch({
            type: CLEAR_LOGIN_STATE,
          })
        );
        return;
      case 404: //Username not found
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: {
            error:
              "Username did not match any account. If you do not have an account please create a new one ",
            status: 404,
          },
        });
        wait(50).then(() =>
          dispatch({
            type: CLEAR_LOGIN_STATE,
          })
        );
        return;
      case 500: //server error
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: {
            error:
              "Something went wrong, our systems maybe down, try again later",
            status: 404,
          },
        });
        wait(50).then(() =>
          dispatch({
            type: CLEAR_LOGIN_STATE,
          })
        );
        return;

      default:
        dispatch({
          type: USER_LOGIN_FAIL,
          payload:
            error?.response && error?.response?.data?.message
              ? error?.response?.data?.message
              : error?.message,
        });
        wait(50).then(() =>
          dispatch({
            type: CLEAR_LOGIN_STATE,
          })
        );
        return;
    }
  }
};
///////////////////////////////////Update PASSWORD ///////////////////////////////////////////////////////////////
export const updatePassword = (payload) => async (dispatch) => {
  const { oldPassword, newPassword, confirmPassword } = payload;

  try {
    const requestData = {
      channel: "mTeller",
      oldPwd: oldPassword,
      newPwd: newPassword,
    };

    let response = await ApiCalls.PostRequest(
      Global.UpdatePassword,
      requestData
    );

    if (response.status == 200) {
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: true });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
///////REMEMBER DEVICE/////////////////////
// export const RememberDevice = (payload) => async (dispatch) => {
//   try {
//     let response = await ApiCalls.PostRequest(Global.RememberDevice, payload);
//     if (response.status == 200) {
//       await AsyncStorage.setItem("rememberToken", response.data[0]);
//       await AsyncStorage.setItem("refreshToken", response.data[1]);
//       dispatch({
//         type: REMEMBER_DEVICE,
//         payload: { data: response.data, status: true },
//       });
//       wait(50).then(() => dispatch({ type: CLEAR_LOGIN_STATE }));
//     }
//   } catch (error) {
//     dispatch({
//       type: REMEMBER_DEVICE,
//       payload: { data: error, status: "Error" },
//     });
//     wait(50).then(() => dispatch({ type: CLEAR_LOGIN_STATE }));
//   }
// };
// export const ForgetDevice = (payload) => async (dispatch) => {
//   try {
//     let response = await ApiCalls.PostRequest(Global.RememberDevice, payload);
//     if (response.status == 200) {
//       await AsyncStorage.removeItem("rememberToken");
//       await AsyncStorage.removeItem("refreshToken");
//       dispatch({
//         type: REMEMBER_DEVICE,
//         payload: { data: response.data, status: true },
//       });
//       wait(50).then(() => dispatch({ type: CLEAR_LOGIN_STATE }));
//     }
//   } catch (error) {
//     dispatch({
//       type: REMEMBER_DEVICE,
//       payload: { data: error, status: "Error" },
//     });
//     wait(50).then(() => dispatch({ type: CLEAR_LOGIN_STATE }));
//   }
// };

///////////////////////////////////FORGOT PASSWORD ///////////////////////////////////////////////////////////////
export const checkUsername = (payload) => async (dispatch) => {
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  try {
    //Send request to API
    // let response = await axios.post("backend/api/route", payload, {
    //   headers: { "Content-type": "application/json; charset=utf-8" },
    // });
    dispatch({ type: CHECK_USERNAME_SUCCESS, payload: true });

    // if (response.status == 200) {
    //   dispatch({ type: "Call success Reducer" });
    // } else if (response.status == 401) {
    //   dispatch({ type: "Call failed reducer" });
    // } else {
    //   dispatch({ type: "Call failed reducer" });
    // }
  } catch (error) {
    console.log(error);
  }
};
export const checkAnswer = (payload) => async (dispatch) => {
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  try {
    //Send request to API
    // let response = await axios.post("backend/api/route", payload, {
    //   headers: { "Content-type": "application/json; charset=utf-8" },
    // });
    dispatch({ type: CHECK_ANSWER_SUCCESS, payload: true });

    // if (response.status == 200) {
    //   dispatch({ type: "Call success Reducer" });
    // } else if (response.status == 401) {
    //   dispatch({ type: "Call failed reducer" });
    // } else {
    //   dispatch({ type: "Call failed reducer" });
    // }
  } catch (error) {
    console.log(error);
  }
};

export const forgotPassword = (payload) => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_LOGIN_STATE });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////
export const clearState = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_LOGIN_STATE });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

///////////////////////////////////
export const GetPasswordQuestions = () => async (dispatch) => {
  try {
    let response = await ApiCalls.GetRequest(Global.GetPassowordQuestions);
    if (response.status == 200) {
      dispatch({
        type: GET_PASSWORD_QUESTIONS,
        payload: { data: response.data, status: true },
      });
      wait(50).then(() => dispatch({ type: CLEAR_LOGIN_STATE }));
    }
  } catch (error) {
    dispatch({
      type: GET_PASSWORD_QUESTIONS,
      payload: { data: error, status: "Error" },
    });
    wait(50).then(() => dispatch({ type: CLEAR_LOGIN_STATE }));
  }
};
export const SetPasswordQuestions = (payload) => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(
      Global.SetPasswordQuestion,
      payload
    );

    if (response.status == 200) {
      dispatch({
        type: SET_PASSWORD_QUESTIONS,
        payload: { data: payload, status: true },
      });
      wait(50).then(() => dispatch({ type: CLEAR_LOGIN_STATE }));
    }
  } catch (error) {
    dispatch({
      type: SET_PASSWORD_QUESTIONS,
      payload: { data: error, status: "Error" },
    });
    wait(50).then(() => dispatch({ type: CLEAR_LOGIN_STATE }));
  }
};

export const Logout = (payload) => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(Global.Logout, payload);
    if (response.status == 200) {
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: { status: true },
      });
      // navigate("Login");
      wait(50).then(() => dispatch({ type: CLEAR_LOGIN_STATE }));
    }
  } catch (error) {
    dispatch({
      type: LOGOUT_SUCCESS,
      payload: { data: error, status: "Error" },
    });
    wait(50).then(() => dispatch({ type: CLEAR_LOGIN_STATE }));
  }
};
