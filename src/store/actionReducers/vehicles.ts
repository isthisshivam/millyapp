import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiCalls from "../../../utils/ApiCalls";
import Global from "../../../utils/env";
import {
  AddVehicleType,
  EditVehicleType,
  VehicleType,
} from "../../../types/vehicles/vehicleType";
import { formatDateYYMMDD } from "../../../utils/utils";

type AddVehicleSuccess = {
  status: true;
  item: VehicleType;
};

type ErrorType = {
  status: "Error";
  error: number;
  message: string;
};
export const AddVehicle = createAsyncThunk<
  AddVehicleSuccess,
  AddVehicleType,
  { rejectValue: ErrorType }
>("vehicles/addVehicle", async (payload, thunkAPI) => {
  try {
    const response = await ApiCalls.PostRequest(Global.NewVehicle, payload);
    if (response.status == 200 || 201) {
      return {
        status: true,
        item: {
          id: response.data,
          type: payload.type,
          year: payload.year,
          make: payload.make,
          model: payload.model,
          paymentDate: payload.buyDate,
          paymentAmount: payload.buyAmount,
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

export const UpdateVehicle = createAsyncThunk<
  any,
  EditVehicleType,
  { rejectValue: ErrorType }
>("vehicles/updateVehicle", async (payload, thunkAPI) => {
  try {
    const response = await ApiCalls.PostRequest(Global.UpdateVehicle, payload);
    if (response.status == 200) {
      return {
        status: true,
        item: payload,
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
export const DeleteVehicle = createAsyncThunk<
  any,
  { id: number[] },
  { rejectValue: ErrorType }
>("vehicles/deleteVehicle", async (payload, thunkAPI) => {
  try {
    const response = await ApiCalls.PostRequest(Global.DeleteVehicle, payload);
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
export interface GetVehiclesSuccess {
  status: string | boolean;
  vehicles: VehicleType[];
}

export const GetVehicles = createAsyncThunk(
  "vehicles/GetVehicles",
  async (thunkAPI) => {
    try {
      const response = await ApiCalls.GetRequest(Global.GetVehicles);

      if (response.status == 200) {
        return { status: true, vehicles: response.data };
      }
    } catch (error) {
      return {
        error: error.response.status,
        message: error.message,
      };
    }
  }
);
//////////////////////////////////////////////////////////////////////////////////
export interface GetVehiclesSuccess {
  status: string | boolean;
  vehicles: VehicleType[];
}

export const GetVehicleData = createAsyncThunk(
  "vehicles/GetVehicles",
  async (thunkAPI) => {
    try {
      const response = await ApiCalls.GetRequest(Global.GetVehicles);

      if (response.status == 200) {
        return { status: true, vehicles: response.data };
      }
    } catch (error) {
      return {
        error: error.response.status,
        message: error.message,
      };
    }
  }
);

type InitialStateType = {
  status: boolean | string;
  loading: boolean;
  error: string | boolean | object;
  message: string;
  vehicles: VehicleType[];
};
const initialState: InitialStateType = {
  status: false,
  loading: false,
  error: undefined,
  message: undefined,
  vehicles: [],
};

const vehicleSlice = createSlice({
  name: "vehicles",
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
    builder.addCase(AddVehicle.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(AddVehicle.fulfilled, (state, action) => {
      state.loading = false;
      state.vehicles = [...state.vehicles, action.payload.item];
      state.status = true;
      state.message = "Successfully added vehicle";
    });
    builder.addCase(AddVehicle.rejected, (state, action) => {
      state.error = action.error.code;
      state.message = "Please try again";
      state.loading = false;
      state.status = "Error";
    });
    ////////////////////////////////////////////////////////////////////////////////
    builder.addCase(UpdateVehicle.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(UpdateVehicle.fulfilled, (state, action) => {
      let newVehicles = state.vehicles.map((item) => {
        if (item.id == action.payload.item.id) {
          let obj: VehicleType = {
            id: action.payload.item.id,
            type: action.payload.item.type,
            year: action.payload.item.year,
            make: action.payload.item.make,
            model: action.payload.item.model,
            paymentDate: action.payload.item.buyDate,
            paymentAmount: action.payload.item.buyAmount,
          };
          return obj;
        }
        return item;
      });
      state.loading = false;
      state.vehicles = [...newVehicles];
      state.status = true;
      state.message = "Successfully updated vehicle";
    });
    builder.addCase(UpdateVehicle.rejected, (state, action) => {
      state.error = action.error.code;
      state.message = "Please try again";
      state.loading = false;
      state.status == "Error";
    });
    ////////////////////////////////////////////////////////////////////////////////
    builder.addCase(DeleteVehicle.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(DeleteVehicle.fulfilled, (state, action) => {
      let newArray = state.vehicles.filter(
        (item) => item.id != action.payload.id[0]
      );
      state.vehicles = newArray;
      state.loading = false;
      state.status = true;
      state.message = "Successfully deleted vehicle";
    });
    builder.addCase(DeleteVehicle.rejected, (state, action) => {
      // console.log(action.payload);
      state.error = action.error.code;
      state.message = "Something wwent wrong, please try again";
      state.loading = false;
      state.status = "Error";
    });
    ////////////////////////////////////////////////////////////////////////////////
    builder.addCase(GetVehicles.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetVehicles.fulfilled, (state, action) => {
      state.vehicles = action.payload.vehicles;
      state.loading = false;
    });
    builder.addCase(GetVehicles.rejected, (state, action) => {
      // console.log(action.payload);
      state.error = action.error.code;
      state.message = "Something wwent wrong, please try again";
      state.loading = false;
    });
  },
});
export const { reset } = vehicleSlice.actions;
export default vehicleSlice.reducer;
