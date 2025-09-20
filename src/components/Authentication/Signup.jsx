import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  EmailIcon,
  UserIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  LoadingIcon,
} from "../../icons";
import Meteors from "../common/Meteors";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { signup, isLoading, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // Check if there's a pending MBTI test
      const storedAnswers = localStorage.getItem("mbti_test_answers");
      const testCompleted = localStorage.getItem("mbti_test_completed");
      const sessionId = localStorage.getItem("mbti_session_id");

      if (storedAnswers && testCompleted && sessionId) {
        // User has a pending MBTI test, redirect to test page to handle claiming
        navigate("/test", { replace: true });
      } else {
        // Normal redirect
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      }
    }
  }, [isAuthenticated, navigate, location]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation errors when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (error) clearError();
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Name validation
    if (!formData.name) {
      errors.name = "Name is required";
    } else if (formData.name.length < 3) {
      errors.name = "Name must be at least 3 characters long";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Send all data including confirmPassword for backend validation
    const result = await signup(formData);

    if (result.success) {
      // Show success message for 3 seconds before redirecting
      setShowSuccessMessage(true);
      setTimeout(() => {
        // Check if there's a pending MBTI test
        const storedAnswers = localStorage.getItem("mbti_test_answers");
        const testCompleted = localStorage.getItem("mbti_test_completed");
        const sessionId = localStorage.getItem("mbti_session_id");

        if (storedAnswers && testCompleted && sessionId) {
          // User has a pending MBTI test, redirect to test page to handle claiming
          navigate("/test", { replace: true });
        } else {
          // Normal redirect
          const from = location.state?.from?.pathname || "/";
          navigate(from, { replace: true });
        }
      }, 3000);
    }
  };

  // Handle Google OAuth
  const handleGoogleSignup = () => {
    setIsGoogleLoading(true);
    // Redirect to Google OAuth endpoint
    window.location.href = "http://localhost:8080/auth/google";
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Meteors background */}
      <Meteors number={25} />

      {/* Static stars background */}
      <div className="absolute inset-0 stars-background opacity-70"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-3 text-white">
              Begin Your Journey
            </h2>
            <p className="text-base text-neutral-100 mb-6">
              Create your account and start discovering yourself
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="mb-6">
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={handleGoogleSignup}
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
                        <span>Sign up with Google</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-4">
                  <div className="relative">
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white/20 rounded-full text-neutral-100 font-medium">
                        Or create account manually
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

              {showSuccessMessage && (
                <div className="bg-green-500/20 backdrop-blur-sm border border-green-300/50 text-green-100 px-4 py-3 rounded-2xl">
                  <span className="block sm:inline text-sm">
                    Account created successfully! A confirmation email has been
                    sent to your email address. Redirecting you to the
                    dashboard...
                  </span>
                </div>
              )}

              {/* Email Field */}
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
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-300">
                    {validationErrors.email}
                  </p>
                )}
              </div>

              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold mb-2 text-white"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <UserIcon
                      className="h-5 w-5"
                      style={{ color: "var(--color-custom-2)" }}
                    />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="block w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-neutral-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                {validationErrors.name && (
                  <p className="mt-1 text-sm text-red-300">
                    {validationErrors.name}
                  </p>
                )}
              </div>

              {/* Password and Confirm Password - Horizontal Layout */}
              <div className="grid grid-cols-2 gap-4">
                {/* Password Field */}
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
                      autoComplete="new-password"
                      required
                      className="block w-full pl-12 pr-12 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-neutral-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                      placeholder="Enter password"
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
                  {validationErrors.password && (
                    <p className="mt-1 text-sm text-red-300">
                      {validationErrors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold mb-2 text-white"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <LockIcon
                        className="h-5 w-5"
                        style={{ color: "var(--color-custom-2)" }}
                      />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      className="block w-full pl-12 pr-12 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-neutral-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
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
                  {validationErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-300">
                      {validationErrors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-3 px-6 text-sm font-semibold rounded-2xl text-white transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    backgroundColor: "var(--color-custom-2)",
                    "--tw-ring-color": "var(--color-custom-2)",
                    "--tw-ring-opacity": "0.3",
                  }}
                >
                  {isLoading && <LoadingIcon className="w-5 h-5 mr-2" />}
                  {isLoading ? "Creating account..." : "Create Account"}
                </button>
              </div>

              <div className="text-center mt-6">
                <p className="text-neutral-100">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold hover:opacity-80 transition-opacity"
                    style={{ color: "var(--color-custom-2)" }}
                  >
                    Sign in here
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

export default Signup;
