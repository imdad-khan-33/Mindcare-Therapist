import Journal from "../models/Journal.js";

/**
 * @desc    Get all journal entries for a user
 * @route   GET /api/journal
 * @access  Private
 */
const getJournalEntries = async (req, res) => {
  try {
    const entries = await Journal.find({ userId: req.user.id }).sort({
      date: -1, // Sort by date descending
    });
    res.json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc    Create a new journal entry
 * @route   POST /api/journal
 * @access  Private
 */
const createJournalEntry = async (req, res) => {
  try {
    const { title, content } = req.body;
    const entry = await Journal.create({
      userId: req.user.id,
      title,
      content,
    });
    res.status(201).json(entry);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid data provided" });
  }
};

/**
 * @desc    Update a journal entry
 * @route   PUT /api/journal/:id
 * @access  Private
 */
const updateJournalEntry = async (req, res) => {
  try {
    const entry = await Journal.findById(req.params.id);

    if (!entry || entry.userId.toString() !== req.user.id) {
      return res
        .status(404)
        .json({ message: "Entry not found or not authorized" });
    }

    const updatedEntry = await Journal.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc    Delete a journal entry
 * @route   DELETE /api/journal/:id
 * @access  Private
 */
const deleteJournalEntry = async (req, res) => {
  try {
    const entry = await Journal.findById(req.params.id);

    if (!entry || entry.userId.toString() !== req.user.id) {
      return res
        .status(404)
        .json({ message: "Entry not found or not authorized" });
    }

    await entry.deleteOne();
    res.json({ message: "Entry deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  getJournalEntries,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
};
