import type { Request, Response } from "express";
import User from "../models/User";
import mongoose from "mongoose";

export class AuthController {

  static createAccount = async (req: Request, res: Response) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.send('Account created successfully, check your email to verify your account')
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

}
