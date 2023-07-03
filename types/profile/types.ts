export type InitialStateType = {
  status: boolean | string;
  loading: boolean;
  error: string | object;
  message: string;
  profilePic: string;
  info: ContactInfoType;
  lastLogin: string;
  disclosures: DisclosureType[];
  preferences: PreferencesType;
};

export type ContactInfoType = {
  fullName?: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  birthDay: string;
  email: string;
  cellPhone: string;
  homePhone: string;
  workPhone: string;
};

export type DisclosureType = {
  acceptedOn: string; //"2021-07-30T12:44:42.903068";
  clientId: string; //"";
  disclosureFlag: number; //1;
  disclosureType: number; //0;
  id: {
    clientId: string;
    product: string;
    language: string; //"EN";
    pageName: string;
    messageName: string;
  };
  language: string; //"EN";
  lastUpdated: string; //"0001-01-01T00:00:00";
  messageName: string;
  messageTexts: [];
  pageName: string;
  product: string;
};

export type PreferencesType = {
  clientId: string; //"DEMOS";
  eMessageEMailOptIn: boolean;
  fontSize: string; // "m";
  id: { clientId: string; userName: string };
  language: string; //"EN";
  mobileCommunication: boolean;
  outOfChannel: boolean;
  preferredView: number; //58;
  userId: string;
};
