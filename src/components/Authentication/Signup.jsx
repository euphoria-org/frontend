import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  UserIcon,
  EmailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  LoadingIcon,
} from "../../icons";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const { signup, isLoading, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Check password match
    if (name === "confirmPassword" || name === "password") {
      const password = name === "password" ? value : formData.password;
      const confirmPassword =
        name === "confirmPassword" ? value : formData.confirmPassword;
      setPasswordMatch(password === confirmPassword || confirmPassword === "");
    }

    if (error) clearError();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    const { confirmPassword, ...signupData } = formData;
    const result = await signup(signupData);

    if (result.success) {
      navigate("/", { replace: true });
    }
  };

  // Handle Google signup
  const handleGoogleSignup = () => {
    setIsGoogleLoading(true);
    // Redirect to Google OAuth endpoint
    window.location.href = "http://localhost:8080/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-4">
        <div className="text-center">
          <h2
            className="text-3xl font-bold mb-3"
            style={{ color: "var(--color-header)" }}
          >
            Begin Your Discovery
          </h2>
          <p className="text-base text-gray-600 mb-4">
            Unlock the secrets of your personality
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  disabled={isGoogleLoading}
                  className="w-full inline-flex justify-center items-center py-3 px-6 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-sm text-sm font-semibold text-gray-700 hover:bg-white/90 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-200/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300/50" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/60 text-gray-500 font-medium">
                      Or create with email
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {error && (
              <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 text-red-700 px-4 py-3 rounded-2xl">
                <span className="block sm:inline text-sm">{error}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold mb-2"
                style={{ color: "var(--color-header)" }}
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
                  className="block w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300"
                  style={{
                    "--tw-ring-color": "var(--color-custom-2)",
                    "--tw-ring-opacity": "0.3",
                  }}
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2"
                style={{ color: "var(--color-header)" }}
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
                  className="block w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300"
                  style={{
                    "--tw-ring-color": "var(--color-custom-2)",
                    "--tw-ring-opacity": "0.3",
                  }}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Password fields in horizontal layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "var(--color-header)" }}
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
                    className="block w-full pl-12 pr-12 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300"
                    style={{
                      "--tw-ring-color": "var(--color-custom-2)",
                      "--tw-ring-opacity": "0.3",
                    }}
                    placeholder="Create a password"
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

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "var(--color-header)" }}
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
                    className={`block w-full pl-12 pr-12 py-3 bg-white/50 backdrop-blur-sm border rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                      passwordMatch
                        ? "border-gray-200/50"
                        : "border-red-300/50 focus:ring-red-400"
                    }`}
                    style={
                      passwordMatch
                        ? {
                            "--tw-ring-color": "var(--color-custom-2)",
                            "--tw-ring-opacity": "0.3",
                          }
                        : {}
                    }
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
              </div>
            </div>

            {!passwordMatch && (
              <p className="mt-2 text-sm text-red-600 font-medium">
                Passwords do not match
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading || !passwordMatch}
                className="group relative w-full flex justify-center py-3 px-6 text-sm font-semibold rounded-2xl text-white transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  backgroundColor: "var(--color-custom-2)",
                  "--tw-ring-color": "var(--color-custom-2)",
                  "--tw-ring-opacity": "0.3",
                }}
              >
                {isLoading && <LoadingIcon className="w-5 h-5 mr-2" />}
                {isLoading ? "Creating account..." : "Create account"}
              </button>
            </div>

            <div className="text-center mt-6">
              <p className="text-gray-600">
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
  );
};

export default Signup;
