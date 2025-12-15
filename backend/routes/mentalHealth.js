import express from "express";
import {
  getMentalHealthData,
  updateMentalHealthData,
} from "../controllers/mentalHealthController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getMentalHealthData);
router.put("/", protect, updateMentalHealthData);

export default router;
