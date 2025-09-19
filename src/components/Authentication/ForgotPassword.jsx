import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { EmailIcon, LoadingIcon } from "../../icons";
import Meteors from "../common/Meteors";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const { forgotPassword, isLoading, error, clearError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return;
    }

    clearError();
    const result = await forgotPassword(email);

    if (result.success) {
      setIsSubmitted(true);
      setMessage(
        "Password reset instructions have been sent to your email address."
      );
    } else {
      setMessage(result.message);
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    if (error) clearError();
    if (message) setMessage("");
  };

  if (isSubmitted) {
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white">
              Check Your Inbox
            </h2>
            <p className="text-neutral-100 mb-6 leading-relaxed">
              We've sent password reset instructions to <strong>{email}</strong>
            </p>
            <p className="text-sm text-neutral-300 mb-8">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail("");
                  setMessage("");
                }}
                className="w-full px-6 py-3 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-white/20"
                style={{
                  backgroundColor: "var(--color-custom-2)",
                }}
              >
                Try Different Email
              </button>
              <Link
                to="/login"
                className="block w-full px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white font-semibold text-center hover:bg-white/30 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/20"
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
            Reset Your Access
          </h2>
          <p className="text-base text-neutral-100 mb-6 leading-relaxed">
            Enter your email and we'll help you get back on track
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {(error || message) && (
              <div
                className={`border px-4 py-3 rounded-2xl backdrop-blur-sm ${
                  error
                    ? "bg-red-500/20 border-red-300/50 text-red-100"
                    : "bg-blue-500/20 border-blue-300/50 text-blue-100"
                }`}
              >
                <span className="block sm:inline text-sm">
                  {error || message}
                </span>
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
                  placeholder="Enter your email address"
                  value={email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading || !email}
                className="group relative w-full flex justify-center py-3 px-6 text-sm font-semibold rounded-2xl text-white transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  backgroundColor: "var(--color-custom-2)",
                }}
              >
                {isLoading && <LoadingIcon className="w-5 h-5 mr-2" />}
                {isLoading ? "Sending..." : "Send Reset Instructions"}
              </button>
            </div>

            <div className="text-center mt-8">
              <p className="text-neutral-100">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="font-semibold hover:opacity-80 transition-opacity"
                  style={{ color: "var(--color-custom-2)" }}
                >
                  Back to Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
