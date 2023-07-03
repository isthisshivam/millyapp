const API_LINK = "https://testenv.w-w-i-s.com/iTeller21/api/";
const TestEnv = "https://testenv.w-w-i-s.com/iTeller21/api/";

module.exports = {
  //Authentication/////
  LoginLink: API_LINK + "user/login?entity=AHHRV",
  TokenLoginLink: API_LINK + "user/login",
  Logout: API_LINK + "user/logout",
  RegisterUser: API_LINK + "user/register",
  GetTwoFactorCode: API_LINK + "user/SendCode?entity=AHHRV",
  ValidateTwoFactor: API_LINK + "user/ValidateCode?entity=AHHRV",

  ////App config/Bitpanel//////
  GetBitPanel: API_LINK + "client/AHHRV",
  GetBannerImages: API_LINK + "client/AHHRV/BannerImages",

  //Accounts/////
  GetAccounts: API_LINK + "accounts",
  GetTileSettings: API_LINK + "user/TileSettings",
  UpdateTileSettings: API_LINK + "user/TileSettings",
  GetAccountOrder: API_LINK + "user/AccountOrder",
  UpdateAccountOrder: API_LINK + "user/AccountOrder",
  GetAccountHistory: API_LINK + "user/AccountHistory",

  //BillPay////
  GetBillPayHistory: API_LINK + "user/BillHistory",
  GetBillPayAccounts: API_LINK + "user/BillPayAccounts",
  GetPendingHistory: API_LINK + "user/BillHistory/pending",
  CreateBillPay: API_LINK + "user/BillPayAccounts",
  DeletePending: API_LINK + "user/BillHistory/EditPending/delete",
  EditPending: API_LINK + "user/BillHistory/EditPending",

  ///User Profile/////
  GetProfile: API_LINK + "user/FULLNAME",
  GetContactInfo: API_LINK + "user/Profile",
  GetProfilePic: API_LINK + "user/Profilepicture",
  UpdateContact: API_LINK + "user/UpdateContact",
  UpdateProfilePic: API_LINK + "user/Profilepicture",

  ///eMessage////
  GetMessages: API_LINK + "user/EMessages",
  CreateMsg: API_LINK + "user/EMessages",
  DeleteMessage: API_LINK + "user/EMessages/Delete",

  ///eSafe//////
  GetESafe: API_LINK + "user/ESafe",
  GetESafeFile: API_LINK + "user/ESafe/File",
  UploadESafe: API_LINK + "user/ESafe",
  DeleteESafeFile: API_LINK + "user/ESafe/Delete",

  ///Statements////////
  GetStatements: API_LINK + "user",

  //Subscriptions
  GetSubscriptions: API_LINK + `user/Reminders/${0}`,
  AddSubscription: API_LINK + "user/Reminders",
  DeleteSubscription: API_LINK + "user/Reminders/Delete",
  UpdateSubscription: API_LINK + "user/Reminders/Update",
  GetSubsriptionPopups: API_LINK + "user/Reminders/Subscription/PopUp",
  GetPopupHistory: API_LINK + "user/Reminders/Subscription/History",

  //Expenses
  GetExpenses: API_LINK + `user/Reminders/${1}`,
  AddExpense: API_LINK + "user/Reminders",
  DeleteExpense: API_LINK + "user/Reminders/Delete",
  UpdateExpense: API_LINK + "user/Reminders/Update",

  //Reminders
  GetReminders: API_LINK + `user/Reminders/${2}`,
  AddReminder: API_LINK + "user/Reminders",
  DeleteReminder: API_LINK + "user/Reminders/Delete",
  UpdateReminder: API_LINK + "user/Reminders/Update",

  ///Merchants //////////
  Merchants: API_LINK + "user/Merchants",
  DeleteMerchant: API_LINK + "user/Merchants/Delete",
  PayMerchant: API_LINK + "user/PayMerchant",

  //Transfers
  Transfer: API_LINK + "user/Transfer",
  GetPendingTransfers: API_LINK + "user/Transfer/pending",
  GetTransferHistory: API_LINK + "user/Transfer",
  GetExternalHistory: API_LINK + "user/Commercial/External/Transfer",
  GetExternalAccounts: API_LINK + "user/Transactions/External/Alias",
  GetTransferOrderFrom: API_LINK + "user/TransferOrder/From",
  GetTransferOrderTo: API_LINK + "user/TransferOrder/To",
  UpdateTransferOrderFrom: API_LINK + "user/TransferOrder/From",
  UpdateTransferOrderTo: API_LINK + "user/TransferOrder/To",
  DeleteExtAccount: API_LINK + "user/Transactions/External/Alias/Delete",

  //Vehicles
  GetVehicles: API_LINK + "user/Vehicle",
  NewVehicle: API_LINK + "user/Vehicle",
  UpdateVehicle: API_LINK + "user/Vehicle/Update",
  DeleteVehicle: API_LINK + "user/Vehicle/Delete",

  //Alerts
  GetAlerts: API_LINK + "user/Alerts",
  CreateAlert: API_LINK + "user/Alerts",
  GetSmartAlerts: API_LINK + "user/Alerts/Smart",
  UpdateAlert: API_LINK + "user/Alerts/Update",
  DeleteAlert: API_LINK + "user/Alerts/Delete",
  DeleteSmartAlert: API_LINK + "user/Alerts/Smart/Delete",

  //Register
  IdVerification: API_LINK + "user/ConfirmID",
  VerifySelfie: API_LINK + "user/ConfirmID/VerifyFace",

  //Household
  GetHousehold: API_LINK + "user/Household",
  CreateHousehold: API_LINK + "user/Household",
  UpdateHousehold: API_LINK + "user/HouseHold/Update",
  DeleteHousehold: API_LINK + "user/HouseHold/Delete",

  ///Settings/////
  UpdatePassword: API_LINK + "user/Password",
  RememberDevice: API_LINK + "user/RememberMe",
  GetPassowordQuestions: API_LINK + "user/PasswordQuestions?entity=AHHRV",
  SetPasswordQuestion: API_LINK + "user/PasswordSecurity",

  //////////////Commercial//////////////////////////////////////////////////////////////

  GetAchTypes: API_LINK + "user/AchCatalogue",
  /////ACH Templates///////
  AddTemplate: API_LINK + "user/Commercial/ACH/Template/Insert",
  EditTemplate: API_LINK + "user/Commercial/ACH/Template/Update",
  GetTemplate: API_LINK + "user/Commercial/ACH/Template/",
  DeleteTemplate: API_LINK + "user/Commercial/ACH/Template/Delete",
  //UpdateTemplate: API_LINK + "user/Commercial/ACH/Template/Update",

  ////ACH  Request///////
  OneTimeACH: API_LINK + "user/Transactions/ACH/OneTime/Insert",
  GetAchHistory: API_LINK + "user/Commercial/ACH/History",
  GetTemplates: API_LINK + "user/Commercial/ACH/Template",

  /////USERS/////////
  GetUserPermissions: API_LINK + "user/Commercial/Permissions",
  UpdateUserPermissions: API_LINK + "user/Commercial/Permissions/Update",
};
