const GET_HOUSE = "GET_HOUSE";
const CREATE_HOUSE = "CREATE_HOUSE";
const UPDATE_HOUSE = "UPDATE_HOUSE";
const DELETE_HOUSE_MEMBERS = "DELETE_HOUSE_MEMBERS";
const CLEAR_HOUSE_STATUS = "CLEAR_HOUSE_STATUS";

const initialState = {
  status: false,
  error: undefined,
  message: undefined,
  house: [],
  garage: [],
};

export const HouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HOUSE:
      if (action.payload.error) {
        return {
          status: action.payload.status,
          error: action.payload.error,
        };
      }
      return {
        ...state,
        house: action.payload.data,
        status: action.payload.status,
        error: false,
      };

    case CREATE_HOUSE:
      if (action.payload.error) {
        return {
          status: action.payload.status,
          error: action.payload.error,
        };
      }
      return {
        ...state,
        house: action.payload.data,
        status: action.payload.status,
        error: false,
        message: "Successfully added household member.",
      };

    case UPDATE_HOUSE:
      if (action.payload.error) {
        return {
          ...state,
          error: action.payload.error,
          status: "Error",
        };
      }
      let updatedHouse = state.house.map((item) => {
        if (item.id == action.payload.data[0].id) {
          return { ...action.payload.data };
        }
        return item;
      });
      return {
        ...state,
        house: updatedHouse,
        status: action.payload.status,
        message: "Successfully updated household member",
      };

    case DELETE_HOUSE_MEMBERS:
      if (action.payload.error) {
        return {
          ...state,
          error: action.payload.error,
          status: action.payload.status,
        };
      }
      if (state.house.length > 1) {
        let newHouse = state.house?.filter(
          (item) => item.id != action.payload.id
        );
        return {
          ...state,
          house: newHouse,
          status: action.payload.status,
          message: "Successfully deleted household member",
        };
      }

      if (state.length == 1) {
        return {
          ...state,
          house: [],
          status: action.payload.status,
          message: "Successfully deleted household member",
        };
      }

    case CLEAR_HOUSE_STATUS:
      return { ...state, status: false, error: undefined, message: undefined };

    default:
      return state;
  }
};
