import User from "../models/User.js";
import OTP from "../models/Otp.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

// Register Controller
export const register = async (req, res) => {
  console.log("Register request body:", req.body);
  try {
    const { email, password, name } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide name, email, and password" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Create user - password will be hashed automatically by pre-save hook
    user = await User.create({ email, password, name });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Remove password from response
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      level: user.level,
    };

    return res.status(201).json({
      success: true,
      token,
      user: userResponse,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login Controller
export const login = async (req, res) => {
  console.log("Login request body:", req.body);
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Use comparePassword method from User model
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Remove password from response
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      level: user.level,
    };

    return res.status(200).json({
      success: true,
      token,
      user: userResponse,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Logout Controller
export const logout = (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Email transporter with better error handling
const createEmailTransporter = () => {
  // Check if email credentials are configured
  if (
    !process.env.EMAIL_USER ||
    !process.env.EMAIL_PASS ||
    process.env.EMAIL_USER === "your-email@gmail.com" ||
    process.env.EMAIL_PASS === "your-app-password-here"
  ) {
    console.warn("⚠️  Email credentials not configured in .env file");
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Google Auth Callback
export const googleAuthCallback = (req, res) => {
  try {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send user data along with token
    const userData = encodeURIComponent(
      JSON.stringify({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        bio: req.user.bio,
        level: req.user.level,
      })
    );

    return res.redirect(
      `${process.env.REACT_APP_URL}/?token=${token}&user=${userData}`
    );
  } catch (error) {
    return res.redirect(`${process.env.REACT_APP_URL}/login?error=auth_failed`);
  }
};

// Forgot Password Controller
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res
        .status(400)
        .json({ message: "Please provide an email address" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email not found" });
    }

    // Generate 6-digit OTP
    const plainOtp = crypto.randomInt(100000, 999999).toString();
    const hashedOtp = crypto
      .createHash("sha256")
      .update(plainOtp)
      .digest("hex");
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Save in OTP collection
    await OTP.findOneAndUpdate(
      { email },
      { otp: hashedOtp, expiresAt, verified: false },
      { upsert: true, new: true }
    );

    // Send email with OTP
    const message = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #7EC4B8; margin-bottom: 10px;">Password Reset OTP</h2>
        </div>
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <p style="color: #344054; font-size: 16px; margin-bottom: 20px;">You are receiving this email because you (or someone else) have requested to reset your password.</p>
          <p style="color: #344054; font-size: 16px; margin-bottom: 30px;">Your OTP code is:</p>
          <div style="text-align: center; margin: 30px 0;">
            <div style="display: inline-block; background-color: #f0f9f7; padding: 20px 40px; border-radius: 10px; border: 2px solid #7EC4B8;">
              <h1 style="color: #7EC4B8; font-size: 36px; margin: 0; letter-spacing: 8px; font-weight: bold;">${plainOtp}</h1>
            </div>
          </div>
          <p style="color: #dc2626; font-size: 14px; text-align: center; margin-top: 20px; font-weight: 600;">⏱️ This OTP will expire in 5 minutes</p>
          <p style="color: #666; font-size: 14px; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 20px;">If you did not request this, please ignore this email and your password will remain unchanged.</p>
        </div>
      </div>
    `;

    try {
      const transporter = createEmailTransporter();

      if (!transporter) {
        throw new Error(
          "Email service not configured. Please set EMAIL_USER and EMAIL_PASS in .env file"
        );
      }

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset Request - MindCare TheraHub",
        html: message,
      });

      res.status(200).json({
        success: true,
        message: "Email sent successfully",
      });
    } catch (err) {
      console.error(" Email sending error:", err);

      await OTP.findOneAndDelete({ email });

      return res.status(500).json({
        success: false,
        message:
          err.message ||
          "Email could not be sent. Please check email configuration in .env file",
      });
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Reset Password Controller (with OTP)
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      return res.status(400).json({
        message: "Please provide email, OTP, and new password",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Find OTP record from OTP collection
    const otpRecord = await OTP.findOne({ email });
    if (!otpRecord) {
      return res.status(400).json({
        message: "OTP not found or already used",
      });
    }

    // Check if OTP is expired
    if (otpRecord.expiresAt < new Date()) {
      await OTP.findOneAndDelete({ email });
      return res.status(400).json({
        message: "OTP has expired",
      });
    }

    // Hash the user-provided OTP and compare
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    if (hashedOtp !== otpRecord.otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // OTP is valid - Update password
    user.password = password;
    await user.save();

    // Delete OTP after successful password reset
    await OTP.findOneAndDelete({ email });

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
