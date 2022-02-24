import React from 'react'
import { PropTypes } from 'prop-types'

export const Flight = ({ flight }) => {
  return (
    <li className='flights-item'>
      <h1>{flight.code}</h1>
    </li>
  )
}

Flight.propTypes = {
  flight: PropTypes.oject
}
