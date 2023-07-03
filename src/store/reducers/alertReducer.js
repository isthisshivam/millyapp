//SET INITIAL STATE
const initialState = {
  status: undefined,
  error: undefined,
  alerts: [],
};

const GET_ALERTS = "GET_ALERTS";
const CREATE_ALERT = "CREATE_ALERT";
const UPDATE_ALERT = "UPDATE_ALERT";
const DELETE_ALERT = "DELETE_ALERT";
const CLEAR_ALERT_STATUS = "CLEAR_ALERT_STATUS";

export const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALERTS:
      if (action.payload.error) {
        return {
          ...state,
          error: action.payload.error,
          message: "There was a problem getting your alerts",
        };
      }
      return {
        ...state,
        alerts: action.payload.data,
      };
    case CREATE_ALERT:
      if (action.payload.error) {
        return {
          ...state,
          status: "Error",
          message: "Sorry something went wrong, please try again",
          error: action.payload.error.message,
        };
      }
      return {
        ...state,
        status: true,
        alerts: [...state.alerts, action.payload],
        message: "Successfully created new alert.",
      };
    case UPDATE_ALERT:
      if (action.payload.error) {
        return {
          ...state,
          status: "Error",
          message: "Sorry something went wrong, please try again",
          error: action.payload.error.message,
        };
      }
      let newArray = state.alerts?.map((alert) => {
        if (alert.id === id) {
          return {
            ...alert,
            alertName: alertName,
            contactMethod: contactMethod,
            description: description,
            eventDate: eventDate,
            eventReminder: eventReminder,
            id: id,
            alertBasedOn: alertBasedOn,
            amount: amount,
            depositAccount: depositAccount,
            depositAmount: depositAmount,
            selectAccount: selectAccount,
            inEquality: inEquality,
            alertType: alertType,
          };
        }
        //Leave rest of alerts unchanged
        return alert;
      });
      return {
        ...state,
        alerts: newArray,
        status: action.payload.status,
        message: "Successfully updated alert",
      };
    case DELETE_ALERT:
      return state.filter((item) => item.id !== action.payload);
    case CLEAR_ALERT_STATUS:
      return { ...state, status: false, error: undefined, message: undefined };

    default:
      return state;
  }
};
