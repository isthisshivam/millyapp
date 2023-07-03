import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiCalls from "../../../utils/ApiCalls";
const Global = require("../../../utils/env");
import { handleError } from "../../../utils/utils";

const Get_Profile_Pic = "Get_Profile_Pic";
const Get_Contact_Info = "Get_Contact_Info";
const Update_ContactInfo = "Update_ContactInfo";
const Update_Profile_Pic = "Update_Profile_Pic";
const Set_UserId = "Set_UserId";
const Set_Bio_Auth = "Set_Bio_Auth";

const API_Request_Sent = "API_Request_Sent";
const API_Request_Completed = "API_Request_Completed";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const GetNameAndProfilePic = () => async (dispatch) => {
  try {
    let profilePic = await ApiCalls.GetRequest(Global.GetProfilePic);
    let contactInfo = await ApiCalls.GetRequest(Global.GetContactInfo);
    //let data = { profilePic: profilePic.data.image };

    if (contactInfo.status === 200) {
      dispatch({ type: Get_Contact_Info, payload: contactInfo.data });
    }
    if (profilePic.status === 200) {
      wait(50).then(() =>
        dispatch({ type: Get_Profile_Pic, payload: profilePic.data.image })
      );
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const UpdateContactInfo = (payload) => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(Global.UpdateContact);

    if (response.status == 200) {
      dispatch({ type: Update_ContactInfo, payload: payload });
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};
export const UpdatePic = (payload) => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(Global.UpdateProfilePic, payload);

    if (response.status === 200) {
      dispatch({ type: Update_Profile_Pic, payload: payload });
      AsyncStorage.removeItem("profilePic");
      wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};
export const SetUserID = (payload) => async (dispatch) => {
  try {
    dispatch({ type: Set_UserId, payload: payload });
  } catch (error) {
    handleError(error, dispatch);
  }
};
export const SetBioAuth = (payload) => async (dispatch) => {
  try {
    dispatch({ type: Set_Bio_Auth, payload: payload });
  } catch (error) {
    handleError(error, dispatch);
  }
};
