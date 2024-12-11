import db from "../database.js";

const MedicalHistoryModel = {
  // Crear un historial médico
  createMedicalHistory: (data) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO medical_history (doctor_id, patient_id, diagnosis, treatment, appointment_id, notes)
        VALUES (?, ?, ?, ?, ?, ?)`;
      const params = [
        data.doctor_id,
        data.patient_id,
        data.diagnosis,
        data.treatment,
        data.appointment_id,
        JSON.stringify(data.notes), // Convierte el objeto JSON a string
      ];
      db.run(query, params, function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.lastID); // Retorna el ID del registro creado
      });
    });
  },

  // Obtener todos los historiales médicos por doctor
  getAllMedicalHistoriesByDoctor: (doctorId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT u.*, c.*, mh.* 
        FROM medical_history mh
        JOIN users u ON mh.patient_id = u.id
        JOIN clients c ON mh.patient_id = c.document_num
        WHERE mh.doctor_id = ?`;
      db.all(query, [doctorId], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows); // Devuelve todas las historias médicas
      });
    });
  },

  // Obtener todos los historiales médicos por paciente
  getAllMedicalHistoriesByPatient: (patientId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT mh.*, u.*, d.* 
        FROM medical_history mh
        JOIN users u ON d.document_num = u.id
        JOIN doctors d ON mh.doctor_id = d.id
        WHERE mh.patient_id = ?`;
      db.all(query, [patientId], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows); // Devuelve todas las historias médicas
      });
    });
  },
  /*
  // Obtener todos los historiales médicos
  getAllMedicalHistories: () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT mh.*, d.*, c.*
        FROM medical_history mh
        JOIN doctors d ON mh.doctor_id = d.id
        JOIN clients c ON mh.patient_id = c.id`;
      db.all(query, [], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows); // Devuelve todas las historias médicas
      });
    });
  },
  */

  /*
  SELECT mh.*, d.*, c.*
        FROM medical_history mh
        JOIN doctors d ON mh.doctor_id = d.id
        JOIN clients c ON mh.patient_id = c.id
        WHERE mh.appointment_id = ?`
  */
  // Obtener un historial médico por ID
  getMedicalHistoryByAppointmentId: (appointment_id) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT mh.* 
        FROM medical_history mh 
        WHERE mh.appointment_id = ?`;
        //JOIN clients c ON mh.patient_id = c.id
        
      db.get(query, [appointment_id], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row); // Devuelve una sola historia médica
      });
    });
  },

  // Obtener un historial médico por ID
  getMedicalHistoryById: (id) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT mh.*, d.*, c.*
        FROM medical_history mh
        JOIN doctors d ON mh.doctor_id = d.id
        JOIN clients c ON mh.patient_id = c.id
        WHERE mh.id = ?`;
      db.get(query, [id], (err, row) => {
        if (err) {
          return reject(err);
        }
        // Convertir el campo `notes` de JSON string a objeto en cada fila
      const formattedRows = rows.map((row) => ({
        ...row,
        notes: row.notes ? JSON.parse(row.notes) : [], // Si hay notas, conviértelas a objeto
      }));

      resolve(formattedRows);
        //resolve(row); // Devuelve una sola historia médica
      });
    });
  },

  // Actualizar un historial médico
  updateMedicalHistory: (id, data) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE medical_history 
        SET diagnosis = ?, treatment = ?, notes = ?
        WHERE id = ?`;
      const params = [
        data.diagnosis,
        data.treatment,
        JSON.stringify(data.notes), // Convierte el objeto JSON a string
        id,
      ];
      db.run(query, params, function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes); // Número de filas afectadas
      });
    });
  },

  // Eliminar un historial médico
  deleteMedicalHistory: (id) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM medical_history WHERE id = ?`;
      db.run(query, [id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes); // Número de filas eliminadas
      });
    });
  },
};

export default MedicalHistoryModel;
