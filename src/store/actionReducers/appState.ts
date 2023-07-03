import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiCalls from "../../../utils/ApiCalls";
import Global from "../../../utils/env";
import {
  AddVehicleType,
  EditVehicleType,
  VehicleType,
} from "../../../types/vehicles/vehicleType";
import { formatDateYYMMDD } from "../../../utils/utils";

type InitialStateType = {
  status: boolean | string;
  loading: boolean;
  error: string | boolean | object;
  message: string;
  showFab: boolean;
};
const initialState: InitialStateType = {
  status: false,
  loading: false,
  error: undefined,
  message: undefined,
  showFab: true,
};

const appSlice = createSlice({
  name: "appState",
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

    hideFab: (state) => {
      return {
        ...state,
        showFab: false,
      };
    },
    showFab: (state) => {
      return {
        ...state,
        showFab: true,
      };
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(AddVehicle.pending, (state, action) => {
    //   state.loading = true;
    // });
    // builder.addCase(AddVehicle.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.vehicles = [...state.vehicles, action.payload.item];
    //   state.status = true;
    //   state.message = "Successfully added vehicle";
    // });
    // builder.addCase(AddVehicle.rejected, (state, action) => {
    //   state.error = action.error.code;
    //   state.message = "Please try again";
    //   state.loading = false;
    //   state.status = "Error";
    // });
  },
});
export const { reset, hideFab, showFab } = appSlice.actions;
export default appSlice.reducer;
