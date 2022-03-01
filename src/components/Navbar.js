import React from 'react'
import { AuthSelectors, AuthActions, CartSelectors } from '@store'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
export const Navbar = () => {
  const dispatch = useDispatch()
  const items = useSelector(CartSelectors.selectCartItems)
  const haveValidCredentials = useSelector(AuthSelectors.selectAuthState)
  const logout = () => {
    dispatch(AuthActions.logout())
  }
  return (
    <div className='header'>
      <div className='container'>
        <div className='navbar'>
          <Link to='/' className='logo'>
            <div className='icon'>
              <i className='fa-solid fa-ticket'></i>
              <i className='fa-solid fa-plane'></i>
            </div>
            <div className='text'>
              Fly<span className='txt-red'>Ticket</span>
            </div>
          </Link>
          <nav>
            <Link to='/'>
              <i className='fa-solid fa-house'></i>
              <span>Inicio</span>
            </Link>
            <Link to='/reservations'>
              <i className='fa-regular fa-calendar-days'>
                {items.length > 0 ? <span className='badge red'>{items.length}</span> : null}
              </i>
              <span>Reservas</span>
            </Link>
            {haveValidCredentials ? (
              <button onClick={logout} className='button-sm'>
                <i className='fa-solid fa-arrow-right-from-bracket mr-2'></i>
                <span>Cerrar sesión</span>
              </button>
            ) : (
              <Link to='/auth'>
                <i className='fa-solid fa-user-lock'></i>
                <span>Iniciar sesión</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  )
}
