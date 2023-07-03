import ApiCalls from "../../../utils/ApiCalls";
import { handleError } from "../../../utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { cacheTileSettings } from "../../../utils/utils";

const Global = require("../../../utils/env");
const Change_Settings = "Change_Settings";
const Update_Order = "Update_Order";
const Get_Order = "Get_Order";
const Get_Accounts = " Get_Accounts";
const Get_Tile_Settings = "Get_Tile_Settings";
const API_Request_Sent = "API_Request_Sent";
const API_Request_Completed = "API_Request_Completed";
const API_Request_Error = "API_Request_Error";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const GetAccounts = () => async (dispatch) => {
  try {
    const data = await ApiCalls.GetRequest(Global.GetAccounts);

    if (data.status == 200) {
      const jsonValue = JSON.stringify(data.data);
      await AsyncStorage.setItem("accounts", jsonValue);

      const response = await ApiCalls.GetRequest(Global.GetTileSettings); //Get Tile Settings

      if (response.status == 200) {
        await cacheTileSettings(response.data);

        wait(5).then(() => {
          dispatch({
            type: Get_Tile_Settings,
            payload: { settings: response.data, accounts: data.data },
          });
        });
      }
      wait(50).then(() =>
        dispatch({
          type: API_Request_Completed,
        })
      );
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};
export const GetOrder = () => async (dispatch) => {
  try {
    let response = await ApiCalls.GetRequest(Global.UpdateAccountOrder);
    let orders = response.data?.map((item) => {
      return Number(item.accountId);
    });
    const jsonValue = JSON.stringify(orders);
    await AsyncStorage.setItem("order", jsonValue);
    if (response.status == 200) {
      dispatch({ type: Get_Order, payload: response.data });
      wait(50).then(() =>
        dispatch({
          type: API_Request_Completed,
        })
      );
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};
export const UpdateOrder = (payload) => async (dispatch) => {
  try {
    let response = await ApiCalls.PostRequest(
      Global.UpdateAccountOrder,
      payload
    );

    if (response.status == 200) {
      dispatch({ type: Update_Order, payload: payload });
      wait(500).then(() =>
        dispatch({
          type: API_Request_Completed,
        })
      );
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const ChangeSettings = (payload) => async (dispatch) => {
  async function sendRequest() {
    dispatch({ type: API_Request_Sent });
  }

  try {
    await sendRequest();
    const {
      nickname,
      backGroundColor,
      mainTextColor,
      secondaryTextColor,
      accountId,
      image,
    } = payload;

    let data = {
      nickname,
      backGroundColor,
      mainTextColor,
      secondaryTextColor,
      accountId,
      image,
    };

    let response = await ApiCalls.PostRequest(Global.UpdateTileSettings, data);

    if (response.status == 200) {
      dispatch({ type: Change_Settings, payload: payload });
      wait(50).then(() =>
        dispatch({
          type: API_Request_Completed,
        })
      );
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};
// export const ToggleEstatements = (payload) => async (dispatch) => {
//   async function sendRequest() {
//     dispatch({ type: API_Request_Sent });
//   }
//   try {
//     await sendRequest();
//     dispatch({ type: Toggle_eStatements, payload: payload });
//     wait(50).then(() =>
//       dispatch({
//         type: API_Request_Completed,
//       })
//     );
//   } catch (error) {
//     handleError(error, dispatch);
//   }
// };

//////Get Account Tile Settings ////////////////////
