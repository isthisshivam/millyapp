import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiCalls from "../../../utils/ApiCalls";
import {
  TransferHistoryItem,
  initialStateType,
  ExternalPayload,
  ExternalHistoryItem,
  DeleteExternalAccountPayload,
  SavedAccount,
} from "../../../types/transfer/types";
import Global from "../../../utils/env";

///////////////////////////////////////////////////////////////////////////
type ExternalSuccess = {
  item: ExternalPayload;
  recordId: number;
};

export const ExternalTransfer = createAsyncThunk<
  ExternalSuccess,
  ExternalPayload,
  { rejectValue: CreateError }
>("transfers/ExternalTransfer", async (payload, thunkApi) => {
  try {
    const response = await ApiCalls.PostRequest(Global.OneTimeACH, payload);

    if (response.status == 200) {
      console.log("success");
      return {
        item: payload,
        recordId: response.data,
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
type GetSuccess = {
  status: "string" | boolean;
  history: TransferHistoryItem[];
};

type GetPayload = {
  accountId: number;
};
type CreateError = {
  status: "Error";
  error: number | object;
  message: string;
};
export const GetTransferHistory = createAsyncThunk<
  GetSuccess,
  GetPayload,
  { rejectValue: CreateError }
>("transfers/GetTransferHistory", async (payload, thunkApi) => {
  try {
    const response = await ApiCalls.GetRequest(Global.GetTransferHistory);

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
export const GetExternalHistory = createAsyncThunk(
  "transfers/GetExternalHistory",
  async (thunkApi) => {
    try {
      const response = await ApiCalls.GetRequest(Global.GetExternalHistory);

      if (response.status == 200) {
        return {
          status: true,
          history: response.data,
        };
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
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
export const GetExternalAccts = createAsyncThunk(
  "transfers/GetExternalAcct",
  async () => {
    try {
      const response = await ApiCalls.GetRequest(Global.GetExternalAccounts);

      if (response.status == 200) {
        return {
          status: true,
          savedAccounts: response.data,
        };
      }

      if (response.status == 204) {
        return {
          savedAccounts: [],
          status: true,
        };
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
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
type DeleteSuccess = {
  account: SavedAccount;
};

type DeleteError = {
  message: string;
};
export const DeleteExternalAcct = createAsyncThunk<
  DeleteSuccess,
  DeleteExternalAccountPayload,
  { rejectValue: DeleteError }
>("transfers/DeleteExternalAcct", async (payload, thunkAPI) => {
  try {
    const response = await ApiCalls.PostRequest(
      Global.DeleteExtAccount,
      payload
    );

    if (response.status == 200) {
      return {
        account: payload[0],
      };
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: error.message,
    });
  }
});
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

const initialState: initialStateType = {
  status: false,
  loading: false,
  error: undefined,
  message: undefined,
  history: [],
  externalHistory: [],
  savedAccounts: [],
};

const transferSlice = createSlice({
  name: "transfers",
  initialState,
  reducers: {
    reset: (state) => {
      return {
        ...state,
        error: undefined,
        message: undefined,
        status: undefined,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetTransferHistory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetTransferHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.history = action.payload.history;
      //state.status = true;
    });
    builder.addCase(GetTransferHistory.rejected, (state, action) => {
      //console.log(action.payload);
      state.loading = false;
      state.error = action.payload.error;
      state.message = "Something went wrong please try again";
    });
    //////////////////////////////////////////////////////////////////////////////////////
    builder.addCase(ExternalTransfer.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(ExternalTransfer.fulfilled, (state, action) => {
      // let historyItem: ExternalHistoryItem = {
      //   recordId: action.payload.recordId,
      //   maxTxAmount: 0.0,
      //   debitAccount: "",
      //   controlAmount: 0,
      //   debitAccountId: action.payload.item.debitAccountId,
      //   debitAccountType: "",
      //   requestTypeDescription: "",
      //   requestDate: action.payload.item.effectiveDate,
      //   destAccountRequests: [
      //     {
      //       destAcctId: 0,
      //       createdAt: action.payload.item.effectiveDate,
      //       aba: action.payload.item.destinationAccounts[0].aba,
      //       accountNumber:
      //         action.payload.item.destinationAccounts[0].accountNumber,
      //       amount: action.payload.item.destinationAccounts[0].amount,
      //       isDeleted: 0,
      //       settlementFileId: 0,
      //       accountType: 1,
      //     },
      //   ],
      // };
      state.loading = false;
      //state.history = [...state.history, action.payload.item];
      state.status = true;
      state.message = "Successfully submitted external transfer";
    });
    builder.addCase(ExternalTransfer.rejected, (state, action) => {
      state.status == "Error";
      //console.log(action.payload);
      state.loading = false;
      //state.error = action.payload.error;
      state.message = "Something went wrong please try again";
    });
    //////////////////////////////////////////////////////////////////////////////////////
    builder.addCase(GetExternalHistory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetExternalHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.externalHistory = action.payload.history;
      //state.status = true;
    });
    builder.addCase(GetExternalHistory.rejected, (state, action) => {
      state.loading = false;
      state.status = "Error;";
      state.message = action.error.message;
    });
    //////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////
    builder.addCase(GetExternalAccts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetExternalAccts.fulfilled, (state, action) => {
      state.loading = false;
      state.savedAccounts = action.payload.savedAccounts;
    });
    builder.addCase(GetExternalAccts.rejected, (state, action) => {
      state.loading = false;
      state.status = "Error";
      state.message = action.error.message;
    });
    //////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////
    builder.addCase(DeleteExternalAcct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(DeleteExternalAcct.fulfilled, (state, action) => {
      let accounts = state.savedAccounts?.filter(
        (item) => item.accountNumber != action.payload.account.accountNumber
      );
      state.loading = false;
      state.savedAccounts = accounts;
      state.status = true;
    });
    builder.addCase(DeleteExternalAcct.rejected, (state, action) => {
      state.loading = false;
      state.status = "Error";
      state.message = action.error.message;
    });
    //////////////////////////////////////////////////////////////////////////////////////
  },
});

export const { reset } = transferSlice.actions;

export default transferSlice.reducer;
