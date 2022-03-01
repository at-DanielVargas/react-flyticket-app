import { createStore, combineReducers, applyMiddleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

// Reducers imports
import { CartReducer } from './reducers/cart.reducer'
import { CitiesReducer } from './reducers/cities.reducer'
import { FlightsReducer } from './reducers/flights.reducer'
import { AuthReducer } from './reducers/auth.reducer'
import { ReservationsReducer } from './reducers/reservations.reducer'
import { createBrowserHistory } from 'history'

//reducers
export * from './reducers/cities.reducer'
export * from './reducers/flights.reducer'
export * from './reducers/auth.reducer'
export * from './reducers/reservations.reducer'
export * from './reducers/cart.reducer'
// actions
export * from './actions/cities.actions'
export * from './actions/flights.actions'
export * from './actions/auth.actions'
export * from './actions/reservations.actions'
export * from './actions/cart.actions'
//selectors
export * from './selectors/reservations.selectors'
export * from './selectors/auth.selectors'
export * from './selectors/flights.selectors'
export * from './selectors/cities.selectors'
export * from './selectors/cart.selectors'

// store
const reducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    cities: CitiesReducer,
    flights: FlightsReducer,
    reservations: ReservationsReducer,
    auth: AuthReducer,
    cart: CartReducer
  })

export const history = createBrowserHistory()

export const Store = createStore(
  reducer(history),
  composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk))
)
