import ApiCalls from "../../../utils/ApiCalls";
import { handleError } from "../../../utils/utils";
const Not_Verified = "Not_Verified";
const Selfie_Verified = "Selfie_Verified";
const Global = require("../../../utils/env");

const Verify_ID = "Verify_ID";
const API_Request_Completed = "API_Request_Completed";
const Selfie_Not_Verified = "Selfie_Not_Verified";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const VerifyID = (payload) => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(Global.IdVerification, payload);
    if (response.status == 200) {
      dispatch({ type: Verify_ID, payload: response.data });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    wait(50).then(() => dispatch({ type: Not_Verified }));
    wait(60).then(() => dispatch({ type: API_Request_Completed }));
  }
};

export const VerifySelfie = (payload) => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(Global.VerifySelfie, payload);
    if (response.status == 200) {
      dispatch({ type: Selfie_Verified });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    wait(50).then(() => dispatch({ type: Selfie_Not_Verified }));
    wait(60).then(() => dispatch({ type: API_Request_Completed }));
  }
};
