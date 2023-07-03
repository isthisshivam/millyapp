const initialState = {
  status: false,
  subscriptions: [],
  error: undefined,
  message: undefined,
  get: false,
};
const Get_Subscriptions = "Get_Subscriptions";
const New_Subscription = "New_Subscription";
const Update_Subscription = "Update_Subscription";
const Delete_Subscription = "Delete_Subscription";
const API_Request_Sent = "API_Request_Sent";
const API_Request_Completed = "API_Request_Completed";
const API_Request_Error = "API_Request_Error";

export const SubscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case Get_Subscriptions:
      return {
        ...state,
        subscriptions: action.payload,
        get: true,
      };
    case New_Subscription:
      return {
        ...state,
        subscriptions: [...state.subscriptions, action.payload],
        status: true,
        message: "Successfully Added Subscription",
      };

    case Update_Subscription: ///Update subscription
      let { name, amount, frequency, id, type, startDate } = action.payload;
      return {
        ...state,
        subscriptions: state.subscriptions?.map((subscription) => {
          if (subscription.id === id) {
            return {
              ...subscription,
              name: name,
              amount: amount,
              id: id,
              frequency: frequency,
              startDate: startDate,
            };
          }
          //Leave rest of alerts unchanged
          return subscription;
        }),
        message: "Successfully Updated Subscription",
        status: true,
      };

    case Delete_Subscription:
      let deleteId = action.payload;
      return {
        error: undefined,
        message: "Successfully Removed Subscription",
        subscriptions: state.subscriptions?.filter(
          (item) => item.id !== deleteId
        ),
        status: true,
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
