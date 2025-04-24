import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { loginSchema, registerSchema } from "../validators/authValidator";

export const login = (req: Request, res: Response): void => {
  const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET || "";
  const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || "";

  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.format() });
    return;
  }

  const { username, password } = parsed.data;

  if (username !== "user@mapbox.com" || password !== "123456") {
    res.status(401).json({ error: "Invalid user." });
    return;
  }

  const userPayload = { username, password };

  const accessToken = jwt.sign(userPayload, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m"
  });
  const refreshToken = jwt.sign(userPayload, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d"
  });

  res.json({
    accessToken,
    refreshToken
  });
};

export const register = (req: Request, res: Response): void => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.format() });
    return;
  }

  const { username } = parsed.data;
  if (username == "teste@mapbox.com") {
    res.status(409).json({ error: "Conflict." });
    return;
  }

  res.status(201).json({ success: "account created." });
  return;
};

export const forgotPassword = (req: Request, res: Response): void => {
  const { email } = req.body;

  const existingUsers = ["user@mapbox.com"];

  if (!existingUsers.includes(email)) {
    res.status(200).json({
      message: "If this email exists, a reset link was sent."
    });
    return;
  }

  const resetToken = Math.random().toString(36).substring(2, 15);

  res.status(200).json({
    message: "Reset link sent.",
    resetToken
  });
};

export const resetPassword = (req: Request, res: Response): void => {
  const { token, newPassword, confirmPassword } = req.body;

  if (!token || !newPassword || !confirmPassword) {
    res.status(400).json({ error: "All fields are required." });
    return;
  }

  if (newPassword !== confirmPassword) {
    res.status(400).json({ error: "Passwords do not match." });
    return;
  }

  res.status(200).json({ message: "Password reset successful." });
};
