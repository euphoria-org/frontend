import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { authService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import {
  EyeIcon,
  EyeOffIcon,
  CheckIcon,
  CloseIcon,
  LockIcon,
} from "../../icons";
import Loading from "../common/Loading";
import Meteors from "../common/Meteors";

const UpdatePassword = () => {
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  const { resetPassword, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsCheckingToken(false);
        return;
      }

      try {
        setIsTokenValid(true);
      } catch (error) {
        setIsTokenValid(false);
      } finally {
        setIsCheckingToken(false);
      }
    };

    validateToken();
  }, [token]);

  const validatePasswordRequirements = (password) => {
    setPasswordRequirements({
      length: password.length >= 8,
      lowercase: /(?=.*[a-z])/.test(password),
      uppercase: /(?=.*[A-Z])/.test(password),
      number: /(?=.*\d)/.test(password),
      special: /(?=.*[@$!%*?&])/.test(password),
    });
  };

  const isPasswordValid = () => {
    return Object.values(passwordRequirements).every((req) => req);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) clearError();

    if (name === "password") {
      validatePasswordRequirements(value);
    }

    if (name === "confirmPassword" || name === "password") {
      const newPassword = name === "password" ? value : passwords.password;
      const confirmPassword =
        name === "confirmPassword" ? value : passwords.confirmPassword;
      setPasswordMatch(
        newPassword === confirmPassword || confirmPassword === ""
      );
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordValid()) {
      return;
    }

    if (passwords.password !== passwords.confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    clearError();
    const result = await resetPassword(token, passwords.password);

    if (result.success) {
      navigate("/login", {
        state: {
          message:
            "Password updated successfully! Please log in with your new password.",
        },
      });
    }
  };

  if (isCheckingToken) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        {/* Meteors background */}
        <Meteors number={25} />

        {/* Static stars background */}
        <div className="absolute inset-0 stars-background opacity-70"></div>

        <div className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-12">
          <Loading message="Verifying token..." size="large" variant="custom" />
        </div>
      </div>
    );
  }

  if (!token || !isTokenValid) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
        {/* Meteors background */}
        <Meteors number={25} />

        {/* Static stars background */}
        <div className="absolute inset-0 stars-background opacity-70"></div>

        <div className="relative z-10 max-w-md w-full space-y-6">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-6 text-center">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: "var(--color-custom-2)" }}
            >
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white">
              Invalid Reset Link
            </h2>
            <p className="text-neutral-100 mb-6">
              This password reset link is invalid or has expired. Please request
              a new one.
            </p>
            <div className="space-y-3">
              <Link
                to="/forgot-password"
                className="block w-full px-6 py-3 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-white/20 text-center"
                style={{
                  backgroundColor: "var(--color-custom-2)",
                  "--tw-ring-color": "var(--color-custom-2)",
                  "--tw-ring-opacity": "0.3",
                }}
              >
                Request New Reset Link
              </Link>
              <Link
                to="/login"
                className="block w-full px-6 py-3 text-white bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-white/20 text-center"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      {/* Meteors background */}
      <Meteors number={25} />

      {/* Static stars background */}
      <div className="absolute inset-0 stars-background opacity-70"></div>

      <div className="relative z-10 max-w-md w-full space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-3 text-white">
            Create New Password
          </h2>
          <p className="text-base text-neutral-100 mb-6">
            Choose a strong password for your account
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-red-200 px-4 py-3 rounded-2xl">
                <span className="block sm:inline text-sm">{error}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-2 text-white"
              >
                New Password
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
                  type={showPassword.password ? "text" : "password"}
                  required
                  className="block w-full pl-12 pr-12 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300"
                  style={{
                    "--tw-ring-color": "var(--color-custom-2)",
                    "--tw-ring-opacity": "0.3",
                  }}
                  placeholder="Enter new password"
                  value={passwords.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => togglePasswordVisibility("password")}
                >
                  {showPassword.password ? (
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

              {/* Dynamic Password Requirements */}
              {passwords.password && (
                <div className="mt-4 p-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
                  <p className="text-sm font-semibold text-white mb-3">
                    Password Requirements:
                  </p>
                  <div className="space-y-2">
                    {/* At least 8 characters */}
                    <div className="flex items-center text-sm transition-all duration-300">
                      <div
                        className={`flex items-center justify-center w-5 h-5 rounded-full mr-3 transition-all duration-300 ${
                          passwordRequirements.length
                            ? "bg-green-500/20 border-2 border-green-400"
                            : "bg-white/10 border-2 border-white/30"
                        }`}
                      >
                        {passwordRequirements.length ? (
                          <CheckIcon className="w-3 h-3 text-green-400" />
                        ) : (
                          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                        )}
                      </div>
                      <span
                        className={`font-medium transition-colors duration-300 ${
                          passwordRequirements.length
                            ? "text-green-300"
                            : "text-neutral-100"
                        }`}
                      >
                        At least 8 characters
                      </span>
                    </div>

                    {/* One lowercase letter */}
                    <div className="flex items-center text-sm transition-all duration-300">
                      <div
                        className={`flex items-center justify-center w-5 h-5 rounded-full mr-3 transition-all duration-300 ${
                          passwordRequirements.lowercase
                            ? "bg-green-500/20 border-2 border-green-400"
                            : "bg-white/10 border-2 border-white/30"
                        }`}
                      >
                        {passwordRequirements.lowercase ? (
                          <CheckIcon className="w-3 h-3 text-green-600" />
                        ) : (
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        )}
                      </div>
                      <span
                        className={`font-medium transition-colors duration-300 ${
                          passwordRequirements.lowercase
                            ? "text-green-700"
                            : "text-gray-600"
                        }`}
                      >
                        One lowercase letter (a-z)
                      </span>
                    </div>

                    {/* One uppercase letter */}
                    <div className="flex items-center text-sm transition-all duration-300">
                      <div
                        className={`flex items-center justify-center w-5 h-5 rounded-full mr-3 transition-all duration-300 ${
                          passwordRequirements.uppercase
                            ? "bg-green-100 border-2 border-green-500"
                            : "bg-gray-100 border-2 border-gray-300"
                        }`}
                      >
                        {passwordRequirements.uppercase ? (
                          <CheckIcon className="w-3 h-3 text-green-600" />
                        ) : (
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        )}
                      </div>
                      <span
                        className={`font-medium transition-colors duration-300 ${
                          passwordRequirements.uppercase
                            ? "text-green-700"
                            : "text-gray-600"
                        }`}
                      >
                        One uppercase letter (A-Z)
                      </span>
                    </div>

                    {/* One number */}
                    <div className="flex items-center text-sm transition-all duration-300">
                      <div
                        className={`flex items-center justify-center w-5 h-5 rounded-full mr-3 transition-all duration-300 ${
                          passwordRequirements.number
                            ? "bg-green-100 border-2 border-green-500"
                            : "bg-gray-100 border-2 border-gray-300"
                        }`}
                      >
                        {passwordRequirements.number ? (
                          <CheckIcon className="w-3 h-3 text-green-600" />
                        ) : (
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        )}
                      </div>
                      <span
                        className={`font-medium transition-colors duration-300 ${
                          passwordRequirements.number
                            ? "text-green-700"
                            : "text-gray-600"
                        }`}
                      >
                        One number (0-9)
                      </span>
                    </div>

                    {/* One special character */}
                    <div className="flex items-center text-sm transition-all duration-300">
                      <div
                        className={`flex items-center justify-center w-5 h-5 rounded-full mr-3 transition-all duration-300 ${
                          passwordRequirements.special
                            ? "bg-green-100 border-2 border-green-500"
                            : "bg-gray-100 border-2 border-gray-300"
                        }`}
                      >
                        {passwordRequirements.special ? (
                          <CheckIcon className="w-3 h-3 text-green-600" />
                        ) : (
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        )}
                      </div>
                      <span
                        className={`font-medium transition-colors duration-300 ${
                          passwordRequirements.special
                            ? "text-green-700"
                            : "text-gray-600"
                        }`}
                      >
                        One special character (@$!%*?&)
                      </span>
                    </div>
                  </div>

                  {/* Overall password strength indicator */}
                  <div className="mt-3 pt-3 border-t border-gray-200/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-600">
                        Password Strength:
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          Object.values(passwordRequirements).filter(Boolean)
                            .length === 5
                            ? "text-green-600"
                            : Object.values(passwordRequirements).filter(
                                Boolean
                              ).length >= 3
                            ? "text-yellow-600"
                            : "text-red-500"
                        }`}
                      >
                        {Object.values(passwordRequirements).filter(Boolean)
                          .length === 5
                          ? "Strong"
                          : Object.values(passwordRequirements).filter(Boolean)
                              .length >= 3
                          ? "Medium"
                          : "Weak"}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          Object.values(passwordRequirements).filter(Boolean)
                            .length === 5
                            ? "bg-green-500 w-full"
                            : Object.values(passwordRequirements).filter(
                                Boolean
                              ).length >= 3
                            ? "bg-yellow-500 w-3/5"
                            : "bg-red-500 w-1/5"
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold mb-2"
                style={{ color: "var(--color-header)" }}
              >
                Confirm New Password
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
                  type={showPassword.confirmPassword ? "text" : "password"}
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
                  placeholder="Confirm new password"
                  value={passwords.confirmPassword}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  {showPassword.confirmPassword ? (
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

              {!passwordMatch && passwords.confirmPassword && (
                <div className="mt-2 p-3 bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-xl">
                  <p className="text-sm text-red-700 font-medium flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Passwords do not match
                  </p>
                </div>
              )}

              {passwordMatch &&
                passwords.confirmPassword &&
                passwords.password === passwords.confirmPassword && (
                  <div className="mt-2 p-3 bg-green-50/80 backdrop-blur-sm border border-green-200/50 rounded-xl">
                    <p className="text-sm text-green-700 font-medium flex items-center">
                      <CheckIcon className="w-4 h-4 mr-2" />
                      Passwords match perfectly!
                    </p>
                  </div>
                )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading || !isPasswordValid() || !passwordMatch}
                className="group relative w-full flex justify-center py-3 px-6 text-sm font-semibold rounded-2xl text-white transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  backgroundColor: "var(--color-custom-2)",
                  "--tw-ring-color": "var(--color-custom-2)",
                  "--tw-ring-opacity": "0.3",
                }}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <Loading size="small" variant="custom" className="mr-2" />
                    <span>Updating Password...</span>
                  </div>
                ) : (
                  "Update Password"
                )}
              </button>
            </div>

            <div className="text-center pt-2">
              <Link
                to="/login"
                className="font-semibold hover:opacity-80 transition-opacity"
                style={{ color: "var(--color-custom-2)" }}
              >
                ← Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
