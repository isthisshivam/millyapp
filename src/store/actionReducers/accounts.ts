import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiCalls from "../../../utils/ApiCalls";
import {
  AccountHistoryItem,
  InitialStateType,
} from "../../../types/accountHistory/types";
import Global from "../../../utils/env";

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
type GetSuccess = {
  status: "string" | boolean;
  history: AccountHistoryItem[];
};

type GetPayload = {
  accountId: number;
};
type CreateError = {
  status: "Error";
  error: number | object;
  message: string;
};
export const GetAccountHistory = createAsyncThunk<
  GetSuccess,
  GetPayload,
  { rejectValue: CreateError }
>("accounts/GetAccountHistory", async (payload, thunkApi) => {
  try {
    const response = await ApiCalls.GetRequest(
      `${Global.GetAccountHistory}/${payload.accountId}`
    );

    if (response.status == 200) {
      return {
        status: true,
        history: response.data,
      };
    }
  } catch (error) {
    return thunkApi.rejectWithValue({
      error: error.response.status,
      message: error.message,
      status: "Error",
    });
  }
});
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

const initialState: InitialStateType = {
  status: false,
  loading: false,
  error: undefined,
  message: undefined,
  history: [],
};

const accountHistorySlice = createSlice({
  name: "accountHistory",
  initialState,
  reducers: {
    reset: (state) => {
      return {
        ...state,
        error: undefined,
        message: undefined,
        status: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetAccountHistory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetAccountHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.history = action.payload.history;
      state.status = true;
    });
    builder.addCase(GetAccountHistory.rejected, (state, action) => {
      //console.log(action.payload);
      state.loading = false;
      state.error = action.payload.error;
      state.message = "Something went wrong please try again";
    });
    //////////////////////////////////////////////////////////////////////////////////////
  },
});

export default accountHistorySlice.reducer;
