import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { loginSchema } from "../validators/authValidator";

export const login = (req: Request, res: Response): void => {
  const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET || '';
  const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || '';

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

  console.log(ACCESS_TOKEN_SECRET);

  const userPayload = { username, password };

  const accessToken = jwt.sign(userPayload, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(userPayload, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  res.json({
    accessToken,
    refreshToken
  });
};
