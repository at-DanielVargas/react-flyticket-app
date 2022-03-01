import { ReservationsActionTypes } from '../actions/reservations.actions'
import { useHistory } from 'react-router-dom'
const initialState = {
  loading: false,
  reservations: [],
  reservation: {
    passengers: [],
    flights: [],
    departure: null,
    arrival: null,
    departureFlight: null,
    returnFlight: null,
    mode: ''
  },
  error: null
}

export const ReservationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ReservationsActionTypes.CLEAR:
      return {
        ...state,
        loading: false,
        reservation: initialState.reservation,
        error: null
      }

    //#region reservation flow
    case ReservationsActionTypes.SET_PASSENGERS:
      return {
        ...state,
        reservation: {
          ...state.reservation,
          passengers: action.payload
        }
      }

    case ReservationsActionTypes.SET_FLIGHT_MODE:
      return {
        ...state,
        reservation: {
          ...state.reservation,
          mode: action.payload
        }
      }

    case ReservationsActionTypes.ADD_FLIGHT:
      return {
        ...state,
        reservation: {
          ...state.reservation,
          flights: [...state.reservation.flights, action.payload]
        }
      }

    case ReservationsActionTypes.SET_DEPARTURE_CITY:
      return {
        ...state,
        reservation: {
          ...state.reservation,
          departure: action.payload
        }
      }

    case ReservationsActionTypes.SET_ARRIVAL_CITY:
      return {
        ...state,
        reservation: {
          ...state.reservation,
          arrival: action.payload
        }
      }
    //#endregion

    //#region persist reservation
    case ReservationsActionTypes.CREATE:
      return {
        ...state,
        loading: true
      }
    case ReservationsActionTypes.CREATE_SUCCESS:
      useHistory('/reservations')
      return {
        ...state,
        loading: false,
        reservations: [...state.reservations, action.payload]
      }

    case ReservationsActionTypes.CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    //#endregion

    case ReservationsActionTypes.READ:
      return {
        ...state,
        loading: true
      }
    case ReservationsActionTypes.READ_SUCCESS:
      return {
        ...state,
        loading: false,
        reservations: action.payload
      }
    case ReservationsActionTypes.READ_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}
