import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export const authorizeAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "ADMIN") {
    return res.status(403).json({
      message: "Admin access required",
    });
  }

  next();
};
