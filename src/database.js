import sqlite3 from 'sqlite3';

const dbName = 'database.db';

const db = new sqlite3.Database(dbName, (err) => {
    if (err) {
        console.error("Error al conectar a la base de datos", err.message);
    } else {
        console.log("Conectado a la base de datos SQLite.");
    }
});

// Crear la tabla de usuarios si no existe
db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY UNIQUE,
        document_type TEXT NOT NULL CHECK(document_type IN ('dni', 'ce', 'passport')),
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT NOT NULL,
        address TEXT NOT NULL,
        role TEXT NOT NULL CHECK(role IN ('client', 'doctor')),
        gender TEXT NOT NULL CHECK(gender IN ('male', 'female', 'non-binary')),
        birth_date DATE NOT NULL,
        password TEXT NOT NULL,
        registration_date DATE NOT NULL
    )
    `);

    // Clientes:
    db.run(`
        CREATE TABLE IF NOT EXISTS clients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            document_num TEXT NOT NULL,
            height REAL NOT NULL,
            weight REAL NOT NULL,
            emergency_contact_name TEXT NOT NULL,
            emergency_contact_phone TEXT NOT NULL,
            emergency_contact_relationship TEXT NOT NULL,
            FOREIGN KEY (document_num) REFERENCES users(id) 
        )
    `);

    // Doctores
    db.run(`
        CREATE TABLE IF NOT EXISTS doctors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        document_num TEXT NOT NULL,
        specialty TEXT NOT NULL,
        district TEXT NOT NULL,
        qualification REAL,
        hourly_rate REAL,
        FOREIGN KEY (document_num) REFERENCES users(id)
    )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS certifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        speciality_name TEXT NOT NULL,
        institution_name TEXT NOT NULL,
        type_of_cert TEXT NOT NULL,                    -- Tipo: instituto, universidad, etc.
        start_date DATE NOT NULL,
        end_date DATE,
        attachment_url TEXT,                   -- Ruta del archivo (si se suben documentos)
        doctor_id INTEGER NOT NULL,            -- Relación con la tabla de doctores
        FOREIGN KEY (doctor_id) REFERENCES doctor(id) -- Clave foránea
    )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS experience (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        doctor_id INTEGER NOT NULL,
        company_name TEXT NOT NULL,
        position TEXT NOT NULL,
        description TEXT NOT NULL,
        start_date DATE NOT NULL,
        finish_date DATE,
        FOREIGN KEY (doctor_id) REFERENCES doctors(id)
    )
    `);


    // Citas
    db.run(`
        CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        doctor_id INTEGER NOT NULL,
        patient_id TEXT NOT NULL,
        consultation_reason TEXT NOT NULL,
        description TEXT,
        state TEXT NOT NULL CHECK(state IN ('pending', 'confirmed', 'in progress', 'completed', 'canceled', 'no show')),
        date_time TEXT NOT NULL,
        FOREIGN KEY (doctor_id) REFERENCES doctors(id),
        FOREIGN KEY (patient_id) REFERENCES patients(document_num)
    )
    `);

    // Historial Medico
    db.run(`
        CREATE TABLE IF NOT EXISTS medical_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- Unique identifier
    doctor_id INTEGER NOT NULL,           -- Associated doctor ID
    patient_id TEXT NOT NULL,          -- Associated patient ID
    appointment_id INTEGER NOT NULL,          -- Associated patient ID
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP, -- Registration date
    diagnosis TEXT NOT NULL,              -- Diagnosis details
    treatment TEXT NOT NULL,              -- Suggested treatment
    notes JSON DEFAULT '[]',  -- Campo JSON para las nota
    FOREIGN KEY (doctor_id) REFERENCES doctors(id),        -- Foreign key to doctors table
    FOREIGN KEY (patient_id) REFERENCES patients(id)       -- Foreign key to patients table
    FOREIGN KEY (appointment_id) REFERENCES appointments(id)       -- Foreign key to patients table
)
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS medical_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- Unique identifier
    description TEXT NOT NULL,            -- Medical note description
    medical_history_id INTEGER NOT NULL,  -- Reference to associated medical history
    FOREIGN KEY (medical_history_id) REFERENCES medical_history(id) -- Foreign key to medical_history table
)
    `);
   












        // Insert 12 users as doctors
const doctors = [
    {
        id: "56858595",
        document_type: "dni",
        first_name: "Juan",
        last_name: "Perez",
        email: "juan.perez@example.com",
        phone: "123456789",
        gender: "male",
        birth_date: "1985-06-15",
        password: "securepass123",
        registration_date: "2024-11-24",
        specialty: "Cardiology",
        district: "Lima",
        address: "Av. Central 123",
        qualification: 4.6,
        hourly_rate: 150.0,
        certifications: [
            { speciality_name: "Cardiology Diploma", institution_name: "UNMSM", type: "University", start_date: "2010-03-01", end_date: "2013-11-30" },
        ],
        experience: [
            { company_name: "Hospital San José", position: "Cardiologist", description: "Diagnosed and treated heart conditions.", start_date: "2014-01-01", finish_date: "2020-12-31" },
            { company_name: "Clinica Lima", position: "Senior Cardiologist", description: "Led a team of cardiologists.", start_date: "2021-01-01", finish_date: null },
        ],
    },
    {
        id: "56858200",
        document_type: "dni",
        first_name: "Maria",
        last_name: "Lopez",
        email: "maria.lopez@example.com",
        phone: "987654321",
        gender: "female",
        birth_date: "1990-09-12",
        password: "mypassword123",
        registration_date: "2024-11-24",
        specialty: "Pediatrics",
        district: "Lima",
        address: "Av. Arequipa 456",
        qualification: 4.2,
        hourly_rate: 120.0,
        certifications: [
            { speciality_name: "Pediatrics Degree", institution_name: "UPCH", type: "University", start_date: "2012-01-01", end_date: "2016-12-31" },
        ],
        experience: [
            { company_name: "Hospital Niño Jesús", position: "Pediatrician", description: "Provided healthcare to children.", start_date: "2017-01-01", finish_date: null },
        ],
    },
    // Add similar entries for 10 more doctors
];

// SQL insertion for each doctor
doctors.forEach((doctor) => {
    // Check if the user already exists by email
    db.get(`SELECT id FROM users WHERE email = ?`, [doctor.email], (err, row) => {
        if (err) {
            console.error(err);
            return;
        }

        // If the user doesn't exist, insert it
        if (!row) {
            db.run(
                `INSERT INTO users (id, document_type, first_name, last_name, email, phone, role, gender, birth_date, address, password, registration_date)
                 VALUES (?, ?, ?, ?, ?, ?, 'doctor', ?, ?, ?, ?, ?)`,
                [doctor.id, doctor.document_type, doctor.first_name, doctor.last_name, doctor.email, doctor.phone, doctor.gender, doctor.birth_date, doctor.address, doctor.password, doctor.registration_date],
                function (err) {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    
                    // Insert into the doctors table
                    db.run(
                        `INSERT INTO doctors (document_num, specialty, district, qualification, hourly_rate)
                         VALUES (?, ?, ?, ?, ?)`,
                        [doctor.id, doctor.specialty, doctor.district, doctor.qualification, doctor.hourly_rate],
                        function (err) {
                            if (err) {
                                console.error(err);
                                return;
                            }
                            const doctor_id = this.lastID;

                            
                            // Insert certifications
                            doctor.certifications.forEach((cert) => {
                                db.run(
                                    `INSERT INTO certifications (speciality_name, institution_name, type_of_cert, start_date, end_date, doctor_id)
                                     VALUES (?, ?, ?, ?, ?, ?)`,
                                    [cert.speciality_name, cert.institution_name, cert.type, cert.start_date, cert.end_date, doctor_id]
                                );
                            });

                            // Insert experiences
                            doctor.experience.forEach((exp) => {
                                db.run(
                                    `INSERT INTO experience (doctor_id, company_name, position, description, start_date, finish_date)
                                     VALUES (?, ?, ?, ?, ?, ?)`,
                                    [doctor_id, exp.company_name, exp.position, exp.description, exp.start_date, exp.finish_date]
                                );
                            });
                        }
                    );
                    
                }
            );
        } else {
            console.log(`Doctor with email ${doctor.email} already exists.`);
        }
    });
});













});

export default db;