export enum UserActionTypes {
    FETCH_USERS = "FETCH_USERS",
    FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS",
    FETCH_USERS_ERROR = "FETCH_USERS_ERROR"
}
export type UserState = {
    users:any[],
    loading:boolean,
    error:null | string
}
export type UserAction = FetchUserAction | FetchUserActionSuccess | FetchUserActionError;
export interface FetchUserAction {
    type: UserActionTypes.FETCH_USERS
}
export interface FetchUserActionSuccess {
    type: UserActionTypes.FETCH_USERS_SUCCESS,
    payload:any[]
}
export interface FetchUserActionError {
    type:UserActionTypes.FETCH_USERS_ERROR,
    payload:any
}