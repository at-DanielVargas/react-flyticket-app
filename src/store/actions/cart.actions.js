export const CartActionTypes = {
  ADD_TO_CART: '@cart/ADD_TO_CART'
}

const addToCart = ({ item }) => {
  return {
    type: CartActionTypes.ADD_TO_CART,
    payload: item
  }
}

export const CartActions = {
  addToCart
}
