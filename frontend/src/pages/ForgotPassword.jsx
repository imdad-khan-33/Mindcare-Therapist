import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );
      setSuccess(true);
      setEmail("");
    } catch (err) {
      console.error("Forgot password error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to send reset email. Please try again."
      );
    } finally {
      setLoading(false);
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
              Forgot Password?
            </h1>
            <p className="text-sm text-gray-600">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
                Reset link sent! Please check your email inbox.
              </div>
            )}

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
              {loading ? "Sending..." : "Send Reset Link"}
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
