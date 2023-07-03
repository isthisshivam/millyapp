const initialState = {
  tileSettings: undefined,
  merchants: false,
  billHistory: undefined,
  loading: true,
};

const Request_Sent = "Request_Sent";
const Request_Done = "Request_Done";
const Reset_APP_State = "Reset_APP_State";

export const AppStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case Request_Sent:
      return { ...state, loading: true };
    case Request_Done:
      return {
        ...state,
        loading: false,
        status: action.payload,
        completed: true,
      };
    case Reset_APP_State:
      return {
        status: undefined,
        completed: false,
        error: undefined,
        loading: true,
      };
    default:
      return state;
  }
};
