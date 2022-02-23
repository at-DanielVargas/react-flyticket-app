import React from 'react';
import { Link } from 'react-router-dom';
export const Navbar = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="navbar">
          <Link to="/" className="logo">
            <div className="icon">
              <i class="fa-solid fa-ticket"></i>
              <i class="fa-solid fa-plane"></i>
            </div>
            <div className="text">
              Fly<span className="txt-red">Ticket</span>
            </div>
          </Link>
          <nav>
            <Link to="/">
              <i class="fa-solid fa-house"></i>
              <span>Home</span>
            </Link>
            <Link to="/flights">
              <i class="fa-solid fa-plane-departure"></i>
              <span>Flights</span>
            </Link>
            <Link to="/cart">
              <i class="fa-solid fa-cart-shopping"></i>
              <span>Cart</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};
