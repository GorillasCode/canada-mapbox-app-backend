import express from "express";
import { searchLocation } from "../controllers/locationController";

const router = express.Router();

router.post("/search", (req, res) => {
  searchLocation(req, res);
  return;
});

export default router;
