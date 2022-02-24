import React from 'react'
import { Link } from 'react-router-dom'
export const Navbar = () => {
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
            <Link to='/flights'>
              <i className='fa-regular fa-calendar-days'></i>
              <span>Reservas</span>
            </Link>
            <Link to='/cart'>
              <i className='fa-solid fa-cart-shopping'>
                <span className='badge red'>2</span>
              </i>
              <span>Carro</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}
