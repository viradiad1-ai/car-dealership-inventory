import bcrypt from "bcrypt";
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

  return await createUser(
    name,
    email,
    hashedPassword
  );
};