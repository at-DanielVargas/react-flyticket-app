import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { FlightsSelectors } from '@store'
import { Flight } from '@components'

export const FlightsList = ({ onFlightSelect }) => {
  const flights = useSelector(FlightsSelectors.selectFlights)

  const onClick = (flight) => {
    onFlightSelect(flight)
  }

  return (
    <ul className='flights-list'>
      {flights.length ? (
        flights.map((flight, index) => <Flight key={index} flight={flight} onClick={onClick} />)
      ) : (
        <div className='empty'>
          <p>Cargando...</p>
          <i className='fa-spin fa-solid fa-arrows-rotate'></i>
        </div>
      )}
    </ul>
  )
}

FlightsList.propTypes = {
  onFlightSelect: PropTypes.func
}
