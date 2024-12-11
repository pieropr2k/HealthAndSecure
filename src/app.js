import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import appointmentsRoutes from "./routes/appointments.routes.js";
import doctorsRoutes from "./routes/doctors.routes.js";
import chatsAIRoutes from "./routes/ai_chats.routes.js";
import medicalHistoryRoutes from "./routes/medical_history.routes.js";
import { FRONTEND_URL } from "./config.js";

const app = express();

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));


app.use("/api/auth", authRoutes);
app.use("/api", appointmentsRoutes);
app.use("/api", doctorsRoutes);
app.use("/api", medicalHistoryRoutes);
app.use("/api", chatsAIRoutes);

export default app;
