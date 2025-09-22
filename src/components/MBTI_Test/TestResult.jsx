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
        {/* Hero Result Card */}
        <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl p-8 mb-8 w-full overflow-hidden group hover:bg-white/15 transition-all duration-500">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative flex flex-col md:flex-row items-center gap-8 min-h-[200px]">
            <div className="flex-shrink-0 h-[200px] w-[200px] relative group/avatar">
              <div className="absolute inset-0 rounded-full opacity-20 animate-pulse" style={{ boxShadow: "0 0 40px var(--color-custom-2)" }}></div>
              <div className="relative transform transition-transform duration-300 group-hover/avatar:scale-105">
                {AvatarComponent ? (
                  <AvatarComponent />
                ) : (
                  <div className="w-full h-full rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-white/20" style={{ backgroundColor: "var(--color-custom-2)" }}>
                    {result.personalityType}
                  </div>
                )}
              </div>
              {/* Floating badge */}
              <div className="absolute -top-2 -right-2 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg animate-bounce" style={{ backgroundColor: "var(--color-custom-2)" }}>
                {result.personalityType}
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="mb-6">
                <div className="mb-3">
                  <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 tracking-tight">
                    {result.personalityType}
                  </span>
                </div>
                <div className="h-1 w-32 mx-auto md:mx-0 rounded-full mb-4" style={{ backgroundColor: "var(--color-custom-2)" }}></div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-wide">
                  {personalityInfo.title}
                </h1>
              </div>
              <p className="text-xl text-neutral-100 leading-relaxed font-light max-w-3xl">
                {personalityInfo.description}
              </p>
              
              {/* Success indicator */}
              <div className="flex items-center justify-center md:justify-start mt-6 space-x-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-green-400 font-medium">Assessment Complete</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl p-8 w-full hover:bg-white/15 transition-all duration-500 group">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: "var(--color-custom-2)" }}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              Key Strengths
            </h3>
            <div className="space-y-4">
              {personalityInfo.traits.map((trait, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 rounded-2xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-300 cursor-pointer transform hover:scale-105 group/trait">
                  <div className="flex-shrink-0">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center group-hover/trait:animate-pulse"
                      style={{ backgroundColor: "var(--color-custom-2)" }}
                    >
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-white font-semibold text-lg flex-1 group-hover/trait:text-gray-100 transition-colors duration-300">{trait}</span>
                  <div className="opacity-0 group-hover/trait:opacity-100 transition-opacity duration-300">
                    <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Personality Dimensions */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl p-8 w-full hover:bg-white/15 transition-all duration-500">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: "var(--color-custom-2)" }}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              Your Personality Profile
            </h3>
            <div className="space-y-6">
              {[
                {
                  dimension: "Energy Direction",
                  result:
                    result.personalityType[0] === "E"
                      ? "Extraversion"
                      : "Introversion",
                  description:
                    result.personalityType[0] === "E"
                      ? "Gains energy from external world and social interaction"
                      : "Gains energy from internal reflection and solitude",
                  letter: result.personalityType[0],
                  color: result.personalityType[0] === "E" ? "#f59e0b" : "#6366f1"
                },
                {
                  dimension: "Information Processing",
                  result:
                    result.personalityType[1] === "S" ? "Sensing" : "Intuition",
                  description:
                    result.personalityType[1] === "S"
                      ? "Focuses on concrete facts, details, and present realities"
                      : "Focuses on patterns, possibilities, and future potential",
                  letter: result.personalityType[1],
                  color: result.personalityType[1] === "S" ? "#10b981" : "#8b5cf6"
                },
                {
                  dimension: "Decision Making",
                  result:
                    result.personalityType[2] === "T" ? "Thinking" : "Feeling",
                  description:
                    result.personalityType[2] === "T"
                      ? "Makes decisions based on logical analysis and objective criteria"
                      : "Makes decisions based on personal values and human impact",
                  letter: result.personalityType[2],
                  color: result.personalityType[2] === "T" ? "#06b6d4" : "#ec4899"
                },
                {
                  dimension: "Lifestyle Approach",
                  result:
                    result.personalityType[3] === "J"
                      ? "Judging"
                      : "Perceiving",
                  description:
                    result.personalityType[3] === "J"
                      ? "Prefers structure, planning, and decisive closure"
                      : "Prefers flexibility, spontaneity, and keeping options open",
                  letter: result.personalityType[3],
                  color: result.personalityType[3] === "J" ? "#dc2626" : "#059669"
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative border border-white/20 rounded-2xl p-6 hover:border-white/40 hover:bg-white/5 transition-all duration-300 transform hover:scale-105 group/dimension"
                >
                  <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl" style={{ backgroundColor: item.color }}></div>
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-white font-bold text-xl mb-1">
                        {item.dimension}
                      </h4>
                      <div className="text-lg font-semibold mb-2" style={{ color: item.color }}>
                        {item.result}
                      </div>
                    </div>
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl group-hover/dimension:animate-pulse shadow-lg"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.letter}
                    </div>
                  </div>
                  
                  <p className="text-neutral-200 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Test Summary */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-8 mb-8 w-full">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3" style={{ color: "var(--color-custom-2)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Test Summary
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--color-custom-2)" }}>
                <span className="text-white font-bold text-lg">{result.personalityType}</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {result.personalityType}
              </div>
              <div className="text-sm text-neutral-100">Your Personality Type</div>
            </div>
            <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--color-custom-2)" }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {new Date(result.completedAt).toLocaleDateString()}
              </div>
              <div className="text-sm text-neutral-100">Date Completed</div>
            </div>
            <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--color-custom-2)" }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {result.responses?.length || "N/A"}
              </div>
              <div className="text-sm text-neutral-100">Questions Answered</div>
            </div>
          </div>
        </div>

        {/* Enhanced Actions */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl p-8 w-full hover:bg-white/15 transition-all duration-500">
          <div className="text-center mb-6">
            <h4 className="text-2xl font-bold text-white mb-2">What's Next?</h4>
            <p className="text-neutral-200">Continue your personality discovery journey</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={handleRetakeTest}
              className="group relative px-8 py-4 bg-white/20 text-white rounded-2xl hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/20 font-semibold overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="relative flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Retake Assessment</span>
              </div>
            </button>
            
            <Link
              to="/"
              className="group relative px-8 py-4 text-white rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/20 font-semibold text-center overflow-hidden"
              style={{ backgroundColor: "var(--color-custom-2)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="relative flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Explore More</span>
              </div>
            </Link>
            
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="group relative px-8 py-4 bg-white/20 text-white rounded-2xl hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/20 font-semibold text-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="relative flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>My Dashboard</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResult;
