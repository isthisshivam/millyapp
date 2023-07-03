export const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export function currencyFormat(num) {
  return "$" + num?.toFixed(2)?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
export function localStringToNumber(s) {
  return Number(String(s).replace(/[^0-9.-]+/g, "")); //formats "113456" to 123456
}

// export const formatPhoneNumber = (input) => {
//   if (!input || isNaN(input)) return `input must be a number was sent ${input}`;
//   if (typeof input !== "string") input = input.toString();
//   if (input.length === 10) {
//     return input.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
//   } else if (input.length < 10) {
//     return "was not supplied enough numbers please pass a 10 digit number";
//   } else if (input.length > 10) {
//     return "was supplied too many numbers please pass a 10 digit number";
//   } else {
//     return "something went wrong";
//   }
// };

export function onBlur(e, handleChange) {
  let value = e.target.value;

  let options = {
    maximumFractionDigits: 2,
    currency: "USD",
    style: "currency",
  };

  e.target.value =
    value || value === 0
      ? localStringToNumber(value).toLocaleString(undefined, options)
      : "";

  handleChange("amount", e.target.value);
}
/////////////////////////////// Formats date returned from api into MM/DD/YYYYY///////////////////////////////////////
export function formatBirthday(date) {
  let temp = date?.toString();
  let newDate = temp?.replace(/T00:00:00/, "");
  const birthday = new Date(newDate);

  const day =
    1 +
    Number(
      birthday?.getDate().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })
    );
  const month =
    1 +
    Number(
      birthday?.getMonth().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })
    );

  const formattedDate = `${month}-${
    day.length < 10 ? "0" + day : day
  }-${birthday?.getFullYear()}`;

  return formattedDate;
}

//////////////////////////////////////formatDateYYMMDD to send to api//////////////////////////////////////////////////////////////
export const formatDateYYMMDD = (date) => {
  let newDate = new Date(date);
  const formattedDate =
    newDate?.getFullYear() +
    "-" +
    (newDate?.getMonth() + 1).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }) +
    "-" +
    newDate?.getDate().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  return formattedDate;
};

//////////////Format simple time from date time string////////////////////
export function formatTime(dateTime) {
  let hours = dateTime.getHours();
  let mins = dateTime.getMinutes();

  let end = hours < 12 ? "AM" : "PM";
  if (mins == "1") {
    mins = "01";
  } else if (mins == "2") {
    mins = "02";
  } else if (mins == "3") {
    mins = "03";
  } else if (mins == "4") {
    mins = "04";
  } else if (mins == "5") {
    mins = "05";
  } else if (mins == "6") {
    mins = "06";
  } else if (mins == "7") {
    mins = "07";
  } else if (mins == "8") {
    mins = "08";
  } else if (mins == "9") {
    mins = "09";
  }

  if (hours == "13") {
    hours = "1";
  } else if (hours == "14") {
    hours = "2";
  } else if (hours == "15") {
    hours = "3";
  } else if (hours == "16") {
    hours = "4";
  } else if (hours == "17") {
    hours = "5";
  } else if (hours == "18") {
    hours = "6";
  } else if (hours == "19") {
    hours = "7";
  } else if (hours == "20") {
    hours = "8";
  } else if (hours == "21") {
    hours = "9";
  } else if (hours == "22") {
    hours = "10";
  } else if (hours == "23") {
    hours = "11";
  }
  let formattedTime = `${hours}:${mins} ${end}`;
  return formattedTime;
}

///////////////////////////////////Format phone number to send to api///////////////////////////////////
export const phoneNumToString = (phoneNumber) => {
  const string = parseInt(phoneNumber?.replace(/[^0-9]/g, ""), 10).toString();
  return string;
};

///////////////////////////////////Format phone number returned from api "(123) 456-7890"///////////////////////////////////
export function formatPhoneNumber(phoneNumberString) {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return null;
}

export const RedirectCheck = (response) => {
  let data = response.data;

  if (typeof data == "string") {
    let redirect = data.includes("<!DOCTYPE");
    if (redirect) {
      return true;
    }
  }

  return false;
};

export function scrollToBottom(id) {
  if (document.getElementById(id)) {
    document.getElementById(id).scrollTop =
      document.getElementById(id).scrollHeight;
  }
}

/////////////////////////////////// Order Account Tiles///////////////////////////////////////////////
export const OrderTiles = (accounts, order) => {
  let array;
  if (accounts && order) {
    array = new Array(...accounts);

    return array.sort(function (obj1, obj2) {
      return order.indexOf(obj1.accountId) - order.indexOf(obj2.accountId);
    });
  }
  return array;
};

/////////////////////////////////// Api Request Error Handler///////////////////////////////////////////////
export function handleError(error, dispatch) {
  const API_Request_Error = "API_Request_Error";
  const API_Request_Completed = "API_Request_Completed";

  if (error?.response) {
    switch (error?.response.status) {
      case 400:
        dispatch({
          type: API_Request_Error,
          payload: "Bad Request, Contact your financial institution",
        });
        wait(50).then(() => dispatch({ type: API_Request_Completed }));
        return;

      case 415:
        dispatch({
          type: API_Request_Error,
          payload:
            "Invalid data type, please update the information and try again.",
        });
        wait(50).then(() => dispatch({ type: API_Request_Completed }));
        return;
      case 500:
        dispatch({
          type: API_Request_Error,
          payload:
            "Sorry, looks like our systems may be down.Please try again later.",
        });
        wait(50).then(() => dispatch({ type: API_Request_Completed }));
        return;

      default:
        dispatch({
          type: API_Request_Error,
          payload:
            "Sorry, looks like our systems may be down.Please try again later.",
        });
        wait(50).then(() => dispatch({ type: API_Request_Completed }));
    }
  }
}

import {
  streaming,
  gaming,
  music,
  food,
} from "../src/screens/subscriptions/components/database";
export function handleTiers(item) {
  let cost;

  switch (item) {
    case "Netflix":
      cost = streaming?.filter((item) => item.title == "Netflix");
      return cost[0].tiers;

    case "Disney Plus":
      cost = streaming?.filter((item) => item.title == "Disney Plus");
      return cost[0].tiers;

    case "Amazon Prime":
      cost = streaming?.filter((item) => item.title == "Amazon Prime");
      return cost[0].tiers;
    case "Hulu":
      cost = streaming?.filter((item) => item.title == "Hulu");
      return cost[0].tiers;
    ////Music
    case "Apple Music":
      cost = music?.filter((item) => item.title == "Apple Music");
      return cost[0].tiers;
    case "Spotify":
      cost = music?.filter((item) => item.title == "Spotify");
      return cost[0].tiers;
    case "Pandora":
      cost = music?.filter((item) => item.title == "Pandora");
      return cost[0].tiers;
    case "Sirius XM":
      cost = music?.filter((item) => item.title == "Sirius XM");
      return cost[0].tiers;
    ////Gaming
    case "Microsoft Ultimate":
      cost = gaming?.filter((item) => item.title == "Microsoft Ultimate");
      return cost[0].tiers;
    case "Playstation Plus":
      cost = gaming?.filter((item) => item.title == "Playstation Plus");
      return cost[0].tiers;
    case "Stadia":
      cost = gaming?.filter((item) => item.title == "Stadia");
      return cost[0].tiers;

    ////Food
    case "Uber Eats":
      cost = food?.filter((item) => item.title == "Uber Eats");
      return cost[0].tiers;
    case "Door Dash":
      cost = food?.filter((item) => item.title == "Door Dash");
      return cost[0].tiers;
    case "GrubHub":
      cost = food?.filter((item) => item.title == "GrubHub");
      return cost[0].tiers;

    default:
      return undefined;
  }
}

////////Cache Tile Settings /////////////////////
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function cacheTileSettings(data) {
  try {
    let settings = data.map((item, i) => {
      let object = {
        accountId: item.accountId,
        eStatement: item.false,
        nickName: item.nickName,
        backGroundColor: item.backGroundColor,
        secondaryTextColor: item.secondaryTextColor,
        mainTextColor: item.mainTextColor,
      };
      return object;
    });

    const jsonValue = JSON.stringify(settings);
    await AsyncStorage.setItem("tile_settings", jsonValue);
    return;
  } catch (error) {
    //console.log(error);
  }
}

export async function mergeCachedSettings(accounts, cachedSettings) {
  //Merge settings obj from settings array with account obj from accounts array by id
  let accountsWithSettings = [];

  if (accounts && cachedSettings && accounts?.length > 0) {
    //map over accounts
    for (var account of accounts) {
      let tempAccountInfo = {
        accountId: account.accountId,
        accountName: account.accountName,
        accountNumber: account.accountNumber,
        accountNumberText: account.accountNumberText,
        balance: account.balance,
        availableBalance: account.availableBalance,
        isLoan: account.isLoan,
        useAvailableBalance: account.useAvailableBalance,
        backGroundColor: "default",
        mainTextColor: "default",
        secondaryTextColor: "default",
        nickname: "",
        image: "",
      };
      let setting = cachedSettings?.find(
        //find settings with id that matches account id
        (setting) => setting.accountId == account.accountId
      );
      if (setting) {
        tempAccountInfo.backGroundColor = setting.backGroundColor;
        tempAccountInfo.mainTextColor = setting.mainTextColor;
        tempAccountInfo.secondaryTextColor = setting.secondaryTextColor;
        tempAccountInfo.nickname = setting.nickName;
        tempAccountInfo.image = setting.image;
      }

      accountsWithSettings.push(tempAccountInfo);
    }
  }

  return accountsWithSettings;
}
