import { z } from "zod";

export const createAppointmentSchema = z.object({
  consultation_reason: z
    .string({
      required_error: "Reason is required",
    }),
  description: z.string().optional(),
  date_time: z
    .string({
      required_error: "Date is required",
    })
    .refine(
      (value) => !isNaN(Date.parse(value)), // Valida que sea una fecha válida
      { message: "Date must be a valid datetime string (ISO 8601 format)" }
    ),
});
