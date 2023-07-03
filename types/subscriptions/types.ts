export type InitialStateType = {
  loading: boolean;
  status: string | boolean;
  message: string;
  error: number | string | object;
  subscriptions: SubscriptionType[];
  subscriptionsToPopup: SubscriptionPopUp[];
  subscriptionHistory: SubscriptionPopupHistory[];
};

export type SubscriptionType = {
  id: number;
  createdDate: string;
  name: string;
  startDate: string;
  frequency: string;
  amount: number;
  rating: number | null;
  ignored: false;
  previousDate: string;
  type?: 0;
  category?: string;
};

export type SubscriptionPayload = {
  type: 0;
  name: string;
  frequency: string;
  amount: number;
  startDate: string;
  rating?: number;
};
export type RateSubscriptionPayload = {
  id: number;
  rating: number;
  oldType: 0;
  type: 0;
};

export type UpdateSubscriptionType = {
  id: number;
  type: 0;
  oldType: 0;
  name: string;
  frequency: string;
  amount: number;
  //startDate: string;
  newDate: string;
  rating?: number;
};

export type SubscriptionPopUp = {
  id: number;
  createdDate: string;
  name: string;
  startDate: string;
  frequency: string;
  amount: number;
  ignored: false;
  previousDate: string;
};

export type SubscriptionPopupHistory = {
  id: number;
  createdDate: string;
  reminderId: number;
  fromRating: number;
  toRating: number;
};

export type ToggleSubscriptionPayload = {
  id: number[];
  ignore: boolean[];
};
