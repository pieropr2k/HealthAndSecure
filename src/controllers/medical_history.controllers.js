import DoctorModel from "../models/doctor.model.js";
import MedicalHistoryModel from "../models/medical_history.model.js";

export const createMedicalHistory = async (req, res) => {
  const data = req.body;
  try {
    const id = await MedicalHistoryModel.createMedicalHistory(data);
    res.status(201).json({ id });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const getAllMedicalHistories = async (req, res) => {
  console.log(req.user.id);
  console.log(req.user);
  console.log(req.user.role);
  console.log('getAllMedicalHistories');
  console.log('getAllMedicalHistories');
  console.log('getAllMedicalHistories');
  console.log('getAllMedicalHistories');
  try {
    if (req.user.role === 'doctor') {
      const doctorInfo = await DoctorModel.getDoctorByDocumentId(req.user.id);
      const rows = await MedicalHistoryModel.getAllMedicalHistoriesByDoctor(doctorInfo.id);
      console.log(rows);
      const json = rows.map(row => ({
        id: row.id,
        patient: `${row.first_name} ${row.last_name}`, // Asume nombres de la tabla `clients`
        diagnosis: row.diagnosis,
        treatment: row.treatment,
        notes: row.notes ? JSON.parse(row.notes) : [],
        date: row.registration_date,
      }));  
      return res.json(json);
    }

    if (req.user.role === 'client') {
      const rows = await MedicalHistoryModel.getAllMedicalHistoriesByPatient(req.user.id);
      console.log(rows);
      const json = rows.map(row => ({
        id: row.id,
        //doctor: `${row.first_name} ${row.last_name}`,
        doctor: {
          name: `${row.first_name} ${row.last_name}`,
          specialty: row.specialty, 
        },
        //specialty: row.specialty,
        diagnosis: row.diagnosis,
        treatment: row.treatment,
        date: row.registration_date,
        notes: row.notes ? JSON.parse(row.notes) : []
      }));  
      return res.json(json);
    }

    return res.status(403).json({ error: "Invalid role" });

    /*
    const rows = await MedicalHistoryModel.getAllMedicalHistories();
    const json = rows.map(row => ({
      id: row.id,
      doctor: `${row.first_name} ${row.last_name}`, // Asume nombres de la tabla `doctors`
      patient: `${row.patient_first_name} ${row.patient_last_name}`, // Asume nombres de la tabla `clients`
      diagnosis: row.diagnosis,
      treatment: row.treatment,
      notes: row.notes ? JSON.parse(row.notes) : [],
      date: row.registration_date,
    }));
    res.json(json);
    */
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const getMedicalHistoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const row = await MedicalHistoryModel.getMedicalHistoryById(id);
    if (!row) return res.status(404).json({ error: "Medical history not found" });

    const history = {
      id: row.id,
      doctor: `${row.first_name} ${row.last_name}`,
      patient: `${row.patient_first_name} ${row.patient_last_name}`,
      diagnosis: row.diagnosis,
      treatment: row.treatment,
      notes: row.notes ? JSON.parse(row.notes) : [],
      date: row.registration_date,
    };

    res.json(history);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const getMedicalHistoryByAppointmentId = async (req, res) => {
  const { appointment_id } = req.params;
  try {
    const row = await MedicalHistoryModel.getMedicalHistoryByAppointmentId(appointment_id);
    if (!row) return res.status(404).json({ error: "Medical history not found" });

    const history = {
      id: row.id,
      doctor: `${row.first_name} ${row.last_name}`,
      patient: `${row.patient_first_name} ${row.patient_last_name}`,
      diagnosis: row.diagnosis,
      treatment: row.treatment,
      notes: row.notes ? JSON.parse(row.notes) : [],
      date: row.registration_date,
    };

    res.json(history);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const updateMedicalHistory = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const changes = await MedicalHistoryModel.updateMedicalHistory(id, data);
    if (changes === 0) return res.status(404).json({ error: "Medical history not found" });
    res.json({ message: "Medical history updated successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const deleteMedicalHistory = async (req, res) => {
  const { id } = req.params;
  try {
    const changes = await MedicalHistoryModel.deleteMedicalHistory(id);
    if (changes === 0) return res.status(404).json({ error: "Medical history not found" });
    res.json({ message: "Medical history deleted successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
