const initialState = {
  status: false,
  error: undefined,
  fromOrder: [],
  toOrder: [],
  history: [
    {
      accountTo: "american express",
      startdate: "Mon Sep 04 2021 15:25:55 GMT-0400",
      time: "12:01 pm",
      amount: 1000.0,
      type: "Received",
      postedDate: "Mon Oct 18 2021 15:25:55 GMT-0400",
      remainingBalance: 1285.68,
      id: 1,
    },
    {
      accountTo: "china-unionpay",
      startdate: "Fri Oct 15 2021 15:25:55 GMT-0400",
      time: "2:02 pm",
      amount: -14.32,
      type: "Sent",
      postedDate: "Mon Oct 18 2021 15:25:55 GMT-0400",
      remainingBalance: 1038.18,
      id: 2,
    },
    {
      accountTo: "visa-electron",
      startdate: "Fri Oct 15 2021 15:25:55 GMT-0400",
      time: "6:32 am",
      amount: -23.54,
      type: "Received",
      postedDate: "Mon Oct 18 2021 15:25:55 GMT-0400",
      remainingBalance: 1052.5,
      id: 3,
    },
    {
      accountTo: "american express",
      startdate: "Thu Sep 23 2021 15:25:55 GMT-0400",
      time: "4:32 pm",
      amount: -4.95,
      type: "Sent",
      postedDate: "Mon Oct 18 2021 15:25:55 GMT-0400",
      remainingBalance: 1285.68,
      id: 4,
    },
    {
      accountTo: "china-unionpay",
      startdate: "Tue Sep 21 2021 15:25:55 GMT-0400",
      time: "2:12 pm",
      amount: -14.99,
      type: "Received",
      postedDate: "Mon Oct 18 2021 15:25:55 GMT-0400",
      remainingBalance: 1285.68,
      id: 5,
    },
    {
      accountTo: "china-unionpay",
      startdate: "Fri Oct 15 2021 15:25:55 GMT-0400",
      time: "12:01 pm",
      amount: -8.52,
      type: "Sent",
      postedDate: "Mon Oct 18 2021 15:25:55 GMT-0400",
      remainingBalance: 1076.04,
      id: 6,
    },
    {
      accountTo: "visa-electron",
      startdate: "Wed Sep 22 15:25:55 GMT-0400",
      time: "1:32 am",
      amount: -641.52,
      type: "Received",
      postedDate: "Mon Oct 18 2021 15:25:55 GMT-0400",
      remainingBalance: 1285.68,
      id: 7,
    },
    {
      accountTo: "american express",
      startdate: "Mon Oct 1 2021 15:25:55 GMT-0400",
      time: "2:02 pm",
      amount: -59.95,
      type: "Sent",
      postedDate: "Mon Oct 18 2021 15:25:55 GMT-0400",
      remainingBalance: 1285.68,
      id: 8,
    },
  ],
};

const Submit_Transfer = "Submit_Transfer";
const Update_From_Order = "Update_From_Order";
const Update_To_Order = "Update_From_Order";
const Get_From_Order = "Get_From_Order";
const Get_To_Order = "Get_To_Order";
const API_Request_Sent = "API_Request_Sent";
const API_Request_Completed = "API_Request_Completed";
const API_Request_Error = "API_Request_Error";

export const TransferReducer = (state = initialState, action) => {
  switch (action.type) {
    case Submit_Transfer:
      return {
        ...state,
        status: true,
        history: [...state.history, action.payload],
        message: "Successfully submitted transfer",
      };
    case Get_From_Order:
      //If no order return regular accounts
      let order = action.payload?.map((item) => {
        return Number(item.accountId);
      });
      return {
        ...state,
        //toOrder: state.toOrder,
        fromOrder: order,
        //history: [...state.history],
      };
    case Get_To_Order:
      //If no order return regular accounts
      let orders = action.payload?.map((item) => {
        return Number(item.accountId);
      });
      return {
        ...state,
        //fromOrder: state.fromOrder,
        toOrder: orders,
        //history: [...state.history, action.payload],
      };
    case Update_From_Order:
      return {
        ...state,
        //status: true,
        fromOrder: action.payload.accountIds,
        // history: [...state.history, action.payload],
      };
    case Update_To_Order:
      return {
        ...state,
        //status: true,
        toOrder: action.payload.accountIds,
        //history: [...state.history, action.payload],
      };

    case API_Request_Sent:
      return {
        ...state,
        status: "pending",
      };
    case API_Request_Completed:
      return {
        ...state,
        status: false,
        error: undefined,
      };

    case API_Request_Error:
      return {
        ...state,
        status: "Error",
        error: action.payload,
      };

    default:
      return state;
  }
};
