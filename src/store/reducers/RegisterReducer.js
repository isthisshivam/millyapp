const initialState = {
  status: false,
  error: undefined,
  message: undefined,
  idVerified: false,
  failedVerify: false,
  attempts: 0,
  disabled: false,
  info: undefined,
  selfieAttempts: 0,
  failedSelfie: false,
  selfieVerified: undefined,
  requestId: undefined,
  documentVerificationResult: undefined,
};

const Verify_ID = "Verify_ID";
const API_Request_Completed = "API_Request_Completed";
const API_Request_Error = "API_Request_Error";
const Not_Verified = "Not_Verified";
const Selfie_Not_Verified = "Selfie_Not_Verified";
const Selfie_Verified = "Selfie_Verified";

export const RegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case Verify_ID:
      return {
        ...state,
        idVerified: true,
        disabled: false,
        info: action.payload.document,
        requestId: action.payload.requestId,
        documentVerificationResult: action.payload.documentVerificationResult,
      };

    case Not_Verified:
      if (state.attempts < 1) {
        return {
          ...state,
          attempts: state.attempts + 1,
          disabled: true,
          error: "Not Verified",
        };
      }
      return {
        ...state,
        attempts: 1,
        disabled: false,
        failedVerify: true,
      };

    case Selfie_Verified:
      return {
        ...state,
        selfieVerified: true,
      };

    case Selfie_Not_Verified:
      if (state.selfieAttempts < 1) {
        return {
          ...state,
          selfieAttempts: state.selfieAttempts + 1,
          selfieVerified: false,
        };
      }
      return {
        ...state,
        selfieAttempts: 1,
        failedSelfie: true,
        selfieVerified: false,
      };
    case API_Request_Completed:
      return {
        ...state,
        status: false,
        error: undefined,
        failedSelfie: false,
        failedVerify: false,
        selfieVerified: undefined,
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
