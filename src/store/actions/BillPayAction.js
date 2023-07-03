import ApiCalls from "../../../utils/ApiCalls";
const Global = require("../../../utils/env");

const Get_BillPay_History = "Get_BillPay_History";
const Get_BillPay_Accounts = "Get_BillPay_Accounts";
const Get_Pending_History = "Get_Pending_History";
const New_Payment = "New_Payment";
const API_Request_Sent = "API_Request_Sent";
const API_Request_Completed = "API_Request_Completed";
const API_Request_Error = "API_Request_Error";
const CREATE_BILLPAY_ACCOUNT = "CREATE_BILLPAY_ACCOUNT";
const DELETE_PENDING_PAY = "DELETE_PENDING_PAY";
const EDIT_PENDING_PAY = "EDIT_PENDING_PAY";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const GetBillPayHistory = () => async (dispatch) => {
  try {
    let response = await ApiCalls.GetRequest(Global.GetBillPayHistory);
    if (response.status === 200) {
      dispatch({ type: Get_BillPay_History, payload: response.data });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    console.log("Billpay history", error);
  }
};
export const GetPendingHistory = () => async (dispatch) => {
  try {
    let response = await ApiCalls.GetRequest(Global.GetPendingHistory);
    if (response.status === 200) {
      dispatch({ type: Get_Pending_History, payload: response.data });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    console.log("Billpay history", error);
  }
};
export const GetBillPayAccounts = () => async (dispatch) => {
  try {
    let response = await ApiCalls.GetRequest(Global.GetBillPayAccounts);

    if (response.status === 200) {
      dispatch({ type: Get_BillPay_Accounts, payload: response.data });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    console.log("Bilpay history", error);
  }
};

//Send Payment
export const NewPayment = (payload) => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(Global.PayMerchant, payload);
    if (response.status == 200) {
      dispatch({ type: New_Payment, payload: { data: payload, status: true } });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    dispatch({ type: New_Payment, payload: { error: error, status: "Error" } });
    wait(50).then(() => dispatch({ type: API_Request_Completed }));
  }
};

export const CreateBillpayAccount = () => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(Global.CreateBillPay);

    if (response.status === 200) {
      dispatch({ type: CREATE_BILLPAY_ACCOUNT, payload: response.data });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    dispatch({
      type: CREATE_BILLPAY_ACCOUNT,
      payload: { status: "Error", ...error },
    });
    wait(50).then(() => dispatch({ type: API_Request_Completed }));
  }
};
export const EditPendingPay = () => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(Global.EditPending);

    if (response.status === 200) {
      dispatch({
        type: EDIT_PENDING_PAY,
        payload: response.data,
        status: true,
      });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    dispatch({
      type: EDIT_PENDING_PAY,
      payload: { status: "Error", ...error },
    });
    wait(50).then(() => dispatch({ type: API_Request_Completed }));
  }
};
export const DeletePendingPay = (payload) => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(Global.DeletePending, payload);

    if (response.status === 200) {
      dispatch({
        type: DELETE_PENDING_PAY,
        payload: { data: payload, status: true },
      });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    dispatch({
      type: DELETE_PENDING_PAY,
      payload: { status: "Error", error: error },
    });
    wait(50).then(() => dispatch({ type: API_Request_Completed }));
  }
};
