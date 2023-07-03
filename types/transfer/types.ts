export type TransferHistoryItem = {
  recordId: number; //1136001;
  trancode: string; //"LPMT";
  postDate: string; //"10/27/2022";
  amount: number; //34.0;
  sequenceNumber: number; //0;
  fromAccountId: number; //-1252838344;
  toAccountId: number; //104055241;
};
export type initialStateType = {
  status: boolean | string;
  loading: boolean;
  error: object | number;
  message: string;
  savedAccounts: SavedAccount[];
  history: TransferHistoryItem[];
  externalHistory: ExternalHistoryItem[];
};

export enum FrequencyEnum {
  once = "Once",
  weekly = "Weekly",
  biWeekly = "Bi-Weekly",
  monthly = "Monthly",
}
export enum ConditionEnum {
  numofpayments = "numofpayments",
  maxamount = "maxamount",
  enddate = "enddate",
}

export type TransferType = {
  frequency: number; //1; //number of payments
  frequencyperiod: FrequencyEnum;
  amount: number;
  startdate: string; //StartDate
  accounttoid: number;
  accountfromid: number;
  principal: boolean;
  intereset: boolean;
  condition: ConditionEnum; //numofpayments, maxamount, enddate,
};

export type ExternalPayload = {
  debitAccountId: string;
  effectiveDate: string;
  isAdminUser: false;
  isMoneySend: boolean;
  isRetail: true;
  destinationAccounts: DestAccount[];
  startDate?: string;
};
export type ExternalHistoryItem = {
  recordId: number;
  maxTxAmount: number;
  debitAccount: string;
  controlAmount: number;
  debitAccountId: string;
  debitAccountType: string;
  requestTypeDescription: string;
  requestDate: string;
  destAccountRequests: DestinationExternalAcct[];
};
export type DestAccount = {
  aba: string;
  confirmRouting: string;
  accountNumber: string;
  confirmAccount: string;
  amount: number;
  alias: string;
};

export type DestinationExternalAcct = {
  destAcctId: number;
  createdAt: string;
  aba: string;
  accountNumber: string;
  accountType: number;
  amount: number;
  isDeleted: number;
  settlementFileId: number;
};

export type SavedAccount = {
  alias: string;
  routingNumber: string;
  accountNumber: string;
};

export type DeleteExternalAccountPayload = {
  aliases: SavedAccount[];
};
