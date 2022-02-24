export const FlightsSelectors = {
  selectFlights: (state) => state.flights.list,
  selectSearchLoadingState: (state) => state.flights.loading,
  selectSearchLoadingErrors: (state) => state.flights.error,
  selectLastSearch: (state) => state.flights.query,
  selectDepartureFlight: (state) => state.flights.departure,
  selectReturnFlight: (state) => state.flights.return,
  selectPassengers: (state) => state?.flights?.query?.passengers
}
