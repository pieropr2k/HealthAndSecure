import { parseEscapedJSON } from '../middlewares/parse_escaped_json.middleware.js';
import AppointmentModel from '../models/appointment.model.js';
import DoctorModel from '../models/doctor.model.js';
import MedicalHistoryModel from '../models/medical_history.model.js';

export const createAppointment = async (req, res) => {
    const appointment = req.body;
    console.log('role', req.user.role);
    try {
        // Verifica si el usuario es un paciente para que cree la cita
        if (req.user.role !== 'client') {
            return res.status(403).json({ error: "Only patients can create appointments." });
        }

        const appointmentFormatted = {
            ...appointment,
            patient_id: req.user.id,  // El paciente actual crea la cita
            doctor_id: parseInt(appointment.doctor_id),  // Doctor asignado en la cita
        };
        console.log(appointmentFormatted, "formatted")

        const id = await AppointmentModel.createAppointment(appointmentFormatted);
        res.status(201).json({ id });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

export const getAllAppointments = async (req, res) => {
    console.log(req.user.id)
    // siempre es DNI
    try {
        if (req.user.role === 'doctor') {
            // Los doctores pueden obtener todas las citas de sus pacientes
            const doctorInfo = await DoctorModel.getDoctorByDocumentId(req.user.id);
            const rows = await AppointmentModel.getAppointmentsByDoctor(doctorInfo.id);
            console.log(rows);
            const formatted = rows.map(row => ({
                id: row.id,
                patient: `${row.first_name} ${row.last_name}`,
                date: row.date_time,
                reason: row.consultation_reason,
                status: row.state
            }));
            return res.json(formatted);
        }

        if (req.user.role === 'client') {
            // Los pacientes solo pueden obtener sus propias citas
            const rows = await AppointmentModel.getAppointmentsByPatient(req.user.id);
            console.log(rows);

            const newObj = rows.map(row => ({
                id: row.id,
                date: row.date_time,
                state: row.state,
                consultationReason: row.consultation_reason,
                doctor: {
                    specialty: row.specialty,
                    fullName: `${row.first_name} ${row.last_name}`
                }
            }))
            console.log(newObj);

            return res.json(newObj);
        }

        return res.status(403).json({ error: "Invalid role" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

export const getAppointmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await AppointmentModel.getAppointmentById(id);

        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        const existingDoctorUser = await DoctorModel.getDoctorById(appointment.doctor_id);
        // Verifica el acceso a la cita según el rol del usuario
        if (req.user.role === 'doctor' && existingDoctorUser.document_num !== req.user.id) {
            return res.status(403).json({ error: "You don't have permission to access this appointment" });
        }

        if (req.user.role === 'patient' && appointment.patient_id !== req.user.id) {
            return res.status(403).json({ error: "You don't have permission to access this appointment" });
        }

        // Formateo de datos
        const formattedAppointment = {
            date: new Date(appointment.date_time).toLocaleString("es-ES", {
                weekday: "long",
                day: "numeric",
                month: "long",
                hour: "2-digit",
                minute: "2-digit",
            }), // "martes, 31 de diciembre, 10:00 AM"
            patientId: appointment.patient_id,
            patientName: `${appointment.first_name} ${appointment.last_name}`, // "John Doe"
            patientAge: new Date().getFullYear() - new Date(appointment.birth_date).getFullYear(), // Calcula edad
            patientGender: appointment.gender === "male" ? "Masculino" : "Femenino", // "Masculino"
            patientContact: appointment.phone, // "+1234567890"
            reason: appointment.consultation_reason, // "Dolor de cuello"
            description: appointment.description,
            state: appointment.state,
            medical_report: {
                diagnosis: appointment.diagnosis,
                treatment: appointment.treatment,
                notes: parseEscapedJSON(appointment.notes)
                //JSON.parse( appointment.notes) ,
            }
        };
        //console.log(formattedAppointment, "cita")
        console.log(appointment, "cita")

        res.json(formattedAppointment);
        //res.json(appointment);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

export const updateAppointment = async (req, res) => {
    const { id } = req.params;
    const { state, date, client_id } = req.body;
    console.log(req.body);
    //const appointment = req.body;
    try {
        // Verifica si el usuario tiene permisos para actualizar la cita
        const existingAppointment = await AppointmentModel.getAppointmentById(id);
        if (!existingAppointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        const existingDoctorUser = await DoctorModel.getDoctorById(existingAppointment.doctor_id);
        if (req.user.role === 'doctor' && existingDoctorUser.document_num !== req.user.id) {
            return res.status(403).json({ error: "You can't update this appointment as it's not yours." });
        }

        if (req.user.role === 'patient' && existingAppointment.patient_id !== req.user.id) {
            return res.status(403).json({ error: "You can't update this appointment as it's not yours." });
        }

        //const changes = await AppointmentModel.updateAppointment(id, { ...appointment });

        if (state === 'canceled' || state === 'no show') {
            const { canceled_reason } = req.body.report;
            //await AppointmentModel.updateAppointment(id, { ...appointment });
            await AppointmentModel.updateAppointment(id, { state, canceled_reason });
            console.log({ doctor_id: existingDoctorUser.id, client_id, canceled_reason });
        } else if (state === 'in progress' || state === 'completed') {
            const { diagnosis, treatment, patient_id, notes } = req.body.report;
            const appointmentId = await AppointmentModel.updateAppointment(id, { state });
            console.log(appointmentId)

            const medical_history_info = await MedicalHistoryModel.getMedicalHistoryByAppointmentId(appointmentId);
            console.log(medical_history_info, "getting");
            console.log(existingDoctorUser);

            if (medical_history_info) {
                await MedicalHistoryModel.updateMedicalHistory(medical_history_info.id,
                    { diagnosis, treatment, notes }
                )
            } else {
                await MedicalHistoryModel.createMedicalHistory({
                    doctor_id: existingDoctorUser.id, patient_id, diagnosis, treatment, appointment_id: appointmentId, notes
                })
            }
        } else {
            await AppointmentModel.updateAppointment(id, { doctor_id: existingDoctorUser.id, client_id, state, diagnosis, treatment });
            console.log("still");
        }

        /*
        if (changes === 0) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        */

        res.json({ message: "Appointment updated successfully" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

export const deleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        // Verifica si el usuario tiene permisos para eliminar la cita
        const existingAppointment = await AppointmentModel.getAppointmentById(id);
        if (!existingAppointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        if (req.user.role === 'doctor' && existingAppointment.doctor_id !== req.user.id) {
            return res.status(403).json({ error: "You can't delete this appointment as it's not yours." });
        }

        if (req.user.role === 'patient' && existingAppointment.patient_id !== req.user.id) {
            return res.status(403).json({ error: "You can't delete this appointment as it's not yours." });
        }

        const changes = await AppointmentModel.deleteAppointment(id);
        if (changes === 0) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        res.json({ message: "Appointment deleted successfully" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
