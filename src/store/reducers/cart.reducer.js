import { NETWORK_STATUS } from '@constants'

/**
 * al carro se podran agregar los diferentes items
 * vuelo
 * pasajero
 * extra
 */

const initialState = {
  networkStatus: NETWORK_STATUS.IDLE,
  networkError: null,
  items: [],
  total: 0
}

export const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
