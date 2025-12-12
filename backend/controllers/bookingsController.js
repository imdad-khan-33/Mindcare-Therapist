import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const { name, email, phone, concern, preferredTime, therapist } = req.body;

    if (!name || !email || !phone || !concern || !preferredTime || !therapist) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const booking = await Booking.create({
      name,
      email,
      phone,
      concern,
      preferredTime,
      therapist,
      user: req.user?._id || undefined,
    });

    return res.status(201).json({ message: "Booking created", booking });
  } catch (error) {
    console.error("createBooking error", error);
    return res.status(500).json({ message: "Server error" });
  }
};
