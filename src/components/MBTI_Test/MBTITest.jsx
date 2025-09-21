import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMBTI } from "../../context/MBTIContext";
import { useAuth } from "../../context/AuthContext";
import { mbtiService } from "../../services/mbtiService";
import { TestSkeleton } from "../common/skeletons";
import Meteors from "../common/Meteors";

const MBTITest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const {
    questions,
    currentQuestion,
    answers,
    isLoading,
    error,
    testInProgress,
    startTest,
    setAnswer,
    submitTest,
    submitTestGuest,
    resetTest,
    clearError,
    isTestComplete,
    getProgress,
  } = useMBTI();

  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [navigationMessage, setNavigationMessage] = useState("");
  const questionsPerPage = 5;

  // Generate session ID if not exists
  const getSessionId = () => {
    let sessionId = localStorage.getItem("mbti_session_id");
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      localStorage.setItem("mbti_session_id", sessionId);
    }
    return sessionId;
  };

  // Handle navigation messages
  useEffect(() => {
    if (location.state?.message) {
      setNavigationMessage(location.state.message);
      // Clear the message after showing it
      setTimeout(() => {
        setNavigationMessage("");
        // Clear the navigation state
        navigate(location.pathname, { replace: true });
      }, 5000);
    }
  }, [location.state, navigate, location.pathname]);

  useEffect(() => {
    const testCompleted = localStorage.getItem("mbti_test_completed");
    const sessionId = localStorage.getItem("mbti_session_id");

    if (isAuthenticated && testCompleted === "true" && sessionId) {
      
      navigate("/result", { replace: true });
      return;
    }

    if (!testInProgress && questions.length === 0) {
      handleStartTest();
    }
  }, [testInProgress, questions.length, isAuthenticated, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const storedAnswers = localStorage.getItem("mbti_test_answers");

    if (storedAnswers && questions.length > 0) {
      try {
        const parsedAnswers = JSON.parse(storedAnswers);
        Object.entries(parsedAnswers).forEach(([questionId, answer]) => {
          setAnswer(questionId, answer);
        });
      } catch (error) {
        console.error("Error restoring test answers:", error);
        localStorage.removeItem("mbti_test_answers");
        localStorage.removeItem("mbti_test_completed");
        localStorage.removeItem("mbti_session_id");
      }
    }
  }, [questions.length]);

  useEffect(() => {
    if (questions.length > 0 && questions[currentQuestion]) {
      const questionId = questions[currentQuestion]._id;
      setSelectedAnswer(answers[questionId] || "");
    }
  }, [currentQuestion, questions, answers]);

  const getCurrentPageQuestions = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = Math.min(startIndex + questionsPerPage, questions.length);
    return questions.slice(startIndex, endIndex);
  };

  const isCurrentPageComplete = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = Math.min(startIndex + questionsPerPage, questions.length);

    for (let i = startIndex; i < endIndex; i++) {
      if (!answers[questions[i]._id]) {
        return false;
      }
    }
    return true;
  };

  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const currentPageQuestions = getCurrentPageQuestions();
  const currentQuestionInPage =
    currentQuestion - currentPage * questionsPerPage;

  const handleStartTest = async () => {
    clearError();
    const result = await startTest();
    if (!result.success) {
      // Handle error
      console.error("Failed to start test:", result.message);
    }
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    const actualQuestionIndex = currentPage * questionsPerPage + questionIndex;
    if (questions.length > 0 && questions[actualQuestionIndex]) {
      const questionId = questions[actualQuestionIndex]._id;
      setAnswer(questionId, answer);
    }
  };

  const handleClearSelection = (questionIndex) => {
    const actualQuestionIndex = currentPage * questionsPerPage + questionIndex;
    if (questions.length > 0 && questions[actualQuestionIndex]) {
      const questionId = questions[actualQuestionIndex]._id;
      setAnswer(questionId, "");

      // Add smooth scroll animation to the question
      setTimeout(() => {
        const questionElement = document.querySelector(
          `[data-question-index="${questionIndex}"]`
        );
        if (questionElement) {
          questionElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
        }
      }, 100);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      // Smooth scroll to top with animation
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      // Smooth scroll to top with animation
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleSubmit = async () => {
    if (!isTestComplete()) {
      alert("Please answer all questions before submitting.");
      return;
    }

    // If user is not authenticated, submit as guest with session ID
    if (!isAuthenticated) {
      try {
        const sessionId = getSessionId();
        const response = await submitTestGuest(sessionId);

        if (response.success) {
          // Store test completion data in localStorage
          localStorage.setItem("mbti_test_answers", JSON.stringify(answers));
          localStorage.setItem("mbti_test_completed", "true");

          // Navigate to login with message
          navigate("/login", {
            state: {
              from: { pathname: "/test" },
              message:
                "Please log in to save your test results and view your personalized MBTI report.",
            },
          });
        } else {
          alert(response.message || "Failed to submit test");
        }
      } catch (error) {
        console.error("Error submitting test:", error);
        alert("Failed to submit test. Please try again.");
      }
      return;
    }

    // User is authenticated, submit directly
    try {
      const response = await submitTest();

      if (response && response.success) {

        localStorage.removeItem("mbti_test_answers");
        localStorage.removeItem("mbti_test_completed");
        localStorage.removeItem("mbti_session_id");

        if (response.result && response.result.id) {

          navigate(`/result/${response.result.id}`);
        } else {
          console.error("MBTITest: No result ID in response", response);

          navigate("/result");
        }
      } else {
        console.error("MBTITest: Submit failed with response:", response);
        alert(response?.message || "Failed to submit test");
      }
    } catch (error) {
      console.error("Error submitting test:", error);
      alert("Failed to submit test. Please try again.");
    }
  };

  const handleRestart = () => {
    resetTest();
    setCurrentPage(0);
    handleStartTest();
  };

  if (isLoading || showSkeleton) {
    return <TestSkeleton />;
  }

  // Remove error page - just clear error and continue
  if (error) {
    clearError();
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <Meteors number={5} />
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-12 max-w-md w-full text-center relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
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
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            No Questions Available
          </h2>
          <p className="text-neutral-100 mb-8 leading-relaxed">
            There are no test questions available at the moment. Please try
            again later.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full px-8 py-4 text-white rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/20 font-semibold"
            style={{ backgroundColor: "var(--color-custom-2)" }}
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const progress = getProgress();

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 overflow-hidden">
      {/* Meteor shower background */}
      <Meteors number={20} />

      {/* Static stars background with CSS */}
      <div className="absolute inset-0 stars-background opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-white">
                MBTI Personality Test
              </h1>
              <p className="text-neutral-100 text-lg">
                Discover your unique personality type
              </p>
            </div>
            <button
              onClick={handleRestart}
              className="px-8 py-3 text-white rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-white/20 font-semibold ml-auto"
              style={{ backgroundColor: "var(--color-custom-2)" }}
            >
              Restart Test
            </button>
          </div>

          {/* Navigation Message */}
          {navigationMessage && (
            <div className="mb-6 p-4 bg-blue-500/20 border border-blue-400/30 rounded-2xl backdrop-blur-sm">
              <p className="text-blue-100 text-center font-medium">
                {navigationMessage}
              </p>
            </div>
          )}

          {/* Progress Bar */}
          <div className="relative w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl h-3 mb-6 overflow-hidden">
            <div
              className="relative h-3 rounded-2xl transition-all duration-500 shadow-sm"
              style={{
                width: `${progress}%`,
                backgroundColor: "var(--color-custom-2)",
              }}
            ></div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-neutral-100 font-medium">
              Page {currentPage + 1} of {totalPages} • Questions{" "}
              {currentPage * questionsPerPage + 1}-
              {Math.min((currentPage + 1) * questionsPerPage, questions.length)}{" "}
              of {questions.length}
            </span>
            <span className="font-bold text-white">{progress}% Complete</span>
          </div>
        </div>

        {/* Questions Grid */}
        <div className="grid gap-6 mb-8">
          {currentPageQuestions.map((question, index) => {
            const actualQuestionIndex = currentPage * questionsPerPage + index;
            const questionId = question._id;
            const currentAnswer = answers[questionId] || "";

            return (
              <div
                key={questionId}
                data-question-index={index}
                className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 group animate-slideInFromTop"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg text-white font-bold text-lg"
                      style={{ backgroundColor: "var(--color-custom-2)" }}
                    >
                      <span>{actualQuestionIndex + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white leading-relaxed group-hover:text-neutral-100 transition-colors duration-200">
                        {question.question}
                      </h3>
                    </div>
                  </div>

                  {/* Clear Selection Button - Top Right */}
                  {currentAnswer && (
                    <button
                      onClick={() => handleClearSelection(index)}
                      className="px-6 py-2 text-sm text-white rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg flex-shrink-0 font-medium transform animate-fadeIn"
                      style={{ backgroundColor: "var(--color-custom-2)" }}
                    >
                      Clear Selection
                    </button>
                  )}
                </div>

                <div className="flex justify-center items-center space-x-6 ml-14">
                  {[
                    {
                      value: "1",
                      label: "Strongly Disagree",
                      size: "w-20 h-20",
                      customColor: "var(--color-custom-6)",
                    },
                    {
                      value: "2",
                      label: "Disagree",
                      size: "w-18 h-18",
                      customColor: "var(--color-custom-8)",
                    },
                    {
                      value: "3",
                      label: "Neutral",
                      size: "w-16 h-16",
                      color: "bg-gray-100 hover:bg-gray-200 border-gray-300",
                    },
                    {
                      value: "4",
                      label: "Agree",
                      size: "w-18 h-18",
                      customColor: "var(--color-custom-9)",
                    },
                    {
                      value: "5",
                      label: "Strongly Agree",
                      size: "w-20 h-20",
                      customColor: "var(--color-custom-4)",
                    },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className="flex flex-col items-center space-y-2"
                    >
                      <label
                        className="cursor-pointer group/option transition-all duration-200 hover:scale-110"
                        title={option.label}
                      >
                        <input
                          type="radio"
                          name={`question-${questionId}`}
                          value={option.value}
                          checked={currentAnswer === option.value}
                          onChange={() =>
                            handleAnswerSelect(index, option.value)
                          }
                          className="sr-only"
                        />
                        <div
                          className={`${option.size} ${
                            option.color || ""
                          } rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                            currentAnswer === option.value
                              ? "ring-2 shadow-lg transform scale-105"
                              : "border-gray-300 hover:shadow-md"
                          }`}
                          style={
                            currentAnswer === option.value
                              ? {
                                  backgroundColor:
                                    option.customColor || "#e5e7eb",
                                  borderColor: option.customColor || "#d1d5db",
                                  filter: "brightness(0.7) saturate(1.2)",
                                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                }
                              : option.customColor
                              ? {
                                  backgroundColor: option.customColor,
                                  borderColor: option.customColor,
                                  opacity: 0.8,
                                }
                              : {}
                          }
                        >
                          {currentAnswer === option.value && (
                            <svg
                              className="w-6 h-6 text-white drop-shadow-md"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      </label>
                      <span className="text-xs text-neutral-100 text-center font-medium max-w-20">
                        {option.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-8">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              className="flex items-center space-x-2 px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-2xl hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 font-semibold"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Previous</span>
            </button>

            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-4">
                {Array.from({ length: totalPages }, (_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i === currentPage ? "scale-125" : "bg-gray-300"
                    }`}
                    style={
                      i === currentPage
                        ? { backgroundColor: "var(--color-custom-2)" }
                        : {}
                    }
                  />
                ))}
              </div>
              <p className="text-sm text-neutral-100 font-medium">
                {Object.keys(answers).length} of {questions.length} questions
                answered
              </p>
              {!isCurrentPageComplete() && currentPage < totalPages - 1 && (
                <p className="text-sm text-yellow-300 font-medium">
                  Please answer all questions on this page to continue
                </p>
              )}
              {isTestComplete() && (
                <p className="text-sm text-green-300 font-bold animate-pulse">
                  ✓ All questions completed! Ready to submit.
                </p>
              )}
            </div>

            {currentPage === totalPages - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={!isTestComplete() || isLoading}
                className="flex items-center space-x-2 px-8 py-4 text-white rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 font-semibold"
                style={{ backgroundColor: "var(--color-custom-2)" }}
              >
                <span>{isLoading ? "Submitting..." : "Submit Test"}</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleNextPage}
                disabled={!isCurrentPageComplete()}
                className="flex items-center space-x-2 px-8 py-4 text-white rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 font-semibold"
                style={{ backgroundColor: "var(--color-custom-2)" }}
              >
                <span>Next</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MBTITest;
