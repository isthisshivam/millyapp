import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiCalls from "../../../utils/ApiCalls";
import Global from "../../../utils/env";
import { formatDateYYMMDD } from "../../../utils/utils";
import {
  AddPayload,
  EditPayload,
  InitialStateType,
  Reminder,
} from "../../../types/reminders/types";

type AddSuccess = {
  status: true;
  item: Reminder;
};

type ErrorType = {
  status: "Error";
  error: number;
  message: string;
};
export const NewReminder = createAsyncThunk<
  AddSuccess,
  AddPayload,
  { rejectValue: ErrorType }
>("reminders/addReminder", async (payload, thunkAPI) => {
  try {
    const response = await ApiCalls.PostRequest(Global.AddReminder, payload);
    if (response.status == 200 || 201) {
      return {
        status: true,
        item: {
          id: response.data,
          name: payload.name,
          createdDate: payload.startDate,
          startDate: payload.startDate,
          frequency: payload.frequency,
          //ignored: boolean,
          amount: payload.amount,
        },
      };
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: "",
      status: "Error",
      error: error.message,
    });
  }
});

//////////////////////////////////////////////////////////////////////////////////

export const UpdateReminder = createAsyncThunk<
  AddSuccess,
  EditPayload,
  { rejectValue: ErrorType }
>("reminders/updateVehicle", async (payload, thunkAPI) => {
  try {
    const response = await ApiCalls.PostRequest(Global.UpdateReminder, payload);
    if (response.status == 200) {
      return {
        status: true,
        item: {
          name: payload.name,
          frequency: payload.frequency,
          startDate: payload.newDate,
          amount: payload.amount,
          id: payload.id,
          createdDate: payload.newDate,
          //type: payload.type,
        },
      };
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: error,
      status: "Error",
      error: error,
    });
  }
});
//////////////////////////////////////////////////////////////////////////////////
export const DeleteReminder = createAsyncThunk<
  any,
  { id: number[]; type: number },
  { rejectValue: ErrorType }
>("reminders/deleteReminder", async (payload, thunkAPI) => {
  try {
    const response = await ApiCalls.PostRequest(Global.DeleteReminder, payload);
    if (response.status == 200) {
      return {
        id: payload.id,
      };
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: error,
      status: "Error",
      error: error,
    });
  }
});

//////////////////////////////////////////////////////////////////////////////////
export interface GetRemindersSuccess {
  status: string | boolean;
  reminders: Reminder[];
}

export const GetReminders = createAsyncThunk(
  "reminders/GetReminders",
  async (thunkAPI) => {
    try {
      const response = await ApiCalls.GetRequest(Global.GetReminders);

      if (response.status == 200) {
        return { status: true, reminders: response.data };
      }
    } catch (error) {
      return {
        error: error.response.status,
        message: error.message,
      };
    }
  }
);

const initialState: InitialStateType = {
  status: false,
  loading: false,
  error: undefined,
  message: undefined,
  reminders: [],
};

const reminderSlice = createSlice({
  name: "reminders",
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
    builder.addCase(NewReminder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(NewReminder.fulfilled, (state, action) => {
      state.loading = false;
      state.reminders = [...state.reminders, action.payload.item];
      state.status = true;
      state.message = "Successfully added reminder";
    });
    builder.addCase(NewReminder.rejected, (state, action) => {
      state.error = action.error.code;
      state.message = "Please try again";
      state.loading = false;
      state.status = "Error";
    });
    ////////////////////////////////////////////////////////////////////////////////
    builder.addCase(UpdateReminder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(UpdateReminder.fulfilled, (state, action) => {
      let NewReminder = state.reminders.map((item) => {
        if (item.id == action.payload.item.id) {
          let obj: Reminder = {
            ...action.payload.item,
          };
          return obj;
        }
        return item;
      });
      state.loading = false;
      state.reminders = [...NewReminder];
      state.status = true;
      state.message = "Successfully updated vehicle";
    });
    builder.addCase(UpdateReminder.rejected, (state, action) => {
      state.error = action.error.code;
      state.message = "Please try again";
      state.loading = false;
      state.status == "Error";
    });
    ////////////////////////////////////////////////////////////////////////////////
    builder.addCase(DeleteReminder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(DeleteReminder.fulfilled, (state, action) => {
      let newArray = state.reminders.filter(
        (item) => item.id != action.payload.id
      );
      state.reminders = newArray;
      state.loading = false;
      state.status = true;
      state.message = "Successfully deleted vehicle";
    });
    builder.addCase(DeleteReminder.rejected, (state, action) => {
      // console.log(action.payload);
      state.error = action.error.code;
      state.message = "Something went wrong, please try again";
      state.loading = false;
      state.status = "Error";
    });
    ////////////////////////////////////////////////////////////////////////////////
    builder.addCase(GetReminders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetReminders.fulfilled, (state, action) => {
      state.reminders = action.payload.reminders;
      state.loading = false;
    });
    builder.addCase(GetReminders.rejected, (state, action) => {
      // console.log(action.payload);
      state.error = action.error.code;
      state.message = "Something wwent wrong, please try again";
      state.loading = false;
    });
  },
});
export const { reset } = reminderSlice.actions;
export default reminderSlice.reducer;
