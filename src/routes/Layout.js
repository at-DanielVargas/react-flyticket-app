import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '@components'
import '../styles/style.scss'

export const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
