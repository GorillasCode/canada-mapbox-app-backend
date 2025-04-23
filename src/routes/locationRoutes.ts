import express from "express";
import { searchLocation } from "../controllers/locationController";

const router = express.Router();

router.post("/search", searchLocation);

export default router;
