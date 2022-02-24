import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Layout, Home, Flights, Cart, Booking } from '@routes'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='' element={<Home />} />
          <Route path='booking' element={<Booking />}>
            <Route path='' element={<Flights />} />
            <Route path='flights' element={<Flights />} />
          </Route>
          <Route path='cart' element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
