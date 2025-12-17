import express from "express";
import passport from "passport";
import {
  register,
  login,
  logout,
  googleAuthCallback,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

// Register Route
router.post("/register", register);

// Login Route
router.post("/login", login);

// Logout Route
router.post("/logout", logout);

// Forgot Password Route
router.post("/forgot-password", forgotPassword);

// Reset Password Route
router.post("/reset-password", resetPassword);

// Google Auth Routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  googleAuthCallback
);

export default router;
