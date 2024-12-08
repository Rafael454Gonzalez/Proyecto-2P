const express = require('express');
const multer = require('multer');
const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');
const cors = require('cors');  // Importar cors

const app = express();
const port = 5001;

// Configuración de CORS
app.use(cors());

// Configuración para servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuración de multer para manejar archivos subidos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

app.use(express.json());

const parser = new xml2js.Parser();
const builder = new xml2js.Builder();

// Función para cargar citas desde el archivo XML
const loadAppointmentsData = () => {
  const xmlPath = path.join(__dirname, 'appointments.xml');
  
  if (fs.existsSync(xmlPath)) {
    const data = fs.readFileSync(xmlPath, 'utf8');  // Leemos el archivo síncronamente
    let result = { appointments: { appointment: [] } };
    
    parser.parseString(data, (err, parsedResult) => {
      if (err) {
        console.error('Error al leer el archivo XML:', err);
      } else {
        result = parsedResult || { appointments: { appointment: [] } };
      }
    });
    
    return result.appointments || { appointment: [] };  // En caso de no encontrar citas, devolver una estructura vacía
  } else {
    console.log('No se encontró el archivo de citas, creando uno nuevo...');
    return { appointment: [] };  // Retorna una estructura vacía si el archivo no existe
  }
};

// Guardar los datos de citas en el archivo XML
const saveAppointmentsData = (appointments) => {
  const xml = builder.buildObject({ appointments });
  const xmlPath = path.join(__dirname, 'appointments.xml');

  fs.writeFileSync(xmlPath, xml, 'utf8');  // Guardamos los datos sincrónicamente
  console.log('Citas guardadas correctamente');
};

// Variable global para las citas (Cargar los datos al iniciar el servidor)
let appointments = loadAppointmentsData();

// Endpoint para obtener todas las citas
app.get('/appointments', (req, res) => {
  res.status(200).json(appointments.appointment);
});

// Endpoint para obtener las citas de un paciente
app.get('/patients/:id/appointments', (req, res) => {
  const patientId = req.params.id;
  
  // Filtrar las citas por patientId, asegurándonos de manejar correctamente el valor
  const patientAppointments = appointments.appointment.filter(appointment => {
    const appointmentPatientId = appointment.patientId ? appointment.patientId[0] : appointment.patientId;  // Verificamos si es un arreglo
    return appointmentPatientId === patientId;
  });

  res.status(200).json(patientAppointments);
});

// Endpoint para agregar una nueva cita
app.post('/patients/:id/appointments', upload.single('file'), (req, res) => {
  const patientId = req.params.id;
  const newAppointment = JSON.parse(req.body.appointment);

  const newId = Date.now().toString();
  const newXmlAppointment = {
    id: newId,
    patientId: patientId,
    date: newAppointment.date,
    time: newAppointment.time,
    reason: newAppointment.reason,
    symptoms: newAppointment.symptoms,
    preliminaryDiagnosis: newAppointment.preliminaryDiagnosis,
    treatment: newAppointment.treatment,
    recommendations: newAppointment.recommendations,
    nextAppointmentDate: newAppointment.nextAppointmentDate,
    doctorNotes: newAppointment.doctorNotes,
    radiographyPath: req.file ? req.file.path : null
  };

  // Agregar la nueva cita al arreglo de citas
  appointments.appointment.push(newXmlAppointment);

  // Guardar los datos actualizados en el archivo XML
  saveAppointmentsData(appointments);

  // Enviar la nueva cita como respuesta
  res.status(201).send(newXmlAppointment);
});

// Ruta para manejar el endpoint raíz y mostrar todas las citas
app.get('/', (req, res) => {
  res.status(200).json(appointments.appointment);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
