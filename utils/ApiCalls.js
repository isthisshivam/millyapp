import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ApiCalls = {
  PostRequest: async function (link, requestData) {
    let cookie = await AsyncStorage.getItem("cookie");

    return await axios.post(link, requestData, {
      headers: {
        "Content-type": "application/json; charset=utf-8",
        Cookie: cookie,
      },
      withCredentials: true,
      httpsAgent: { rejectUnauthorized: false },
      timeout: 2000 * 60,
    });
  },
  GetRequest: async function (link) {
    let cookie = await AsyncStorage.getItem("cookie");

    let response = await axios.get(link, {
      headers: {
        "Content-type": "application/json; charset=utf-8",
        Cookie: cookie,
      },

      withCredentials: true,
      timeout: 2000 * 60,
    });
    return response;
  },
  DeleteRequest: async function (link, requestData, cookie) {
    return await axios.get(link, requestData, {
      headers: {
        "Content-type": "application/json; charset=utf-8",
        Cookie: cookie,
      },

      withCredentials: true,
      timeout: 2000 * 60,
    });
  },
};

export default ApiCalls;
