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
      const search = []
      search.push(action.payload)
      return {
        ...state,
        loading: true,
        search,
        list: [],
        query: action.payload,
        error: null
      }

    case FlightsActionTypes.SEARCH_FLIGHTS_SUCCESS:
      return {
        ...state,
        list: [...action.payload.sort((a, b) => a.cost - b.cost)],
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

    case FlightsActionTypes.SORT_BY_PRICE:
      const list = [...state.list]
      list.sort((a, b) => {
        if (action.payload === 'asc') {
          return a.cost - b.cost
        } else if (action.payload === 'desc') {
          return b.cost - a.cost
        } else {
          return 0
        }
      })
      return {
        ...state,
        list
      }

    default:
      return state
  }
}
