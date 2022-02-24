import React from 'react'
import { useSelector } from 'react-redux'
import { ReservationsSelectors, FlightsSelectors } from '@store'
import { FLIGTH_MODES } from '@constants'

export const Steps = () => {
  const reservation = useSelector(ReservationsSelectors.selectReservation)
  const flights = useSelector(FlightsSelectors.selectFlights)

  const flightLabel = () => {
    if (reservation.mode == FLIGTH_MODES.ROUNDTRIP) {
      return 'vuelos 1 / 2'
    } else {
      return 'vuelos'
    }
  }

  return (
    reservation?.mode &&
    flights.length && (
      <ul className='steps'>
        <li className='step'>
          <span className='dot'>
            <i className='fa-solid fa-plane'></i>
          </span>
          <span className='lower-text'>{flightLabel()}</span>
        </li>
        <li className='step'>
          <span className='dot'>
            <i className='fa-solid fa-users'></i>
          </span>
          <span className='lower-text'>Pasajeros</span>
        </li>
        <li className='step'>
          <span className='dot'>
            <i className='fa-solid fa-file-invoice-dollar'></i>
          </span>
          <span className='lower-text'>Pagos</span>
        </li>
      </ul>
    )
  )
}
