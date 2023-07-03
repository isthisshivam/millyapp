const initialState = {
  history: [],
  accounts: [],
  pending: [],
  status: false,
  error: undefined,
};
const New_Payment = "New_Payment";
const Get_BillPay_History = "Get_BillPay_History";
const Get_BillPay_Accounts = "Get_BillPay_Accounts";
const Get_Pending_History = "Get_Pending_History";
const API_Request_Sent = "API_Request_Sent";
const API_Request_Completed = "API_Request_Completed";
const API_Request_Error = "API_Request_Error";
const CREATE_BILLPAY_ACCOUNT = "CREATE_BILLPAY_ACCOUNT";
const DELETE_PENDING_PAY = "DELETE_PENDING_PAY";
const EDIT_PENDING_PAY = "EDIT_PENDING_PAY";

export const BillPayReducer = (state = initialState, action) => {
  switch (action.type) {
    case New_Payment:
      if (action.payload.error) {
        return {
          ...state,
          error: action.payload.error.message,
          status: "Error",
          message: action.payload.error.message,
        };
      }
      let startDate = new Date(action.payload.date); //Check if payment should be put into pending
      if (startDate > new Date()) {
        return {
          ...state,
          pending: [
            ...state.pending,
            {
              paydate: action.payload.date,
              payee: action.payload.merchantName,
              account: action.payload.accountId,
              amount: action.payload.amount,
            },
          ],
          status: true,
          message: "Successfully submitted payment",
        };
      } else {
        return {
          ...state,
          history: [
            ...state.history,
            {
              paydate: action.payload.date,
              payee: action.payload.merchantName,
              account: action.payload.accountId,
              amount: action.payload.amount,
            },
          ],
          status: true,
          message: "Successfully submitted payment",
        };
      }

    case Get_BillPay_History:
      return { ...state, history: action.payload };
    case Get_Pending_History:
      return { ...state, pending: action.payload };
    case Get_BillPay_Accounts:
      return { ...state, accounts: action.payload };

    case DELETE_PENDING_PAY:
      if (action.payload.status == "Error") {
        return {
          ...state,
          status: action.payload.status,
          error: action.payload.message,
        };
      }
      let newPending = state.pending.filter(
        (item) => item.invoice != action.payload.data.invoice
      );
      return {
        ...state,
        pending: newPending,
        status: true,
      };
    case EDIT_PENDING_PAY:
      if (action.payload.status == "Error") {
        return {
          ...state,
          status: action.payload.status,
          error: action.payload.message,
        };
      }
      let updatedPending = state.pending.map((item) => {
        if (item.invoice == action.payload.data.invoice) {
          return { ...action.payload.data };
        }
        return;
      });
      return {
        ...state,
        pending: updatedPending,
        status: action.payload.status,
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
