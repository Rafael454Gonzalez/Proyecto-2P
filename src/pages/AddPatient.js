// src/pages/AddPatient.js
import React, { useState } from 'react';
import axios from 'axios'; // Importa axios
import Navbar from './Navbar';  // Asegúrate de que la ruta sea correcta
import '../styles/AddPatient.css';  // Ruta de tu archivo CSS

const AddPatient = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    condition: '',
    fechaNacimiento: '',
    telefono: '',
    direccion: '',
    tipoSangre: '',
    alergias: '',
    CI: '',
    observaciones: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página

    console.log("Datos enviados:", formData); // Verifica los datos antes de enviarlos

    axios
      .post('http://localhost:5000/patients', formData)  // Ruta del servidor JSON
      .then((response) => {
        console.log('Paciente guardado', response.data);
        setFormData({
          name: '',
          age: '',
          condition: '',
          fechaNacimiento: '',
          telefono: '',
          direccion: '',
          tipoSangre: '',
          alergias: '',
          CI: '',
          observaciones: '',
        });
      })
      .catch((error) => {
        console.error('Hubo un error al guardar el paciente:', error);
      });
  };

  const validateName = (name) => /^[a-zA-Z\s]+$/.test(name);
  const validateAge = (age) => /^\d+$/.test(age) && age >= 0 && age <= 120;
  const validateCI = (CI) => /^\d{10}$/.test(CI);
  const validateTelefono = (telefono) => /^\d{10}$/.test(telefono);
  const validateFechaNacimiento = (fecha) => new Date(fecha) <= new Date();
  const validateAlergias = (alergias) => /^[a-zA-Z\s]+$/.test(alergias);
  const validateObservaciones = (observaciones) => /^[a-zA-Z0-9\s,.!?-]*$/.test(observaciones);

  return (
    <div>
      <Navbar />
      <div className="add-patient-container">
        <h1>Agregar Nuevo Paciente</h1>
        <div className="card">
          <div className="card-header text-white bg-success">
            Información del Paciente
          </div>
          <div className="card-body border border-danger">
            <form id="agregarPacienteForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  pattern="[a-zA-Z\s]+"
                  title="Solo letras y espacios"
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Edad:</label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="0"
                  max="120"
                  title="Número entre 0 y 120"
                />
              </div>
              <div className="form-group">
                <label htmlFor="CI">Cédula de Identidad (CI):</label>
                <input
                  type="text"
                  className="form-control"
                  id="CI"
                  value={formData.CI}
                  onChange={handleChange}
                  required
                  pattern="\d{10}"
                  title="10 dígitos"
                />
              </div>
              <div className="form-group">
                <label htmlFor="condition">Condición:</label>
                <input
                  type="text"
                  className="form-control"
                  id="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
                <input
                  type="date"
                  className="form-control"
                  id="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  required
                  max={new Date().toISOString().split("T")[0]}
                  title="No puede ser una fecha futura"
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefono">Teléfono:</label>
                <input
                  type="text"
                  className="form-control"
                  id="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  pattern="\d{10}"
                  title="10 dígitos"
                />
              </div>
              <div className="form-group">
                <label htmlFor="direccion">Dirección:</label>
                <input
                  type="text"
                  className="form-control"
                  id="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="tipoSangre">Tipo de Sangre:</label>
                <select
                  id="tipoSangre"
                  className="form-control"
                  value={formData.tipoSangre}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="alergias">Alergias:</label>
                <input
                  type="text"
                  className="form-control"
                  id="alergias"
                  value={formData.alergias}
                  onChange={handleChange}
                  required
                  pattern="[a-zA-Z\s]+"
                  title="Solo letras y espacios"
                />
              </div>
              <div className="form-group">
                <label htmlFor="observaciones">Observaciones:</label>
                <input
                  type="text"
                  className="form-control"
                  id="observaciones"
                  value={formData.observaciones}
                  onChange={handleChange}
                  required
                  pattern="[a-zA-Z0-9\s,.!?-]*"
                  title="Letras, números, y algunos caracteres especiales (, . ! ? -)"
                />
              </div>
              <button type="submit" className="btn btn-danger">Guardar Paciente</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
