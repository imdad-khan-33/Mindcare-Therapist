import express from "express"
import User from "../models/User.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put("/profile", protect, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true })
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
