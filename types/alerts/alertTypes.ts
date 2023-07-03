export const enum AlertTypeEnum {
  AccountAlert = 0,
  EventAlert = 1,
  SmartAlert = 2,
}

export const enum ComparisonOperators {
  LessThan = "<",
  GreaterThan = ">",
  NoComparison = "A",
  EqualTo = "=",
}

export type SmartAlert = {
  amount: number;
  fromAccount: string;
  fromAccountId: number;
  id: number;
  toAccount: string;
  toAccountId: number;
  tranType: string;
};

export type AlertType = {
  sequenceNumber: number;
  type: "A" | "S" | "E";
  alert: string;
  accountName: string;
  accountId: number;
  field: string | "balance" | "amount";
  comparisonOperator: ComparisonOperators;
  value: string;
  transmissionType: string;
  requestDate: string;
  requestTime: string;
  flag: string;
  transmissionsFieldValue: string;
  smartAlertInformation?: SmartAlert;
};

export type CreateAlertType = {
  type: AlertTypeEnum;
  flag: 6;
  alert: string;
  field: string | "balance" | "amount";
  comparisonOperator: ComparisonOperators;
  value: string;
  phone: boolean;
  text: boolean;
  email: boolean;
  accountId: string;
  accountName: string;
  message?: string;
  fromAccountId?: string | undefined;
  toAccountId?: string | undefined;
  amount?: number | undefined;
  description?: string;
  startDate?: string;
  alertId?: number;
};

export type AccountAlertPayload = {
  type: AlertTypeEnum;
  flag: 6;
  alert: string;
  field: "balance";
  comparisonOperator: ComparisonOperators;
  value: string;
  phone: boolean;
  text: boolean;
  email: boolean;
  accountId: string;
};

export type EventAlertPayload = {
  accountId: string; // "-954907671";
  alert: string; // "Testing bug";
  comparisonOperator: string; // "A";
  email: boolean;
  field: string; // "date";
  flag: 6;
  phone: boolean;
  text: boolean;
  type: AlertTypeEnum;
  value: string; // "2023-01-27";
};
export type initialStateType = {
  status: boolean | string;
  loading: boolean;
  error: string | number;
  message: string;
  alerts: AlertType[];
};

export type DeletePayloadType = {
  alertId: number;
  type: AlertTypeEnum;
};
