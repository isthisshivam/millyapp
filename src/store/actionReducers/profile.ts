import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiCalls from "../../../utils/ApiCalls";
import Global from "../../../utils/env";

import {
  ContactInfoType,
  InitialStateType,
} from "../../../types/profile/types";

///////////////////////////////////////////////////////////////////////////
type ContactInfoSuccess = {
  info: ContactInfoType;
};
export const SetContactInfo = createAsyncThunk<
  ContactInfoSuccess,
  ContactInfoType,
  {
    rejectValue: any;
  }
>("profile/SetContactInfo", async (payload, thunkAPI) => {
  try {
    const response = await ApiCalls.PostRequest(Global.UpdateContact, payload);

    if (response.status == 200) {
      return {
        info: payload,
      };
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({
      error: error,
    });
  }
});
////////////////////////////////////////////////////////////////////////////////////

export const GetProfilePic = createAsyncThunk(
  "profile/GetProfilePic",
  async () => {
    try {
      let profilePic = await ApiCalls.GetRequest(Global.GetProfilePic);

      if (profilePic.status === 200) {
        return { profilePic: profilePic.data.image };
      }
    } catch (error) {
      return {
        error: error.response.status,
        message: error.message,
        status: "Error",
      };
    }
  }
);
////////////////////////////////////////////////////////////////////////////////////

export const GetContactInfo = createAsyncThunk(
  "profile/GetContactInfo",
  async (thunkApi) => {
    try {
      let contactInfo = await ApiCalls.GetRequest(Global.GetContactInfo);

      if (contactInfo.status === 200) {
        return { info: contactInfo.data };
      }
    } catch (error) {
      return {
        error: error.response.status,
        message: error.message,
        status: "Error",
      };
    }
  }
);
const initialState: InitialStateType = {
  status: false,
  loading: false,
  error: undefined,
  message: undefined,
  profilePic: undefined,
  info: undefined,
  lastLogin: undefined,
  preferences: {
    clientId: undefined, //"DEMOS";
    eMessageEMailOptIn: false,
    fontSize: undefined, // "m";
    id: { clientId: undefined, userName: undefined },
    language: undefined, //"EN";
    mobileCommunication: false,
    outOfChannel: false,
    preferredView: undefined, //58;
    userId: undefined,
  },
  disclosures: [],
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset: (state) => {
      return {
        ...state,
        message: undefined,
        error: undefined,
        status: false,
      };
    },
  },
  extraReducers: (builder) => {
    ///////////Set Contact Info////////////
    builder.addCase(SetContactInfo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(SetContactInfo.fulfilled, (state, action) => {
      state.status = true;
      state.loading = false;
      state.message = "Successfully updated contact info";
      state.info = {
        ...state.info,
        ...action.payload.info,
      };
    });
    builder.addCase(SetContactInfo.rejected, (state, action) => {
      //console.log(action.payload);
      state.loading = false;
      state.error = action.error.message;
      state.message = "Something went wrong please try again";
    });
    ////////////////////////////////////////////////////
    builder.addCase(GetProfilePic.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(GetProfilePic.fulfilled, (state, action) => {
        state.loading = false;
        state.profilePic = action.payload.profilePic;
      });
    builder.addCase(GetProfilePic.rejected, (state, action) => {
      state.status = "Error";
      state.error = action.error.code;
      state.message = "Something went wrong please try again";
      state.loading = false;
    });
    ////////////////////////////////////////////////////
    builder.addCase(GetContactInfo.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(GetContactInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.info = {
          birthDay: action.payload.info.birthDate,
          email: action.payload.info?.email,
          cellPhone: action.payload.info?.phoneNumber,
          fullName: action.payload.info?.contactInfo.name,
          address1:
            action.payload.info?.contactInfo?.address?.address?.addressLine1,
          address2:
            action.payload.info?.contactInfo?.address?.address?.addressLine2,
          city: action.payload.info?.contactInfo?.address?.address?.city,
          state: action.payload.info?.contactInfo?.address?.address?.state,
          zip: action.payload.info?.contactInfo?.address?.address?.zipCode.code,
          homePhone: undefined,
          workPhone: undefined,
        };
      });
    builder.addCase(GetContactInfo.rejected, (state, action) => {
      state.status = "Error";
      state.error = action.error.code;
      state.message = "Something went wrong please try again";
      state.loading = false;
    });
  },
});

export const { reset } = profileSlice.actions;
export default profileSlice.reducer;
