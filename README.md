In the project directory, you can run:
### `yarn start`
### `yarn build`

## Создаем типы для actions и action-creators
``` TypeScript
//user types
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

//todos types
export interface TodoState {
    todos:any[],
    loading:boolean,
    error:null|string,
    page:number,
    limit:number
}

export enum TodoActionTypes {
    FETCH_TODOS = "FETCH_TODOS",
    FETCH_TODOS_ERROR = "FETCH_TODOS_ERROR",
    FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS",
    FETCH_TODOS_PAGE = "FETCH_TODOS_PAGE",
}
interface FetchTodoAction {
    type:TodoActionTypes.FETCH_TODOS
}
interface FetchTodoSuccessAction {
    type:TodoActionTypes.FETCH_TODOS_SUCCESS,
    payload:any[]
}
interface FetchTodoErrorAction {
    type:TodoActionTypes.FETCH_TODOS_ERROR,
    payload:string
}
interface FetchTodoPageAction {
    type:TodoActionTypes.FETCH_TODOS_PAGE,
    payload:number
}

export type TodoAction = FetchTodoAction | FetchTodoErrorAction | FetchTodoPageAction | FetchTodoSuccessAction;
```

## Создаем редьюсеры
``` typescript
import {UserActionTypes, UserState, UserAction} from '../../types/user'
const initialState:UserState = {
    users:[],
    loading:false,
    error:null
}

export const userReducer = (state = initialState,action:UserAction):UserState => {
    switch (action.type) {
        case UserActionTypes.FETCH_USERS:{
            return {loading:true,error:null,users:[]}
        }
        case UserActionTypes.FETCH_USERS_SUCCESS:{
            return {loading:false,error:null,users:action.payload}
        }
        case UserActionTypes.FETCH_USERS_ERROR:{
            return {loading:false,error:action.payload,users:[]}
        }
        default: return state
    }
}
```

## Хуки для `UseSelector` и `UseDispatch`
```typescript
// useActions or useDispatch
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import ActionCreators from '../store/actions/index'

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(ActionCreators,dispatch)
}

// useSelector 
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../store/reducers";

export const useTypedSelector:TypedUseSelectorHook<RootState> = useSelector
```

## Пример использования экшена с типом 
```typescript
export const fetchUsers = () => {
    return async (dispatch:Dispatch<UserAction>) => {
        try {
            dispatch({type:UserActionTypes.FETCH_USERS})
            const response = await axios.get('https://jsonplaceholder.typicode.com/users')
            setTimeout(()=>{dispatch({type:UserActionTypes.FETCH_USERS_SUCCESS,payload:response.data})},510)
        }catch (e) {
            dispatch(
                {
                    type:UserActionTypes.FETCH_USERS_ERROR,
                    payload:'Что-то пошло не так!'
                }
            )
        }
    }
}
```

## Пример использования `useActions` и `useTypedSelector`

```typescript
const {users,loading,error} = useTypedSelector((state) => state.user)
const {fetchUsers} = useActions()
```
