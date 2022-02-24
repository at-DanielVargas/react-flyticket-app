import { FlightsActionTypes } from '../actions/flights.actions'

const initialState = {
  loading: false,
  search: [],
  list: [],
  query: null,
  error: null
}

export const FlightsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FlightsActionTypes.SEARCH_FLIGHTS:
      return {
        ...state,
        loading: true,
        query: action.payload,
        error: null
      }

    case FlightsActionTypes.SEARCH_FLIGHTS_SUCCESS:
      return {
        ...state,
        list: [...action.payload],
        loading: false,
        error: null
      }

    case FlightsActionTypes.SEARCH_FLIGHTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case FlightsActionTypes.CLEAR:
      return {
        ...state,
        ...initialState
      }

    default:
      return state
  }
}
