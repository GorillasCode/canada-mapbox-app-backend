import { Router } from "express";
import { login, register, forgotPassword } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/private", authMiddleware, (req, res) => {
  res.json({ message: "Valid token." });
});

router.post("/login", login);
router.post("/register", register);
router.post("/forgot-password", forgotPassword);

export default router;
