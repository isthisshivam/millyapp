import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { AccountReducer } from "./reducers/AccountReducer";
import { BillPayReducer } from "./reducers/BillPayReducer";
import CheckImagesReducer from "./reducers/CheckImagesReducer";
import { DepositReducer } from "./reducers/DepositReducer";
import { eSafeReducer } from "./reducers/eSafeReducer";
import { ExpenseReducer } from "./reducers/ExpenseReducer";
import { MerchantReducer } from "./reducers/MerchantReducer";
import { MessageReducer } from "./reducers/MessageReducer";
import { ProfileReducer } from "./reducers/ProfileReducer";
import { ReminderReducer } from "./reducers/ReminderReducers";
import { RewardsReducer } from "./reducers/rewardReducer";
import { SubscriptionReducer } from "./reducers/SubscriptionReducer";
import { TransferReducer } from "./reducers/TransferReducer";
import { TransactionReducer } from "./reducers/TransactionReducer";
import { commercialReducer } from "./reducers/commercialReducer";
import { HouseReducer } from "./reducers/HouseReducer";
import client from "./actionReducers/client";
import onboarding from "./actionReducers/onboarding";
import vehicles from "./actionReducers/vehicles";
import auth from "./actionReducers/auth";
import register from "./actionReducers/register";
import alerts from "./actionReducers/alerts";
import accounts from "./actionReducers/accounts";
import transfers from "./actionReducers/transfers";
import { AppConfigReducer } from "./actionReducers/AppConfigReducer";
import reminders from "./actionReducers/reminders";
import household from "./actionReducers/household";
import subscriptions from "./actionReducers/subscriptions";
import appState from "./actionReducers/appState";
import profile from "./actionReducers/profile";

export const store = configureStore(
  {
    reducer: {
      accounts: AccountReducer,
      accountHistory: accounts,
      alerts: alerts,
      appState: appState,
      auth: auth,
      billPays: BillPayReducer,
      checkImages: CheckImagesReducer,
      client: client,
      commercial: commercialReducer,
      config: AppConfigReducer,
      deposits: DepositReducer,
      eSafe: eSafeReducer,
      expenses: ExpenseReducer,
      merchants: MerchantReducer,
      messages: MessageReducer,
      onboarding: onboarding,
      profile: profile,
      register: register,
      reminders: reminders,
      rewards: RewardsReducer,
      subscriptions: subscriptions,
      transfers: TransferReducer,
      transferHistory: transfers,
      transactions: TransactionReducer,
      vehicles: vehicles,
      house: household,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  }
  //composeWithDevTools(applyMiddleware(...middleware))
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
