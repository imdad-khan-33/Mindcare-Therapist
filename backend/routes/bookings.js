import express from "express";
import { createBooking } from "../controllers/bookingsController.js";
const router = express.Router();

// Public route to create a booking
router.post("/", createBooking);

export default router;
