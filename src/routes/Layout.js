import React from 'react'
import PropTypes from 'prop-types'
import { Navbar } from '@components'

import '../styles/style.scss'

export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}
