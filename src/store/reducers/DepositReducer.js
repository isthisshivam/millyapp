const initialState = {
  status: undefined,
  error: undefined,
  message: undefined,
  history: [
    {
      amount: 1200.0,
      account: "maestro",
      date: "5/13/2021",
      status: "Pending",
      confirmation: 435886,
      checkImage1:
        "https://www.nwcu.com/storage/app/media/Check-Image-Example.jpg",
      checkImage2:
        "https://www.nwcu.com/storage/app/media/Check-Image-Example.jpg",
      depositAccount: {
        account: "Maestro",
        id: 1,
      },
    },
    {
      amount: 1200.0,
      account: "americanexpress",
      date: "5/13/2021",
      status: "Pending",
      confirmation: 435885,
      checkImage1:
        "https://www.nwcu.com/storage/app/media/Check-Image-Example.jpg",
      checkImage2:
        "https://www.nwcu.com/storage/app/media/Check-Image-Example.jpg",
      depositAccount: {
        account: "Maestro",
        id: 1,
      },
    },
  ],
};

const Submit_Deposit = "Submit_Deposit";
const Deposit_Failed = "Deposit_Failed";

export const DepositReducer = (state = initialState, action) => {
  switch (action.type) {
    case Submit_Deposit:
      const { date, amount, status, depositAccount, checkImage1, checkImage2 } =
        action.payload;

      const lastId = state
        .sort((a, b) => b.confirmation - a.confirmation)
        .map((item) => {
          return item.confirmation;
        });

      return {
        ...state,
        status: true,
        history: [
          ...state.history,
          {
            date,
            confirmation: lastId[0] + 1,
            amount,
            status,
            depositAccount,
            checkImage1,
            checkImage2,
          },
        ],
      };
    case Deposit_Failed:
      return [action.payload];

    default:
      return state;
  }
};
