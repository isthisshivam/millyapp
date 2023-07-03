import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiCalls from "../../../utils/ApiCalls";
import Global from "../../../utils/env";
import { RegisterPayload, LoginPayload } from "../../../types/auth/authTypes";
import {
  initialStateType,
  UserInfoType,
  IdScanPayload,
  QuestionPayloadType,
  QuestionData,
} from "../types/register/type";
import { ContactInfoType } from "../types/profile";

interface RegisterSuccessResponse {
  //status: string;
  username: string;
  ssn: string;
  //message: string;
}
interface RegisterFailedResponse {
  error: number;
  message: string;
  //code: number;
  status: string | boolean;
}

export const register = createAsyncThunk<
  RegisterSuccessResponse,
  any,
  { rejectValue: RegisterFailedResponse }
>("auth/register", async (payload: RegisterPayload, thunkAPI) => {
  try {
    const response = await ApiCalls.PostRequest(Global.register, payload);
    //save username ?
    if (response.status == 200) {
      return {
        ssn: payload.ssn,
        username: payload.username,
      };
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({
      error: error.response.status,
      status: "Error",
      message: "Failed to register new user",
    });
  }
});
////////////////ID VERIFICATION////////////////////////

type SuccessResponse = {
  status: string | boolean;
  isVerified: boolean;
  message: string | null;
  info: UserInfoType;
};

export const ValidateId = createAsyncThunk<
  SuccessResponse,
  any
  //{ rejectValue: "" }
>("onboarding/validateId", async (payload: IdScanPayload, thunkAPI) => {
  try {
    const response = await ApiCalls.PostRequest(Global.IdVerification, payload);
    return {
      isVerified: response.data.documentVerificationResult,
      status: true,
      info: response.data.document,
      message: "Success",
    };
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: "",
      status: "Error",
      error: error.message,
    });
  }
});

//////////////////////////////////////////////////////////////////////////////////
type SelfieSuccess = {
  profilePicture: string;
  status: boolean | string;
};

type Failed = {
  profilePic: string;
};
export const ValidateSelfie = createAsyncThunk<
  SelfieSuccess,
  any,
  { rejectValue: Failed }
>("onboarding/ValidateSelfie", async (payload, thunkAPI) => {
  try {
    const response = await ApiCalls.PostRequest(Global.LoginLink, payload);

    if (response.status == 200) {
      return { status: true, profilePicture: payload.faceImage };
    }
  } catch (error) {
    //console.log(error);
    return thunkAPI.rejectWithValue({
      // error: error.response.status,
      // message: error.message,
      profilePic: payload.faceImage,
    });
  }
});
///////////////////////////////////////////////////////////////////////////

export const SetContactInfo = createAsyncThunk<any, ContactInfoType>(
  "onboarding/SetContactInfo",
  async (payload: ContactInfoType) => {
    try {
      const response = await ApiCalls.PostRequest(
        Global.UpdateContact,
        payload
      );

      if (response.status == 200) {
        return { status: true };
      }
      if (response.status == 400) {
        console.log("error caught in onboarding if check");
      }
    } catch (error) {
      //console.log(error);
      return {
        error: error.response.status,
        message: error.message,
      };
    }
  }
);
////////////////////////////////////////////////////////////////////////////////////

export const SetPasswordQuestions = createAsyncThunk(
  "register/SetPasswordQuestions",
  async (payload: QuestionPayloadType, thunkAPI) => {
    try {
      let data: QuestionData = {
        questionIds: [payload.id],
        answers: [payload.answer],
      };
      let response = await ApiCalls.PostRequest(
        Global.SetPasswordQuestion,
        data
      );

      if (response.status == 200) {
        return payload;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: "Error",
        error: error.response.status,
        message: "Something went wrong, please try again later",
      });
    }
  }
);

const initialState: initialStateType = {
  status: false,
  loading: false,
  error: undefined,
  message: undefined,
  idVerified: false,
  failedVerify: false,
  attempts: 0,
  selfieAttempts: 0,
  failedSelfie: false,
  selfieVerified: false,
  requestId: undefined,
  documentVerificationResult: undefined,
  info: undefined,
  username: undefined,
  profilePic: undefined,
  ssn: undefined,
  passwordQuestions: {
    id: undefined,
    question: undefined,
    answer: undefined,
  },
};

const registerSlice = createSlice({
  name: "auth",
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
    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
      state.message = undefined;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.username = action.payload.username;
      state.ssn = action.payload.ssn;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.error = action.error.code;
      state.message = "Failed to register new user";
      state.loading = false;
      state.status = "Error";
    }),
      builder.addCase(ValidateId.pending, (state, action) => {
        state.loading = true;
      });
    builder.addCase(ValidateId.fulfilled, (state, action) => {
      state.loading = false;
      state.idVerified = action.payload.isVerified;
    });
    builder.addCase(ValidateId.rejected, (state, action) => {
      state.error = action.error.code;
      state.message = "Please try again";
      state.loading = false;
      state.attempts = state.attempts + 1;
    });
    builder.addCase(ValidateSelfie.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(ValidateSelfie.fulfilled, (state, action) => {
      state.selfieVerified = true;
      state.loading = false;
      state.profilePic = action.payload.profilePicture;
    });
    builder.addCase(ValidateSelfie.rejected, (state, action) => {
      // console.log(action.payload);
      state.selfieVerified = false;
      state.failedSelfie = false;
      state.loading = false;
      state.profilePic = action.payload.profilePic;
    });

    ///////////Set Contact Info////////////
    builder.addCase(SetContactInfo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(SetContactInfo.fulfilled, (state, action) => {
      state.status = true;
      state.loading = false;
    });
    builder.addCase(SetContactInfo.rejected, (state, action) => {
      //console.log(action.payload);
      state.loading = false;
      state.error = action.error.code;
      state.message = "Something went wrong please try again";
    });
    ////////////////////////////////////////////////////
    builder.addCase(SetPasswordQuestions.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(SetPasswordQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.passwordQuestions.id = action.payload.id;
        state.passwordQuestions.question = action.payload.question;
        state.passwordQuestions.answer = action.payload.answer;
        state.message = "Successfully updated password question";
        state.status = true;
      });
    builder.addCase(SetPasswordQuestions.rejected, (state, action) => {
      state.status = "Error";
      state.error = action.error.code;
      state.message = "Something went wrong please try again";
      state.loading = false;
    });
  },
});

export const { reset } = registerSlice.actions;
export default registerSlice.reducer;
