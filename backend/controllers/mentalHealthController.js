import MentalHealthData from "../models/MentalHealthData.js";

// Get user's mental health data
export const getMentalHealthData = async (req, res) => {
  try {
    let data = await MentalHealthData.findOne({ userId: req.user.id });

    // If no data exists, create default data
    if (!data) {
      data = await MentalHealthData.create({
        userId: req.user.id,
        stressLevel: "Low",
        anxietyScore: "Moderate",
        moodScore: 7,
        currentStatus: "Balanced",
      });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update mental health data
export const updateMentalHealthData = async (req, res) => {
  try {
    const { stressLevel, anxietyScore, moodScore, currentStatus } = req.body;

    let data = await MentalHealthData.findOne({ userId: req.user.id });

    if (!data) {
      // Create new data if doesn't exist
      data = await MentalHealthData.create({
        userId: req.user.id,
        stressLevel,
        anxietyScore,
        moodScore,
        currentStatus,
      });
    } else {
      // Update existing data
      data.stressLevel = stressLevel || data.stressLevel;
      data.anxietyScore = anxietyScore || data.anxietyScore;
      data.moodScore = moodScore || data.moodScore;
      data.currentStatus = currentStatus || data.currentStatus;
      await data.save();
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
