import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Asegúrate de que este archivo CSS esté disponible.

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/home" className="navbar-brand">
        <img src="logo.png" alt="Logo" className="logo" />
        Clínica Odontológica ULEAM
      </Link>
      
      <div className="navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/list-patients" className="nav-link">Lista de Pacientes</Link>
          </li>
          <li className="nav-item">
            <Link to="/add-patient" className="nav-link">Agregar Paciente</Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">Cerrar Sesión</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
