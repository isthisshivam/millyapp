const Get_Commercial_Accounts = "Get_Commercial_Accounts";
const Get_Request_Types = "Get_Request_Types";
const Get_Permissions = "Get_Permissions";
const Get_Templates = "Get_Templates";
const Get_History = "Get_History";
const Send_Cash = "Send_Cash";
const Collect_Cash = "Collect_Cash";
const API_Request_Completed = "API_Request_Completed";
const API_Request_Error = "API_Request_Error";
const Select_Template = "Select_Template";
const One_Time_ACH = "One_Time_ACH";
const Add_Template = "Add_Template";
const Add_User = "Add_user";
const UPDATE_PERMISSIONS = "UPDATE_PERMISSIONS";
const GET_USER_PERMISSIONS = "GET_USER_PERMISSIONS";

const initialState = {
  request: [],
  pending: [
    {
      recordId: 1,
      accountNumber: 817,
      templateName: "Payroll",
      requestType: "3",
      achType: "Send",
      company: "",
      account: 817,
      totalAmount: 12486.23,
      effectiveDate: "09/28/2022",
      enteredBy: "Demos1234",
      submitted: "09/01/2022",
      status: "Waiting Approval",
      description: "Lorem ipsum eo vrwagr ai vfbeivbeia fgyu fguia",
      destAccounts: [
        {
          accountNumber: 123465,
          accountType: "Checking",
          routing: 1234567898,
          description: "Lorem ipsum eo vrwagr ai vfbeivbeia fgyu fguia",
          id: 1,
          amount: 300,
          firstName: "Shawn",
          lastName: "Barbel",
        },
      ],
    },
    {
      recordId: 2,
      accountNumber: 817,
      templateName: "Vendor",
      company: "",
      requestType: "3",
      achType: "Collect",
      account: 817,
      totalAmount: 2726.43,
      effectiveDate: "09/12/2022",
      enteredBy: "Demos1234",
      submitted: "08/18/2022",
      status: "Waiting Approval",
      destAccounts: [
        {
          accountNumber: 123465,
          accountType: "Checking",
          routing: 1234567898,
          details: "Lorem ipsum eo vrwagr ai vfbeivbeia fgyu fguia",
          id: 2,
          amount: 300,
          firstName: "Shawn",
          lastName: "Barbel",
          notes: undefined,
        },
      ],
    },
  ],
  history: [],
  achRequests: [
    {
      recordId: 1,
      accountNumber: 817,
      templateName: "Payroll",
      requestType: "3",
      achType: "Send",
      companyId: "Worldwide",
      debitAccount: 817,
      totalAmount: 12486.23,
      effectiveDate: "09/28/2022",
      enteredBy: "Demos1234",
      submitted: "09/01/2022",
      status: "Waiting Approval",
      templateDescription: "Lorem ipsum eo vrwagr ai vfbeivbeia fgyu fguia",
      destAccounts: [
        {
          accountNumber: 123465,
          accountType: "Checking",
          routing: 1234567898,
          description: "Lorem ipsum eo vrwagr ai vfbeivbeia fgyu fguia",
          id: 1,
          amount: 300,
          firstName: "Shawn",
          lastName: "Barbel",
        },
      ],
    },
    {
      recordId: 2,
      accountNumber: 817,
      templateName: "Vendor",
      companyId: "AMCE Inc",
      requestType: "3",
      achType: "Collect",
      debitAccount: 817,
      totalAmount: 2726.43,
      effectiveDate: "09/12/2022",
      enteredBy: "Demos1234",
      submitted: "08/18/2022",
      status: "Waiting Approval",
      templateDescription: "Lorem ipsum eo vrwagr ai vfbeivbeia fgyu fguia",
      destAccounts: [
        {
          accountNumber: 123465,
          accountType: "Checking",
          routing: 1234567898,
          details: "Lorem ipsum eo vrwagr ai vfbeivbeia fgyu fguia",
          id: 2,
          amount: 300,
          firstName: "Shawn",
          lastName: "Barbel",
          notes: undefined,
        },
      ],
    },
  ],

  templates: [],
  users: [],
  accounts: [],
  permissions: {},
  requestTypes: [],
  status: false,
  error: undefined,
  message: undefined,
  selectedTemplate: undefined,
};

export const commercialReducer = (state = initialState, action) => {
  switch (action.type) {
    case Get_Commercial_Accounts:
      return { ...state, accounts: action.payload };
    case Get_Request_Types:
      return {
        ...state,
        requestTypes: action.payload,
      };
    case GET_USER_PERMISSIONS:
      if (action.payload.error) {
        return {
          ...state,
          status: "Error",
          error: action.payload.error,
          message: "Something went wrong getting user permissions",
        };
      }

      return {
        ...state,
        users: action.payload.data,
        status: true,
      };

    case Get_Templates:
      return {
        ...state,
        templates: Object.values(action.payload),
      };
    case Get_History:
      return {
        ...state,
        history: action.payload,
      };

    case Add_Template:
      return {
        ...state,
        status: true,
        templates: [...state.templates, action.payload],
        message: "Successfully Added New Template",
      };
    case One_Time_ACH:
      if (action.payload.error) {
        return {
          ...state,
          status: "Error",
          message: "Something went wrong please try again",
          error: action.payload.error.message,
        };
      }
      return {
        ...state,
        status: true,
        message: "Successfully Submitted ACH Request",
        achRequests: [...state.achRequests, action.payload],
      };
    case Collect_Cash:
      return {
        ...state,
        status: true,
        message: "Successfully Submitted ACH Collect Request",
      };

    case Select_Template:
      return {
        ...state,
        //status: true,
        selectedTemplate: action.payload,
      };

    case Add_User:
      return {
        ...state,
        users: [...state.users, payload],
      };

    case UPDATE_PERMISSIONS:
      if (action.payload.status == "Error") {
        return {
          ...state,
          error: action.payload.error,
          message: "Sorry something went wrong",
          status: "Error",
        };
      }
      let newUsers = state.users.map((item) => {
        if (item.id == action.payload.data.id) {
          return {
            ...item,
            ...action.payload.data,
          };
        }
        return item;
      });
      return {
        ...state,
        status: true,
        users: newUsers,
      };
    case API_Request_Error:
      return { ...state, status: "Error", message: action.payload };
    case API_Request_Completed:
      return { ...state, status: false, message: undefined, error: false };
    default:
      return state;
  }
};
