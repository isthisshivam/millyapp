import { bindActionCreators } from "redux";

const initialState = {
  status: false,
  message: undefined,
  error: undefined,
  vehicles: [],
  loading: false,
};
const Get_Vehicles = "Get_Vehicles";
const New_Vehicle = "New_Vehicle";
const Update_Vehicle = "Update_Vehicle";
const Delete_Vehicle = "Delete_Vehicle";
const API_Request_Sent = "API_Request_Sent";
const API_Request_Completed = "API_Request_Completed";

const API_Request_Error = "API_Request_Error";

export const VehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case Get_Vehicles:
      return {
        ...state,
        vehicles: action.payload,
      };
    case New_Vehicle:
      return {
        status: true,
        message: "Successfully Added New Vehicle",
        vehicles: [
          ...state.vehicles,
          {
            year: action.payload.data.year,
            make: action.payload.data.make,
            model: action.payload.data.model,
            type: action.payload.data.type,
            paymentAmount: action.payload.data.buyAmount,
            paymentDate: action.payload.data.buyDate,
            id: action.payload.id,
          },
        ],
      };

    ///Update Vehicle
    case Update_Vehicle:
      const { buyAmount, id, buyDate } = action.payload;
      let newState = state.vehicles?.map((vehicle) => {
        if (vehicle.id == id) {
          return {
            ...vehicle,
            type: action.payload.type,
            year: action.payload.year,
            make: action.payload.make,
            model: action.payload.model,
            buyAmount: buyAmount,
            buyDate: buyDate,
          };
        }
        //Leave rest of vehicles unchanged
        return vehicle;
      });

      return {
        status: true,
        vehicles: newState,
        message: "Successfully Updated Vehicle",
      };

    case Delete_Vehicle:
      let newArray = state.vehicles?.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        status: true,
        message: "Successfully Deleted Vehicle",
        error: undefined,
        vehicles: newArray,
      };

    case API_Request_Sent:
      return {
        ...state,
        status: "pending",
        loading: true,
      };
    case API_Request_Completed:
      return {
        ...state,
        status: false,
        message: undefined,
        error: undefined,
        loading: false,
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
