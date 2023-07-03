const USER_LOGIN_ATTEMPT = "USER_LOGIN_ATTEMPT";
const USER_LOGIN_SUCCESS1 = "USER_LOGIN_SUCCESS1";
const USER_LOGIN_SUCCESS2 = "USER_LOGIN_SUCCESS2";
const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";
const CLEAR_LOGIN_STATE = "CLEAR_LOGIN_STATE";

const CHECK_USERNAME_SUCCESS = "CHECK_USERNAME_SUCCESS";
const CHECK_ANSWER_SUCCESS = "CHECK_ANSWER_SUCCESS";
const UPDATE_PASSWORD_SUCCESS = "UPDATE_PASSWORD_SUCCESS";
const UPDATE_PASSWORD_FAIL = "UPDATE_PASSWORD_FAIL";

const REMEMBER_DEVICE = "REMEMBER_DEVICE";
const GET_PASSWORD_QUESTIONS = "GET_PASSWORD_QUESTIONS";
const SET_PASSWORD_QUESTIONS = "SET_PASSWORD_QUESTIONS";
const FORGET_DEVICE = "FORGET_DEVICE";
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

//SET INITIAL STATE
const initialState = {
  loading: false,
  message: null,
  error: null,
  success: false,
  status: false,
  attempts: undefined,
  usernameSuccess: undefined,
  questionsSuccess: undefined,
  rememberDevice: false,
  questions: [],
  passwordQuestion: undefined,
  userId: undefined,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    //////////////////////////////LOGIN REDUCERS//////////////////////////////////////////////////
    case USER_LOGIN_ATTEMPT:
      return {
        ...state,
        message: null,
        loading: true,
        success: false,
      };

    case CLEAR_LOGIN_STATE:
      return {
        ...state,
        loading: false,
        message: null,
        error: null,
        success: false,
        status: false,
        attempts: undefined,
        usernameSuccess: undefined,
        questionsSuccess: undefined,
      };
    case USER_LOGIN_SUCCESS1:
      return {
        ...state,
        loading: false,
        userId: action.userId,
        success: true,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        message: action.payload.error,
        success: false,
        status: action.payload.status,
      };

    ///////////////////////////////Update Password///////////////////////////////////////////
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        status: true,
      };
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        success: false,
        status: "Error",
      };
    ////////////////////////////////////////////////////////////////////////////////////////////////
    case CHECK_USERNAME_SUCCESS:
      return {
        ...state,
        usernameSuccess: true,
      };

    case CHECK_ANSWER_SUCCESS:
      return {
        ...state,
        questionsSuccess: true,
      };

    case REMEMBER_DEVICE:
      return {
        ...state,
        status: action.payload.status,
        rememberDevice: true,
      };

    case FORGET_DEVICE:
      return {
        ...state,
        status: action.payload.status,
        rememberDevice: false,
      };
    case GET_PASSWORD_QUESTIONS:
      if (action.payload.error) {
        return {
          ...state,
          status: "Error",
          error: action.payload.error,
          message: "Were sorry, we ran into a problem. please try again",
        };
      }
      return {
        ...state,
        //status: action.payload.status,
        questions: action.payload.data,
      };
    case SET_PASSWORD_QUESTIONS:
      if (action.payload.error) {
        return {
          ...state,
          status: "Error",
          error: action.payload.error,
          message: "Were sorry, we ran into a problem. please try again",
        };
      }
      return {
        ...state,
        //status: action.payload.status,
        passwordQuestion: action.payload.data,
      };

    case LOGOUT_SUCCESS:
      if (action.payload.error) {
        return {
          ...state,
          status: "Error",
          message: "Something went wrong please try again",
        };
      }
      return {
        loading: false,
        message: null,
        error: null,
        success: false,
        status: false,
        attempts: undefined,
        usernameSuccess: undefined,
        questionsSuccess: undefined,
        rememberDevice: false,
        questions: [],
        passwordQuestion: undefined,
        userId: undefined,
      };

    default:
      return state;
  }
};
