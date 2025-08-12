import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LockIcon, EyeIcon, LoadingIcon } from "../../icons";

const UpdatePassword = () => {
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  const { updatePassword, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    // Validate reset token when component mounts
    const validateToken = async () => {
      if (!token) {
        setIsCheckingToken(false);
        return;
      }

      try {
        // You might want to call an API to validate the token
        // For now, we'll assume any token is valid
        setIsTokenValid(true);
      } catch (error) {
        setIsTokenValid(false);
      } finally {
        setIsCheckingToken(false);
      }
    };

    validateToken();
  }, [token]);

  const validatePassword = (password) => {
    const errors = {};

    if (password.length < 8) {
      errors.length = "Password must be at least 8 characters long";
    }

    if (!/(?=.*[a-z])/.test(password)) {
      errors.lowercase = "Password must contain at least one lowercase letter";
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      errors.uppercase = "Password must contain at least one uppercase letter";
    }

    if (!/(?=.*\d)/.test(password)) {
      errors.number = "Password must contain at least one number";
    }

    if (!/(?=.*[@$!%*?&])/.test(password)) {
      errors.special = "Password must contain at least one special character";
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user starts typing
    if (error) clearError();
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    // Validate password in real-time
    if (name === "password") {
      const passwordErrors = validatePassword(value);
      setValidationErrors((prev) => ({
        ...prev,
        passwordValidation: passwordErrors,
      }));
    }

    // Check password match
    if (
      name === "confirmPassword" ||
      (name === "password" && passwords.confirmPassword)
    ) {
      const newPassword = name === "password" ? value : passwords.password;
      const confirmPassword =
        name === "confirmPassword" ? value : passwords.confirmPassword;

      if (confirmPassword && newPassword !== confirmPassword) {
        setValidationErrors((prev) => ({
          ...prev,
          match: "Passwords do not match",
        }));
      } else {
        setValidationErrors((prev) => ({
          ...prev,
          match: undefined,
        }));
      }
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

    const passwordErrors = validatePassword(passwords.password);

    if (Object.keys(passwordErrors).length > 0) {
      setValidationErrors((prev) => ({
        ...prev,
        passwordValidation: passwordErrors,
      }));
      return;
    }

    if (passwords.password !== passwords.confirmPassword) {
      setValidationErrors((prev) => ({
        ...prev,
        match: "Passwords do not match",
      }));
      return;
    }

    clearError();
    const result = await updatePassword(token, passwords.password);

    if (result.success) {
      // Show success message and redirect to login
      navigate("/login", {
        state: {
          message:
            "Password updated successfully! Please log in with your new password.",
        },
      });
    }
  };

  const isFormValid = () => {
    return (
      passwords.password &&
      passwords.confirmPassword &&
      passwords.password === passwords.confirmPassword &&
      Object.keys(validatePassword(passwords.password)).length === 0
    );
  };

  if (isCheckingToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="text-center">
          <LoadingIcon className="w-8 h-8 text-purple-600 mx-auto mb-4" />
          <p className="text-purple-600">Validating reset token...</p>
        </div>
      </div>
    );
  }

  if (!token || !isTokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-500"
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
            <h2 className="text-2xl font-bold text-red-900 mb-4">
              Invalid Reset Link
            </h2>
            <p className="text-gray-600 mb-6">
              The password reset link is invalid or has expired. Please request
              a new password reset.
            </p>
            <div className="space-y-3">
              <Link
                to="/forgot-password"
                className="block w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-center"
              >
                Request New Reset Link
              </Link>
              <Link
                to="/login"
                className="block w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-center"
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-purple-900">
            Update Password
          </h2>
          <p className="mt-2 text-center text-sm text-purple-600">
            Please enter your new password below
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword.password ? "text" : "password"}
                  required
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter new password"
                  value={passwords.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => togglePasswordVisibility("password")}
                >
                  <EyeIcon
                    className="h-5 w-5 text-gray-400 hover:text-gray-600"
                    closed={!showPassword.password}
                  />
                </button>
              </div>

              {/* Password validation indicators */}
              {passwords.password && validationErrors.passwordValidation && (
                <div className="mt-2 space-y-1">
                  {Object.entries(validationErrors.passwordValidation).map(
                    ([key, message]) => (
                      <p
                        key={key}
                        className="text-xs text-red-600 flex items-center"
                      >
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {message}
                      </p>
                    )
                  )}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword.confirmPassword ? "text" : "password"}
                  required
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Confirm new password"
                  value={passwords.confirmPassword}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  <EyeIcon
                    className="h-5 w-5 text-gray-400 hover:text-gray-600"
                    closed={!showPassword.confirmPassword}
                  />
                </button>
              </div>

              {validationErrors.match && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {validationErrors.match}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading || !isFormValid()}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading && <LoadingIcon className="w-4 h-4 mr-2" />}
                {isLoading ? "Updating..." : "Update Password"}
              </button>
            </div>

            <div className="text-center">
              <Link
                to="/login"
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
