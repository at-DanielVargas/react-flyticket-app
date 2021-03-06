import React from 'react'
import { PropTypes } from 'prop-types'
import { object, string, array, date, number } from 'yup'
import { FLIGTH_MODES, PASSENGER_TYPES } from 'src/config/constants'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Autocomplete, Datepicker, Dropdown, DropdownItem, Counter } from '@components'
import { useSelector } from 'react-redux'
import { CitiesSelectors, FlightsSelectors } from '@store'

export const SearchForm = ({ onSearch }) => {
  const suggestions = useSelector(CitiesSelectors.selectCities)
  const lastSearch = useSelector(FlightsSelectors.selectLastSearch)

  const searchValidationSchema = object().shape({
    mode: string().oneOf([FLIGTH_MODES.ROUNDTRIP, FLIGTH_MODES.ONEWAY]),
    departure: object().required('Este campo es obligatorio'),
    arrival: object().required('Este campo es obligatorio'),
    departureDate: date().required('Este campo es obligatorio'),
    returnDate: date().when('mode', {
      is: FLIGTH_MODES.ROUNDTRIP,
      then: date().required('Este campo es obligatorio'),
      otherwise: date().notRequired()
    }),
    passengers: array()
      .of(object())
      .min(1, 'Debes seleccionar por lo menos 1 pasajero')
      .required('Este campo es obligatorio')
  })

  const handlePassengersCount = (value, fieldName, setValues, values) => {
    if (value > 0) {
      const passengers = [...values.passengers].filter((passenger) => passenger.type !== fieldName)
      for (let index = 0; index < value; index++) {
        passengers.push({ type: fieldName, firstname: '', lastname: '', email: '', phone: '' })
      }
      setValues({ ...values, passengers })
    }
  }

  return (
    <div className='search-form'>
      <Formik
        initialValues={{
          departure: '',
          arrival: '',
          departureDate: '',
          returnDate: '',
          mode: FLIGTH_MODES.ONEWAY,
          passengers: []
        }}
        validationSchema={searchValidationSchema}
        onSubmit={(values) => {
          onSearch(values)
        }}>
        {({ errors, values, touched, setValues }) => (
          <Form>
            <div className='row'>
              <div className='col-3'>
                <label className='check radio'>
                  Sencillo
                  <Field type='radio' name='mode' value={FLIGTH_MODES.ONEWAY} />
                  <div className='indicator'></div>
                </label>
              </div>
              <div className='col-3'>
                <label className='check radio'>
                  Redondo
                  <Field type='radio' name='mode' value={FLIGTH_MODES.ROUNDTRIP} />
                  <div className='indicator'></div>
                </label>
              </div>
            </div>
            <div className='row'>
              <div className='col-12 col-md-6'>
                <Autocomplete name='departure' placeholder='Origen' suggestions={suggestions} />
                <ErrorMessage name='departure' component='div' className='txt-red ph-2' />
              </div>
              <div className='col-12 col-md-6'>
                <Autocomplete name='arrival' placeholder='Destino' suggestions={suggestions} />
                <ErrorMessage name='arrival' component='div' className='txt-red ph-2' />
              </div>
              <div
                className={`col-12 ${
                  values.mode === FLIGTH_MODES.ONEWAY ? 'col-md-4' : 'col-md-3'
                }`}>
                <Datepicker name='departureDate' placeholder='Salida' />
                <ErrorMessage name='departureDate' component='div' className='txt-red ph-2' />
              </div>
              {values.mode === FLIGTH_MODES.ROUNDTRIP && (
                <div
                  className={`col-12 ${
                    values.mode === FLIGTH_MODES.ONEWAY ? 'col-md-4' : 'col-md-3'
                  }`}>
                  <Datepicker name='returnDate' placeholder='Regreso' />
                  <ErrorMessage name='returnDate' component='div' className='txt-red ph-2' />
                </div>
              )}
              <div
                className={`col-12 ${
                  values.mode === FLIGTH_MODES.ONEWAY ? 'col-md-4' : 'col-md-3'
                }`}>
                <Dropdown placeholder='Pasajeros'>
                  <DropdownItem>
                    <div className='counter-container'>
                      <div className='counter-info'>
                        <b>Adultos</b>
                      </div>
                      <div className='counter-count'>
                        <Counter
                          onCounterChange={(count) =>
                            handlePassengersCount(count, PASSENGER_TYPES.ADULT, setValues, values)
                          }
                        />
                      </div>
                    </div>
                  </DropdownItem>

                  <DropdownItem>
                    <div className='counter-container'>
                      <div className='counter-info'>
                        <b>Ni??os</b>
                      </div>
                      <div className='counter-count'>
                        <Counter
                          onCounterChange={(count) =>
                            handlePassengersCount(count, PASSENGER_TYPES.CHILD, setValues, values)
                          }
                        />
                      </div>
                    </div>
                  </DropdownItem>

                  <DropdownItem>
                    <div className='counter-container'>
                      <div className='counter-info'>
                        <b>Infantes</b>
                      </div>
                      <div className='counter-count'>
                        <Counter
                          onCounterChange={(count) =>
                            handlePassengersCount(count, PASSENGER_TYPES.INFANT, setValues, values)
                          }
                        />
                      </div>
                    </div>
                  </DropdownItem>
                </Dropdown>
                <ErrorMessage name='passengers' component='div' className='txt-red ph-2' />
              </div>
              <div
                className={`col-12 ${
                  values.mode === FLIGTH_MODES.ONEWAY ? 'col-md-4' : 'col-md-3'
                }`}>
                <button className='blue-outline block' type='submit'>
                  Buscar
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired
}
