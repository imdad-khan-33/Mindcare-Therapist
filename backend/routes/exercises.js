import express from "express"

const router = express.Router()

const exercises = [
  {
    id: 1,
    name: "Box Breathing",
    category: "Mindfulness",
    duration: 5,
    difficulty: "Beginner",
    description: "A simple breathing technique to calm your mind",
    steps: ["Inhale for 4 counts", "Hold for 4 counts", "Exhale for 4 counts", "Hold for 4 counts", "Repeat 5 times"],
  },
  {
    id: 2,
    name: "Progressive Muscle Relaxation",
    category: "Relaxation",
    duration: 15,
    difficulty: "Intermediate",
    description: "Relax your body by tensing and releasing muscle groups",
    steps: ["Tense your feet", "Hold for 5 seconds", "Release", "Move up to calves", "Continue through body"],
  },
]

router.get("/", (req, res) => {
  res.json(exercises)
})

export default router
