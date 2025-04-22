import { Router } from "express";
import { login } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/private", authMiddleware, (req, res) => {
  res.json({ message: "Valid token." });
});
router.post("/login", login);

export default router;
