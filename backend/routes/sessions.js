import express from "express"
import Session from "../models/Session.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

router.get("/", protect, async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user.id }).sort({ date: -1 })
    res.json(sessions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post("/", protect, async (req, res) => {
  try {
    const { therapist, date, duration, type, notes } = req.body
    const session = await Session.create({ userId: req.user.id, therapist, date, duration, type, notes })
    res.json(session)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put("/:id", protect, async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(session)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.delete("/:id", protect, async (req, res) => {
  try {
    await Session.findByIdAndDelete(req.params.id)
    res.json({ message: "Session deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
