import {
  CHECK_IMAGE_ATTEMPT,
  CHECK_IMAGE_FAIL,
  CHECK_IMAGE1_SUCCESS,
  CHECK_IMAGE2_SUCCESS,
  CHECK_IMAGE1_CLEAR,
  CHECK_IMAGE2_CLEAR,
} from "../constants/CheckImagesConstants";

const initialState = {
  loading: false,
  check1: undefined,
  check2: undefined,
  error: "null",
};

const CheckImagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_IMAGE_ATTEMPT:
      return {
        ...state,
        loading: true,
      };
    case CHECK_IMAGE1_SUCCESS:
      return {
        ...state,
        loading: false,
        check1: action.payload,
      };
    case CHECK_IMAGE1_CLEAR:
      return {
        ...state,
        loading: false,
        check1: null,
      };
    case CHECK_IMAGE2_CLEAR:
      return {
        ...state,
        loading: false,
        check2: null,
      };
    case CHECK_IMAGE2_SUCCESS:
      return {
        ...state,
        loading: false,
        check2: action.payload,
      };
    case CHECK_IMAGE_FAIL:
      return {
        ...initialState,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default CheckImagesReducer;
