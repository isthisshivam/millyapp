import ApiCalls from "../../../utils/ApiCalls";
import { handleError } from "../../../utils/utils";
const Global = require("../../../utils/env");
const Create_Message = "Create_Message";
const Reply_Message = "Reply_Message";
const Delete_Message = "Delete_Message";
const Get_Messages = "Get_Messages";
const Get_Message_Thread = "Get_Message_Thread";
const Get_Messages_Requested = "Get_Messages_Requested";
const API_Request_Completed = "API_Request_Completed";
const API_Request_Error = "API_Request_Error";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const GetMessages = () => async (dispatch) => {
  try {
    const response = await ApiCalls.GetRequest(Global.GetMessages);
    if (response.status == 200) {
      dispatch({ type: Get_Messages, payload: response.data });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const CreateMessage = (payload) => async (dispatch) => {
  try {
    const response = await ApiCalls.PostRequest(Global.CreateMsg, payload);
    if (response.status === 200) {
      dispatch({
        type: Create_Message,
        payload: { sequenceNumber: response.data, data: payload },
      });

      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};
export const ReplyMessage = (payload) => async (dispatch) => {
  try {
    const response = await ApiCalls.PostRequest(Global.CreateMsg, payload);

    if (response.status === 200) {
      dispatch({
        type: Reply_Message,
        payload: { sequenceNumber: response.data, reply: payload },
      });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};
export const GetThread = (payload) => async (dispatch) => {
  try {
    const response = await ApiCalls.GetRequest(
      `${Global.GetMessages}/${payload}`
    );
    if (response.status == 200) {
      dispatch({
        type: Get_Message_Thread,
        payload: response.data,
      });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const DeleteMessage = (payload) => async (dispatch) => {
  try {
    const response = await ApiCalls.PostRequest(Global.DeleteMessage, {
      id: payload.id,
    });

    if (response.status == 200) {
      dispatch({ type: Delete_Message, payload: payload.id });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};
