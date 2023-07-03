import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiCalls from "../../../utils/ApiCalls";
import Global from "../../../utils/env";
import {
  RegisterPayload,
  LoginPayload,
  initialStateType,
  UpdatePasswordType,
  GetTwoFactorCode,
  ValidateCodeType,
  TwoFactorType,
} from "../../../types/auth/authTypes";

interface RegisterSuccessResponse {
  status: string;
  username: string;
  message: string;
}
interface ErrorType {
  error: number;
  message: string;
  status: "Error";
}

export const register = createAsyncThunk<
  RegisterSuccessResponse,
  any,
  { rejectValue: ErrorType }
>("auth/register", async (payload: RegisterPayload, thunkAPI) => {
  try {
    const response = await ApiCalls.PostRequest(Global.register, payload);
    //save username ?
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    //thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

///////////////////////LOGIN///////////////////////////////////////////////////////////

export interface LoginSuccessResponse {
  username: string;
  status: string | boolean;
  hasCommercialAccount?: boolean;
  twoFactorOptions?: TwoFactorType[];
}

export const LoginUser = createAsyncThunk<
  LoginSuccessResponse,
  any,
  { rejectValue: ErrorType }
>("auth/loginUser", async (payload: LoginPayload, thunkAPI) => {
  try {
    const response = await ApiCalls.PostRequest(Global.LoginLink, payload);

    if (response.status == 200) {
      await AsyncStorage.setItem("cookie", response.headers["set-cookie"][0]);
      if (response.data[0]) {
        return {
          twoFactorOptions: response.data,
          username: payload.username,
          status: false,
          hasCommercialAccount: false,
        };
      }
      return {
        username: payload.username,
        hasCommercialAccount: response.data.hasCommercialAccount,
        status: true,
      };
    }
  } catch (error) {
    switch (error?.response?.status) {
      case 400: //login failed something went wrong
        return thunkAPI.rejectWithValue({
          status: "Error",
          message: "Something went wrong please try again",
          error: error.response.status,
        });

      case 401: //Password incorrect
        return thunkAPI.rejectWithValue({
          status: "Error",
          message: "Username or Password incorrect. Please try again",
          error: error.response.status,
        });

      case 404: //Username not found
        return thunkAPI.rejectWithValue({
          status: "Error",
          message:
            "Username did not match any account. If you do not have an account please create a new one ",
          error: error.response.status,
        });

      case 500: //server error
        return thunkAPI.rejectWithValue({
          status: "Error",
          message: "Username or Password incorrect. Please try again",
          error: error.response.status,
        });

      default:
        return thunkAPI.rejectWithValue({
          status: "Error",
          message: "Username or Password incorrect. Please try again",
          error: error.response.status,
        });
    }
  }
});

////////////////////////////////////////////////////////////////////////////////////

type RememberSuccessResponse = {
  rememberDevice: boolean;
};

type RememberPayload = {
  deviceInfo: string;
};
type ForgetPayload = { rememberDevice: boolean };
type Error = {
  error: any;
  message: string;
};
export const RememberDevice = createAsyncThunk(
  "auth/rememberDevice",
  async (payload: any) => {
    try {
      if (payload.deviceInfo) {
        const response = await ApiCalls.PostRequest(
          Global.RememberDevice,
          payload
        );
        if (response.status == 200) {
          await AsyncStorage.setItem("rememberToken", response.data[0]);
          await AsyncStorage.setItem("refreshToken", response.data[1]);
          return { rememberDevice: true };
        }
        return;
      } else {
        let data = { rememberDevice: false };
        const response = await ApiCalls.PostRequest(
          Global.RememberDevice,
          data
        );
        if (response.status == 200) {
          await AsyncStorage.removeItem("rememberToken");
          await AsyncStorage.removeItem("refreshToken");
          return { rememberDevice: false };
        }
        return;
      }
    } catch (error) {
      return {
        status: "Error",
        error: error.response.status,
        message: "Something went wrong, please try again later",
      };
    }
  }
);
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

type LogoutPayload = { token: string; refreshToken: string };

export const Logout = createAsyncThunk(
  "auth/logout",
  async (payload: LogoutPayload) => {
    try {
      const response = await ApiCalls.PostRequest(Global.Logout, payload);
      if (response.status == 200) {
        return;
      }
    } catch (error) {
      return {
        status: "Error",
        error: error.response.status,
        message: "Something went wrong, please try again later",
      };
    }
  }
);
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

export const UpdateUserPassword = createAsyncThunk(
  "auth/updatePassword",
  async (payload: UpdatePasswordType) => {
    try {
      const response = await ApiCalls.PostRequest(
        Global.UpdatePassword,
        payload
      );
      if (response.status == 200) {
        return;
      }
    } catch (error) {
      return {
        status: "Error",
        error: error.response.status,
        message: "Something went wrong, please try again later",
      };
    }
  }
);
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
export const GetPasswordQuestions = createAsyncThunk(
  "auth/GetPasswordQuestions",
  async (_, thunkAPI) => {
    try {
      let response = await ApiCalls.GetRequest(Global.GetPassowordQuestions);

      if (response.status == 200) {
        return response.data;
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
////////////////////////////////////////////////////////////////////////////////////
type PayloadType = {
  id: number;
  question: string;
  answer: string;
};

type Data = {
  questionIds: number[];
  answers: string[];
};
export const SetPasswordQuestions = createAsyncThunk(
  "auth/SetPasswordQuestions",
  async (payload: PayloadType, thunkAPI) => {
    try {
      let data: Data = {
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

////////////////////////////////////////////////////////////////////////////////////
type CreateError = {
  message: string;
  error: any;
};
export const GetCode = createAsyncThunk<
  void,
  GetTwoFactorCode,
  { rejectValue: CreateError }
>("auth/GetCode", async (payload, thunkAPI) => {
  try {
    const response = await ApiCalls.PostRequest(
      Global.GetTwoFactorCode,
      payload
    );

    if (response.status == 200) {
      return;
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({
      error: error.response.status,
      message: "Something went wrong, please try again later",
    });
  }
});

////////////////////////////////////////////////////////////////////////////////////
export const ValidateCode = createAsyncThunk<
  null,
  ValidateCodeType,
  { rejectValue: CreateError }
>("auth/sendCode", async (payload, thunkAPI) => {
  try {
    const response = await ApiCalls.PostRequest(
      Global.ValidateTwoFactor,
      payload
    );

    if (response.status == 200) {
      await AsyncStorage.setItem("cookie", response.headers["set-cookie"][0]);
      return;
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({
      error: error.response.status,
      message: "Something went wrong, please try again later",
    });
  }
});

// export const logout = createAsyncThunk("auth/logout", async () => {
//   await AuthService.logout();
// });

const initialState: initialStateType = {
  isLoggedIn: false,
  username: undefined,
  status: undefined,
  error: undefined,
  message: undefined,
  loading: false,
  rememberToken: undefined,
  refreshToken: undefined,
  rememberDevice: false,
  hasCommercialAccount: false,
  passwordQuestions: {
    id: undefined,
    question: undefined,
  },
  questions: {
    questionIds: [],
    questions: [],
  },
  twoFactorOptions: [],
  twoFactorCodeSent: false,
  showTwoFactor: false,
  codeSent: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      return {
        ...state,
        message: undefined,
        error: undefined,
        status: false,
        codeSent: false,
        showTwoFactor: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(LoginUser.fulfilled, (state, action) => {
        if (action.payload?.twoFactorOptions) {
          //state.status = true;
          state.username = action.payload.username;
          state.loading = false;
          state.twoFactorOptions = action.payload.twoFactorOptions;
          state.showTwoFactor = true;
          return;
        } else {
          state.status = true;
          state.isLoggedIn = true;
          state.username = action.payload.username;
          state.loading = false;
        }
      }),
      builder.addCase(LoginUser.rejected, (state, action) => {
        state.status = "Error";
        state.error = action.error.code;
        state.message = action.error.message;
        state.loading = false;
      });

    ////////////////////////////////////////////////////
    builder.addCase(RememberDevice.pending, (state, action) => {
      // state.loading = true;
    }),
      builder.addCase(RememberDevice.fulfilled, (state, action) => {
        state.loading = false;
        state.rememberDevice = !state.rememberDevice;
        //state.status = true;
      });
    builder.addCase(RememberDevice.rejected, (state, action) => {
      state.status = "Error";
      state.error = action.error.code;
      state.message = "Something went wrong please try again";
      state.loading = false;
    });

    ////////////////////////////////////////////////////
    builder.addCase(GetPasswordQuestions.pending, (state, action) => {
      //state.loading = true;
    }),
      builder.addCase(GetPasswordQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions.questionIds = action.payload.questionId;
        state.questions.questions = action.payload.questions;
      });
    builder.addCase(GetPasswordQuestions.rejected, (state, action) => {
      state.status = "Error";
      state.error = action.error.code;
      state.message = "Something went wrong please try again";
      state.loading = false;
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
    ////////////////////////////////////////////////////
    builder.addCase(UpdateUserPassword.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(UpdateUserPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Successfully updated password";
        state.status = true;
      });
    builder.addCase(UpdateUserPassword.rejected, (state, action) => {
      state.status = "Error";
      state.error = action.error.code;
      state.message = "Something went wrong please try again";
      state.loading = false;
    });
    ////////////////////////////////////////////////////
    builder.addCase(GetCode.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(GetCode.fulfilled, (state, action) => {
        state.loading = false;
        state.codeSent = true;
      }),
      builder.addCase(GetCode.rejected, (state, action) => {
        state.status = "Error";
        state.error = action.payload.error;
        state.message = action.payload.message;
        state.loading = false;
      });

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    builder.addCase(ValidateCode.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(ValidateCode.fulfilled, (state, action) => {
        state.status = true;
        state.isLoggedIn = true;
      }),
      builder.addCase(ValidateCode.rejected, (state, action) => {
        state.status = "Error";
        state.error = action.payload.error;
        state.message = action.payload.message;
        state.loading = false;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
