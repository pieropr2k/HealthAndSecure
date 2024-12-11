import db from "../database.js";

const AppointmentModel = {
  // Crear una cita
  createAppointment: (appointment) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO appointments (doctor_id, patient_id, consultation_reason, description, state, date_time)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const params = [
        appointment.doctor_id,
        appointment.patient_id,
        appointment.consultation_reason,
        appointment.description,
        appointment.state,
        appointment.date_time
      ];

      db.run(query, params, function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.lastID);
      });
    });
  },

  // Obtener todas las citas de un paciente
  getAppointmentsByPatient: (patientId) => {
    return new Promise((resolve, reject) => {
      /* 
      SELECT appointments.*, doctors.*, users.*
        FROM appointments
        JOIN doctors ON appointments.doctor_id = doctors.id
        JOIN users ON doctors.document_num = users.id
        WHERE appointments.patient_id = ?
      */
      const query = `
        SELECT appointments.*, doctors.specialty, users.first_name, users.last_name
        FROM appointments
        JOIN doctors ON appointments.doctor_id = doctors.id
        JOIN users ON doctors.document_num = users.id
        WHERE appointments.patient_id = ?
      `;

      db.all(query, [patientId], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  },

  // Obtener todas las citas de un doctor
  getAppointmentsByDoctor: (doctorId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT appointments.*, users.first_name, users.last_name, users.id as client_id
        FROM appointments
        JOIN users ON appointments.patient_id = users.id
        WHERE appointments.doctor_id = ?
      `;

      db.all(query, [doctorId], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  },

  // Obtener una cita por ID
  getAppointmentById: (id) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT users.*, clients.*, medical_history.*, appointments.*
        FROM appointments
        JOIN clients ON clients.document_num = appointments.patient_id
        JOIN users ON users.id = appointments.patient_id
        JOIN medical_history ON medical_history.appointment_id = appointments.id
        WHERE appointments.id = ?
      `;
      /* 
      SELECT clients.document_num, doctor.id as doctor_id, appointments.* 
        FROM appointments
        JOIN clients ON clients.id = appointments.pacient_id
        JOIN doctor ON doctor.id = appointments.doctor_id
        WHERE appointments.id = ?
      */

      db.get(query, [id], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  },

  // Actualizar una cita
  updateAppointment: (id, appointment) => {
    return new Promise((resolve, reject) => {
      // Generar dinámicamente la consulta y los parámetros
      const fields = Object.keys(appointment);
      const placeholders = fields.map(field => `${field} = ?`).join(", ");
      const values = fields.map(field => appointment[field]);

      const query = `
      UPDATE appointments
      SET ${placeholders}
      WHERE id = ?
    `;
      console.log(query);

      const params = [...values, id];

      db.run(query, params, function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes);
      });
    });
  },


  // Eliminar una cita
  deleteAppointment: (id) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM appointments WHERE id = ?`;
      db.run(query, [id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes);
      });
    });
  }
};

export default AppointmentModel;
