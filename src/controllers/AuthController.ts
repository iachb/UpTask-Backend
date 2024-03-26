import type { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    try {
      const { password, email } = req.body;

      // Prevent duplicates
      const userExists = await User.findOne({ email });
      if (userExists) {
        const error = new Error("User already exists");
        return res.status(409).json({ message: error.message });
      }

      // Create User
      const user = new User(req.body);

      // Hash the password
      user.password = await hashPassword(password);

      await user.save();
      res.send(
        "Account created successfully, check your email to verify your account"
      );
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
