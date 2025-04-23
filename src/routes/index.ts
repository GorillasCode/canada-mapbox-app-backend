import { Router } from "express";
import { login } from "../controllers/authController";
import { register } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";
import locationRoutes from "./locationRoutes";


const router = Router();

router.get("/private", authMiddleware, (req, res) => {
  res.json({ message: "Valid token." });
});
router.post("/login", login);
router.use("/location", locationRoutes);
router.post("/register", register);

export default router;
