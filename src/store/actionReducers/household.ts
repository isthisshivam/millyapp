import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiCalls from "../../../utils/ApiCalls";
import Global from "../../../utils/env";
import {
  DeletePayload,
  InitialStateType,
  MemberType,
  UpdateMemberType,
} from "../types/household/type";

type ErrorType = {
  //status: "Error";
  error: number;
};
type SuccessType = {
  data: MemberType[];
};
type Household = MemberType[];

export const CreateHousehold = createAsyncThunk<
  SuccessType,
  Household,
  { rejectValue: ErrorType }
>("household/CreateHousehold", async (payload, thunkApi) => {
  try {
    const response = await ApiCalls.PostRequest(
      Global.CreateHousehold,
      payload
    );

    if (response.status == 200) {
      const data = await ApiCalls.GetRequest(Global.GetHousehold);

      return {
        data: data.data,
      };

      //return { data: payload };
    }
    // if (response.status == 400) {
    //   console.log("error caught in onboarding if check");
    // }
  } catch (error) {
    //console.log(error);
    return thunkApi.rejectWithValue({
      error: error,
    });
  }
});
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

export const GetHousehold = createAsyncThunk(
  "household/GetHousehold",
  async () => {
    try {
      const response = await ApiCalls.GetRequest(Global.GetHousehold);

      if (response.status == 200) {
        return {
          household: response.data,
        };
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
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
type UpdateSuccess = {
  item: UpdateMemberType;
};

type UpdateError = {
  // message: string;
  error: object;
};
export const UpdateMember = createAsyncThunk<
  UpdateSuccess,
  UpdateMemberType,
  { rejectValue: UpdateError }
>("household/UpdateMember", async (payload, thunkApi) => {
  try {
    const response = await ApiCalls.PostRequest(
      Global.UpdateHousehold,
      payload
    );

    if (response.status == 200) {
      return {
        item: payload,
      };
    }
  } catch (error) {
    return thunkApi.rejectWithValue({
      error: error,
    });
  }
});
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
type DeleteSuccess = {
  id: number;
};

export const DeleteMember = createAsyncThunk<
  DeleteSuccess,
  DeletePayload,
  { rejectValue: UpdateError }
>("household/DeleteMember", async (payload, thunkApi) => {
  try {
    const response = await ApiCalls.PostRequest(
      Global.DeleteHousehold,
      payload
    );

    if (response.status == 200) {
      return {
        id: payload.id[0],
      };
    }
  } catch (error) {
    //console.log(error);
    return thunkApi.rejectWithValue({
      error: error,
    });
  }
});
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
const initialState: InitialStateType = {
  status: false,
  loading: false,
  error: undefined,
  message: undefined,
  household: [],
};

const householdSlice = createSlice({
  name: "household",
  initialState,
  reducers: {
    reset: (state) => {
      return {
        ...state,
        error: undefined,
        message: undefined,
        status: false,
        loading: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CreateHousehold.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(CreateHousehold.fulfilled, (state, action) => {
      state.loading = false;
      state.household = [...state.household, ...action.payload.data];
      state.status = true;
      state.message = "Successully created household";
    });
    builder.addCase(CreateHousehold.rejected, (state, action) => {
      state.error = action.error.code;
      state.message = "Please try again";
      state.loading = false;
      state.status = "Error";
    });
    //////////////////////////////////////////////////////////////////////////

    builder.addCase(GetHousehold.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetHousehold.fulfilled, (state, action) => {
      state.household = action.payload.household;
      state.loading = false;
    });
    builder.addCase(GetHousehold.rejected, (state, action) => {
      // console.log(action.payload);
      state.error = action.error.code;
      state.message = "Something went wrong, please try again";
      state.loading = false;
      state.status = "Error";
    });
    /////////////////////////////////////////////////////////////////////////
    builder.addCase(UpdateMember.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(UpdateMember.fulfilled, (state, action) => {
      let updatedHouse = state.household?.map((item: MemberType) => {
        if (item.id == action.payload.item[0].id) {
          let obj: MemberType = {
            ...action.payload.item[0],
          };
          return obj;
        }
        return item;
      });
      state.household = [...updatedHouse];
      state.loading = false;
      state.status = true;
      state.message = "Successfully updated hpuse member";
    });
    builder.addCase(UpdateMember.rejected, (state, action) => {
      // console.log(action.payload);
      state.error = action.error.code;
      state.message = "Something went wrong, please try again";
      state.loading = false;
      state.status = "Error";
    });
    /////////////////////////////////////////////////////////////////////////
    builder.addCase(DeleteMember.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(DeleteMember.fulfilled, (state, action) => {
      let newHouse = state.household?.filter(
        (item) => item.id != action.payload.id
      );

      state.household = [...newHouse];
      state.loading = false;
      state.status = true;
      state.message = "Successfully deleted member";
    });
    builder.addCase(DeleteMember.rejected, (state, action) => {
      // console.log(action.payload);
      state.error = action.error.code;
      state.message = "Something went wrong, please try again";
      state.loading = false;
      state.status = "Error";
    });
  },
});
export const { reset } = householdSlice.actions;
export default householdSlice.reducer;
