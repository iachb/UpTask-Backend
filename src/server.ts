import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { corsConfig } from "./config/cors";
import projectRoutes from "./routes/projectRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(cors(corsConfig))

// Logging
app.use(morgan('dev'));

// Read data from forms
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); 
app.use('/api/projects', projectRoutes);

export default app;