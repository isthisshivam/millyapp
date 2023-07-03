export type UserInfoType = {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  email: string;
  mobilePhone: string;
  birthday: string;
  homePhone: string;
  workPhone: string;
  cellPhone: string;
};
export type initialStateType = {
  status: boolean | string;
  loading: boolean;
  error: string | object;
  message: string;
  idVerified: boolean;
  failedVerify: boolean;
  attempts: number;
  selfieAttempts: 0;
  failedSelfie: boolean;
  selfieVerified: boolean;
  requestId: undefined;
  documentVerificationResult: undefined;
  info: UserInfoType;
  username: string;
  profilePic: string;
  ssn: string;
  passwordQuestions: {
    id: number;
    question: string;
    answer?: string;
  };
};

export type IdScanPayload = {
  frontImage: string;
  backImage: string;
  documentType: 1;
  faceImage: string;
  captureMethod: 0;
  ssn: string;
};

export type QuestionPayloadType = {
  id: number;
  question: string;
  answer: string;
};

export type QuestionData = {
  questionIds: number[];
  answers: string[];
};
