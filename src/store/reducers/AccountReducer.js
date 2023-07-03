const initialState = {
  status: false,
  error: undefined,
  accounts: [],
  order: [],
};
/*{
    id: 1,
    account: "maestro",
    balance: "1,285.68",
    currentBalance: "1,800.00",
    accountNumber: "186487520851",
    nickname: "",
    enableAlert: true,
    enableStatements: false,
    image: "",
    backgroundColor: "white",
    mainTextColor: "#0EA44B",
    secondaryTextColor: "black",
  }, */

const Change_Settings = "Change_Settings";
const Toggle_eStatements = "Toggle_eStatements";
const Get_Accounts = "Get_Accounts";
const Get_Tile_Settings = "Get_Tile_Settings";
const API_Request_Sent = "API_Request_Sent";
const API_Request_Completed = "API_Request_Completed";
const API_Request_Error = "API_Request_Error";
const Get_Order = "Get_Order";
const Update_Order = "Update_Order";

export const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case Change_Settings:
      let array = state.accounts?.map((account) => {
        let {
          nickname,
          backGroundColor,
          mainTextColor,
          secondaryTextColor,
          accountId,
          image,
        } = action.payload;
        if (account.accountId == accountId) {
          return {
            ...account,
            nickname: nickname,
            backGroundColor: backGroundColor,
            mainTextColor: mainTextColor,
            secondaryTextColor: secondaryTextColor,
            image: image,
          };
        }
        //Leave rest of alerts unchanged
        return account;
      });
      return {
        ...state,
        status: true,
        error: undefined,
        accounts: array,
      };
    case Toggle_eStatements:
      return {
        ...state,
        status: true,
        accounts: state.accounts?.map((account) => {
          if (account.id === id) {
            return {
              ...account,
              enableStatements: action.payload,
            };
          }
          //Leave rest of alerts unchanged
          return account;
        }),
      };
    case Get_Tile_Settings:
      //Merge settings obj from settings array with account obj from accounts array by id
      let accountsWithSettings = [];
      let settings = action.payload.settings;
      let accounts = action.payload.accounts;

      if (accounts && settings && accounts?.length > 0) {
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
          let setting = settings.find(
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

      return {
        ...state,
        accounts: accountsWithSettings,
        error: undefined,
        //status: true,
      };
    case Get_Accounts:
      return {
        ...state,
        accounts: [...action.payload],
        error: undefined,
      };

    case Get_Order:
      //If no order return regular accounts
      let orders = action.payload?.map((item) => {
        return Number(item.accountId);
      });

      return {
        ...state,
        status: true,
        accounts: state.accounts,
        order: orders,
        error: undefined,
      };
    case Update_Order:
      //If no order return regular accounts

      return {
        ...state,
        status: true,
        accounts: state.accounts,
        order: action.payload.accountIds,
        error: undefined,
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
