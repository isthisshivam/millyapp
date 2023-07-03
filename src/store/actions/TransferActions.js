import ApiCalls from "../../../utils/ApiCalls";
import { handleError } from "../../../utils/utils";

const Global = require("../../../utils/env");
const Submit_Transfer = "Submit_Transfer";
const Update_From_Order = "Update_From_Order";
const Update_To_Order = "Update_From_Order";
const Get_From_Order = "Get_From_Order";
const Get_To_Order = "Get_To_Order";
const API_Request_Sent = "API_Request_Sent";
const API_Request_Completed = "API_Request_Completed";
const API_Request_Error = "API_Request_Error";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const SendTransfer = (payload) => async (dispatch) => {
  try {
    const response = await ApiCalls.PostRequest(Global.Transfer, payload);

    if (response.status == 200) {
      dispatch({
        type: Submit_Transfer,
        payload: payload,
      });

      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};
export const GetFromOrder = () => async (dispatch) => {
  try {
    let response = await ApiCalls.GetRequest(Global.GetTransferOrderFrom);

    if (response.status == 200) {
      dispatch({ type: Get_From_Order, payload: response.data });
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
export const UpdateFromOrder = (payload) => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(
      Global.UpdateTransferOrderFrom,
      payload
    );

    if (response.status == 200) {
      dispatch({ type: Update_From_Order, payload: payload });
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
export const GetToOrder = () => async (dispatch) => {
  try {
    let response = await ApiCalls.GetRequest(Global.GetTransferOrderTo);

    if (response.status == 200) {
      dispatch({ type: Get_To_Order, payload: response.data });
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
export const UpdateToOrder = (payload) => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(
      Global.UpdateTransferOrderTo,
      payload
    );

    if (response.status == 200) {
      dispatch({ type: Update_To_Order, payload: payload });
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
