// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import ListPatients from './pages/ListPatients';
import AddPatient from './pages/AddPatient';
import PatientAppointments from './pages/PatientAppointments';

const App = () => {
  const [patients, setPatients] = useState([]);

  const handleAddPatient = (patient) => {
    setPatients([...patients, patient]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/list-patients" element={<ListPatients patients={patients} />} />
        <Route path="/add-patient" element={<AddPatient onAddPatient={handleAddPatient} />} />
        <Route path="/citas/:id" element={<PatientAppointments />} />
      </Routes>
    </Router>
  );
};

export default App;
