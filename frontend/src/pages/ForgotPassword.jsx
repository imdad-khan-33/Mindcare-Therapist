import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // 1: Email, 2: OTP & Password
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (step === 1) {
      // Step 1: Send OTP to email
      if (!email) {
        setError("Please enter your email address");
        return;
      }

      setLoading(true);
      try {
        await axios.post("http://localhost:5000/api/auth/forgot-password", {
          email,
        });
        setStep(2);
        setSuccess(true);
      } catch (err) {
        console.error("Forgot password error:", err);
        setError(
          err.response?.data?.message || "Failed to send OTP. Please try again."
        );
      } finally {
        setLoading(false);
      }
    } else {
      // Step 2: Verify OTP and reset password
      if (!otp || !password || !confirmPassword) {
        setError("Please fill in all fields");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      setLoading(true);
      try {
        await axios.post("http://localhost:5000/api/auth/reset-password", {
          email,
          otp,
          password,
        });
        alert(
          "Password reset successful! You can now login with your new password."
        );
        window.location.href = "/login";
      } catch (err) {
        console.error("Reset password error:", err);
        setError(
          err.response?.data?.message ||
            "Invalid or expired OTP. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      <div
        className="w-full h-full flex flex-col items-center justify-center p-5"
        style={{
          background: "url('/assets/bg-login.png') no-repeat center center",
          backgroundSize: "100% 100%",
        }}
      >
        <div className="w-[450px] max-w-full bg-white rounded-[20px] px-[72px] py-12 shadow-lg flex flex-col gap-6">
          <div>
            <h1 className="font-inter text-2xl font-extrabold text-left m-0 text-black mb-2">
              {step === 1 ? "Forgot Password?" : "Reset Password"}
            </h1>
            <p className="text-sm text-gray-600">
              {step === 1
                ? "Enter your email address and we'll send you an OTP to reset your password."
                : "Enter the OTP sent to your email and your new password."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && step === 2 && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
                OTP sent! Please check your email inbox.
              </div>
            )}

            {step === 1 ? (
              <div>
                <label className="block text-sm font-medium text-[#344054] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7EC4B8] focus:border-transparent text-sm outline-none"
                  placeholder="name@gmail.com"
                  required
                />
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-[#344054] mb-2">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7EC4B8] focus:border-transparent text-sm outline-none text-center  font-bold tracking-widest"
                    placeholder="123456"
                    maxLength={6}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#344054] mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7EC4B8] focus:border-transparent text-sm outline-none"
                      placeholder="Enter new password"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-900"
                    >
                      {showPassword ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="#6B7280" // lighter gray
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="#000000"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#344054] mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7EC4B8] focus:border-transparent text-sm outline-none"
                      placeholder="Confirm new password"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-900"
                    >
                      {showConfirmPassword ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="#6B7280" // lighter gray
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="#000000"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#7EC4B8" }}
              onMouseEnter={(e) =>
                !loading && (e.currentTarget.style.backgroundColor = "#6DB3A7")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#7EC4B8")
              }
            >
              {loading
                ? step === 1
                  ? "Sending..."
                  : "Resetting..."
                : step === 1
                ? "Send OTP"
                : "Reset Password"}
            </button>
          </form>

          <div className="text-center">
            <Link
              to="/login"
              className="text-sm font-medium hover:underline"
              style={{ color: "#44615D" }}
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
