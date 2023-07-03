import ApiCalls from "../../../utils/ApiCalls";
const Global = require("../../../utils/env");

const GET_HOUSE = "GET_HOUSE";
const CREATE_HOUSE = "CREATE_HOUSE";
const UPDATE_HOUSE = "UPDATE_HOUSE";
const DELETE_HOUSE_MEMBERS = "DELETE_HOUSE_MEMBERS";
const CLEAR_HOUSE_STATUS = "CLEAR_HOUSE_STATUS";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const GetHousehold = () => async (dispatch) => {
  try {
    let response = await ApiCalls.GetRequest(Global.GetHousehold);
    if (response.status == 200) {
      dispatch({
        type: GET_HOUSE,
        payload: { data: response.data, status: true },
      });
      wait(50).then(() => dispatch({ type: CLEAR_HOUSE_STATUS }));
    }
  } catch (error) {
    dispatch({ type: GET_HOUSE, payload: { error: error, status: "Error" } });
    wait(50).then(() => dispatch({ type: CLEAR_HOUSE_STATUS }));
  }
};
export const CreateHousehold = (payload) => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(Global.CreateHousehold, payload);
    if (response.status == 200) {
      dispatch({
        type: CREATE_HOUSE,
        payload: { data: payload, status: true },
      });
      wait(50).then(() => dispatch({ type: CLEAR_HOUSE_STATUS }));
    }
  } catch (error) {
    dispatch({
      type: CREATE_HOUSE,
      payload: { error: error, status: "Error" },
    });
    wait(50).then(() => dispatch({ type: CLEAR_HOUSE_STATUS }));
  }
};
export const UpdateHousehold = (payload) => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(Global.UpdateHousehold, payload);
    if (response.status == 200) {
      dispatch({
        type: UPDATE_HOUSE,
        payload: { data: payload, status: true },
      });
      wait(50).then(() => dispatch({ type: CLEAR_HOUSE_STATUS }));
    }
  } catch (error) {
    dispatch({
      type: UPDATE_HOUSE,
      payload: { error: error, status: "Error" },
    });
    wait(50).then(() => dispatch({ type: CLEAR_HOUSE_STATUS }));
  }
};
export const DeleteHousehold = (payload) => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(Global.DeleteHousehold, payload);
    if (response.status == 200) {
      dispatch({
        type: DELETE_HOUSE_MEMBERS,
        payload: { id: payload.id[0], status: true },
      });
      wait(50).then(() => dispatch({ type: CLEAR_HOUSE_STATUS }));
    }
  } catch (error) {
    dispatch({
      type: DELETE_HOUSE_MEMBERS,
      payload: { error: error, status: "Error" },
    });
    wait(50).then(() => dispatch({ type: CLEAR_HOUSE_STATUS }));
  }
};
