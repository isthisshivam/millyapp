import ApiCalls from "../../../utils/ApiCalls";
import { handleError } from "../../../utils/utils";
const Global = require("../../../utils/env");

const Get_Subscriptions = "Get_Subscriptions";
const New_Subscription = "New_Subscription";
const Update_Subscription = "Update_Subscription";
const Delete_Subscription = "Delete_Subscription";
const API_Request_Completed = "API_Request_Completed";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const GetSubscriptions = () => async (dispatch) => {
  try {
    let response = await ApiCalls.GetRequest(Global.GetSubscriptions);
    if (response.status == 200 || response.status == 204) {
      dispatch({ type: Get_Subscriptions, payload: response.data });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const NewSubscription = (payload) => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(Global.AddSubscription, payload);

    if (response.status == 200) {
      dispatch({
        type: New_Subscription,
        payload: { ...payload, id: response.data },
      });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};
export const UpdateSubscription = (payload) => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(
      Global.UpdateSubscription,
      payload
    );
    if (response.status == 200) {
      dispatch({ type: Update_Subscription, payload: payload });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const DeleteSubscription = (payload) => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(
      Global.DeleteSubscription,
      payload
    );
    if (response.status == 200) {
      dispatch({ type: Delete_Subscription, payload: payload.id[0] }); //payload is an id
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};
