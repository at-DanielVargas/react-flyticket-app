import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import './styles/style.scss';

export default function App() {
  return (
    <div class="wrapper">
      <Navbar />
      <Outlet />
    </div>
  );
}
