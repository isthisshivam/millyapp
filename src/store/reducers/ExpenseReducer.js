const Get_Expenses = "Get_Expenses";
const New_Expense = "New_Expense";
const Update_Expense = "Update_Expense";
const Delete_Expense = "Delete_Expense";
const API_Request_Sent = "API_Request_Sent";
const API_Request_Completed = "API_Request_Completed";
const API_Request_Error = "API_Request_Error";

const initialState = {
  status: false,
  error: undefined,
  message: undefined,
  expenses: [],
};

export const ExpenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case Get_Expenses:
      return { ...state, expenses: action.payload };
    case New_Expense:
      return {
        error: undefined,
        message: "Successfully Added Expense",
        expenses: [...state.expenses, action.payload],
        status: true,
      };

    ///Update subscription
    case Update_Expense:
      let { id, name, amount, frequency, startDate, type } = action.payload;
      let newExpenses = state.expenses?.map((expense) => {
        if (expense.id == id) {
          return {
            ...expense,
            name: name,
            amount: amount,
            frequency: frequency,
            startDate: startDate,
            type: type,
          };
        }
        //Leave rest of alerts unchanged
        return expense;
      });
      return {
        ...state,
        expenses: newExpenses,
        message: "Successfully Updated Expense",
        status: true,
      };

    case Delete_Expense:
      let deleteId = action.payload.id[0];
      return {
        error: undefined,
        expenses: state.expenses?.filter((item) => item.id !== deleteId),
        status: true,
        message: "Successfully Deleted Expense",
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
        message: undefined,
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
