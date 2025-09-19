import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMBTI } from "../../context/MBTIContext";
import { useAuth } from "../../context/AuthContext";
import { mbtiService } from "../../services/mbtiService";
import Loading from "../common/Loading";

const MBTITest = () => {
  const navigate = useNavigate();
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
    nextQuestion,
    previousQuestion,
    submitTest,
    resetTest,
    clearError,
    isTestComplete,
    getProgress,
  } = useMBTI();

  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 5;

  // Initialize test (now available for both authenticated users and guests)
  useEffect(() => {
    if (!testInProgress && questions.length === 0) {
      handleStartTest();
    }
  }, [testInProgress, questions.length]);

  // Set selected answer when question changes
  useEffect(() => {
    if (questions.length > 0 && questions[currentQuestion]) {
      const questionId = questions[currentQuestion]._id;
      setSelectedAnswer(answers[questionId] || "");
    }
  }, [currentQuestion, questions, answers]);

  // Calculate current page based on questions
  const getCurrentPageQuestions = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = Math.min(startIndex + questionsPerPage, questions.length);
    return questions.slice(startIndex, endIndex);
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
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmit = async () => {
    if (!isTestComplete()) {
      alert("Please answer all questions before submitting.");
      return;
    }

    try {
      // Convert answers object to array format expected by backend
      const answersArray = Object.entries(answers).map(
        ([questionId, answer]) => ({
          questionId,
          answer,
        })
      );

      let response;
      if (isAuthenticated) {
        // Use authenticated submission
        response = await submitTest();
      } else {
        // Use guest submission
        response = await mbtiService.submitTestGuest(answersArray);
      }

      if (response.success) {
        // Redirect to result page with result ID for fetching
        navigate(`/result/${response.result.id}`);
      } else {
        alert(response.message || "Failed to submit test");
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br">
        <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl">
          <Loading
            message="Loading your personality test..."
            size="large"
            variant="custom"
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br">
        <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-12 max-w-md w-full text-center shadow-2xl">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-700 mb-8 leading-relaxed">{error}</p>
          <button
            onClick={handleStartTest}
            className="w-full px-8 py-4 bg-gradient-to-r text-white rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            style={{ backgroundColor: "var(--color-custom-2)" }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br">
        <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-12 max-w-md w-full text-center shadow-2xl">
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
          <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
            No Questions Available
          </h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            There are no test questions available at the moment. Please try
            again later.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full px-8 py-4 text-white rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
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
    <div className="min-h-screen bg-gradient-to-br py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white border border-white/20 rounded-3xl p-8 mb-8 shadow-2xl shadow-blue-500/10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1
                className="text-4xl font-bold mb-2"
                style={{ color: "var(--color-custom-2)" }}
              >
                MBTI Personality Test
              </h1>
              <p className="text-gray-600 text-lg">
                Discover your unique personality type
              </p>
            </div>
            <button
              onClick={handleRestart}
              className="px-8 py-3 text-white rounded-full hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold ml-auto"
              style={{ backgroundColor: "var(--color-custom-2)" }}
            >
              Restart Test
            </button>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full bg-gray-200/30 rounded-full h-3 mb-6 overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200/20 to-gray-300/20 rounded-full"></div>
            <div
              className="relative h-3 rounded-full transition-all duration-500 shadow-sm"
              style={{
                width: `${progress}%`,
                backgroundColor: "var(--color-custom-2)",
              }}
            ></div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 font-medium">
              Page {currentPage + 1} of {totalPages} • Questions{" "}
              {currentPage * questionsPerPage + 1}-
              {Math.min((currentPage + 1) * questionsPerPage, questions.length)}{" "}
              of {questions.length}
            </span>
            <span
              className="font-bold"
              style={{ color: "var(--color-custom-2)" }}
            >
              {progress}% Complete
            </span>
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
                className="backdrop-blur-xl bg-white border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group"
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
                      <h3 className="text-xl font-semibold text-gray-800 leading-relaxed group-hover:text-gray-900 transition-colors duration-200">
                        {question.question}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Clear Selection Button - Top Right */}
                  {currentAnswer && (
                    <button
                      onClick={() => handleClearSelection(index)}
                      className="px-3 py-1 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors border border-red-200 hover:border-red-300 flex-shrink-0"
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
                      customColor: "var(--color-custom-6)"
                    },
                    { 
                      value: "2", 
                      label: "Disagree", 
                      size: "w-18 h-18",
                      customColor: "var(--color-custom-8)"
                    },
                    { 
                      value: "3", 
                      label: "Neutral", 
                      size: "w-16 h-16",
                      color: "bg-gray-100 hover:bg-gray-200 border-gray-300"
                    },
                    { 
                      value: "4", 
                      label: "Agree", 
                      size: "w-18 h-18",
                      customColor: "var(--color-custom-9)"
                    },
                    { 
                      value: "5", 
                      label: "Strongly Agree", 
                      size: "w-20 h-20",
                      customColor: "var(--color-custom-4)"
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
                          className={`${option.size} ${option.color || ''} rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                            currentAnswer === option.value
                              ? "ring-4 ring-purple-300 border-purple-500 shadow-lg"
                              : "border-gray-300 hover:shadow-md"
                          }`}
                          style={
                            currentAnswer === option.value
                              ? { backgroundColor: "var(--color-custom-2)", borderColor: "var(--color-custom-2)" }
                              : option.customColor
                              ? { backgroundColor: option.customColor, borderColor: option.customColor, opacity: 0.8 }
                              : {}
                          }
                        >
                          {currentAnswer === option.value && (
                            <svg
                              className="w-6 h-6 text-white"
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
                      <span className="text-xs text-gray-600 text-center font-medium max-w-20">
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
        <div className="bg-white border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              className="flex items-center space-x-2 px-8 py-4 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-500 font-semibold"
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
              <p className="text-sm text-gray-600 font-medium">
                {Object.keys(answers).length} of {questions.length} questions
                answered
              </p>
              {isTestComplete() && (
                <p className="text-sm text-green-600 font-bold animate-pulse">
                  ✓ All questions completed! Ready to submit.
                </p>
              )}
            </div>

            {currentPage === totalPages - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={!isTestComplete() || isLoading}
                className="flex items-center space-x-2 px-8 py-4 text-white rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
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
                className="flex items-center space-x-2 px-8 py-4 text-white rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
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
