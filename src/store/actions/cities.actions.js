import { CitiesService } from '@services'

export const CitiesActionTypes = {
  SEARCH_CITIES_REQUEST: '@cities/SEARCH_CITIES_REQUEST',
  SEARCH_CITIES_SUCCESS: '@cities/SEARCH_CITIES_SUCCESS',
  SEARCH_CITIES_FAILURE: '@cities/SEARCH_CITIES_FAILURE',

  SHOW_CITY_REQUEST: '@cities/SHOW_CITY_REQUEST',
  SHOW_CITY_SUCCESS: '@cities/SHOW_CITY_SUCCESS',
  SHOW_CITY_FAILURE: '@cities/SHOW_CITY_FAILURE',

  INDEX_CITIES_REQUEST: '@cities/INDEX_CITIES_REQUEST',
  INDEX_CITIES_SUCCESS: '@cities/INDEX_CITIES_SUCCESS',
  INDEX_CITIES_FAILURE: '@cities/INDEX_CITIES_FAILURE'
}

const search = ({ search }) => {
  return (dispatch) => {
    dispatch({
      type: CitiesActionTypes.SEARCH_CITIES_REQUEST,
      payload: search
    })
    CitiesService.search({ search })
      .then((response) => {
        dispatch({
          type: CitiesActionTypes.SEARCH_CITIES_SUCCESS,
          payload: response.data
        })
      })
      .catch((error) => {
        dispatch({
          type: CitiesActionTypes.SEARCH_CITIES_FAILURE,
          payload: error
        })
      })
  }
}

const index = () => {
  return (dispatch) => {
    dispatch({
      type: CitiesActionTypes.INDEX_CITIES_REQUEST
    })
    CitiesService.index()
      .then((response) => {
        dispatch({
          type: CitiesActionTypes.INDEX_CITIES_SUCCESS,
          payload: response.data
        })
      })
      .catch((error) => {
        dispatch({
          type: CitiesActionTypes.INDEX_CITIES_FAILURE,
          payload: error
        })
      })
  }
}

const show = ({ id }) => {
  return (dispatch) => {
    dispatch({
      type: CitiesActionTypes.SHOW_CITY_REQUEST
    })
    CitiesService.show({ id })
      .then((response) => {
        dispatch({
          type: CitiesActionTypes.SHOW_CITY_SUCCESS,
          payload: response.data
        })
      })
      .catch((error) => {
        dispatch({
          type: CitiesActionTypes.SHOW_CITY_FAILURE,
          payload: error.response.data
        })
      })
  }
}

export const CitiesActions = {
  search,
  index,
  show
}
