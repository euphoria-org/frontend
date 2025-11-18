import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useIQ } from "../../context/IQContext";
import { useAuth } from "../../context/AuthContext";
import { iqService } from "../../services/iqService";
import Meteors from "../common/Meteors";

const IQResult = () => {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { claimTemporaryResult } = useIQ();
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pastResults, setPastResults] = useState([]);
  const [claimAttempted, setClaimAttempted] = useState(false);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (authLoading) {
          return;
        }

        const sessionId = localStorage.getItem("iq_session_id");
        const testCompleted = localStorage.getItem("iq_test_completed");

        // If authenticated and has session, try to claim temporary result
        if (
          isAuthenticated &&
          sessionId &&
          testCompleted === "true" &&
          !claimAttempted
        ) {
          setClaimAttempted(true);

          const claimResponse = await claimTemporaryResult(sessionId);

          if (claimResponse.success) {
            setResult(claimResponse.result);
            localStorage.removeItem("iq_test_answers");
            localStorage.removeItem("iq_test_completed");
            localStorage.removeItem("iq_session_id");
          } else {
            // If claiming fails, try to get latest user result
            if (
              claimResponse.message &&
              claimResponse.message.includes("No temporary test result found")
            ) {
              try {
                const userResults = await iqService.getUserResults();
                if (
                  userResults.success &&
                  userResults.data &&
                  userResults.data.length > 0
                ) {
                  const latestResult = userResults.data[0];
                  setResult(latestResult);
                  localStorage.removeItem("iq_test_answers");
                  localStorage.removeItem("iq_test_completed");
                  localStorage.removeItem("iq_session_id");
                } else {
                  setError(
                    "No test results found. Please take the test again."
                  );
                }
              } catch (fetchError) {
                console.error("Error fetching user results:", fetchError);
                setError(
                  "Failed to fetch your test results. Please try again."
                );
              }
            } else {
              localStorage.removeItem("iq_test_answers");
              localStorage.removeItem("iq_test_completed");
              localStorage.removeItem("iq_session_id");
              setError(
                `Failed to claim your test result: ${claimResponse.message}. Please take the test again.`
              );
            }
          }
        } else if (resultId) {
          // If resultId is provided, fetch specific result
          const response = await iqService.getResultDetails(resultId);
          if (response.success) {
            setResult(response.data);
          } else {
            console.error("Failed to fetch result:", response.message);

            if (
              response.message?.includes("Result not found") ||
              response.message?.includes("access denied")
            ) {
              setTimeout(() => {
                navigate("/iq-test", {
                  state: {
                    message:
                      "The test result you're looking for doesn't exist or you don't have access to it. Please take the test again.",
                  },
                });
              }, 3000);
            }
            setError(response.message || "Failed to load result");
          }
        } else {
          // No session and no resultId, redirect to test
          navigate("/iq-test");
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error in fetchResult:", error);
        setError("An unexpected error occurred. Please try again.");
        setIsLoading(false);
      }
    };

    fetchResult();
  }, [resultId, isAuthenticated, authLoading, navigate, claimTemporaryResult, claimAttempted]);

  useEffect(() => {
    if (isAuthenticated && result) {
      fetchPastResults();
    }
  }, [isAuthenticated, result]);

  useEffect(() => {
    if (isAuthenticated && result) {
      fetchPastResults();
    }
  }, [isAuthenticated, result]);

  const fetchPastResults = async () => {
    try {
      const results = await iqService.getUserResults();
      if (results.success) {
        setPastResults(results.data || []);
      }
    } catch (error) {
      console.error("Error fetching past results:", error);
    }
  };

  const handleRetakeTest = () => {
    localStorage.removeItem("iq_test_completed");
    localStorage.removeItem("iq_test_answers");
    localStorage.removeItem("iq_session_id");
    navigate("/iq-test");
  };

  const getIQColor = (score) => {
    if (score >= 130) return "text-purple-300";
    if (score >= 115) return "text-blue-300";
    if (score >= 85) return "text-green-300";
    return "text-yellow-300";
  };

  const getIQBgColor = (score) => {
    if (score >= 130) return "bg-purple-500/20 border-purple-400/30";
    if (score >= 115) return "bg-blue-500/20 border-blue-400/30";
    if (score >= 85) return "bg-green-500/20 border-green-400/30";
    return "bg-yellow-500/20 border-yellow-400/30";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <Meteors number={5} />
        <div className="absolute inset-0 stars-background opacity-60"></div>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-12 max-w-md w-full text-center relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-white relative mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Loading Results
          </h2>
          <p className="text-neutral-100">
            Please wait while we analyze your intelligence test...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <Meteors number={5} />
        <div className="absolute inset-0 stars-background opacity-60"></div>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-12 max-w-md w-full text-center relative z-10">
          <div className="w-16 h-16 bg-red-500/20 border-2 border-red-400/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-red-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Error</h2>
          <p className="text-neutral-100 mb-8">{error}</p>
          <button
            onClick={handleRetakeTest}
            className="w-full px-8 py-4 text-white rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/20 font-semibold"
            style={{ backgroundColor: "var(--color-custom-2)" }}
          >
            Take Test Again
          </button>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <Meteors number={5} />
        <div className="absolute inset-0 stars-background opacity-60"></div>
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-white relative z-10"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 overflow-hidden">
      {/* Meteor shower background */}
      <Meteors number={20} />

      {/* Static stars background with CSS */}
      <div className="absolute inset-0 stars-background opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Result Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-12 mb-8">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-white mb-4">
              Your IQ Test Results
            </h1>
            <p className="text-neutral-100 text-lg">
              Test completed on {new Date(result.completedAt || Date.now()).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          {/* IQ Score Display */}
          <div className="flex flex-col items-center mb-12">
            <div
              className={`w-64 h-64 rounded-full ${getIQBgColor(
                result.iqScore
              )} backdrop-blur-sm border-2 flex items-center justify-center mb-6 shadow-2xl`}
            >
              <div className="text-center">
                <div className={`text-7xl font-bold ${getIQColor(result.iqScore)}`}>
                  {result.iqScore}
                </div>
                <div className="text-sm text-neutral-100 mt-3 font-semibold">IQ Score</div>
              </div>
            </div>
            <h2 className="text-3xl font-semibold text-white mb-4">
              {result.iqLevel}
            </h2>
            <p className="text-neutral-100 text-center max-w-3xl text-lg leading-relaxed">
              {result.description}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl font-bold text-blue-300 mb-2">
                {result.totalCorrect}
              </div>
              <div className="text-sm text-neutral-100 font-medium">Correct Answers</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl font-bold text-purple-300 mb-2">
                {result.totalQuestions}
              </div>
              <div className="text-sm text-neutral-100 font-medium">Total Questions</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl font-bold text-green-300 mb-2">
                {((result.totalCorrect / result.totalQuestions) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-neutral-100 font-medium">Accuracy</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl font-bold text-indigo-300 mb-2">
                {result.percentile}th
              </div>
              <div className="text-sm text-neutral-100 font-medium">Percentile</div>
            </div>
          </div>

          {/* Category Breakdown */}
          {result.categoryScores && Object.keys(result.categoryScores).length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-white mb-6">
                Performance by Category
              </h3>
              <div className="space-y-5">
                {Object.entries(result.categoryScores).map(([category, score]) => (
                  <div key={category} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-base font-semibold text-white">
                        {category}
                      </span>
                      <span className="text-base font-bold text-blue-300">
                        {score}%
                      </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3 border border-white/30">
                      <div
                        className="h-3 rounded-full transition-all duration-500 shadow-sm"
                        style={{ 
                          width: `${score}%`,
                          backgroundColor: "var(--color-custom-2)"
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRetakeTest}
              className="px-8 py-4 text-white rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-white/20 font-semibold"
              style={{ backgroundColor: "var(--color-custom-2)" }}
            >
              Retake Test
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-2xl hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/20 font-semibold"
            >
              Go to Dashboard
            </button>
          </div>
        </div>

        {/* Past Results Section */}
        {isAuthenticated && pastResults.length > 1 && (
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-8">
            <h2 className="text-3xl font-semibold text-white mb-6">
              Your IQ Test History
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/10 border-b border-white/20">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-white/80">
                      Date
                    </th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-white/80">
                      IQ Score
                    </th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-white/80">
                      Level
                    </th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-white/80">
                      Correct
                    </th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-white/80">
                      Percentile
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {pastResults.map((pastResult, index) => (
                    <tr
                      key={pastResult._id}
                      className="hover:bg-white/5 transition-all duration-200"
                    >
                      <td className="py-4 px-6 text-sm text-neutral-100">
                        {new Date(pastResult.completedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span
                          className={`font-bold text-lg ${getIQColor(
                            pastResult.iqScore
                          )}`}
                        >
                          {pastResult.iqScore}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center text-sm text-neutral-100 font-medium">
                        {pastResult.iqLevel}
                      </td>
                      <td className="py-4 px-6 text-center text-sm text-neutral-100">
                        {pastResult.totalCorrect} / {pastResult.totalQuestions}
                      </td>
                      <td className="py-4 px-6 text-center text-sm text-neutral-100 font-medium">
                        {pastResult.percentile}th
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IQResult;
