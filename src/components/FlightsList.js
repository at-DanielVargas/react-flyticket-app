import React from 'react'
import { useSelector } from 'react-redux'
import { FlightsSelectors } from '@store'
import { Flight } from '@components'
export const FlightsList = () => {
  const flights = useSelector(FlightsSelectors.selectFlights)

  return (
    <ul className='flights-list'>
      {flights.length ? (
        flights.map((flight, index) => <Flight key={index} flight={flight} />)
      ) : (
        <div className='empty'>
          <p>Cargando...</p>
          <i className='fa-spin fa-solid fa-arrows-rotate'></i>
        </div>
      )}
    </ul>
  )
}
