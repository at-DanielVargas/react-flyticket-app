import React from 'react'
import { PropTypes } from 'prop-types'

import { DisplayUtil } from '@utils'

export const Flight = ({ flight, onClick }) => {
  return (
    <li className='flights-item border-violet d-flex flex-column flex-sm-row ai-center mb-2'>
      <div className='flight-metadata mr-sm-4 p-4'>
        <div className='d-flex ai-center'>
          <h3 className='m-0'>{DisplayUtil.timeFormat(flight.departureTime)}</h3>
          <span className='mh-4'>
            <i className='fa-solid fa-plane'></i>
          </span>
          <h3 className='m-0'>{DisplayUtil.timeFormat(flight.arrivalTime)}</h3>
        </div>
        <p className='m-0'>{DisplayUtil.dateFormat(flight.departureDate)}</p>
        <small>Asientos disponibles {flight.availableSeats}</small>
      </div>
      <div className='ml-sm-auto p-4'>
        <b>
          {DisplayUtil.currency(flight.cost)} / <i className='fa-solid fa-user'></i>
        </b>
        <p className='m-0'>{DisplayUtil.timeDiff(flight.departureTime, flight.arrivalTime)}</p>
      </div>
      <div className='ml-sm-4 p-4'>
        <button className='blue block' onClick={() => onClick(flight)}>
          Seleccionar
        </button>
      </div>
    </li>
  )
}

Flight.propTypes = {
  flight: PropTypes.object.isRequired,
  onClick: PropTypes.func
}
