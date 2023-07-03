export type Reminder = {
  id: number;
  name: string;
  createdDate: string;
  startDate: string;
  frequency: string;
  ignored?: boolean;
  amount: number;
};

export type AddPayload = {
  type: 2;
  name: string;
  startDate: string;
  frequency: string;
  amount: number;
  rating: null;
};

export type EditPayload = {
  id: number;
  oldType: number;
  frequency: string;
  type: number;
  name: string;
  amount: number;
  rating?: null;
  newDate: string;
};

export type InitialStateType = {
  status: boolean | string;
  loading: boolean;
  error: string | boolean | object;
  message: string;
  reminders: Reminder[];
};
