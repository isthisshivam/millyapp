import ApiCalls from "../../../utils/ApiCalls";
import { handleError } from "../../../utils/utils";
const Global = require("../../../utils/env");

const Get_Reminders = "Get_Reminders";
const Add_Reminder = "Add_Reminder";
const Edit_Reminder = "Edit_Reminder";
const Delete_Reminder = "Delete_Reminder";
const API_Request_Completed = "API_Request_Completed";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const GetReminders = () => async (dispatch) => {
  try {
    let response = await ApiCalls.GetRequest(Global.GetReminders);
    if (response.status === 200) {
      dispatch({ type: Get_Reminders, payload: response.data });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};
export const NewReminder = (payload) => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(Global.AddReminder, payload);
    if (response.status == 200) {
      dispatch({
        type: Add_Reminder,
        payload: { ...payload, id: response.data },
      });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const UpdateReminder = (payload) => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(Global.UpdateReminder, payload);
    if (response.status == 200) {
      dispatch({ type: Edit_Reminder, payload: payload });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};
export const DeleteReminder = (payload) => async (dispatch) => {
  try {
    let data = {
      id: [payload],
      type: 2,
    };

    let response = await ApiCalls.PostRequest(Global.DeleteReminder, data);
    if (response.status == 200) {
      dispatch({ type: Delete_Reminder, payload: payload });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};
