export type AccountHistoryItem = {
  accountNumber: string; //"817";
  suffix: string; //"0";
  postDate: string; //"2021-01-08T00:00:00";
  recordId: string; //"210100039264";
  amount: number; //23.46;
  balance: number; //502.57;
  tranCode: string; // "SW";
  longDescription: string; //"01/07 16:16:41 POS NNT VT-DLC/YANKE         MONTPELIER   VT";
  hasLongDescription: true;
  trace: string; //"";
  principal: number; //23.46;
  interest: number; //0.0;
  teller: string; //"O/A";
  id: {
    accountNumber: string; //"817";
    suffix: string; //"0";
    postDate: string; //"2021-01-08T00:00:00";
    recordId: string; //"210100039264";
  };
};

export type InitialStateType = {
  status: boolean;
  loading: boolean;
  error: any;
  message: string;
  history: AccountHistoryItem[];
};
