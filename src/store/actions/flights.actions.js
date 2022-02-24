import { FlightsService } from '@services'
import { ReservationActions } from './reservations.actions'
import { DisplayUtil } from '@utils'

export const FlightsActionTypes = {
  SEARCH_FLIGHTS: '@flights/SEARCH_FLIGHTS',
  SEARCH_FLIGHTS_SUCCESS: '@flights/SEARCH_FLIGHTS_SUCCESS',
  SEARCH_FLIGHTS_FAILURE: '@flights/SEARCH_FLIGHTS_FAILURE',
  STORE_SEARCH_QUERY: '@flights/STORE_SEARCH_QUERY',
  CLEAR: '@flights/CLEAR'
}

const clear = () => {
  return {
    type: FlightsActionTypes.CLEAR
  }
}

const search = ({ departure, arrival, departureDate, returnDate }) => {
  return (dispatch) => {
    FlightsService.search({
      departure: departure.name,
      arrival: arrival.name,
      departureDate: DisplayUtil.dateFormatToUrl(departureDate)
    })
      .then((response) => {
        dispatch({
          type: FlightsActionTypes.SEARCH_FLIGHTS_SUCCESS,
          payload: response.data.flights
        })
      })
      .catch((error) => {
        dispatch({
          type: FlightsActionTypes.SEARCH_FLIGHTS_FAILURE,
          payload: error.response.data
        })
      })
  }
}

export const FlightsActions = {
  search,
  clear
}
