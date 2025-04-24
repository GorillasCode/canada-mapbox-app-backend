import { Router } from "express";
import { login, register, forgotPassword } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";
import locationRoutes from "./locationRoutes";
import { resetPassword } from "../controllers/authController";

const router = Router();

router.get("/private", authMiddleware, (req, res) => {
  res.json({ message: "Valid token." });
});

router.post("/login", login);
router.use("/location", locationRoutes);
router.post("/register", register);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
