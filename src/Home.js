import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div>
      {/* Barra de navegación */}
      <nav className="navbar">
        <Link to="/home" className="navbar-brand">
          <img src="logo.png" alt="Logo" className="logo" />
          Clínica Odontológica ULEAM
        </Link>
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
      </nav>

      {/* Contenido principal */}
      <div className="container">
        <div className="jumbotron">
          <h1 className="main-title">Bienvenidos a la Clínica Odontológica ULEAM</h1>
          <p className="lead">Gestione los registros y citas de pacientes con facilidad y eficiencia.</p>
          <hr className="my-4" />
          <p>Utilice nuestro sistema de gestión para mantener un control total sobre las consultas y el historial clínico de los pacientes.</p>
          {/* Sección de imagen */}
        <div className="image-container">
          <img src="absceso-dental.png" alt="Imagen Representativa" className="responsive-image" />
        </div>
      </div>
        </div>

        

      {/* Pie de página */}
      <footer className="footer">
        <div>© 2024 Clínica Odontológica ULEAM | <Link to="/privacy">Política de Privacidad</Link></div>
      </footer>
    </div>
  );
};

export default Home;
