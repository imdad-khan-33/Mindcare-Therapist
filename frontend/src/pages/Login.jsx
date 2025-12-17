import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const { login, token } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  // Handle Google OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    const userFromUrl = urlParams.get("user");
    const errorFromUrl = urlParams.get("error");

    if (errorFromUrl) {
      setError("Google authentication failed. Please try again.");
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    if (tokenFromUrl && userFromUrl) {
      try {
        const userData = JSON.parse(decodeURIComponent(userFromUrl));
        login(tokenFromUrl, userData);
        navigate("/", { replace: true });
      } catch (err) {
        console.error("Error parsing user data from OAuth:", err);
        setError("Authentication failed. Please try again.");
      }
    }
  }, [login, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      login(response.data.token, response.data.user);
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden align-center justify-center">
      <div
        className="w-full h-full flex flex-col items-center justify-center p-5"
        style={{
          background: "url('/assets/bg-login.png') no-repeat center center",
          backgroundSize: "100% 100%",
        }}
      >
        {/* Heading outside the card */}
        {/* <h1 className="font-inter font-semibold text-[32px] leading-tight text-center mb-6 text-black">
          Login to Chatbot Therapy
        </h1> */}

        {/* White card form */}
        <div className=" mt-[50px] w-[450px]  max-w-full bg-white rounded-[20px] px-[72px] py-12 shadow-lg flex flex-col gap-6">
          <p className="font-inter text-xl font-extrabold text-left m-0 text-black">
            Login to an account
          </p>

          {/* Auth Tabs */}
          <div className="flex gap-2 ">
            <a
              href="http://localhost:5000/api/auth/google"
              className="flex-1 py-2 px-4 text-center text-white rounded-lg text-base font-semibold transition-colors"
              style={{ backgroundColor: "#7EC4B8" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#6DB3A7")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#7EC4B8")
              }
            >
              <img
                src="/assets/google.svg"
                alt="Google"
                className="inline-block  mr-2 align-middle"
              />
              Google
            </a>
            <button
              type="button"
              className="flex-1 py-2 px-4 text-center text-white rounded-lg text-base font-semibold transition-colors flex items-center justify-center"
              style={{ backgroundColor: "#7EC4B8" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#6DB3A7")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#7EC4B8")
              }
            >
              <div className="w-7 h-7 bg-[#1877F2] rounded-full flex items-center justify-center mr-2">
                <img
                  src="assets/facebook.svg"
                  alt="Facebook"
                  className="w-[20px] h-[20px] object-contain"
                />
              </div>
              Facebook
            </button>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

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
                <Link
                  to="/forgot-password"
                  className="text-xs text-gray-500 hover:text-[#7EC4B8] hover:underline"
                >
                  Forgot?
                </Link>
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    ></svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    ></svg>
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
              {loading ? "Logging in..." : "Create account"}
            </button>
          </form>

          <div className="text-center">
            <span className="text-sm text-[#44615D]">
              Don't have an Account?{" "}
            </span>
            <Link
              to="/signup"
              className="text-sm font-medium hover:underline"
              style={{ color: "#44615D" }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
