import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Importa axios
import Navbar from './Navbar';
import '../styles/Patients.css';

const ListPatients = () => {
  const [patients, setPatients] = useState([]);
  const [expandedPatient, setExpandedPatient] = useState(null);

  useEffect(() => {
    // Petición GET para obtener los pacientes
    axios
      .get('http://localhost:5000/patients')  // Ruta de los pacientes
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error('Hubo un error al obtener los pacientes:', error);
      });
  }, []);  // Esto se ejecutará solo una vez cuando el componente se cargue

  const handleExpandClick = (patient) => {
    setExpandedPatient(patient.id === expandedPatient ? null : patient.id);
  };

  const handleCitasClick = (patient) => {
    window.location.href = `/citas/${patient.id}`;
  };

  return (
    <div>
      <Navbar /> {/* Barra de navegación */}
      <div className="list-patients-container">
        <h2>Lista de Pacientes</h2>
        {patients.length > 0 ? (
          <ul>
            {patients.map((patient) => (
              <li key={patient.id}>
                <strong>Nombre:</strong> {patient.name} | <strong>Edad:</strong> {patient.age} | <strong>C:</strong> {patient.CI}
                <button onClick={() => handleExpandClick(patient)}>
                  {expandedPatient === patient.id ? 'Cerrar' : 'Ver más'}
                </button>
                {expandedPatient === patient.id && (
                  <div className="patient-details">
                    <p><strong>Fecha de Nacimiento:</strong> {patient.fechaNacimiento}</p>
                    <p><strong>Teléfono:</strong> {patient.telefono}</p>
                    <p><strong>Dirección:</strong> {patient.direccion}</p>
                    <p><strong>Tipo de Sangre:</strong> {patient.tipoSangre}</p>
                    <p><strong>Alergias:</strong> {patient.alergias}</p>
                    <p><strong>Condición:</strong> {patient.condition}</p>
                    <p><strong>Observaciones:</strong> {patient.observaciones}</p>
                    <button onClick={() => handleCitasClick(patient)}>Citas</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay pacientes registrados.</p>
        )}
      </div>
    </div>
  );
};

export default ListPatients;
