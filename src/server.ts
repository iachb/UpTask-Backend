import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { connect } from "mongoose";

dotenv.config();
connectDB();
const app = express();

export default app;