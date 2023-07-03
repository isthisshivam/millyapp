import {
  CHECK_IMAGE_ATTEMPT,
  CHECK_IMAGE_FAIL,
  CHECK_IMAGE1_SUCCESS,
  CHECK_IMAGE2_SUCCESS,
  CHECK_IMAGE1_CLEAR,
  CHECK_IMAGE2_CLEAR,
} from "../constants/CheckImagesConstants";

export const handleCheckImage1 = (image) => async (dispatch) => {
  try {
    //Processing
    dispatch({ type: CHECK_IMAGE_ATTEMPT });
    dispatch({ type: CHECK_IMAGE1_SUCCESS, payload: image });
  } catch (error) {
    dispatch({
      type: CHECK_IMAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const handleCheckImage2 = (image) => async (dispatch) => {
  try {
    //Processing
    dispatch({ type: CHECK_IMAGE_ATTEMPT });
    dispatch({ type: CHECK_IMAGE2_SUCCESS, payload: image });
  } catch (error) {
    dispatch({
      type: CHECK_IMAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearCheckImage1 = () => async (dispatch) => {
  try {
    dispatch({ type: CHECK_IMAGE_ATTEMPT });
    dispatch({ type: CHECK_IMAGE1_CLEAR });
  } catch (error) {
    dispatch({
      type: CHECK_IMAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const clearCheckImage2 = () => async (dispatch) => {
  try {
    dispatch({ type: CHECK_IMAGE_ATTEMPT });
    dispatch({ type: CHECK_IMAGE2_CLEAR });
  } catch (error) {
    dispatch({
      type: CHECK_IMAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
