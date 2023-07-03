const initialState = {
  eSafe: [],
  status: false,
  error: undefined,
  uploadStatus: false,
  getFileData: true,
};

const Upload_Item = "Upload_Item";
const Delete_Item = "Delete_Item";
const Update_Category = "Update_Category";
const Get_Items = "Get_Items";
const Get_Item_File = "Get_Item_File";
const API_Request_Sent = "API_Request_Sent";
const API_Request_Error = "API_Request_Error";
const API_Request_Completed = "API_Request_Completed";

export const eSafeReducer = (state = initialState, action) => {
  switch (action.type) {
    case Get_Items:
      return {
        eSafe: action.payload,
        status: false,
        uploadStatus: false,
        error: undefined,
      };
    case Get_Item_File:
      let newState = state.eSafe.map((item) => {
        if (item.recordId === action.payload.id) {
          return { ...item, data: action.payload.file };
        }

        //Leave rest of esafe unchanged
        return item;
      });
      return {
        status: false,
        eSafe: newState,
        uploadStatus: false,
        getFileData: true,
      };
    case Upload_Item:
      return {
        eSafe: [...state.eSafe, { ...action.payload, date: new Date() }],
        uploadStatus: true,
        status: false,
        error: undefined,
      };

    case Delete_Item:
      let array = state.eSafe.filter(
        (item) => item.recordId !== action.payload
      );
      return {
        status: true,
        eSafe: array,
        uploadStatus: false,
        error: undefined,
      };
    case Update_Category:
      let currentItem = state.eSafe.filter(
        (item) => item.recordId == action.payload.recordId
      );
      let newArray = state.eSafe?.map((item, i) => {
        if (item.recordId == action.payload.recordId) {
          return {
            ...currentItem[0],
            category: action.payload.category,
          };
        }
        ///Leave rest unchanged
        return item;
      });

      return {
        status: true,
        eSafe: newArray,
        uploadStatus: true,
        error: undefined,
      };

    case API_Request_Sent:
      return {
        ...state,
        uploadStatus: "pending",
        status: false,
        error: undefined,
      };
    case API_Request_Completed:
      return {
        ...state,
        status: false,
        uploadStatus: false,
        error: undefined,
        getFileData: false,
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
