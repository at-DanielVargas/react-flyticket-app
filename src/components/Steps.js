import React from 'react'
import { useSelector } from 'react-redux'
import { ReservationsSelectors, FlightsSelectors } from '@store'
import { FLIGTH_MODES } from '@constants'
import { array } from 'yup'
import { object } from 'yup'
import { string } from 'yup'

export const Steps = () => {
  const reservation = useSelector(ReservationsSelectors.selectReservation)
  const selectedReservationFlights = useSelector(ReservationsSelectors.selectFlights)

  const flightLabel = () => {
    if (reservation.mode == FLIGTH_MODES.ROUNDTRIP) {
      return `Vuelos ${selectedReservationFlights.length} / 2`
    } else {
      return 'Vuelos'
    }
  }

  const passengersValid = () => {
    const validationSchema = array().of(
      object().shape({
        firstname: string().required('El nombre es requerido'),
        lastname: string().required('El apellido es requerido'),
        email: string()
          .email('El valor ingresado no es un correo electronico valido')
          .required('El email es requerido'),
        phone: string().required('El teléfono es requerido')
      })
    )
    return validationSchema.isValidSync(reservation.passengers)
  }

  const activeWhen = (condition) => {
    return condition ? 'active' : ''
  }

  return reservation?.mode ? (
    <ul className='steps'>
      <li
        className={`step ${activeWhen(
          (reservation.mode === FLIGTH_MODES.ROUNDTRIP && selectedReservationFlights.length == 2) ||
            (reservation.mode === FLIGTH_MODES.ONEWAY && selectedReservationFlights.length == 1)
        )}`}>
        <span className='dot'>
          <i className='fa-solid fa-plane'></i>
        </span>
        <span className='lower-text'>{flightLabel()}</span>
      </li>
      <li className={`step ${activeWhen(passengersValid())}`}>
        <span className='dot'>
          <i className='fa-solid fa-users'></i>
        </span>
        <span className='lower-text'>Pasajeros</span>
      </li>
      <li className='step'>
        <span className='dot'>
          <i className='fa-solid fa-file-invoice-dollar'></i>
        </span>
        <span className='lower-text'>Reserva</span>
      </li>
    </ul>
  ) : null
}
