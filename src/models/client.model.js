import db from "../database.js";

const ClientModel = {
  // Crear un cliente
  createClient: (client) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO clients (
          document_num, height, weight, emergency_contact_name, 
          emergency_contact_phone, emergency_contact_relationship
        ) VALUES (?, ?, ?, ?, ?, ?)
      `;
      const params = [
        client.document_num,
        client.height,
        client.weight,
        client.emergency_contact_name,
        client.emergency_contact_phone,
        client.emergency_contact_relationship,
      ];
      db.run(query, params, function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.lastID); // Retorna el ID del cliente creado
      });
    });
  },

  // Obtener todos los clientes
  getAllClients: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM clients`;
      db.all(query, (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  },

  // Obtener un cliente por ID
  getClientById: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM clients WHERE id = ?`;
      db.get(query, [id], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  },

  // Actualizar un cliente
  updateClient: (id, client) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE clients 
        SET height = ?, weight = ?, emergency_contact_name = ?, 
            emergency_contact_phone = ?, emergency_contact_relationship = ?
        WHERE id = ?
      `;
      const params = [
        client.height,
        client.weight,
        client.emergency_contact_name,
        client.emergency_contact_phone,
        client.emergency_contact_relationship,
        id,
      ];
      db.run(query, params, function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes); // Retorna la cantidad de filas afectadas
      });
    });
  },

  // Eliminar un cliente
  deleteClient: (id) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM clients WHERE id = ?`;
      db.run(query, [id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes); // Retorna la cantidad de filas eliminadas
      });
    });
  },
};

export default ClientModel;
