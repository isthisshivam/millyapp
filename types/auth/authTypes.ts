import { AuthenticationType } from "expo-local-authentication";

export type initialStateType = {
  isLoggedIn: boolean;
  username: string;
  status: string | boolean;
  error: number | string;
  message: string;
  loading: boolean;
  rememberToken: string;
  refreshToken: string;
  hasCommercialAccount: boolean;
  rememberDevice: boolean;
  passwordQuestions: {
    id: number;
    question: string;
    answer?: string;
  };
  questions: {
    questionIds: number[];
    questions: string[];
  };
  twoFactorOptions: TwoFactorType[];
  twoFactorCodeSent: boolean;
  showTwoFactor: boolean;
  codeSent: boolean;
};

export type RegisterPayload = {
  ssn: string | undefined;
  username: string | null;
  password: string | null;
  confirmPassword: string | null;
  acctNumber: string | null;
};
export type LoginPayload = {
  username: string | null;
  password: string | null;
  channel: "mTeller";
};

export const enum AuthType {
  FINGERPRINT = 1,
  FaceId = 2,
  Iris = 3,
}

export type LoginStatus = {
  loading: boolean;
  error: string | object | number;
  message: string;
  showLogin: boolean;
  biometricSupported: boolean;
  bioMetricType: AuthType;
  hasBioMetricsSaved: boolean;
  rememberToken: string;
  refreshToken: string;
  disabled: boolean;
};

export type UpdatePasswordType = {
  channel: string;
  oldPwd: string;
  newPwd: string;
};
export type TwoFactorType = {
  disabled: boolean;
  selected: boolean;
  text: string;
  value: string;
};

export type GetTwoFactorCode = {
  channel: "APP" | "Internet";
  selectedProvider: string;
  address: string;
};

export type ValidateCodeType = {
  channel: "APP";
  code: string;
};
