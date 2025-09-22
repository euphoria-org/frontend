import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useMBTI } from "../../context/MBTIContext";
import { useAuth } from "../../context/AuthContext";
import { mbtiService } from "../../services/mbtiService";
import Meteors from "../common/Meteors";
import Architect from "../Avatars/Architect";
import Logician from "../Avatars/Logician";
import Commander from "../Avatars/Commander";
import Debater from "../Avatars/Debater";
import Advocate from "../Avatars/Advocate";
import Mediator from "../Avatars/Mediator";
import Protagonist from "../Avatars/Protagonist";
import Campaigner from "../Avatars/Campaigner";
import Logistician from "../Avatars/Logistician";
import Defender from "../Avatars/Defender";
import Executive from "../Avatars/Executive";
import Consul from "../Avatars/Consul";
import Virtuoso from "../Avatars/Virtuoso";
import Adventurer from "../Avatars/Adventurer";
import Entrepreneur from "../Avatars/Entrepreneur";
import Entertainer from "../Avatars/Entertainer";

const getAvatarComponent = (personalityType) => {
  const avatarMap = {
    INTJ: Architect,
    INTP: Logician,
    ENTJ: Commander,
    ENTP: Debater,
    INFJ: Advocate,
    INFP: Mediator,
    ENFJ: Protagonist,
    ENFP: Campaigner,
    ISTJ: Logistician,
    ISFJ: Defender,
    ESTJ: Executive,
    ESFJ: Consul,
    ISTP: Virtuoso,
    ISFP: Adventurer,
    ESTP: Entrepreneur,
    ESFP: Entertainer,
  };

  return avatarMap[personalityType] || null;
};

const TestResult = () => {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { claimTemporaryResult } = useMBTI();
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

        const sessionId = localStorage.getItem("mbti_session_id");
        const testCompleted = localStorage.getItem("mbti_test_completed");

        if (
          isAuthenticated &&
          sessionId &&
          testCompleted === "true" &&
          !claimAttempted
        ) {
          setClaimAttempted(true);

          const claimResponse = await claimTemporaryResult(sessionId);

          if (claimResponse.success) {
            const normalizedResult = {
              ...claimResponse.result,
              personalityType:
                claimResponse.result.mbtiType ||
                claimResponse.result.personalityType,
              id: claimResponse.result.id || claimResponse.result._id,
            };
            setResult(normalizedResult);
            localStorage.removeItem("mbti_test_answers");
            localStorage.removeItem("mbti_test_completed");
            localStorage.removeItem("mbti_session_id");
          } else {
            if (
              claimResponse.message &&
              claimResponse.message.includes("No temporary test result found")
            ) {
              try {
                const userResults = await mbtiService.getUserResults();
                if (
                  userResults.success &&
                  userResults.data &&
                  userResults.data.length > 0
                ) {
                  // Get the most recent result
                  const latestResult = userResults.data[0];
                  const normalizedResult = {
                    ...latestResult,
                    personalityType:
                      latestResult.mbtiType || latestResult.personalityType,
                    id: latestResult.id || latestResult._id,
                  };
                  setResult(normalizedResult);
                  localStorage.removeItem("mbti_test_answers");
                  localStorage.removeItem("mbti_test_completed");
                  localStorage.removeItem("mbti_session_id");
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
              // Clear the localStorage if claim fails for other reasons
              localStorage.removeItem("mbti_test_answers");
              localStorage.removeItem("mbti_test_completed");
              localStorage.removeItem("mbti_session_id");
              setError(
                `Failed to claim your test result: ${claimResponse.message}. Please take the test again.`
              );
            }
          }
        } else if (resultId) {
          const response = await mbtiService.getResult(resultId);
          if (response.success) {
            const normalizedResult = {
              ...response.data,
              personalityType:
                response.data.mbtiType || response.data.personalityType,
              id: response.data.id || response.data._id,
            };
            setResult(normalizedResult);
          } else {
            console.error(
              "TestResult: Failed to fetch result:",
              response.message
            );

            if (
              response.message?.includes("Result not found") ||
              response.message?.includes("access denied")
            ) {
              setTimeout(() => {
                navigate("/test", {
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
              navigate("/test", {
                state: {
                  message:
                    "No test result found. Please take the MBTI test to see your results.",
                },
              });
            }, 2000);
            setError("No test result found. Redirecting to test page...");
          } else {
            setError("Please log in to view your test results.");
          }
        }
      } catch (err) {
        console.error("TestResult: Error in fetchResult:", err);
        setError(err.message || "An error occurred while fetching the result");
        if (isAuthenticated) {
          localStorage.removeItem("mbti_test_answers");
          localStorage.removeItem("mbti_test_completed");
          localStorage.removeItem("mbti_session_id");
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
    // Clear any stored data
    localStorage.removeItem("mbti_test_answers");
    localStorage.removeItem("mbti_test_completed");
    localStorage.removeItem("mbti_session_id");
    // Reset component state
    setResult(null);
    setError(null);
    setClaimAttempted(false);
    navigate("/test");
  };

  const handleViewExistingResult = () => {
    // Clear localStorage and redirect to check user results
    localStorage.removeItem("mbti_test_answers");
    localStorage.removeItem("mbti_test_completed");
    localStorage.removeItem("mbti_session_id");
    // Force reload the component to fetch user results
    setClaimAttempted(false);
    setError(null);
    setResult(null);
    window.location.reload();
  };

  const getPersonalityDescription = (type) => {
    const descriptions = {
      INTJ: {
        title: "The Architect",
        description:
          "Imaginative and strategic thinkers, with a plan for everything.",
        traits: [
          "Strategic",
          "Independent",
          "Decisive",
          "Hard-working",
          "Jack-of-all-trades",
        ],
      },
      INTP: {
        title: "The Thinker",
        description:
          "Innovative inventors with an unquenchable thirst for knowledge.",
        traits: [
          "Logical",
          "Original",
          "Creative",
          "Theoretical",
          "Insightful",
        ],
      },
      ENTJ: {
        title: "The Commander",
        description:
          "Bold, imaginative and strong-willed leaders, always finding a way.",
        traits: [
          "Efficient",
          "Energetic",
          "Self-confident",
          "Strong-willed",
          "Strategic",
        ],
      },
      ENTP: {
        title: "The Debater",
        description:
          "Smart and curious thinkers who cannot resist an intellectual challenge.",
        traits: [
          "Knowledgeable",
          "Quick",
          "Original",
          "Excellent brainstormer",
          "Charismatic",
        ],
      },
      INFJ: {
        title: "The Advocate",
        description:
          "Quiet and mystical, yet very inspiring and tireless idealists.",
        traits: [
          "Creative",
          "Insightful",
          "Inspiring",
          "Decisive",
          "Determined",
        ],
      },
      INFP: {
        title: "The Mediator",
        description:
          "Poetic, kind and altruistic people, always eager to help a good cause.",
        traits: ["Idealistic", "Loyal", "Adaptable", "Curious", "Caring"],
      },
      ENFJ: {
        title: "The Protagonist",
        description:
          "Charismatic and inspiring leaders, able to mesmerize their listeners.",
        traits: [
          "Tolerant",
          "Reliable",
          "Charismatic",
          "Altruistic",
          "Natural leader",
        ],
      },
      ENFP: {
        title: "The Campaigner",
        description:
          "Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.",
        traits: [
          "Enthusiastic",
          "Creative",
          "Sociable",
          "Energetic",
          "Independent",
        ],
      },
      ISTJ: {
        title: "The Logistician",
        description:
          "Practical and fact-minded, reliability cannot be doubted.",
        traits: ["Honest", "Direct", "Strong-willed", "Dutiful", "Responsible"],
      },
      ISFJ: {
        title: "The Protector",
        description:
          "Very dedicated and warm protectors, always ready to defend their loved ones.",
        traits: [
          "Supportive",
          "Reliable",
          "Patient",
          "Imaginative",
          "Observant",
        ],
      },
      ESTJ: {
        title: "The Executive",
        description:
          "Excellent administrators, unsurpassed at managing things or people.",
        traits: ["Dedicated", "Strong-willed", "Direct", "Honest", "Loyal"],
      },
      ESFJ: {
        title: "The Consul",
        description:
          "Extraordinarily caring, social and popular people, always eager to help.",
        traits: [
          "Strong practical skills",
          "Loyal",
          "Sensitive",
          "Warm-hearted",
          "Good at connecting",
        ],
      },
      ISTP: {
        title: "The Virtuoso",
        description:
          "Bold and practical experimenters, masters of all kinds of tools.",
        traits: [
          "Optimistic",
          "Energetic",
          "Creative",
          "Practical",
          "Spontaneous",
        ],
      },
      ISFP: {
        title: "The Adventurer",
        description:
          "Flexible and charming artists, always ready to explore new possibilities.",
        traits: [
          "Charming",
          "Sensitive",
          "Imaginative",
          "Passionate",
          "Curious",
        ],
      },
      ESTP: {
        title: "The Entrepreneur",
        description:
          "Smart, energetic and very perceptive people, who truly enjoy living on the edge.",
        traits: ["Bold", "Rational", "Practical", "Original", "Perceptive"],
      },
      ESFP: {
        title: "The Entertainer",
        description:
          "Spontaneous, energetic and enthusiastic people – life is never boring around them.",
        traits: [
          "Bold",
          "Original",
          "Practical",
          "Observant",
          "Excellent people skills",
        ],
      },
    };

    return (
      descriptions[type] || {
        title: "Unknown Type",
        description: "Personality type information not available.",
        traits: [],
      }
    );
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
            Please wait while we analyze your personality...
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
            {isAuthenticated && (
              <button
                onClick={handleViewExistingResult}
                className="w-full px-8 py-4 bg-green-600 text-white rounded-2xl hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300/20 font-semibold"
              >
                View My Existing Results
              </button>
            )}
            <button
              onClick={handleRetakeTest}
              className="w-full px-8 py-4 text-white rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/20 font-semibold"
              style={{ backgroundColor: "var(--color-custom-2)" }}
            >
              Take Test Again
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                setResult(null);
                setError(null);
                setClaimAttempted(false);
                navigate("/", { replace: true });
              }}
              className="w-full px-8 py-4 bg-yellow-600 text-white rounded-2xl hover:bg-yellow-700 hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-300/20 font-semibold"
            >
              Clear All Data & Go Home
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

  const personalityInfo = getPersonalityDescription(result.personalityType);
  const AvatarComponent = getAvatarComponent(result.personalityType);

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 overflow-hidden">
      <Meteors number={20} />
      <div className="absolute inset-0 stars-background opacity-60"></div>

      <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-8 mb-8 w-full">
          <div className="flex flex-col md:flex-row items-center gap-8 min-h-[200px]">
            <div className="flex-shrink-0 h-[200px] w-[200px]">
              {AvatarComponent ? (
                <AvatarComponent />
              ) : (
                <div className="w-full h-full rounded-full flex items-center justify-center bg-custom-2 text-white text-4xl font-bold">
                  {result.personalityType}
                </div>
              )}
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="mb-4">
                <span className="text-5xl font-bold text-white">
                  {result.personalityType} - {personalityInfo.title}
                </span>
              </div>
              <p className="text-lg text-neutral-100 leading-relaxed">
                {personalityInfo.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-8 w-full">
            <h3 className="text-2xl font-bold text-white mb-6">Key Traits</h3>
            <div className="space-y-3">
              {personalityInfo.traits.map((trait, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: "var(--color-custom-2)" }}
                  ></div>
                  <span className="text-white font-medium">{trait}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dimensions */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-8 w-full">
            <h3 className="text-2xl font-bold text-white mb-6">
              Personality Dimensions
            </h3>
            <div className="space-y-4">
              {[
                {
                  dimension: "Energy Direction",
                  result:
                    result.personalityType[0] === "E"
                      ? "Extraversion"
                      : "Introversion",
                  description:
                    result.personalityType[0] === "E"
                      ? "Gains energy from external world"
                      : "Gains energy from internal world",
                },
                {
                  dimension: "Information Processing",
                  result:
                    result.personalityType[1] === "S" ? "Sensing" : "Intuition",
                  description:
                    result.personalityType[1] === "S"
                      ? "Focuses on facts and details"
                      : "Focuses on patterns and possibilities",
                },
                {
                  dimension: "Decision Making",
                  result:
                    result.personalityType[2] === "T" ? "Thinking" : "Feeling",
                  description:
                    result.personalityType[2] === "T"
                      ? "Makes decisions based on logic"
                      : "Makes decisions based on values",
                },
                {
                  dimension: "Lifestyle",
                  result:
                    result.personalityType[3] === "J"
                      ? "Judging"
                      : "Perceiving",
                  description:
                    result.personalityType[3] === "J"
                      ? "Prefers structure and closure"
                      : "Prefers flexibility and openness",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="border border-white/20 rounded-2xl p-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-semibold">
                      {item.dimension}
                    </span>
                    <span className="text-white font-bold text-lg">
                      {result.personalityType[index]}
                    </span>
                  </div>
                  <div className="text-sm text-neutral-100 mb-2">
                    {item.result}
                  </div>
                  <div className="text-xs text-neutral-200">
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Test Information */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-8 mb-8 w-full">
          <h3 className="text-2xl font-bold text-white mb-6">
            Test Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {result.personalityType}
              </div>
              <div className="text-sm text-neutral-100">Personality Type</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {new Date(result.completedAt).toLocaleDateString()}
              </div>
              <div className="text-sm text-neutral-100">Date Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {result.responses?.length || "N/A"}
              </div>
              <div className="text-sm text-neutral-100">Questions Answered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {Math.round(
                  ((result.responses?.length || 0) /
                    (result.responses?.length || 1)) *
                    100
                )}
                %
              </div>
              <div className="text-sm text-neutral-100">Completion Rate</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-8 w-full">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRetakeTest}
              className="px-8 py-4 bg-white/20 text-white rounded-2xl hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/20 font-semibold"
            >
              Retake Test
            </button>
            <Link
              to="/"
              className="px-8 py-4 text-white rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/20 font-semibold text-center"
              style={{ backgroundColor: "var(--color-custom-2)" }}
            >
              Go to Home
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-white/20 text-white rounded-2xl hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/20 font-semibold text-center"
              >
                View Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResult;
