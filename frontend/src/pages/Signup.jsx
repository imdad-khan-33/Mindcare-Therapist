import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const { login, token } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );
      login(response.data.token, response.data.user);
      navigate("/", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
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
        {/* Heading outside the card */}
        {/* <h1 className="font-inter font-semibold text-[32px] leading-tight text-center mb-6 text-black">
          Sign Up to Chatbot Therapy
        </h1> */}

        {/* White card form */}
        <div className=" mt-[75px] w-[450px] bg-white rounded-[20px] px-[72px] py-12 shadow-lg flex flex-col gap-8">
          <p className="font-inter text-xl font-extrabold text-left m-0 text-black">
            Create an account
          </p>

          <form onSubmit={handleSignup} className="flex flex-col gap-5 flex-1">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7EC4B8] focus:border-transparent text-sm outline-none"
                placeholder="xyz Khan"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Email
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

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-[#344054]">
                  Password
                </label>
                <span className="text-xs text-gray-500">Forgot?</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7EC4B8] focus:border-transparent text-sm outline-none"
                  placeholder="Enter your password"
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
                      stroke="#000000"
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
                      stroke="#6B7280" // lighter gray
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

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              style={{ backgroundColor: "#7EC4B8" }}
              onMouseEnter={(e) =>
                !loading && (e.currentTarget.style.backgroundColor = "#6DB3A7")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#7EC4B8")
              }
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Already Have an Account?{" "}
            </span>
            <Link
              to="/login"
              className="text-sm font-medium hover:underline"
              style={{ color: "#7EC4B8" }}
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
