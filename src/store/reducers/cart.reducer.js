import { NETWORK_STATUS } from '@constants'
import { CartActionTypes } from '@store'
const initialState = {
  networkStatus: NETWORK_STATUS.IDLE,
  networkError: null,
  items: [],
  total: 0
}

export const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART:
      const items = [...state.items]
      const item = action.payload
      const index = items.findIndex((i) => i.id === item.id)
      if (index === -1) {
        items.push(item)
      } else {
        items[index].quantity += item.quantity
      }
      return {
        ...state,
        items
      }
    default:
      return state
  }
}
