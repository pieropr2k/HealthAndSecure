import db from "../database.js";

const CertificationModel = {
  // Crear una certificación
  createCertification: (certification) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO certifications (speciality_name, institution_name, type_of_cert, start_date, end_date, attachment_url, doctor_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
      const params = [
        certification.speciality_name,
        certification.institution_name,
        certification.type_of_cert,
        certification.start_date,
        certification.end_date,
        certification.attachment_url,
        certification.doctor_id,
      ];
      db.run(query, params, function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.lastID);
      });
    });
  },

  // Obtener todas las certificaciones
  getAllCertifications: (doctorId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM certifications WHERE doctor_id = ?`;
      db.all(query, [doctorId], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  },

  // Obtener una certificación por ID
  getCertificationById: (id) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM certifications WHERE id = ?`;
      db.get(query, [id], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  },

  // Actualizar una certificación
  updateCertification: (id, certification) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE certifications 
        SET speciality_name = ?, institution_name = ?, type = ?, start_date = ?, end_date = ?, attachment_url = ? 
        WHERE id = ?`;
      const params = [
        certification.speciality_name,
        certification.institution_name,
        certification.type,
        certification.start_date,
        certification.end_date,
        certification.attachment_url,
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

  // Eliminar una certificación
  deleteCertification: (id) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM certifications WHERE id = ?`;
      db.run(query, [id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes);
      });
    });
  },
};

export default CertificationModel;
