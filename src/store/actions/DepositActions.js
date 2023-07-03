const Submit_Deposit = "Submit_Deposit";
const Deposit_Failed = " Deposit_Failed";

export const SendDeposit = (payload) => async (dispatch) => {
  try {
    dispatch({ type: Submit_Deposit, payload: payload });
  } catch (error) {
    dispatch({
      type: Deposit_Failed,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
