import { AuthActionTypes } from '../actions/auth.actions'
import { NETWORK_STATUS, USER_STORAGE_KEY, USER_ACCESS_TOKEN } from '@constants'

const initialState = {
  loginRequestStatus: NETWORK_STATUS.IDLE,
  registerRequestStatus: NETWORK_STATUS.IDLE,
  user: window.localStorage.getItem(USER_STORAGE_KEY) || null,
  accessToken: window.localStorage.getItem(USER_ACCESS_TOKEN) || null,
  loginError: null,
  registerError: null
}

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        loginRequestStatus: NETWORK_STATUS.LOADING,
        loginError: null
      }
    case AuthActionTypes.LOGIN_SUCCESS:
      window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(action.payload.user))
      window.localStorage.setItem(USER_ACCESS_TOKEN, action.payload.accessToken)
      return {
        ...state,
        loginRequestStatus: NETWORK_STATUS.IDLE,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        loginError: null
      }

    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loginRequestStatus: NETWORK_STATUS.IDLE,
        user: null,
        accessToken: null,
        error: action.payload
      }

    case AuthActionTypes.REGISTER_REQUEST:
      return {
        ...state,
        registerRequestStatus: NETWORK_STATUS.LOADING,
        registerError: null
      }
    case AuthActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        registerRequestStatus: NETWORK_STATUS.IDLE,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        registerError: null
      }
    case AuthActionTypes.REGISTER_FAILURE:
      return {
        ...state,
        registerRequestStatus: NETWORK_STATUS.IDLE,
        registerError: action.payload
      }

    case AuthActionTypes.LOGOUT:
      window.localStorage.removeItem(USER_STORAGE_KEY)
      window.localStorage.removeItem(USER_ACCESS_TOKEN)
      return {
        ...state,
        isAuthenticated: false,
        accessToken: null,
        user: null
      }
    default:
      return state
  }
}
