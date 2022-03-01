export const CartSelectors = {
  selectCartItems: (state) => state.cart?.items,
  selectCartTotal: (state) => {
    const passengers = state.reservations?.reservation?.passengers
    const items = state.cart?.items
    const total = items?.reduce((acc, item) => acc + item.cost * passengers.length, 0)
    return total
  }
}
