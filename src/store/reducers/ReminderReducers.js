const Get_Reminders = "Get_Reminders";
const Add_Reminder = "Add_Reminder";
const Edit_Reminder = "Edit_Reminder";
const Delete_Reminder = "Delete_Reminder";
const API_Request_Sent = "API_Request_Sent";
const API_Request_Completed = "API_Request_Completed";
const API_Request_Error = "API_Request_Error";

const initialState = {
  status: false,
  deleteStatus: false,
  error: undefined,
  message: undefined,
  reminders: [],
};

export const ReminderReducer = (state = initialState, action) => {
  switch (action.type) {
    case Get_Reminders:
      return { ...state, reminders: [...action.payload] };
    case Add_Reminder:
      return {
        ...state,
        status: true,
        message: "Successfully created Reminder",
        reminders: [...state.reminders, action.payload],
      };

    case Edit_Reminder:
      let { amount, date, id, name, frequency } = action.payload;
      return {
        ...state,
        status: true,
        message: "Successfully Updated Reminder",
        reminders: state.reminders?.map((reminder) => {
          if (reminder.id === id) {
            return {
              ...reminder,
              name: name,
              id: id,
              date: date,
              amount: amount,
              frequency: frequency,
            };
          }
          //Leave rest of alerts unchanged
          return reminder;
        }),
      };
    case Delete_Reminder:
      return {
        ...state,
        error: undefined,
        deleteStatus: true,
        message: "Successfully Deleted Reminder",
        reminders: state.reminders?.filter(
          (item) => item.id !== action.payload
        ),
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
