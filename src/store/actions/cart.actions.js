export const CartActionTypes = {
  ADD_TO_CART: '@cart/ADD_TO_CART'
}

const addToCart = () => {
  return {
    type: CartActionTypes.CLEAR
  }
}

export const CartActions = {
  addToCart
}
