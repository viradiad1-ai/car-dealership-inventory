import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, password } = req.body;

    const user = await registerUser(
      name,
      email,
      password
    );

    res.status(201).json({
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const token = await loginUser(email, password);

    res.status(200).json({
      message: "Login Successful",
      token,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};