import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CartSelectors, ReservationsSelectors, ReservationActions } from '@store'
import { DisplayUtil } from '@utils'
import { Accordion, AccordionItem } from '@components'

export const Confirm = () => {
  const dispatch = useDispatch()
  const passengers = useSelector(ReservationsSelectors.selectPassengers)
  const items = useSelector(CartSelectors.selectCartItems)
  const total = useSelector(CartSelectors.selectCartTotal)

  const makeReservation = () => {
    dispatch(ReservationActions.create())
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <h2>Reserva</h2>
          <Accordion>
            {items.map((item, i) => (
              <AccordionItem key={i} name={`Vuelo ${item.code}`}>
                <div className='row'>
                  <div className='col-6 col-md-2'>
                    <small>Origen</small>
                    <br />
                    <b>
                      <i className='fa-solid fa-plane-departure'></i> {item.departureCity}
                    </b>
                  </div>
                  <div className='col-6 col-md-2'>
                    <small>Destino</small>
                    <br />
                    <b>
                      <i className='fa-solid fa-plane-arrival'></i> {item.arrivalCity}
                    </b>
                  </div>
                  <div className='col-6 col-md-2'>
                    <small>Fecha de salida</small>
                    <br />
                    <b>
                      <i className='fa-regular fa-calendar-days'></i>{' '}
                      {DisplayUtil.capitalize(DisplayUtil.dateFormat(item.departureDate))}
                    </b>
                  </div>
                  <div className='col-6 col-md-2'>
                    <small>Hora de llegada</small>
                    <br />
                    <b>
                      <i className='fa-regular fa-calendar-days'></i>{' '}
                      {DisplayUtil.capitalize(DisplayUtil.timeFormat(item.arrivalTime))}
                    </b>
                  </div>
                  <div className='col-6 col-md-2'>
                    <small>Pasajeros</small>
                    <br />
                    <b>
                      <i className='fa-solid fa-users'></i> {passengers.length}
                    </b>
                  </div>

                  <div className='col-6 col-md-2'>
                    <small>Total</small>
                    <br />
                    <b>
                      <i className='fa-solid fa-file-invoice-dollar'></i>{' '}
                      {DisplayUtil.currency(item.cost)}
                    </b>
                  </div>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
          <div className='row mt-4'>
            <div className='col-12 col-md-4 col-md-offset-8 d-flex ai-end jc-end flex-column'>
              <h3 className='m-0'>Total</h3>
              <h2 className='m-0 mt-1 mb-4'>
                <i className='fa-solid fa-file-invoice-dollar'></i> {DisplayUtil.currency(total)}
              </h2>
              <button className='green' onClick={makeReservation}>
                Reservar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
