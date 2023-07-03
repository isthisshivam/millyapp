import ApiCalls from "../../../utils/ApiCalls";
const Global = require("../../../utils/env");

const GET_ALERTS = "GET_ALERTS";
const CREATE_ALERT = "CREATE_ALERT";
const UPDATE_ALERT = "UPDATE_ALERT";
const DELETE_ALERT = "DELETE_ALERT";
const CLEAR_ALERT_STATUS = "CLEAR_ALERT_STATUS";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const GetAlerts = () => async (dispatch) => {
  try {
    let response = await ApiCalls.GetRequest(Global.GetAlerts);
    if (response.status == 200) {
      dispatch({
        type: GET_ALERTS,
        payload: { data: response.data, status: true },
      });
      wait(50).then(() => dispatch({ type: CLEAR_ALERT_STATUS }));
    }
  } catch (error) {
    dispatch({ type: GET_ALERTS, payload: { error: error, status: "Error" } });
    wait(50).then(() => dispatch({ type: CLEAR_ALERT_STATUS }));
  }
};
export const CreateAlert = (payload) => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(Global.CreateAlert, payload);
    if (response.status == 200) {
      dispatch({
        type: CREATE_ALERT,
        payload: { data: payload, status: true },
      });
      wait(50).then(() => dispatch({ type: CLEAR_ALERT_STATUS }));
    }
  } catch (error) {
    dispatch({
      type: CREATE_ALERT,
      payload: { error: error, status: "Error" },
    });
    wait(50).then(() => dispatch({ type: CLEAR_ALERT_STATUS }));
  }
};

export const EditAlert = (payload) => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(Global.UpateAlert, payload);
    if (response.status == 200) {
      dispatch({
        type: UPDATE_ALERT,
        payload: { data: payload, status: true },
      });
      wait(50).then(() => dispatch({ type: CLEAR_ALERT_STATUS }));
    }
  } catch (error) {
    dispatch({
      type: UPDATE_ALERT,
      payload: { error: error, status: "Error" },
    });
    wait(50).then(() => dispatch({ type: CLEAR_ALERT_STATUS }));
  }
};
export const DeleteAlert = (payload) => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(Global.DeleteAlert, payload);
    if (response.status == 200) {
      dispatch({
        type: DELETE_ALERT,
        payload: { data: payload, status: true },
      });
      wait(50).then(() => dispatch({ type: CLEAR_ALERT_STATUS }));
    }
  } catch (error) {
    dispatch({
      type: DELETE_ALERT,
      payload: { error: error, status: "Error" },
    });
    wait(50).then(() => dispatch({ type: CLEAR_ALERT_STATUS }));
  }
};
