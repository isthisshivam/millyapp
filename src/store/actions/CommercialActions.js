const Global = require("../../../utils/env");
import ApiCalls from "../../../utils/ApiCalls";
import { handleError } from "../../../utils/utils";

const Get_Admin = "Get_Admin";
const Get_Permissions = "Get_Permissions";
const Get_Commercial_accounts = "Get_Commercial_accounts";
const Get_Request_Types = "Get_Request_Types";
///Templates///////
const Add_Template = "Add_Template";
const Get_Templates = "Get_Templates";
const Get_History = "Get_History";
const Get_Template = "Get_Template";
const Select_Template = "Select_Template";
const Update_Template = "Update_Template";
const Delete_Template = "Delete_Template";
const One_Time_ACH = "One_Time_ACH";
const GET_USER_PERMISSIONS = "GET_USER_PERMISSIONS";
const UPDATE_PERMISSIONS = "UPDATE_PERMISSIONS";
const API_Request_Completed = "API_Request_Completed";
const API_Request_Error = "API_Request_Error";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const GetPermissions = () => async (dispatch) => {
  try {
    let response = await ApiCalls.GetRequest(Global.GetUserPermissions);
    if (response.status === 200) {
      dispatch({
        type: GET_USER_PERMISSIONS,
        payload: { data: response.data, status: true },
      });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    dispatch({
      type: GET_USER_PERMISSIONS,
      payload: { error: error, status: "Error" },
    });
    wait(50).then(() => dispatch({ type: API_Request_Completed }));
  }
};

export const GetAccounts = () => async (dispatch) => {
  try {
    let response = await ApiCalls.GetRequest(Global.G);
    if (response.status === 200) {
      ///TODO add bad response check
      dispatch({ type: Get_Request_Types, payload: response.data });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};
export const GetAchTypes = () => async (dispatch) => {
  try {
    let response = await ApiCalls.GetRequest(Global.GetAchTypes);
    if (response.status === 200) {
      ///TODO add bad response check
      dispatch({ type: Get_Request_Types, payload: response.data });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const GetTemplates = () => async (dispatch) => {
  try {
    let response = await ApiCalls.GetRequest(Global.GetTemplates);
    if (response.status === 200) {
      ///TODO add bad response check
      dispatch({ type: Get_Templates, payload: response.data });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};
export const GetHistory = () => async (dispatch) => {
  try {
    let response = await ApiCalls.GetRequest(Global.GetAchHistory);
    if (response.status === 200) {
      dispatch({ type: Get_History, payload: response.data });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const AddAchTemplate = (payload) => async (dispatch) => {
  try {
    const wait = (timeout) => {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    };

    let response = await ApiCalls.PostRequest(Global.AddTemplate, payload);

    if (response.status == 200) {
      dispatch({ type: Add_Template, payload: payload });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};
export const EditTemplate = (payload) => async (dispatch) => {
  try {
    const wait = (timeout) => {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    };

    let response = await ApiCalls.PostRequest(Global.EditTemplate, payload);

    if (response.status == 200) {
      dispatch({ type: Edit_Update, payload: payload });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};
export const UpdateTemplate = (payload) => async (dispatch) => {
  try {
    const wait = (timeout) => {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    };

    let response = await ApiCalls.PostRequest(Global.UpdateTemplate, payload);

    if (response.status == 200) {
      dispatch({ type: Add_Template, payload: payload });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};
export const DeleteTemplate = (payload) => async (dispatch) => {
  try {
    const wait = (timeout) => {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    };

    let response = await ApiCalls.PostRequest(Global.DeleteTemplate, payload);

    if (response.status == 200) {
      dispatch({ type: Add_Template, payload: payload });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};

//Send Payment
export const OneTimeACH = (payload) => async (dispatch) => {
  try {
    const wait = (timeout) => {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    };

    let response = await ApiCalls.PostRequest(Global.OneTimeACH, payload);

    if (response.status == 200) {
      dispatch({
        type: One_Time_ACH,
        payload: { data: payload, status: true },
      });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    dispatch({
      type: One_Time_ACH,
      payload: { error: error, status: "Error" },
    });
    wait(50).then(() => dispatch({ type: API_Request_Completed }));
  }
};

export const SelectTemplate = (payload) => async (dispatch) => {
  try {
    dispatch({ type: Select_Template, payload: payload });
    wait(50).then(() => dispatch({ type: API_Request_Completed }));
    //let response = await PostRequest(Global.EditPendingPay, payload);
    // if (response.status == 200) {
    //   dispatch({ type: New_Payment, payload: payload });
    //   wait(50).then(() => dispatch({ type: API_Request_Completed }));
    // }
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const AddUser = (payload) => async (dispatch) => {
  try {
    const wait = (timeout) => {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    };

    let response = await ApiCalls.PostRequest(Global.AddUser, payload);

    if (response.status == 200) {
      dispatch({ type: One_Time_ACH, payload: payload });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const UpdatePermissions = (payload) => async (dispatch) => {
  try {
    const wait = (timeout) => {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    };

    let response = await ApiCalls.PostRequest(
      Global.UpdateUserPermissions,
      payload
    );

    if (response.status == 200) {
      dispatch({
        type: UPDATE_PERMISSIONS,
        payload: { data: payload, status: true },
      });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    dispatch({
      type: UPDATE_PERMISSIONS,
      payload: { error: error, status: "Error" },
    });
    wait(50).then(() => dispatch({ type: API_Request_Completed }));
  }
};
