import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { FlightsList } from '@components'
import { ReservationsSelectors, FlightsActions, FlightsSelectors, ReservationActions } from '@store'
import { DEPARTURE_KEY, FLIGTH_MODES, RETURN_KEY } from 'src/config/constants'

export const Flights = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const flightMode = useSelector(ReservationsSelectors.selectFlightMode)
  const flightQuery = useSelector(FlightsSelectors.selectLastSearch)
  const flights = useSelector(ReservationsSelectors.selectFlights)

  useEffect(() => {
    if (
      (flightMode === FLIGTH_MODES.ROUNDTRIP && flights.length == 2) ||
      (flightMode === FLIGTH_MODES.ONEWAY && flights.length == 1)
    ) {
      history.push('/booking/passengers')
    }

    if (flightMode === FLIGTH_MODES.ROUNDTRIP && flights.length == 1) {
      dispatch(
        FlightsActions.search({
          departure: flightQuery.arrival,
          arrival: flightQuery.departure,
          departureDate: flightQuery.returnDate
        })
      )
    }
  }, [flights])

  const selectFlight = (flight) => {
    dispatch(ReservationActions.addFlight({ flight }))
  }

  const handlePriceSort = (e) => {
    const { value } = e.target
    dispatch(FlightsActions.sortByPrice(value))
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-6'>
          <p className='m-0'>
            Seleccionar {flightMode === FLIGTH_MODES.ONEWAY ? 'vuelo de salida' : 'vuelo 1 / 2'}
          </p>
          <div className='d-flex'>
            <h2 className='txt-violet mr-3'>{flightQuery?.departure?.name}</h2>
            <h2 className='txt-violet'>
              <i className='fa-solid fa-arrow-right mr-3'></i>
            </h2>
            <h2 className='txt-violet'>{flightQuery?.arrival?.name}</h2>
          </div>
        </div>
        <div className='col-6 d-flex ai-center jc-end'>
          <p>Ordenar por</p>
          <label>
            Precio más
            <select placeholder='Precio' onChange={handlePriceSort}>
              <option value='asc'>Bajo</option>
              <option value='desc'>Caro</option>
            </select>
          </label>
        </div>
        <div className='col-12'>
          <FlightsList onFlightSelect={selectFlight} />
        </div>
      </div>
    </div>
  )
}
