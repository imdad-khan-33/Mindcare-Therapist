import express from "express"
import Journal from "../models/Journal.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

router.get("/", protect, async (req, res) => {
  try {
    const entries = await Journal.find({ userId: req.user.id }).sort({ createdAt: -1 })
    res.json(entries)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post("/", protect, async (req, res) => {
  try {
    const { title, content, mood, tags } = req.body
    const entry = await Journal.create({ userId: req.user.id, title, content, mood, tags })
    res.json(entry)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put("/:id", protect, async (req, res) => {
  try {
    const entry = await Journal.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(entry)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.delete("/:id", protect, async (req, res) => {
  try {
    await Journal.findByIdAndDelete(req.params.id)
    res.json({ message: "Entry deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
