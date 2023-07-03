import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  InitialStateType,
  SubscriptionType,
  SubscriptionPayload,
  UpdateSubscriptionType,
  RateSubscriptionPayload,
} from "../../../types/subscriptions/types";
import ApiCalls from "../../../utils/ApiCalls";
import Global from "../../../utils/env";
import { formatDateYYMMDD } from "../../../utils/utils";

type ErrorType = {
  //status: "Error";
  error: any;
};
type SuccessType = {
  data: SubscriptionType[];
};

/////////////////////////////////////////////////////////////////////////////
export const GetSubscriptions = createAsyncThunk(
  "subscriptions/GetSubscriptions",
  async () => {
    try {
      const response = await ApiCalls.GetRequest(Global.GetSubscriptions);

      if (response.status == 200) {
        return {
          data: response.data,
        };
      }
    } catch (error) {
      //console.log(error);
      return {
        error: error,
      };
    }
  }
);
/////////////////////////////////////////////////////////////////////////////

type CreateSuccess = {
  newItem: SubscriptionType;
};
export const CreateSubscription = createAsyncThunk<
  CreateSuccess,
  SubscriptionPayload,
  { rejectValue: ErrorType }
>("subscriptions/createSubscription", async (payload, thunkApi) => {
  try {
    let date = formatDateYYMMDD(payload.startDate);
    let data = {
      ...payload,
      startDate: date,
    };
    const response = await ApiCalls.PostRequest(Global.AddSubscription, data);

    if (response.status == 200 || 201) {
      let newObj: SubscriptionType = {
        ...payload,
        rating: 5,
        ignored: false,
        previousDate: "",
        id: response.data,
        createdDate: payload.startDate,
      };
      return { newItem: newObj };
    }
  } catch (error) {
    //console.log(error);
    return thunkApi.rejectWithValue({
      error: error,
    });
  }
});
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
type UpdateSuccess = {
  item: SubscriptionType;
};

type UpdateError = {
  // message: string;
  error: object;
};
export const UpdateSubscription = createAsyncThunk<
  UpdateSuccess,
  UpdateSubscriptionType,
  { rejectValue: UpdateError }
>("subscriptions/UpdateSubscription", async (payload, thunkApi) => {
  try {
    const response = await ApiCalls.PostRequest(
      Global.UpdateSubscription,
      payload
    );

    if (response.status == 200) {
      let newSub: SubscriptionType = {
        ...payload,
        ignored: false,
        previousDate: "",
        id: payload.id,
        createdDate: payload.newDate,
        startDate: payload.newDate,
        rating: payload.rating,
      };
      return {
        item: newSub,
      };
    }
  } catch (error) {
    return thunkApi.rejectWithValue({
      error: error,
    });
  }
});
// ///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
type RateSuccess = {
  id: number;
  rating: number;
};

type RateError = {
  // message: string;
  error: object;
};
export const RateSubscription = createAsyncThunk<
  RateSuccess,
  RateSubscriptionPayload,
  { rejectValue: RateError }
>("subscriptions/RateSubscription", async (payload, thunkApi) => {
  try {
    const response = await ApiCalls.PostRequest(
      Global.UpdateSubscription,
      payload
    );

    if (response.status == 200) {
      return {
        id: payload.id,
        rating: payload.rating,
      };
    }
  } catch (error) {
    return thunkApi.rejectWithValue({
      error: error,
    });
  }
});
// ///////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////
type DeleteSuccess = {
  id: number;
};

type DeletePayload = {
  id: number[];
  type: 0;
};

export const DeleteSubscription = createAsyncThunk<
  DeleteSuccess,
  DeletePayload,
  { rejectValue: UpdateError }
>("household/DeleteSubscription", async (payload, thunkApi) => {
  try {
    const response = await ApiCalls.PostRequest(
      Global.DeleteSubscription,
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
/////////////////////////////////////////////////////////////////////////////
export const GetSubscriptionPopup = createAsyncThunk(
  "subscriptions/GetSubscriptionPop",
  async () => {
    try {
      const response = await ApiCalls.GetRequest(Global.GetSubsriptionPopups);

      if (response.status == 200) {
        return {
          data: response.data,
        };
      } else {
        return { data: [] };
      }
    } catch (error) {
      //console.log(error);
      return {
        error: error,
      };
    }
  }
);
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
type HistoryPayload = number;
export const GetSubscriptionPopupHistory = createAsyncThunk<
  any,
  HistoryPayload
>("subscriptions/GetSubscriptionPopHistory", async (payload) => {
  try {
    const response = await ApiCalls.GetRequest(
      `${Global.GetPopupHistory}/${payload}`
    );

    if (response.status == 200) {
      return {
        data: response.data,
      };
    }
  } catch (error) {
    //console.log(error);
    return {
      error: error,
    };
  }
});
/////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
const initialState: InitialStateType = {
  status: false,
  loading: false,
  error: undefined,
  message: undefined,
  subscriptions: [],
  subscriptionsToPopup: [],
  subscriptionHistory: [],
};

const subscriptionSlice = createSlice({
  name: "subscriptions",
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
    builder.addCase(GetSubscriptions.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetSubscriptions.fulfilled, (state, action) => {
      state.loading = false;
      state.subscriptions = [...action.payload.data];
    });
    builder.addCase(GetSubscriptions.rejected, (state, action) => {
      //state.error = action.error.code;
      //state.message = "Please try again";
      state.loading = false;
      //state.status = "Error";
    });
    //////////////////////////////////////////////////////////////////////////

    builder.addCase(CreateSubscription.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(CreateSubscription.fulfilled, (state, action) => {
      state.subscriptions = [...state.subscriptions, action.payload.newItem];
      state.loading = false;
      state.status = true;
      state.message = "Successfully Added Subscription";
    });
    builder.addCase(CreateSubscription.rejected, (state, action) => {
      state.error = action.error.code;
      state.message = "Something went wrong, please try again";
      state.loading = false;
      state.status = "Error";
    });
    //////////////////////////////////////////////////////////////////////////
    builder.addCase(UpdateSubscription.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(UpdateSubscription.fulfilled, (state, action) => {
      let updatedSub = state.subscriptions?.map((item: SubscriptionType) => {
        if (item.id == action.payload.item.id) {
          let obj: SubscriptionType = {
            ...action.payload.item,
          };
          return obj;
        }
        return item;
      });
      state.subscriptions = [...updatedSub];
      state.loading = false;
      state.status = true;
      state.message = "Successfully updated subscription";
    });
    builder.addCase(UpdateSubscription.rejected, (state, action) => {
      // console.log(action.payload);
      state.error = action.error.code;
      state.message = "Something went wrong, please try again";
      state.loading = false;
      state.status = "Error";
    });
    ///////////////////////////////////////////////////////////////////////////
    builder.addCase(DeleteSubscription.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(DeleteSubscription.fulfilled, (state, action) => {
      let subscriptions = state.subscriptions?.filter(
        (item) => item.id != action.payload.id
      );

      state.subscriptions = [...subscriptions];
      state.loading = false;
      state.status = true;
      state.message = "Successfully deleted subscription";
    });
    builder.addCase(DeleteSubscription.rejected, (state, action) => {
      // console.log(action.payload);
      state.error = action.error.code;
      state.message = "Something went wrong, please try again";
      state.loading = false;
      state.status = "Error";
    });
    ///////////////////////////////////////////////////////////////////////////
    builder.addCase(GetSubscriptionPopup.pending, (state, action) => {
      state.subscriptionsToPopup = [];
    });
    builder.addCase(GetSubscriptionPopup.fulfilled, (state, action) => {
      state.subscriptionsToPopup = action.payload.data;
    });
    builder.addCase(GetSubscriptionPopup.rejected, (state, action) => {
      state.subscriptionsToPopup = [];
    });
    ///////////////////////////////////////////////////////////////////////////
    builder.addCase(GetSubscriptionPopupHistory.pending, (state, action) => {
      state.subscriptionsToPopup = [];
    });
    builder.addCase(GetSubscriptionPopupHistory.fulfilled, (state, action) => {
      state.subscriptionHistory = [
        ...state.subscriptionHistory,
        ...action.payload.data,
      ];
    });
    builder.addCase(GetSubscriptionPopupHistory.rejected, (state, action) => {
      //state.subscriptionsToPopup = [];
    });
    ///////////////////////////////////////////////////////////////////////////
    builder.addCase(RateSubscription.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(RateSubscription.fulfilled, (state, action) => {
      let updatedSub = state.subscriptions?.map((item: SubscriptionType) => {
        if (item.id == action.payload.id) {
          let obj: SubscriptionType = {
            ...item,
            rating: action.payload.rating,
          };
          return obj;
        }
        return item;
      });
      state.subscriptions = [...updatedSub];
      let array = state.subscriptionsToPopup?.filter(
        (item) => item.id != action.payload.id
      );
      state.subscriptionsToPopup = [...array];
      state.status = true;
      state.loading = false;
    });
    builder.addCase(RateSubscription.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export const { reset } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
