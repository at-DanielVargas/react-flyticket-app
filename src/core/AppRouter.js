import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Layout, Home, Flights, Cart } from '@routes'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='' element={<Home />} />
          <Route path='flights' element={<Flights />} />
          <Route path='cart' element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
