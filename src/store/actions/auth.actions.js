import { push } from 'connected-react-router'
import { AuthService } from '@services'

export const AuthActionTypes = {
  LOGIN_REQUEST: '@auth/LOGIN_REQUEST',
  LOGIN_SUCCESS: '@auth/LOGIN_SUCCESS',
  LOGIN_FAILURE: '@auth/LOGIN_FAILURE',
  LOGOUT: '@auth/LOGOUT',
  REGISTER_REQUEST: '@auth/REGISTER_REQUEST',
  REGISTER_SUCCESS: '@auth/REGISTER_SUCCESS',
  REGISTER_FAILURE: '@auth/REGISTER_FAILURE'
}

export const AuthActions = {
  login: ({ email, password }) => {
    return (dispatch) => {
      dispatch({ type: AuthActionTypes.LOGIN_REQUEST })
      AuthService.login({ email, password })
        .then((response) => {
          dispatch({
            type: AuthActionTypes.LOGIN_SUCCESS,
            payload: response.data
          })
          dispatch(push('/'))
        })
        .catch((error) => {
          dispatch({
            type: AuthActionTypes.LOGIN_FAILURE,
            payload: error
          })
        })
    }
  },

  register: ({ user }) => {
    return (dispatch) => {
      dispatch({ type: AuthActionTypes.REGISTER_REQUEST })
      AuthService.register({ user })
        .then((response) => {
          dispatch({
            type: AuthActionTypes.REGISTER_SUCCESS,
            payload: response.data
          })
        })
        .catch((error) => {
          dispatch({
            type: AuthActionTypes.REGISTER_FAILURE,
            payload: error
          })
        })
    }
  },
  logout: () => {
    return {
      type: AuthActionTypes.LOGOUT
    }
  }
}
