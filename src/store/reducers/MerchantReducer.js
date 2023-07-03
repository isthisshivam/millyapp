const initialState = {
  status: false,
  newMerchantStatus: false,
  deleteStatus: false,
  error: undefined,
  merchants: [],
};

const New_Merchant = "New_Merchant";
const Edit_Merchant = "Edit_Merchant";
const Delete_Merchant = "Delete_Merchant";
const Get_Merchants = "Get_Merchants";
const API_Request_Sent = "API_Request_Sent";
const API_Request_Completed = "API_Request_Completed";
const API_Request_Error = "API_Request_Error";

export const MerchantReducer = (state = initialState, action) => {
  switch (action.type) {
    case Get_Merchants:
      return { status: true, merchants: action.payload };

    case New_Merchant:
      if (action.payload.status == "Error") {
        return {
          ...state,
          error: action.payload.error.message,
          status: "Error",
        };
      }
      return {
        ...state,
        status: true,
        merchants: [...state?.merchants, action.payload.data],
        message: "Successfully added new merchant",
      };

    case Edit_Merchant:
      let {
        merchantName,
        address1,
        address2,
        city,
        currentAccountNumber,
        zip,
        merchantAccount,
      } = action.payload;
      let newState = state?.merchants?.map((merchant) => {
        if (merchant.merchantAccount == merchantAccount) {
          return {
            merchantName: merchantName,
            address1: address1,
            address2: address2,
            city: city,
            state: action.payload.state,
            zip: zip,
            merchantAccount: merchantAccount,
          };
        }
        //Leave rest of merchants unchanged
        return merchant;
      });
      return {
        ...state,
        status: true,
        merchants: newState,
        message: "Successfully updated merchant",
      };

    case Delete_Merchant:
      let newMerchants = state?.merchants?.filter(
        (item) => item.merchantAccount !== action.payload.merchantAccount
      );
      return {
        newMerchantStatus: false,
        status: false,
        deleteStatus: true,
        merchants: newMerchants,
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
        deleteStatus: false,
        newMerchantStatus: false,
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
