import ApiCalls from "../../../utils/ApiCalls";
import { handleError } from "../../../utils/utils";
const Global = require("../../../utils/env");

const New_Merchant = "New_Merchant";
const Edit_Merchant = "Edit_Merchant";
const Delete_Merchant = "Delete_Merchant";
const Get_Merchants = "Get_Merchants";
const API_Request_Sent = "API_Request_Sent";
const API_Request_Completed = "API_Request_Completed";
const API_Request_Error = "API_Request_Error";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const NewMerchant = (payload) => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(Global.Merchants, payload);
    if (response.status == 200) {
      dispatch({
        type: New_Merchant,
        payload: { data: payload, status: true },
      });
      wait(50).then(() =>
        dispatch({
          type: API_Request_Completed,
        })
      );
    }
  } catch (error) {
    dispatch({
      type: New_Merchant,
      payload: { error: error, status: "Error" },
    });
    wait(50).then(() =>
      dispatch({
        type: API_Request_Completed,
      })
    );
  }
};
export const Update_Merchant = (payload) => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(Global.Merchants, payload);

    if (response.status == 200) {
      dispatch({ type: Edit_Merchant, payload: payload });
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
export const DeleteMerchant = (payload) => async (dispatch) => {
  //merchant not merchant name until changes are pushed
  try {
    let response = await ApiCalls.PostRequest(Global.DeleteMerchant, payload);
    if (response.status == 200) {
      dispatch({ type: Delete_Merchant, payload: payload });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};

//Get All Merchants for user//
export const GetMerchants = () => async (dispatch) => {
  try {
    let response = await ApiCalls.GetRequest(Global.Merchants);
    if (response.status === 200) {
      dispatch({
        type: Get_Merchants,
        payload: response.data.allMerchantInfo,
      });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};
