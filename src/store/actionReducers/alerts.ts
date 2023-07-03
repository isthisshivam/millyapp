import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiCalls from "../../../utils/ApiCalls";
import {
  AlertTypeEnum,
  CreateAlertType,
  initialStateType,
  AlertType,
  DeletePayloadType,
  ComparisonOperators,
} from "../../../types/alerts/alertTypes";
import Global from "../../../utils/env";

///////////////////////////////////////////////////////////////////////////
type CreateSuccess = {
  status: string | boolean;

  alert: CreateAlertType;
};

type CreateError = {
  status: string;
  error: number;
  message: string;
};

export const CreateAlert = createAsyncThunk<
  CreateSuccess,
  any,
  { rejectValue: CreateError }
>("alerts/createAlert", async (payload, thunkApi) => {
  try {
    const response = await ApiCalls.PostRequest(Global.CreateAlert, payload);

    if (response.status == 200 || response.status == 201) {
      return {
        status: true,
        sequenceNumber: response.data.sequenceNumber,
        alert: {
          ...payload,
        },
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
  alerts: [];
};
export const GetAlerts = createAsyncThunk<
  GetSuccess,
  any,
  { rejectValue: CreateError }
>("alerts/getAlerts", async (thunkApi) => {
  try {
    const response = await ApiCalls.GetRequest(Global.GetAlerts);
    const smartAlerts = await ApiCalls.GetRequest(Global.GetSmartAlerts);

    if (response.status == 200) {
      if (smartAlerts.status == 200) {
        return {
          status: true,
          alerts: [...response.data, ...smartAlerts.data],
        };
      } else {
        return {
          status: true,
          alerts: response.data,
        };
      }
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

export const UpdateAlert = createAsyncThunk<
  CreateSuccess,
  any,
  { rejectValue: CreateError }
>("alerts/updateAlert", async (payload, thunkApi) => {
  try {
    const response = await ApiCalls.PostRequest(Global.UpdateAlert, payload);

    if (response.status == 200) {
      return {
        status: true,
        alert: payload,
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
type DeleteSuccess = {
  status: string | boolean;
  alertId: number;
};
export const DeleteAlert = createAsyncThunk<
  DeleteSuccess,
  DeletePayloadType,
  { rejectValue: CreateError }
>("alerts/deleteAlert", async (payload, thunkApi) => {
  try {
    if (payload.type == AlertTypeEnum.SmartAlert) {
      const response = await ApiCalls.PostRequest(Global.DeleteSmartAlert, {
        alertId: payload.alertId,
      });

      if (response.status == 200) {
        return {
          status: true,
          alertId: payload.alertId,
        };
      }
    } else {
      const response = await ApiCalls.PostRequest(Global.DeleteAlert, payload);

      if (response.status == 200) {
        return {
          status: true,
          alertId: payload.alertId,
        };
      }
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

const initialState: initialStateType = {
  status: false,
  loading: false,
  error: undefined,
  message: undefined,
  alerts: [],
};

const alertSlice = createSlice({
  name: "alerts",
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
    builder.addCase(CreateAlert.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(CreateAlert.fulfilled, (state, action) => {
      let alert: AlertType = {
        ...action.payload.alert,
        accountId: Number(action.payload.alert.accountId),
        sequenceNumber: action.payload.sequenceNumber,
        transmissionType: action.payload.alert.email
          ? "Email"
          : action.payload.alert.text
          ? "Text"
          : "Phone",
        transmissionsFieldValue: "",
        requestDate: new Date().toLocaleDateString("en-US"),
        requestTime: "",
        flag: "Once",
        accountName: action.payload.accountName,
        type:
          action.payload.alert.type == AlertTypeEnum.AccountAlert
            ? "A"
            : action.payload.alert.type == AlertTypeEnum.EventAlert
            ? "E"
            : "S",
      };
      let array = [...state.alerts, alert];
      let type = action.payload.alert.type;
      state.status = true;
      state.loading = false;
      state.alerts = [...array];
      state.message = `Successfully created ${
        type == AlertTypeEnum.AccountAlert
          ? "Account Alert"
          : type == AlertTypeEnum.EventAlert
          ? "Event Alert"
          : "Smart Alert"
      }`;
    });
    builder.addCase(CreateAlert.rejected, (state, action) => {
      //console.log(action.payload);
      state.loading = false;
      state.error = action.payload.error;
      state.message = "Something went wrong please try again";
    });
    builder.addCase(GetAlerts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetAlerts.fulfilled, (state, action) => {
      state.alerts = action.payload.alerts;
    });
    builder.addCase(GetAlerts.rejected, (state, action) => {
      //console.log(action.payload);
      state.loading = false;
      state.error = action.payload.error;
      state.message = "Something went wrong please try again";
    });
    //////////////////////////////////////////////////////////////////////////////////////
    builder.addCase(UpdateAlert.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(UpdateAlert.fulfilled, (state, action) => {
      let newArray = state.alerts.map((item) => {
        if (item.sequenceNumber == action.payload.alert.alertId) {
          let alert: AlertType = {
            ...action.payload.alert,
            accountId: Number(item.accountId),
            sequenceNumber: action.payload.alert.alertId,
            transmissionType: action.payload.alert.email
              ? "Email"
              : action.payload.alert.text
              ? "Text"
              : "Phone",
            transmissionsFieldValue: "",
            requestDate: new Date().toLocaleDateString("en-US"),
            requestTime: "",
            flag: "Once",
            accountName: action.payload.accountName,
            comparisonOperator: action.payload.alert.comparisonOperator,
            type:
              action.payload.alert.type == AlertTypeEnum.AccountAlert
                ? "A"
                : action.payload.alert.type == AlertTypeEnum.EventAlert
                ? "E"
                : "S",
          };
          return alert;
        }
        return item;
      });
      state.alerts = newArray;
      state.loading = false;
      state.message = "Successfully updated alert";
      state.status = true;
    });
    builder.addCase(UpdateAlert.rejected, (state, action) => {
      //console.log(action.payload);
      state.loading = false;
      state.error = action.payload.error;
      state.message = "Something went wrong please try again";
    });
    //////////////////////////////////////////////////////////////////////////////////////
    builder.addCase(DeleteAlert.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(DeleteAlert.fulfilled, (state, action) => {
      let array = state.alerts.filter(
        (item) => item.sequenceNumber != action.payload.alertId
      );
      state.alerts = array;
      state.loading = false;
      state.status = true;
      state.message = "Successfully deleted alert";
    });
    builder.addCase(DeleteAlert.rejected, (state, action) => {
      //console.log(action.payload);
      state.loading = false;
      state.error = action.payload.error;
      state.message = "Something went wrong please try again";
    });
  },
});

export default alertSlice.reducer;
