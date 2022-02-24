import React, { useEffect } from 'react'
import { SearchForm, TopDestinations, Adventures } from '@components'
import { CitiesActions, FlightsActions, FlightsSelectors, ReservationActions } from '@store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Plans } from '@assets'

export const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const searchNetworkState = useSelector(FlightsSelectors.selectSearchLoadingState)

  useEffect(() => {
    dispatch(CitiesActions.index())
    dispatch(ReservationActions.clear())
  }, [])

  const handleSearch = (search) => {
    dispatch(FlightsActions.search(search))
    dispatch(ReservationActions.setFlightMode({ mode: search.mode }))
    navigate('/booking/flights')
  }

  return (
    <div className='wrapper'>
      <div className='container pv-7 mv-7'>
        <div className='row'>
          <div className='col-12 col-md-7 col-order-2 col-md-order-1'>
            <h1>Planeando tu siguiente viaje?</h1>
            <p>Reserva tus boletos con anticipacion y recibe los mejores precios.</p>
            <SearchForm onSearch={handleSearch} />
          </div>
          <div className='col-12 col-md-5 col-order-1 col-md-order-2'>
            <Plans />
          </div>
        </div>
      </div>

      <section id='destinations'>
        <div className='container'>
          <div className='d-flex flex-column ai-center jc-center txt-sm-left'>
            <h1>Los mejores destinos a un solo click de distancia</h1>
            <TopDestinations />
          </div>
        </div>
      </section>

      <section id='adventures'>
        <div className='container'>
          <div className='d-flex flex-column ai-center jc-center'>
            <h1>Contamos con paquetes de experiencias completas</h1>
            <Adventures />
          </div>
        </div>
      </section>
    </div>
  )
}
