import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Accordion, AccordionItem } from '@components'
import { ReservationActions, ReservationsSelectors } from '@store'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import { string, object, array } from 'yup'

export const Passengers = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const passengers = useSelector(ReservationsSelectors.selectPassengers)

  const initialValues = {
    passengers: [...passengers]
  }

  const validationSchema = object().shape({
    passengers: array().of(
      object().shape({
        firstname: string().required('El nombre es requerido'),
        lastname: string().required('El apellido es requerido'),
        email: string()
          .email('El valor ingresado no es un correo electronico valido')
          .required('El email es requerido'),
        phone: string().required('El teléfono es requerido')
      })
    )
  })

  const onSubmit = (values) => {
    dispatch(ReservationActions.setPassengers(values.passengers))
    history.push('/booking/confirm')
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({ errors, values, touched, setValues }) => (
              <Form>
                <Accordion>
                  <FieldArray name='passengers'>
                    {() =>
                      values.passengers.map((passenger, i) => {
                        const passengerErrors =
                          (errors.passengers?.length && errors.passengers[i]) || {}
                        const passengerTouched =
                          (touched.passengers?.length && touched.passengers[i]) || {}
                        return (
                          <AccordionItem key={i} name={`Pasajero ${i + 1}`}>
                            <div className='row'>
                              <div className='col-12 col-md-3'>
                                <label>Nombre</label>
                                <Field name={`passengers.${i}.firstname`} type='text' />
                                {passengerErrors.firstname && passengerTouched.firstname && (
                                  <small className='txt-red'>{passengerErrors.firstname}</small>
                                )}
                              </div>
                              <div className='col-12 col-md-3'>
                                <label>Apellido</label>
                                <Field name={`passengers.${i}.lastname`} type='text' />
                                {passengerErrors.lastname && passengerTouched.lastname && (
                                  <small className='txt-red'>{passengerErrors.lastname}</small>
                                )}
                              </div>
                              <div className='col-12 col-md-3'>
                                <label>Email</label>
                                <Field name={`passengers.${i}.email`} type='text' />
                                {passengerErrors.email && passengerTouched.email && (
                                  <small className='txt-red'>{passengerErrors.email}</small>
                                )}
                              </div>
                              <div className='col-12 col-md-3'>
                                <label>Teléfono</label>
                                <Field name={`passengers.${i}.phone`} type='text' />
                                {passengerErrors.phone && passengerTouched.phone && (
                                  <small className='txt-red'>{passengerErrors.phone}</small>
                                )}
                              </div>
                            </div>
                          </AccordionItem>
                        )
                      })
                    }
                  </FieldArray>
                </Accordion>
                <div className='d-flex jc-end ai-center mt-4'>
                  <button className='violet-outline' type='submit'>
                    Continuar
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
