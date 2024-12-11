import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";
import { findUserByEmail, createUser, findUserById } from "../models/user.model.js";
import ClientModel from "../models/client.model.js";
import DoctorModel from "../models/doctor.model.js";
import CertificationModel from "../models/certification.model.js";
import ExperienceModel from "../models/experience.model.js";

export const register = async (req, res) => {
    const {
        document_num,
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
    } = req.body;

    console.log(req.body, "body");

    try {
        // Verificar si el email ya está en uso
        const userFound = await findUserByEmail(email);
        if (userFound) return res.status(400).json({ message: "The email is already in use" });

        // Hashear la contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        console.log(document_num, document_type)
        // Crear el usuario
        
        const userId = await createUser({
            id: document_num,
            document_type,
            role,
            first_name,
            last_name,
            email,
            phone,
            address,
            gender,
            birth_date,
            password: passwordHash,
            registration_date: new Date(),
        });
        
        console.log({
            id: document_num,
            document_type,
            role,
            first_name,
            last_name,
            email,
            phone,
            address,
            gender,
            birth_date,
            password: passwordHash,
            registration_date: new Date(),
        });

        if (role === 'client') {
            const {
                document_num,
                height,
                weight,
                emergency_contact_name,
                emergency_contact_phone,
                emergency_contact_relationship,
            } = req.body;
            await ClientModel.createClient({
                document_num,
                height,
                weight,
                emergency_contact_name,
                emergency_contact_phone,
                emergency_contact_relationship
            })
        }

        //let doctor_id;
        if (role === 'doctor') {
            const {
                document_num,
                specialty,
                district,
                qualification,
                hourly_rate,
                certifications,
                experience,
            } = req.body;
            await DoctorModel.createDoctor({
                document_num,
                specialty,
                district,
                qualification,
                hourly_rate,
            })
            //console.log(doctor_id, "doctor_id");
            console.log(certifications);
            experience.forEach(experience => ExperienceModel.createExperience(experience));
            certifications.forEach(certification => CertificationModel.createCertification(certification));
            
            console.log(experience);
        }

        // Generar un token de acceso
        console.log({ id: userId, role })
        const token = await createAccessToken({ id: userId, role });
        console.log(token);

        // Configurar la cookie del token
        res.cookie("token", token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none",
        });
        
        res.json({ id: userId, first_name, last_name, email, role });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe
        const userFound = await findUserByEmail(email);
        if (!userFound) return res.status(400).json({ message: "The email does not exist" });

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: "The password is incorrect" });

        /*
        let token;
        // Generar un token de acceso
        if (userFound.role ==='doctor') {
            const doctorInfo = await DoctorModel.getDoctorByDocumentId(userFound.id);
            console.log(doctorInfo.id);
            console.log(userFound.role);
            
            token = await createAccessToken({
                id: doctorInfo.id,
                role: userFound.role // Incluye el role en el payload
            });
            
        } else {
            token = await createAccessToken({ 
                id: userFound.id,
                role: userFound.role // Incluye el role en el payload
            });
        }
        */
        const token = await createAccessToken({ 
            id: userFound.id,
            role: userFound.role // Incluye el role en el payload
        });
        console.log(token);

        // Configurar la cookie del token
        res.cookie("token", token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none",
        });
        console.log(req.cookies, 'req cookies');

        res.json({
            id: userFound.id,
            first_name: userFound.first_name,
            last_name: userFound.last_name,
            email: userFound.email,
            role: userFound.role // Incluir el role en la respuesta
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    
    console.log(req.cookies, 'cookies ver')
    console.log(token)
    console.log(jwt.verify(token, TOKEN_SECRET))

    if (!token) return res.send(false);

    try {
        // Verificar el token
        const decoded = jwt.verify(token, TOKEN_SECRET);
        console.log(decoded);

        const userFound = await findUserById(decoded.id);
        if (!userFound) return res.sendStatus(401);

        res.json({
            id: userFound.id,
            first_name: userFound.first_name,
            last_name: userFound.last_name,
            email: userFound.email,
            role: userFound.role
        });
    } catch (err) {
        return res.sendStatus(401);
    }
};

export const logout = (req, res) => {
    /*
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
    });
    */
    res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Solo 'secure' en producción
        expires: new Date(0),
        sameSite: 'Strict', // Puede ser útil para evitar problemas de cross-site
    });

    return res.sendStatus(200);
};
