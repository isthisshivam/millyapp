import ApiCalls from "../../../utils/ApiCalls";
import { handleError } from "../../../utils/utils";
const Global = require("../../../utils/env");

const Upload_Item = "Upload_Item";
const Delete_Item = "Delete_Item";
const Update_Category = "Update_Category";
const Get_Items = "Get_Items";
const Get_Item_File = "Get_Item_File";
const API_Request_Sent = "API_Request_Sent";
const API_Request_Error = "API_Request_Error";
const API_Request_Completed = "API_Request_Completed";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const GetESafe = () => async (dispatch) => {
  try {
    let response = await ApiCalls.GetRequest(Global.GetESafe);

    if (response.status == 200) {
      dispatch({
        type: Get_Items,
        payload: response.data.eSafe,
      });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};
export const GetESafeFile = (payload) => async (dispatch) => {
  try {
    let data = { id: payload.id };
    let response = await ApiCalls.PostRequest(Global.GetESafeFile, data);

    if (response.status == 200) {
      dispatch({
        type: Get_Item_File,
        payload: response.data[0], ///[{id: 123, file: ""}]
      });

      wait(100).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const UploadItem = (payload) => async (dispatch) => {
  let data = {
    category: payload.category,
    filename: payload.filename,
    data: payload.data,
  };
  try {
    let response = await ApiCalls.PostRequest(Global.UploadESafe, data);

    if (response.status == 200) {
      dispatch({ type: Upload_Item, payload: payload });
      wait(100).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};
export const UpdateCategory = (payload) => async (dispatch) => {
  let data = { recordid: payload.recordId, category: payload.category };
  //console.log(payload);

  try {
    let response = await ApiCalls.PostRequest(Global.UploadESafe, data);
    if (response.status === 200) {
      dispatch({ type: Update_Category, payload: payload });
      wait(100).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const DeleteItem = (payload) => async (dispatch) => {
  //console.log(payload);

  let data = { id: [payload] };

  try {
    let response = await ApiCalls.PostRequest(Global.DeleteESafeFile, data);
    if (response.status === 200) {
      dispatch({ type: Delete_Item, payload: payload });
      wait(100).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};
