import db from "../database.js";

const DoctorModel = {
  // Crear un doctor
  createDoctor: (doctor) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO doctors (document_num, specialty, district, qualification, hourly_rate)
        VALUES (?, ?, ?, ?, ?)`;
      const params = [
        doctor.document_num,
        doctor.specialty,
        doctor.district,
        doctor.qualification,
        doctor.hourly_rate,
      ];
      db.run(query, params, function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.lastID);
      });
    });
  },

  // Obtener todos los doctores
  getAllDoctors: () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT doctors.*, users.first_name, users.last_name
        FROM doctors 
        JOIN users ON doctors.document_num = users.id`;
    console.log(query);
      db.all(query, [], (err, rows) => {
        if (err) {
          return reject(err);
        }
        console.log(rows);
        resolve(rows);
      });
    });
  },

  // Obtener un doctor por ID
  getDoctorById: (id) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT users.*, doctors.*
        FROM doctors 
        JOIN users ON doctors.document_num = users.id
        WHERE doctors.id = ?`;
      db.get(query, [id], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  },

  // Obtener un doctor por ID
  getDoctorByDocumentId: (document_num_id) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT users.*, doctors.*
        FROM doctors 
        JOIN users ON doctors.document_num = users.id
        WHERE doctors.document_num = ?`;
      db.get(query, [document_num_id], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  },

  // Actualizar un doctor
  updateDoctor: (id, doctor) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE doctors 
        SET specialty = ?, district = ?, location = ?, qualification = ?, hourly_rate = ? 
        WHERE id = ?`;
      const params = [
        doctor.specialty,
        doctor.district,
        doctor.location,
        doctor.qualification,
        doctor.hourly_rate,
        id,
      ];
      db.run(query, params, function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes);
      });
    });
  },

  // Eliminar un doctor
  deleteDoctor: (id) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM doctors WHERE id = ?`;
      db.run(query, [id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes);
      });
    });
  },
};

export default DoctorModel;
