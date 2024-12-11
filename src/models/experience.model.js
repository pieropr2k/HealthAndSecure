import db from "../database.js";

const ExperienceModel = {
  // Crear experiencia laboral
  createExperience: (experience) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO experience (doctor_id, company_name, position, description, start_date, finish_date)
        VALUES (?, ?, ?, ?, ?, ?)`;
      const params = [
        experience.doctor_id,
        experience.company_name,
        experience.position,
        experience.description,
        experience.start_date,
        experience.finish_date,
      ];
      db.run(query, params, function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.lastID);
      });
    });
  },

  // Obtener todas las experiencias
  getAllExperience: (doctorId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM experience WHERE doctor_id = ?`;
      db.all(query, [doctorId], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  },

  // Obtener experiencia por ID
  getExperienceById: (id) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM experience WHERE id = ?`;
      db.get(query, [id], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  },

  // Actualizar experiencia laboral
  updateExperience: (id, experience) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE experience 
        SET company_name = ?, position = ?, description = ?, start_date = ?, finish_date = ? 
        WHERE id = ?`;
      const params = [
        experience.company_name,
        experience.position,
        experience.description,
        experience.start_date,
        experience.finish_date,
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

  // Eliminar experiencia laboral
  deleteExperience: (id) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM experience WHERE id = ?`;
      db.run(query, [id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes);
      });
    });
  },
};

export default ExperienceModel;
