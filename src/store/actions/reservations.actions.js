import { ReservationsService } from '@services'
import { CartActions } from '@store'
import { FLIGTH_MODES } from 'src/config/constants'

export const ReservationsActionTypes = {
  GET_RESERVATIONS: '@reservations/GET_RESERVATIONS',
  GET_RESERVATIONS_SUCCESS: '@reservations/GET_RESERVATIONS_SUCCESS',
  GET_RESERVATIONS_FAILURE: '@reservations/GET_RESERVATIONS_FAILURE',

  CREATE: '@reservations/CREATE',
  CREATE_SUCCESS: '@reservations/CREATE_SUCCESS',
  CREATE_FAILURE: '@reservations/CREATE_FAILURE',

  READ: '@reservations/READ',
  READ_SUCCESS: '@reservations/READ_SUCCESS',
  READ_FAILURE: '@reservations/READ_FAILURE',

  UPDATE: '@reservations/UPDATE',
  UPDATE_SUCCESS: '@reservations/UPDATE_SUCCESS',
  UPDATE_FAILURE: '@reservations/UPDATE_FAILURE',

  DELETE: '@reservations/DELETE',
  DELETE_SUCCESS: '@reservations/DELETE_SUCCESS',
  DELETE_FAILURE: '@reservations/DELETE_FAILURE',

  //#region reservation flow
  SET_PASSENGERS: '@reservations/SET_PASSENGERS',
  SET_FLIGHT_MODE: '@reservations/SET_FLIGHT_MODE',
  SET_DEPARTURE_CITY: '@reservations/SET_DEPARTURE_CITY',
  SET_ARRIVAL_CITY: '@reservations/SET_ARRIVAL_CITY',
  ADD_FLIGHT: '@reservations/ADD_FLIGHT',
  //#endregion

  CLEAR: '@reservations/CLEAR'
}

export const ReservationActions = {
  clear: () => {
    return {
      type: ReservationsActionTypes.CLEAR
    }
  },
  setFlightMode: ({ mode }) => {
    return (dispatch) => {
      dispatch({
        type: ReservationsActionTypes.SET_FLIGHT_MODE,
        payload: mode
      })
    }
  },
  setPassengers: (passengers) => {
    return (dispatch) => {
      dispatch({
        type: ReservationsActionTypes.SET_PASSENGERS,
        payload: passengers
      })
    }
  },
  addFlight: ({ flight }) => {
    return (dispatch) => {
      dispatch(CartActions.addToCart({ item: flight }))
      dispatch({
        type: ReservationsActionTypes.ADD_FLIGHT,
        payload: flight
      })
    }
  },
  setDepartureCity: ({ city }) => {
    return (dispatch) => {
      dispatch({
        type: ReservationsActionTypes.SET_DEPARTURE_CITY,
        payload: city
      })
    }
  },
  setArrivalCity: ({ city }) => {
    return (dispatch) => {
      dispatch({
        type: ReservationsActionTypes.SET_ARRIVAL_CITY,
        payload: city
      })
    }
  },

  // async actions (thunks)
  create: () => {
    return (dispatch, state) => {
      const reservation = state().reservations.reservation
      dispatch({
        type: ReservationsActionTypes.CREATE
      })
      ReservationsService.create({ reservation })
        .then((response) => {
          dispatch({
            type: ReservationsActionTypes.CREATE_SUCCESS,
            payload: response.data
          })
        })
        .catch((error) => {
          console.log(error.response)

          dispatch({
            type: ReservationsActionTypes.CREATE_FAILURE,
            payload: error
          })
        })
    }
  },
  read: () => {
    return async (dispatch) => {
      dispatch({
        type: ReservationsActionTypes.READ
      })
      ReservationsService.read()
        .then((response) => {
          dispatch({
            type: ReservationsActionTypes.READ_SUCCESS,
            payload: response.data
          })
        })
        .catch((error) => {
          dispatch({
            type: ReservationsActionTypes.READ_FAILURE,
            payload: error
          })
        })
    }
  },
  update: ({ reservation }) => {
    return (dispatch) => {
      dispatch({ type: ReservationsActionTypes.UPDATE })
      ReservationsService.update({ reservation })
        .then((response) => {
          dispatch({
            type: ReservationsActionTypes.UPDATE_SUCCESS,
            payload: response.data
          })
        })
        .catch((error) => {
          dispatch({
            type: ReservationsActionTypes.UPDATE_FAILURE,
            payload: error
          })
        })
    }
  },
  delete: ({ reservation }) => {
    return (dispatch) => {
      dispatch({ type: ReservationsActionTypes.DELETE })
      ReservationsService._delete({ reservation })
        .then((response) => {
          dispatch({
            type: ReservationsActionTypes.DELETE_SUCCESS,
            payload: response.data
          })
        })
        .catch((error) => {
          dispatch({
            type: ReservationsActionTypes.DELETE_FAILURE,
            payload: error
          })
        })
    }
  }
}
