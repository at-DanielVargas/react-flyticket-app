import React from 'react'
import { Outlet } from 'react-router-dom'
import { Steps } from '@components'

export const Booking = () => {
  return (
    <>
      <Steps />
      <Outlet />
    </>
  )
}
