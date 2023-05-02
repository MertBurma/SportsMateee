export const SET_USER = "SET_USER";
export const GET_USER = "GET_USER";
export const SIGN_OUT = "SIGN_OUT";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const NEED_VERIFICATION = "NEED_VERIFICATION";
export const SET_SUCCESS = "SET_SUCCESS";

export enum REQUEST_TYPES {
  PENDING = 0,
  ACCEPTED = 1,
  DECLINED = 2,
}

export interface User {
  firstName: string;
  email: string;
  id: string;
  createdAt: any;
  address?: { location: string; coordinates: { lng: number; ltd: number } };
  authProvider?: string;
  gender?: string;
  height?: string;
  phoneNumber?: string | null;
  weight?: number;
  friends?: { name: string; user: string }[];
  blocked?: { name: string; user: string }[];
  avatar?: string;
  joined_events?: {
    event: string;
    event_info: string;
    event_creator: string;
    event_creator_id: string;
    event_time: string;
    event_place: string;
  }[];
  notifications: number;
  friendsRequest?: { name: string; user: string; isAccepted: REQUEST_TYPES }[];
  answer?: {
    question1: string;
    question2: string;
    question3: string;
    question4: string;
    question5: string;
    question6: string;
    question7: string;
    question8: string;
    question9: string;
    question10: string;
  }[];
  created_events?: { event: string; event_info: string }[];
}

export interface AuthState {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
  error: string;
  needVerification: boolean;
  success: string;
}

export interface SignUpData {
  firstName: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface MessageType {
  createdAt?: any;
  from: string;
  text: string;
  to?: string;
}

// Actions
interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

interface SignOutAction {
  type: typeof SIGN_OUT;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

interface NeedVerificationAction {
  type: typeof NEED_VERIFICATION;
}

interface SetSuccessAction {
  type: typeof SET_SUCCESS;
  payload: string;
}

interface GetUserAction {
  type: typeof GET_USER;
  payload: string;
}

export type AuthAction =
  | SetUserAction
  | SetLoadingAction
  | SignOutAction
  | SetErrorAction
  | NeedVerificationAction
  | SetSuccessAction
  | GetUserAction;
