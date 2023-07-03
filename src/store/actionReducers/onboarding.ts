import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiCalls from "../../../utils/ApiCalls";
import Global from "../../../utils/env";
import { UserInfoType, initialStateType } from "../types/onboarding/type";
import { ContactInfoType } from "../types/profile";
import { MemberType } from "../types/household/type";

///////////////////////////////////////////////////////////////////////////

type Household = MemberType[];

export const CreateHousehold = createAsyncThunk<any, Household>(
  "onboarding/CreateHousehold",
  async (payload: Household) => {
    try {
      const response = await ApiCalls.PostRequest(
        Global.CreateHousehold,
        payload
      );

      if (response.status == 200) {
        return { status: true };
      }
      if (response.status == 400) {
        // console.log("error caught in onboarding if check");
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

const initialState: initialStateType = {
  status: false,
  loading: false,
  error: undefined,
  message: undefined,
  idVerified: true,
  failedVerify: false,
  attempts: 0,
  selfieAttempts: 0,
  failedSelfie: false,
  selfieVerified: false,
  requestId: undefined,
  documentVerificationResult: undefined,
  selfie: undefined,
  info: {
    firstName: undefined,
    lastName: undefined,
    address1: undefined,
    address2: undefined,
    city: undefined,
    state: undefined,
    zip: undefined,
    country: undefined,
    email: undefined,
    mobilePhone: undefined,
    birthday: undefined,
    homePhone: undefined,
    workPhone: undefined,
    cellPhone: undefined,
    gender: undefined,
  },
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    reset: () => {
      return {
        ...initialState,
        error: undefined,
        message: undefined,
        status: false,
      };
    },
  },
  extraReducers: (builder) => {
    ////////Create Household////////
    builder.addCase(CreateHousehold.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(CreateHousehold.fulfilled, (state, action) => {
      state.status = true;
      state.loading = false;
    });
    builder.addCase(CreateHousehold.rejected, (state, action) => {
      //console.log(action.payload);
      state.loading = false;
      state.error = action.error.code;
      state.message = "Something went wrong please try again";
    });
  },
});

export const { reset } = onboardingSlice.actions;
export default onboardingSlice.reducer;
