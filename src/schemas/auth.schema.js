import { z } from "zod";

export const registerSchema = z.object({
  document_type: z.enum(["dni", "ce", "passport"], {
    required_error: "Document type is required",
    invalid_type_error: "Invalid document type",
  }),
  first_name: z.string({
    required_error: "First name is required",
  }),
  last_name: z.string({
    required_error: "Last name is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Email is not valid",
    }),
  phone: z.string({
    required_error: "Phone number is required",
  }),
  address: z.string({
    required_error: "Address is required",
  }),
  role: z.enum(["client", "doctor"], {
    required_error: "Role is required",
    invalid_type_error: "Invalid role",
  }),
  gender: z.string().optional(), // Optional since it wasn't marked as NOT NULL
  birth_date: z.string({
    required_error: "Birth date is required",
  }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});