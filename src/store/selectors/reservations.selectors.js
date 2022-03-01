export const ReservationsSelectors = {
  selectReservation: (state) => state.reservations?.reservation,

  selectPassengers: (state) => state.reservations?.reservation?.passengers,

  selectDepartureFlight: (state) => state.reservations?.reservation?.departureFlight,

  selectReturnFlight: (state) => state.reservations?.reservation?.returnFlight,

  selectFlightMode: (state) => state.reservations?.reservation?.mode,

  selectFlights: (state) => state.reservations?.reservation?.flights
}
