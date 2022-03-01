import { CitiesActionTypes } from '../actions/cities.actions'
import { NETWORK_STATUS } from '@constants'
const initialState = {
  items: [],
  networkStatus: NETWORK_STATUS.IDLE,
  loading: false,
  error: null
}

export const CitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CitiesActionTypes.INDEX_CITIES_REQUEST:
      return {
        ...state,
        networkStatus: NETWORK_STATUS.LOADING
      }
    case CitiesActionTypes.INDEX_CITIES_SUCCESS:
      return {
        ...state,
        networkStatus: NETWORK_STATUS.IDLE,
        items: action.payload
      }
    case CitiesActionTypes.INDEX_CITIES_FAILURE:
      return {
        ...state,
        networkStatus: NETWORK_STATUS.FAILURE,
        networkError: action.payload
      }
    case CitiesActionTypes.SEARCH_CITIES_REQUEST:
      return {
        ...state,
        loading: true,
        suggestions: [],
        error: null
      }
    case CitiesActionTypes.SEARCH_CITIES_SUCCESS:
      return {
        ...state,
        suggestions: action.payload,
        loading: false,
        error: null
      }
    case CitiesActionTypes.SEARCH_CITIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}
