const Request_Sent = "Request_Sent";
const Request_Done = "Request_Done";
const Reset_APP_State = "Reset_APP_State";

export const RequestSent = () => async (dispatch) => {
  try {
    dispatch({
      type: Request_Sent,
      payload: { loading: true, status: "pending" },
    });
  } catch (error) {
    console.log(error);
  }
};
export const RequestDone = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: Request_Done,
      payload: {
        loading: false,
        status: payload,
        success: payload.status == 200 ? true : false,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
export const ResetAppState = () => async (dispatch) => {
  try {
    dispatch({
      type: Reset_APP_State,
    });
  } catch (error) {
    console.log(error);
  }
};
