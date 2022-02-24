import React from 'react'
import { SearchForm, FlightsList } from '@components'

export const Flights = () => {
  const handleSearch = (search) => {
    console.log(search)
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <h1>Vuelos disponibles</h1>
        </div>
        <div className='col-12 col-md-4'>
          <p>Filtros</p>
        </div>
        <div className='col-12 col-md-8'>
          <SearchForm onSearch={handleSearch} />
          <FlightsList />
        </div>
      </div>
    </div>
  )
}
