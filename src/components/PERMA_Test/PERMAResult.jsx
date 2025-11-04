import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { usePERMA } from "../../context/PERMAContext";
import { useAuth } from "../../context/AuthContext";
import { permaService } from "../../services/permaService";
import Meteors from "../common/Meteors";

const PERMAResult = () => {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { claimTemporaryResult } = usePERMA();
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [claimAttempted, setClaimAttempted] = useState(false);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (authLoading) {
          return;
        }

        const sessionId = localStorage.getItem("perma_session_id");
        const testCompleted = localStorage.getItem("perma_test_completed");

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
            localStorage.removeItem("perma_test_answers");
            localStorage.removeItem("perma_test_completed");
            localStorage.removeItem("perma_session_id");
          } else {
            if (
              claimResponse.message &&
              claimResponse.message.includes("No temporary test result found")
            ) {
              try {
                const userResults = await permaService.getUserResults();
                if (
                  userResults.success &&
                  userResults.data &&
                  userResults.data.length > 0
                ) {
                  const latestResult = userResults.data[0];
                  setResult(latestResult);
                  localStorage.removeItem("perma_test_answers");
                  localStorage.removeItem("perma_test_completed");
                  localStorage.removeItem("perma_session_id");
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
              localStorage.removeItem("perma_test_answers");
              localStorage.removeItem("perma_test_completed");
              localStorage.removeItem("perma_session_id");
              setError(
                `Failed to claim your test result: ${claimResponse.message}. Please take the test again.`
              );
            }
          }
        } else if (resultId) {
          const response = await permaService.getResult(resultId);
          if (response.success) {
            setResult(response.data);
          } else {
            console.error("Failed to fetch result:", response.message);

            if (
              response.message?.includes("Result not found") ||
              response.message?.includes("access denied")
            ) {
              setTimeout(() => {
                navigate("/perma-test", {
                  state: {
                    message:
                      "The test result you're looking for doesn't exist or you don't have access to it. Please take the test again.",
                  },
                });
              }, 2000);
            }

            setError(response.message || "Failed to fetch test result");
          }
        } else {
          if (isAuthenticated) {
            setTimeout(() => {
              navigate("/perma-test", {
                state: {
                  message:
                    "No test result found. Please take the PERMA test to see your results.",
                },
              });
            }, 2000);
            setError("No test result found. Redirecting to test page...");
          } else {
            setError("Please log in to view your test results.");
          }
        }
      } catch (err) {
        console.error("Error in fetchResult:", err);
        setError(err.message || "An error occurred while fetching the result");
        if (isAuthenticated) {
          localStorage.removeItem("perma_test_answers");
          localStorage.removeItem("perma_test_completed");
          localStorage.removeItem("perma_session_id");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading) {
      fetchResult();
    }
  }, [
    resultId,
    isAuthenticated,
    claimTemporaryResult,
    claimAttempted,
    authLoading,
  ]);

  const handleRetakeTest = () => {
    localStorage.removeItem("perma_test_answers");
    localStorage.removeItem("perma_test_completed");
    localStorage.removeItem("perma_session_id");
    setResult(null);
    setError(null);
    setClaimAttempted(false);
    navigate("/perma-test");
  };

  const getDimensionInfo = (dimension) => {
    const info = {
      P: {
        name: "Positive Emotion",
        description: "The ability to experience positive emotions and satisfaction in life",
        color: "#f59e0b",
      },
      E: {
        name: "Engagement",
        description: "Being fully absorbed and interested in activities",
        color: "#10b981",
      },
      R: {
        name: "Relationships",
        description: "Having meaningful connections with others",
        color: "#3b82f6",
      },
      M: {
        name: "Meaning",
        description: "Having a sense of purpose and direction in life",
        color: "#8b5cf6",
      },
      A: {
        name: "Accomplishment",
        description: "Achieving goals and experiencing success",
        color: "#ec4899",
      },
    };
    return info[dimension] || {};
  };

  const getWellbeingColor = (level) => {
    const colors = {
      "Very High": "#10b981",
      "High": "#3b82f6",
      "Moderate": "#f59e0b",
      "Low": "#ef4444",
    };
    return colors[level] || "#6b7280";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <Meteors number={25} />
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-12 w-[90%] max-w-md text-center relative z-10">
          <div className="animate-spin w-16 h-16 border-4 border-white/30 border-t-white rounded-full mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Loading Results
          </h2>
          <p className="text-neutral-100">
            Please wait while we analyze your wellbeing...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <Meteors number={25} />
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-12 w-[90%] max-w-md text-center relative z-10">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-white"
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
          <div className="space-y-4">
            <button
              onClick={handleRetakeTest}
              className="w-full px-8 py-4 text-white rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/20 font-semibold"
              style={{ backgroundColor: "var(--color-custom-2)" }}
            >
              Take Test Again
            </button>
            <Link
              to="/"
              className="block w-full px-8 py-4 bg-white/20 text-white rounded-2xl hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/20 font-semibold text-center"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <Meteors number={25} />
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-12 w-[90%] max-w-md text-center relative z-10">
          <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            No Result Found
          </h2>
          <p className="text-neutral-100 mb-8">
            We couldn't find your test result. Please take the test again.
          </p>
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

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 overflow-hidden">
      <Meteors number={20} />
      <div className="absolute inset-0 stars-background opacity-60"></div>

      <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Result Card */}
        <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl p-8 mb-8 w-full overflow-hidden group hover:bg-white/15 transition-all duration-500">
          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <div
              className="flex-shrink-0 h-[200px] w-[200px] rounded-full flex items-center justify-center text-white font-bold text-6xl shadow-2xl"
              style={{ backgroundColor: getWellbeingColor(result.wellbeingLevel) }}
            >
              {result.averageScore?.toFixed(1)}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="mb-6">
                <h1 className="text-5xl font-bold text-white mb-2 tracking-wide">
                  {result.wellbeingLevel} Wellbeing
                </h1>
                <div className="h-1 w-32 mx-auto md:mx-0 rounded-full mb-4" style={{ backgroundColor: "var(--color-custom-2)" }}></div>
              </div>
              <p className="text-xl text-neutral-100 leading-relaxed font-light max-w-3xl">
                {result.description || "Your PERMA wellbeing assessment is complete."}
              </p>
              
              <div className="flex items-center justify-center md:justify-start mt-6 space-x-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-green-400 font-medium">Assessment Complete</span>
              </div>
            </div>
          </div>
        </div>

        {/* PERMA Dimensions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl p-8 w-full hover:bg-white/15 transition-all duration-500">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: "var(--color-custom-2)" }}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              PERMA Dimensions
            </h3>
            <div className="space-y-6">
              {Object.entries(result.scores).map(([dimension, score]) => {
                const info = getDimensionInfo(dimension);
                return (
                  <div key={dimension} className="relative border border-white/20 rounded-2xl p-6 hover:border-white/40 hover:bg-white/5 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-white font-bold text-xl">{info.name}</h4>
                        <p className="text-neutral-200 text-sm">{info.description}</p>
                      </div>
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
                        style={{ backgroundColor: info.color }}
                      >
                        {score.toFixed(1)}
                      </div>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(score / 10) * 100}%`, backgroundColor: info.color }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary Stats */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl p-8 w-full hover:bg-white/15 transition-all duration-500">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: "var(--color-custom-2)" }}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              Test Summary
            </h3>
            <div className="space-y-6">
              <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-5xl font-bold text-white mb-2">
                  {result.averageScore?.toFixed(1)}
                </div>
                <div className="text-sm text-neutral-100">Average Wellbeing Score</div>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-3xl font-bold text-white mb-2">
                  {result.wellbeingLevel}
                </div>
                <div className="text-sm text-neutral-100">Wellbeing Level</div>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-2xl font-bold text-white mb-2">
                  {new Date(result.completedAt).toLocaleDateString()}
                </div>
                <div className="text-sm text-neutral-100">Date Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl p-8 w-full">
          <div className="text-center mb-6">
            <h4 className="text-2xl font-bold text-white mb-2">What's Next?</h4>
            <p className="text-neutral-200">Continue your wellbeing journey</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={handleRetakeTest}
              className="px-8 py-4 bg-white/20 text-white rounded-2xl hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/20 font-semibold"
            >
              Retake Assessment
            </button>
            
            <Link
              to="/"
              className="px-8 py-4 text-white rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/20 font-semibold text-center"
              style={{ backgroundColor: "var(--color-custom-2)" }}
            >
              Explore More
            </Link>
            
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-white/20 text-white rounded-2xl hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/20 font-semibold text-center"
              >
                My Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PERMAResult;
