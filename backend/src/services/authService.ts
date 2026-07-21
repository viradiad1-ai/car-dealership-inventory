import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/userModel";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return await createUser(name, email, hashedPassword);
};

export const loginUser = async (
  email: string,
  password: string
) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid Email");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error("Invalid Password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );

  return token;
};