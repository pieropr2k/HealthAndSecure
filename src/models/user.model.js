import db from "../database.js";

export const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    db.get(query, [email], (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row);
    });
  });
};

export const createUser = (user) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO users (
        id,
        document_type,
        first_name, 
        last_name, 
        email, 
        phone, 
        address, 
        role, 
        gender, 
        birth_date, 
        password, 
        registration_date
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      user.id,
      user.document_type,
      user.first_name,
      user.last_name,
      user.email,
      user.phone,
      user.address,
      user.role,
      user.gender,
      user.birth_date,
      user.password,
      user.registration_date,
    ];
    db.run(query, params, function (err) {
      if (err) {
        return reject(err);
      }
      resolve(this.lastID); // Devuelve el ID del nuevo usuario creado
    });
  });
};

export const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE id = ?`;
    db.get(query, [id], (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row);
    });
  });
};
