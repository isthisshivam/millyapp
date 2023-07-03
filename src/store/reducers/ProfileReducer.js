const initialState = {
  onboardCompleted: false,

  enableBioAuth: false,
  address1: undefined,
  address2: undefined,
  city: undefined,
  addressState: undefined,
  zip: undefined,
  birthday: undefined,
  email: undefined,
  phone: undefined,
  profilePic: undefined,
  settings: {
    rememberDevice: false,
    rememberUser: false,
    isBiometricSupported: false,
    enableBioAuth: false,
  },
  status: false,
  error: undefined,
  message: undefined,
};

const Get_Contact_Info = "Get_Contact_Info";
const Update_ContactInfo = "Update_ContactInfo";
const Get_Profile_Pic = "Get_Profile_Pic";
const Update_Profile_Pic = "Update_Profile_Pic";
const Set_Bio_Auth = "Set_Bio_Auth";

const API_Request_Sent = "API_Request_Sent";
const API_Request_Completed = "API_Request_Completed";
const API_Request_Error = "API_Request_Error";

export const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case Get_Contact_Info:
      return { ...action.payload, ...state };
    case Update_ContactInfo:
      let {
        address1,
        address2,
        city,
        addressState,
        zip,
        birthday,
        email,
        phone,
      } = action.payload;
      return {
        ...state,
        status: true,
        address1: address1,
        address2: address2,
        city: city,
        addressState: addressState,
        zip: zip,
        birthday: birthday,
        email: action.payload.email,
        phone: phone,
      };

    case Get_Profile_Pic:
      return { ...state, profilePic: action.payload };
    case Update_Profile_Pic:
      return {
        ...state,
        profilePic: action.payload.image,
        status: true,
        message: "Successfully updated your profile pic.",
      };

    case API_Request_Sent:
      return {
        ...state,
        status: false,
      };
    case API_Request_Completed:
      return {
        ...state,
        status: false,
      };

    case API_Request_Error:
      return {
        ...state,
        status: "Error",
        error: action.payload,
      };
    case Set_Bio_Auth:
      return { ...state, enableBioAuth: action.payload };
    default:
      return state;
  }
};
