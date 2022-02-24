import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar, Steps } from '@components'

import '../styles/style.scss'

export const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
