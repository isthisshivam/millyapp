import ApiCalls from "../../../utils/ApiCalls";
import { handleError } from "../../../utils/utils";
const Global = require("../../../utils/env");

const New_Vehicle = "New_Vehicle";
const Update_Vehicle = "Update_Vehicle";
const Delete_Vehicle = "Delete_Vehicle";
const Get_Vehicles = "Get_Vehicles";
const API_Request_Completed = "API_Request_Completed";
const API_Request_Sent = "API_Request_Sent";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const GetVehicles = () => async (dispatch) => {
  function SendRequest() {
    dispatch({ type: API_Request_Sent });
  }
  SendRequest();
  try {
    let response = await ApiCalls.GetRequest(Global.GetVehicles);
    if (response.status == 200) {
      dispatch({ type: Get_Vehicles, payload: response.data });
      wait(50).then(() =>
        dispatch({
          type: API_Request_Completed,
        })
      );
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const NewVehicle = (payload) => async (dispatch) => {
  function SendRequest() {
    dispatch({ type: API_Request_Sent });
  }
  SendRequest();
  try {
    let response = await ApiCalls.PostRequest(Global.NewVehicle, payload);
    if (response.status == 200 || 204) {
      dispatch({
        type: New_Vehicle,
        payload: { data: payload, id: response.data },
      });
      wait(50).then(() =>
        dispatch({
          type: API_Request_Completed,
        })
      );
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};
export const UpdateVehicle = (payload) => async (dispatch) => {
  function SendRequest() {
    dispatch({ type: API_Request_Sent });
  }
  SendRequest();
  try {
    let response = await ApiCalls.PostRequest(Global.UpdateVehicle, payload);
    if (response.status == 200) {
      dispatch({ type: Update_Vehicle, payload: payload });
      wait(100).then(() =>
        dispatch({
          type: API_Request_Completed,
        })
      );
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};
export const DeleteVehicle = (payload) => async (dispatch) => {
  function SendRequest() {
    dispatch({ type: API_Request_Sent });
  }
  SendRequest();
  try {
    let response = await ApiCalls.PostRequest(Global.DeleteVehicle, payload);
    if (response.status == 200) {
      dispatch({ type: Delete_Vehicle, payload: payload.id[0] });
      wait(100).then(() => {
        dispatch({
          type: API_Request_Completed,
        });
      });
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};
