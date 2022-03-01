import React from 'react'
import PropTypes from 'prop-types'
import { Outlet, Redirect } from 'react-router-dom'
import { Steps } from '@components'
import { useSelector } from 'react-redux'
import { FlightsSelectors } from '@store'

export const Booking = ({ children }) => {
  const flightQuery = useSelector(FlightsSelectors.selectLastSearch)

  return flightQuery === null ? (
    <Redirect to='/' />
  ) : (
    <>
      <Steps />
      {children}
    </>
  )
}

Booking.propTypes = {
  children: PropTypes.node
}
