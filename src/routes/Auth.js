import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { object, string } from 'yup'
import { AuthActions, AuthSelectors } from '@store'
import { NETWORK_STATUS } from 'src/config/constants'

export const Auth = () => {
  const navigate = useHistory()
  const dispatch = useDispatch()
  const [register, setRegister] = useState(false)

  const loginLoading = useSelector(AuthSelectors.selectLoginRequestStatus)
  const registerLoading = useSelector(AuthSelectors.selectRegisterRequestStatus)

  const loginValidationSchema = object().shape({
    email: string().email('El email ingresado no es válido').required('El email es requerido'),
    password: string().required('la contraseña es requerida')
  })
  const initialLoginValues = {
    email: '',
    password: ''
  }
  const handleLogin = (values) => {
    dispatch(AuthActions.login(values))
  }

  const registerValidationSchema = object().shape({
    firstname: string().required('El nombre es requerido'),
    lastname: string().required('El apellido es requerido'),
    email: string().email('El email ingresado no es válido').required('El email es requerido'),
    password: string().required('la contraseña es requerida')
  })
  const initialRegisterValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  }
  const handleRegister = (values) => {
    dispatch(AuthActions.register({ user: values }))
  }

  return (
    <div className='auth-wrapper'>
      <div className={`auth-area ${register && 'register'}`}>
        <div className='form-container sign-up-container'>
          <Formik
            initialValues={initialRegisterValues}
            validationSchema={registerValidationSchema}
            onSubmit={handleRegister}>
            <Form>
              <h1>
                <i className='fa-solid fa-plane'></i>
              </h1>
              <h1>Crear cuenta</h1>
              <div className='mb-1 w-100'>
                <Field type='text' placeholder='Nombre' name='firstname' className='block' />
                <ErrorMessage
                  name='firstname'
                  component='small'
                  className='d-block txt-yellow mt-2'
                />
              </div>

              <div className='mb-1 w-100'>
                <Field type='text' placeholder='Apellido' name='lastname' className='block' />
                <ErrorMessage
                  name='lastname'
                  component='small'
                  className='d-block txt-yellow mt-2'
                />
              </div>
              <div className='mb-1 w-100'>
                <Field type='email' placeholder='Email' name='email' className='block' />
                <ErrorMessage name='email' component='small' className='d-block txt-yellow mt-2' />
              </div>
              <div className='mb-1 w-100'>
                <Field type='password' placeholder='Contraseña' name='password' className='block' />
                <ErrorMessage
                  name='password'
                  component='small'
                  className='d-block txt-yellow mt-2'
                />
              </div>

              <button
                className='red-outline mt-4 block'
                type='submit'
                disabled={registerLoading === NETWORK_STATUS.LOADING}>
                {registerLoading === NETWORK_STATUS.LOADING ? (
                  <i className='fa-spin fa-solid fa-rotate mr-3'></i>
                ) : null}
                Crear cuenta
              </button>

              <button
                className='mt-4 zero-outline nv-button'
                type='button'
                onClick={() => setRegister(false)}>
                Iniciar sesión
              </button>
            </Form>
          </Formik>
        </div>
        <div className='form-container sign-in-container'>
          <Formik
            initialValues={initialLoginValues}
            validationSchema={loginValidationSchema}
            onSubmit={handleLogin}>
            <Form>
              <h1>
                <i className='fa-solid fa-plane'></i>
              </h1>
              <h1>Iniciar sesión</h1>
              <div className='mb-1 w-100'>
                <Field type='email' placeholder='Email' name='email' className='block' />
                <ErrorMessage name='email' component='small' className='d-block txt-yellow mt-2' />
              </div>

              <div className='mb-1 w-100'>
                <Field type='password' placeholder='Contraseña' name='password' className='block' />
                <ErrorMessage
                  name='password'
                  component='small'
                  className='d-block txt-yellow mt-2'
                />
              </div>
              <button
                className='mt-4 yellow-outline block'
                type='submit'
                disabled={loginLoading === NETWORK_STATUS.LOADING}>
                {loginLoading === NETWORK_STATUS.LOADING ? (
                  <i className='fa-spin fa-solid fa-rotate mr-3'></i>
                ) : null}
                Iniciar sesión
              </button>
              <button className='mt-4 zero-outline nv-button' onClick={() => setRegister(true)}>
                Registrarme
              </button>
            </Form>
          </Formik>
        </div>
        <div className='overlay-container'>
          <div className='overlay'>
            <div className='overlay-panel overlay-left'>
              <h1>Hey bienvenido!</h1>
              <p>¿ya tienes una cuenta?</p>
              <button onClick={() => setRegister(false)}>Iniciar sesión</button>
            </div>
            <div className='overlay-panel overlay-right'>
              <h1>Hola, eres nuevo por aquí!</h1>
              <p>Crea tu cuenta y recibe grandes beneficios.</p>
              <button onClick={() => setRegister(true)}>Registrarme</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
