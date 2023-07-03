export type InitialStateType = {
  status: boolean | string;
  loading: boolean;
  error: string | boolean | object;
  message: string;
  household: MemberType[];
};

export type MemberType = {
  type: string;
  race: string;
  gender: string;
  age: number;
  image: string;
  income?: string;
  id?: number;
};
export type UpdateMemberType = MemberType[];
export type CreateMemberType = {
  type: string;
  race: string;
  gender: string;
  age: number;
  image: string;
}[];

export type DeletePayload = {
  id: number[];
};
