import {Dispatch} from "redux";
import {SingInAPI} from "./SingIn.api";
import axios, {AxiosError} from "axios";
import {ActionsType} from '../../../app/store';

const initialState = {
    isLoggedIn: false,

}
type InitialStateType = typeof initialState

export const singInReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const loginTC = (data: any) => async (dispatch: Dispatch<ActionsType>) => {

    try {
        const res = await SingInAPI.login(data)
        if (res.statusText === 'OK') {
            dispatch(setIsLoggedInAC(true))
            console.log(res)
        } else {

        }
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message
            console.log(error)
            //dispatch(setAppErrorAC(error))
        } else {
            //dispatch(setAppErrorAC(`Native error ${err.message}`))
        }
    }
}

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    //dispatch(setAppStatusAC('loading'))
    SingInAPI.logout()
        .then(res => {
            if (res) {
                dispatch(setIsLoggedInAC(false))
                //dispatch(setAppStatusAC('succeeded'))
            } else {
                //handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            //handleServerNetworkError(error, dispatch)
        })
}

export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>