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
            <Link to="/">Home</Link>
            <Link to="/flights">Flights</Link>
            <Link to="/cart">Cart</Link>
          </nav>
        </div>
      </div>
    </div>
  );
};
