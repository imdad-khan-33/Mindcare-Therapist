import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getJournalEntries,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
} from "../controllers/journalController.js";

const router = express.Router();

// Instead of writing logic here, we call controller functions.
router
  .route("/")
  .get(protect, getJournalEntries)
  .post(protect, createJournalEntry);

router
  .route("/:id")
  .put(protect, updateJournalEntry)
  .delete(protect, deleteJournalEntry);

export default router;
