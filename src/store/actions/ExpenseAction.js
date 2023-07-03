import ApiCalls from "../../../utils/ApiCalls";
import { handleError } from "../../../utils/utils";
const Global = require("../../../utils/env");

const Get_Expenses = "Get_Expenses";
const New_Expense = "New_Expense";
const Update_Expense = "Update_Expense";
const Delete_Expense = "Delete_Expense";
const API_Request_Sent = "API_Request_Sent";
const API_Request_Completed = "API_Request_Completed";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const GetExpenses = () => async (dispatch) => {
  try {
    let response = await ApiCalls.GetRequest(Global.GetExpenses);
    if (response.status == 200) {
      dispatch({ type: Get_Expenses, payload: response.data });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const NewExpense = (payload) => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(Global.AddExpense, payload);
    if (response.status == 200) {
      dispatch({
        type: New_Expense,
        payload: { ...payload, id: response.data },
      });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const UpdateExpense = (payload) => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(Global.UpdateExpense, payload);
    if (response.status == 200) {
      dispatch({ type: Update_Expense, payload: payload });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const DeleteExpense = (payload) => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(Global.DeleteExpense, payload);
    if (response.status == 200) {
      dispatch({ type: Delete_Expense, payload: payload });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};
