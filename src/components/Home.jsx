import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TestIcon, UserIcon, LogoutIcon } from "../icons";

const Home = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1
                className="text-2xl font-bold"
                style={{ color: "var(--color-purple-900)" }}
              >
                MBTI Platform
              </h1>
            </div>

            <nav className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <span className="text-gray-700">
                    Welcome, {user?.name || user?.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-4 py-2 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <LogoutIcon className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="flex space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 hover:text-purple-700 transition-colors"
                    style={{ color: "var(--color-purple-600)" }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
                    style={{ backgroundColor: "var(--color-purple-600)" }}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ color: "var(--color-purple-900)" }}
          >
            Discover Your Personality Type
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Take our comprehensive MBTI personality test and gain insights into
            your unique traits, preferences, and behavioral patterns.
            Understanding your personality type can help you in personal growth,
            career decisions, and relationships.
          </p>

          {isAuthenticated ? (
            <Link
              to="/test"
              className="inline-flex items-center space-x-2 px-8 py-4 text-white text-lg font-semibold rounded-lg hover:opacity-90 transition-colors shadow-lg"
              style={{ backgroundColor: "var(--color-purple-600)" }}
            >
              <TestIcon className="w-6 h-6" />
              <span>Take MBTI Test</span>
            </Link>
          ) : (
            <div className="space-y-4">
              <p
                className="font-medium"
                style={{ color: "var(--color-purple-700)" }}
              >
                Please log in to take the personality test
              </p>
              <Link
                to="/login"
                className="inline-flex items-center space-x-2 px-8 py-4 text-white text-lg font-semibold rounded-lg hover:opacity-90 transition-colors shadow-lg"
                style={{ backgroundColor: "var(--color-purple-600)" }}
              >
                <UserIcon className="w-6 h-6" />
                <span>Login to Start</span>
              </Link>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: "var(--color-purple-100)" }}
            >
              <TestIcon
                className="w-6 h-6"
                style={{ color: "var(--color-purple-600)" }}
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Comprehensive Test
            </h3>
            <p className="text-gray-600">
              Take a detailed personality assessment based on the Myers-Briggs
              Type Indicator methodology.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: "var(--color-purple-100)" }}
            >
              <UserIcon
                className="w-6 h-6"
                style={{ color: "var(--color-purple-600)" }}
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Personal Insights
            </h3>
            <p className="text-gray-600">
              Get detailed insights about your personality type, strengths, and
              areas for development.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: "var(--color-purple-100)" }}
            >
              <TestIcon
                className="w-6 h-6"
                style={{ color: "var(--color-purple-600)" }}
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Track Progress
            </h3>
            <p className="text-gray-600">
              Save your results and track your personality insights over time
              with your personal account.
            </p>
          </div>
        </div>

        {/* MBTI Types Overview */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold text-purple-900 mb-6 text-center">
            About MBTI Personality Types
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <h4 className="font-semibold text-purple-700 mb-2">
                Extraversion (E)
              </h4>
              <p className="text-sm text-gray-600">
                Focus on outer world, energized by interaction
              </p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-purple-700 mb-2">
                Introversion (I)
              </h4>
              <p className="text-sm text-gray-600">
                Focus on inner world, energized by reflection
              </p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-purple-700 mb-2">
                Sensing (S)
              </h4>
              <p className="text-sm text-gray-600">
                Focus on present, concrete information
              </p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-purple-700 mb-2">
                Intuition (N)
              </h4>
              <p className="text-sm text-gray-600">
                Focus on future possibilities and patterns
              </p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-purple-700 mb-2">
                Thinking (T)
              </h4>
              <p className="text-sm text-gray-600">
                Decisions based on logic and analysis
              </p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-purple-700 mb-2">
                Feeling (F)
              </h4>
              <p className="text-sm text-gray-600">
                Decisions based on values and people
              </p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-purple-700 mb-2">
                Judging (J)
              </h4>
              <p className="text-sm text-gray-600">
                Prefer structure and closure
              </p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-purple-700 mb-2">
                Perceiving (P)
              </h4>
              <p className="text-sm text-gray-600">
                Prefer flexibility and openness
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-purple-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 MBTI Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
