import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useMBTI } from "../../context/MBTIContext";
import { API_ENDPOINTS } from "../../config/apiEndpoints";
import {
  EmailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  LoadingIcon,
} from "../../icons";
import Meteors from "../common/Meteors";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isClaimingResult, setIsClaimingResult] = useState(false);

  const { login, isLoading, error, clearError, isAuthenticated } = useAuth();
  const { claimTemporaryResult } = useMBTI();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      handlePostLoginFlow();
    }
  }, [isAuthenticated, navigate, location]);

  const handlePostLoginFlow = async () => {
    const storedAnswers = localStorage.getItem("mbti_test_answers");
    const testCompleted = localStorage.getItem("mbti_test_completed");
    const sessionId = localStorage.getItem("mbti_session_id");

    if (storedAnswers && testCompleted && sessionId) {
      navigate("/result", { replace: true });
    } else {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return;
    }

    const result = await login(formData);

    if (result.success) {
      // Post-login flow will be handled by useEffect
      handlePostLoginFlow();
    }
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    window.location.href = API_ENDPOINTS.AUTH.GOOGLE_AUTH;
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Meteors number={25} />
      <div className="absolute inset-0 stars-background opacity-70"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-3 text-white">
              Welcome to Your Journey
            </h2>
            <p className="text-base text-neutral-100 mb-6">
              Ready to discover what makes you unique?
            </p>

            {localStorage.getItem("mbti_test_completed") && (
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-300/50 text-blue-100 px-4 py-3 rounded-2xl mb-4">
                <span className="block sm:inline text-sm">
                  🎉 Great job completing the MBTI test! Please sign in to save
                  your results and view your personalized report.
                </span>
              </div>
            )}

            {location.state?.message && (
              <div className="bg-blue-500/20 backdrop-blur-sm border border-blue-300/50 text-blue-100 px-4 py-3 rounded-2xl mb-4">
                <span className="block sm:inline text-sm">
                  {location.state.message}
                </span>
              </div>
            )}
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="mb-6">
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isGoogleLoading}
                    className="w-full inline-flex justify-center items-center py-3 px-6 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl shadow-sm text-sm font-semibold text-white hover:bg-white/30 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isGoogleLoading ? (
                      <LoadingIcon className="w-5 h-5" />
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EB4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        <span>Sign in with Google</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-4">
                  <div className="relative">
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white/20 rounded-full text-neutral-100 font-medium">
                        Or use your email
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {error && (
                <div className="bg-red-500/20 backdrop-blur-sm border border-red-300/50 text-red-100 px-4 py-3 rounded-2xl">
                  <span className="block sm:inline text-sm">{error}</span>
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold mb-2 text-white"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <EmailIcon
                      className="h-5 w-5"
                      style={{ color: "var(--color-custom-2)" }}
                    />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-neutral-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold mb-2 text-white"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LockIcon
                      className="h-5 w-5"
                      style={{ color: "var(--color-custom-2)" }}
                    />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="block w-full pl-12 pr-12 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-neutral-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon
                        className="h-5 w-5"
                        style={{ color: "var(--color-custom-2)" }}
                      />
                    ) : (
                      <EyeIcon
                        className="h-5 w-5"
                        style={{ color: "var(--color-custom-2)" }}
                      />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-semibold hover:opacity-80 transition-opacity"
                    style={{ color: "var(--color-custom-2)" }}
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading || isClaimingResult}
                  className="group relative w-full flex justify-center py-3 px-6 text-sm font-semibold rounded-2xl text-white transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    backgroundColor: "var(--color-custom-2)",
                    "--tw-ring-color": "var(--color-custom-2)",
                    "--tw-ring-opacity": "0.3",
                  }}
                >
                  {(isLoading || isClaimingResult) && (
                    <LoadingIcon className="w-5 h-5 mr-2" />
                  )}
                  {isClaimingResult
                    ? "Retrieving your results..."
                    : isLoading
                    ? "Signing in..."
                    : "Sign in"}
                </button>
              </div>

              <div className="text-center mt-6">
                <p className="text-neutral-100">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold hover:opacity-80 transition-opacity"
                    style={{ color: "var(--color-custom-2)" }}
                  >
                    Create one here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
