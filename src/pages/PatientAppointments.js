import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/Appointments.css';

const PatientAppointments = () => {
  const { id } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [expandedAppointmentId, setExpandedAppointmentId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    time: '',
    reason: '',
    symptoms: '',
    preliminaryDiagnosis: '',
    treatment: '',
    recommendations: '',
    nextAppointmentDate: '',
    doctorNotes: '',
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/patients/${id}/appointments`)
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error('Hubo un error al obtener las citas:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    setNewAppointment({ ...newAppointment, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('appointment', JSON.stringify(newAppointment));

    axios
      .post(`http://localhost:5001/patients/${id}/appointments`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setAppointments((prevAppointments) => [...prevAppointments, response.data]);
        setShowForm(false);
        setNewAppointment({
          date: '',
          time: '',
          reason: '',
          symptoms: '',
          preliminaryDiagnosis: '',
          treatment: '',
          recommendations: '',
          nextAppointmentDate: '',
          doctorNotes: '',
        });
        setFile(null);
      })
      .catch((error) => {
        console.error('Hubo un error al agregar la cita:', error);
      });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const toggleExpand = (appointmentId) => {
    setExpandedAppointmentId(expandedAppointmentId === appointmentId ? null : appointmentId);
  };

  return (
    <div>
      <Navbar />
      <div className="appointments-container">
        <h2>Citas para el Paciente</h2>
        {appointments.length === 0 ? (
          <p>No hay citas para este paciente.</p>
        ) : (
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment.id} className="appointment-item">
                <div>
                  <strong>Fecha:</strong> {appointment.date}<br />
                  <strong>Hora:</strong> {appointment.time}<br />
                  <strong>Motivo:</strong> {appointment.reason}<br />
                  <button onClick={() => toggleExpand(appointment.id)}>
                    {expandedAppointmentId === appointment.id ? 'Ver Menos' : 'Ver Más'}
                  </button>
                  {expandedAppointmentId === appointment.id && (
                    <div className="expanded-info">
                      <strong>Síntomas:</strong> {appointment.symptoms}<br />
                      <strong>Diagnóstico Preliminar:</strong> {appointment.preliminaryDiagnosis}<br />
                      <strong>Tratamiento:</strong> {appointment.treatment}<br />
                      <strong>Recomendaciones:</strong> {appointment.recommendations}<br />
                      <strong>Fecha de Próxima Cita:</strong> {appointment.nextAppointmentDate}<br />
                      <strong>Notas del Doctor:</strong> {appointment.doctorNotes}<br />
                      {appointment.radiographyPath && (
                        <div>
                          <strong>Radiografías u otros archivos:</strong> <a href={`http://localhost:5001/${appointment.radiographyPath}`} target="_blank" rel="noopener noreferrer">Ver archivo</a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
        <button onClick={toggleForm}>{showForm ? 'Cancelar' : 'Agregar Nueva Cita'}</button>
        {showForm && (
          <form onSubmit={handleSubmit} className="appointment-form">
            <div className="form-group">
              <label htmlFor="date">Fecha de la cita:</label>
              <input
                type="date"
                id="date"
                value={newAppointment.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Hora de la cita:</label>
              <input
                type="time"
                id="time"
                value={newAppointment.time}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="reason">Motivo de la visita:</label>
              <input
                type="text"
                id="reason"
                value={newAppointment.reason}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="symptoms">Síntomas:</label>
              <textarea
                id="symptoms"
                value={newAppointment.symptoms}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="preliminaryDiagnosis">Diagnóstico preliminar:</label>
              <textarea
                id="preliminaryDiagnosis"
                value={newAppointment.preliminaryDiagnosis}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="treatment">Tratamiento recomendado:</label>
              <textarea
                id="treatment"
                value={newAppointment.treatment}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="recommendations">Recomendaciones:</label>
              <textarea
                id="recommendations"
                value={newAppointment.recommendations}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="nextAppointmentDate">Fecha de próxima cita:</label>
              <input
                type="date"
                id="nextAppointmentDate"
                value={newAppointment.nextAppointmentDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="doctorNotes">Notas del doctor:</label>
              <textarea
                id="doctorNotes"
                value={newAppointment.doctorNotes}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="file">Archivo de radiografía (opcional):</label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
              />
            </div>
            <button type="submit">Guardar Cita</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PatientAppointments;
