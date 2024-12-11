import DoctorModel from '../models/doctor.model.js'; 

export const createDoctor = async (req, res) => {
    const doctor = req.body;
    try {
        const doctorFormatted = { ...doctor, user_id: req.user.id };
        const id = await DoctorModel.createDoctor(doctorFormatted);
        //await CertificationModel.createCertification();
        //await ExperienceModel.createExperience();
        res.status(201).json({ id });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

export const getAllDoctors = async (req, res) => {
    try {
        
        const rows = await DoctorModel.getAllDoctors();
        const json = rows.map(row => ({
            id: row.id, 
            fullName: `${row.first_name}  ${row.last_name}`,
            specialty: row.specialty,
            location: row.district,
            experience: 2,
            rating: row.qualification,
            fee: row.hourly_rate
        })); // Devuelve el objeto directamente

        res.json(json);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

export const getDoctorById = async (req, res) => {
    const { id } = req.params;
    try {
        const row = await DoctorModel.getDoctorById(id);
        //const certsRow = await CertificationModel.getDoctorById(id);
        //const expRow = await ExperienceModel.getDoctorById(id);
        if (!row) return res.status(404).json({ error: "Doctor not found" });
        res.json(row);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

export const updateDoctor = async (req, res) => {
    const { id } = req.params;
    const doctor = req.body;
    try {
        const changes = await DoctorModel.updateDoctor(id, doctor);
        if (changes === 0) return res.status(404).json({ error: "Doctor not found" });
        res.json({ message: "Doctor updated successfully" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

export const deleteDoctor = async (req, res) => {
    const { id } = req.params;
    try {
        const changes = await DoctorModel.deleteDoctor(id);
        if (changes === 0) return res.status(404).json({ error: "Doctor not found" });
        res.json({ message: "Doctor deleted successfully" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
