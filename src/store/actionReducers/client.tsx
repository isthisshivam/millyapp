import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Global from "../../../utils/env";
import { BitpanelType, BannerImageType } from "../types/client";
import ApiCalls from "../../../utils/ApiCalls";

export interface FailedResponse {
  error: object;
  message: string;
  status: false | string;
}

const initialState: BitpanelType = {
  error: undefined,
  status: false,
  message: undefined,
  name: undefined,
  googleId: undefined,
  language: undefined,
  minimumPasswordLength: 0,
  maximumPasswordLength: 0,
  sessionTimeout: 0,
  timeZone: undefined,
  tzOffset: 0,
  usernamePrompt: undefined,
  bitPanel: {
    clientId: undefined,
    strikeBlocking: 0,
    accountAlertType: 0,
    aliases: false,
    billPayType: 0,
    checkImaging: false,
    checkReorderType: 0,
    debitCreditColumn: 0,
    draftWithdrawal: false,
    eMsgCenter: false,
    eStatements: 0,
    transactionDownload: 0,
    fundsTransfers: false,
    loanPayments: false,
    userRelationType: 0,
    lostATMNotification: false,
    minimumBalance: false,
    multiLingual: false,
    nonRelatedAccountTransfers: false,
    pendingTransactionType: 0,
    pinChangeVariations: false,
    runningBalance: 0,
    stopPayment: false,
    transactionDescription: 0,
    vcall: false,
    autoposting: 0,
    billPayOnly: false,
    accountDescription: false,
    showAvailableBalance: 0,
    accountDisplay: 0,
    addFeeColumn: false,
    accessPIN: 0,
    isBank: false,
    timeDateStamp: 0,
    demoSite: false,
    ibDisclosure: false,
    live: false,
    liveType: 0,
    accessIDFromDB: false,
    ibTest: false,
    accountDescPropercase: false,
    ninetyDaysHistory: false,
    audioBillPay: false,
    draftWithdrawalInputOptions: 0,
    loanShareAccountSplit: false,
    principalInterestFlag: false,
    displayLastLogin: 0,
    profileUpdateAlert: false,
    ezApp: 0,
    timezoneFlag: false,
    partialLoanPayments: false,
    international: false,
    itpType: 0,
    eStatementsOnly: false,
    forgotPassword: false,
    internetTwoFactorAuthentication: 0,
    forceMemberProfile: false,
    twoFactorCaseInsensitive: false,
    audioTwoFactorAuthentication: 0,
    displayEStatement: false,
    audioTwoFactorAuthenticationExpiration: 0,
    audioUsageInactivityExpiration: 0,
    internetTwoFactorAuthenticationExpiration: 0,
    internetUsageActivityExpiration: 0,
    accessIDPerAccount: 0,
    billPayDisclosure: false,
    consignmentPurchases: false,
    removeVisualEncryption: false,
    principalOnlyPayment: false,
    loanApplication: 0,
    creditcardApplication: false,
    membershipApplication: false,
    ibAccountSummaryIcon: false,
    eStatementDisclosure: false,
    blockIBAccounts: false,
    oscarHardwareTFA: false,
    dpSolution: 0,
    oscarMultiUserAccess: false,
    fItoFITransfer: false,
    mobileBillpay: 0,
    minTFAQuestions: 0,
    tfaQuestionsToPrompt: 0,
    lpmtOptions: false,
    disableNewUserTab: false,
    optOutKeys: 0,
    isOscarImpersonateEnabled: false,
    isTaxFormEnabled: false,
    deletePendingTransfers: false,
    mobileAutoRedirection: false,
    ofm: 0,
    hasGoogleAnalytics: false,
    hasOnDemandTxtMsg: false,
    notDisplayZeroInterest: false,
    canDisplayHolds: false,
    hasESafe: false,
    disableTFAAuth: false,
    sameDayPendingXfers: false,
    userAccessAdmin: false,
    audioSSNLogin: 0,
    eStmtProvider: 0,
    billPayTransferChallengeQuestions: false,
    lockoutResponseRetention: 0,
    maskAccount: false,
    maskSSN: false,
    loginImage: false,
    passwordMeter: false,
    checkReorderSpeedBump: false,
    commercialACH: false,
    alternateAudioMenu: false,
    transfersUserDefinedDescriptions: false,
    homeScreenAccordionMenu: false,
    mTellerAppPendingTxns: false,
    playAvailBalOnvTeller: 0,
    eMessageEMailNotification: false,
    unmaskAccountsInEMailNotifications: false,
    rdc: false,
    interestOnlyPayment: false,
    depositImages: false,
    eStatementOptOutWithNoStatements: false,
    vTellerPINRelation: 0,
    livePINRequired: false,
    loanHistoryForOneYear: 0,
    jhaepssso: false,
    jhaachrdxsso: false,
    usernamePrompt: 0,
    mTellerAppExpiration: 0,
    minimumPasswordRequirements: 0,
    loanApps: 0,
    depositHistoryPeriod: 0,
    hasShazamIndirectRelationships: false,
    hasFingerprintLoginAndroid: false,
    hasFingerprintLoginiOS: false,
    mTellerLoanApp: false,
    allowVTellerPINSLastFourSSN: false,
    mTellerMarketingBanners: false,
    mTellerCustomizableFooters: false,
    disableVTellerTransferPIN: false,
    rdcProvider: 0,
    anonymousEZAppSubmission: false,
    ezAppAttachments: false,
    iPayP2PMobileApp: false,
    usernameRequirements: 0,
    id: undefined,
  },
  uiSettings: {
    clientId: undefined,
    font: undefined,
    color1: undefined,
    color2: undefined,
    color3: undefined,
    messageBoard: undefined,
    loanAppUrl: undefined,
    linkColor: undefined,
    id: undefined,
  },
  bannerImages: {
    loginBanner: undefined,
    headerBanner: undefined,
  },
};

export const GetBannerImages = createAsyncThunk<
  BannerImageType[],
  any,
  { rejectValue: FailedResponse }
>("client/GetBannerImages", async (thunkAPI) => {
  const response = await ApiCalls.GetRequest(Global.GetBannerImages);
  if (response.status != 200) {
    return thunkAPI.rejectWithValue({
      message: "",
      status: "Error",
      error: response.data,
    });
  }
  return response.data;
});

export const GetBitPanel = createAsyncThunk<
  BitpanelType,
  any,
  { rejectValue: FailedResponse }
>("client/getBitpanel", async (thunkAPI) => {
  const response = await ApiCalls.GetRequest(Global.GetBitPanel);
  if (response.status != 200) {
    return thunkAPI.rejectWithValue({
      message: "",
      status: "Error",
      error: response.data,
    });
  }
  return response.data;
});

const bitPanelSlice = createSlice({
  name: "bitpanel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetBitPanel.fulfilled, (state, action) => {
      //console.log(action.payload);
      return (state = {
        ...state,
        ...action.payload,
        //status: true,
      });
    });
    builder.addCase(GetBitPanel.rejected, (state, action) => {
      return { ...state, status: "Error", message: action.payload?.message };
    });
    builder.addCase(GetBannerImages.fulfilled, (state, action) => {
      let banners = action.payload;
      let loginBanner = banners.filter(
        (item: BannerImageType) => item.type == 4
      );
      let header = banners.filter((item: BannerImageType) => item.type == 3);
      return (state = {
        ...state,
        status: true,
        bannerImages: { loginBanner: loginBanner[0], headerBanner: header[0] },
      });
    });
    builder.addCase(GetBannerImages.rejected, (state, action) => {
      return (state = {
        ...state,
        message: "Something went wrong fetching assets",
        status: "Error",
        error: action.payload?.error,
      });
    });
  },
});

export default bitPanelSlice.reducer;
