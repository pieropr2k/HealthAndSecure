import { z } from "zod";

// Definir el esquema de validación con Zod
export const patientSchema = z.object({
    lastName: z
        .string()
        .min(1, { message: "Apellido es obligatorio" }),
    firstName: z
        .string()
        .min(1, { message: "Nombre es obligatorio" }),
    documentType: z.enum(["dni", "ce", "passport"], {
        message: "Selecciona un tipo de documento válido",
    }),
    documentNumber: z
        .string()
        .min(1, { message: "Número de documento es obligatorio" })
        .regex(/^\d+$/, { message: "El número de documento debe ser numérico" }),
    email: z
        .string()
        .email({ message: "Por favor ingresa un correo electrónico válido" }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters",
    }),
    confirmPassword: z.string().min(6, {
        message: "Password must be at least 6 characters",
    }),
    phone: z
        .string()
        .min(5, { message: "El teléfono debe tener al menos 5 dígitos" })
        .regex(/^\d+$/, { message: "El teléfono debe ser numérico" }),
    birthDate: z
        .string()
        .min(1, { message: "La fecha de nacimiento es obligatoria" }),
    gender: z.enum(["male", "female", "other"], {
        message: "Selecciona un género válido",
    }),
    medicalConditions: z.array(z.string()),
    allergies: z.array(z.string()),
    medications: z.array(z.string()),
    surgeries: z.array(z.string()),
    address: z
        .string()
        .min(1, { message: "La dirección es obligatoria" }),
    height: z
        .number()
        .min(1, { message: "La altura es obligatoria" }),
    weight: z
        .number()
        .min(1, { message: "El peso es obligatorio" }),
    emergencyContactName: z
        .string()
        .min(1, { message: "El nombre del contacto de emergencia es obligatorio" }),
    emergencyContactPhone: z
        .string()
        .min(1, { message: "El teléfono del contacto de emergencia es obligatorio" })
        .regex(/^\d+$/, { message: "El teléfono debe ser numérico" }),
    emergencyContactRelationship: z.enum(["parent", "brother", "familiar", "couple", "friend"], {
        message: "Selecciona una relacion válida",
    }),
    terms: z.boolean().refine(val => val === true, {
        message: "Debes aceptar los términos y condiciones",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });