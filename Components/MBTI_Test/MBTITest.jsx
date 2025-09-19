import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMBTI } from "../../context/MBTIContext";
import { useAuth } from "../../context/AuthContext";
import { LoadingIcon } from "../../icons";

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

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: "/test" } } });
      return;
    }
  }, [isAuthenticated, navigate]);

  // Initialize test
  useEffect(() => {
    if (isAuthenticated && !testInProgress && questions.length === 0) {
      handleStartTest();
    }
  }, [isAuthenticated, testInProgress, questions.length]);

  // Set selected answer when question changes
  useEffect(() => {
    if (questions.length > 0 && questions[currentQuestion]) {
      const questionId = questions[currentQuestion]._id;
      setSelectedAnswer(answers[questionId] || "");
    }
  }, [currentQuestion, questions, answers]);

  const handleStartTest = async () => {
    clearError();
    const result = await startTest();
    if (!result.success) {
      // Handle error
      console.error("Failed to start test:", result.message);
    }
  };

  const handleAnswerSelect = (answer) => {
    if (questions.length > 0 && questions[currentQuestion]) {
      const questionId = questions[currentQuestion]._id;
      setSelectedAnswer(answer);
      setAnswer(questionId, answer);
    }
  };

  const handleClearSelection = () => {
    if (questions.length > 0 && questions[currentQuestion]) {
      const questionId = questions[currentQuestion]._id;
      setSelectedAnswer("");
      setAnswer(questionId, "");
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      nextQuestion();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      previousQuestion();
    }
  };

  const handleSubmit = async () => {
    if (!isTestComplete()) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const result = await submitTest();
    if (result.success) {
      navigate("/result", { state: { result: result.result } });
    }
  };

  const handleRestart = () => {
    resetTest();
    handleStartTest();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="text-center">
          <LoadingIcon className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          <p className="text-purple-700 text-lg">
            Loading your personality test...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={handleStartTest}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-purple-900 mb-4">
            No Questions Available
          </h2>
          <p className="text-gray-700 mb-6">
            There are no test questions available at the moment. Please try
            again later.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];
  const progress = getProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-purple-900">
              MBTI Personality Test
            </h1>
            <button
              onClick={handleRestart}
              className="px-4 py-2 text-purple-600 hover:text-purple-700 transition-colors"
            >
              Restart Test
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span>{progress}% Complete</span>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {currentQuestionData?.question}
            </h2>

            {/* Clear Selection Button */}
            {selectedAnswer && (
              <div className="mb-4 text-center">
                <button
                  onClick={handleClearSelection}
                  className="px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-red-200 hover:border-red-300"
                >
                  Clear Selection
                </button>
              </div>
            )}

            {/* Answer Options with Improved Circular Design */}
            <div className="flex justify-center items-center space-x-8">
              {[
                { value: "1", label: "Strongly Disagree", size: "w-16 h-16", color: "bg-red-100 hover:bg-red-200 border-red-300" },
                { value: "2", label: "Disagree", size: "w-14 h-14", color: "bg-orange-100 hover:bg-orange-200 border-orange-300" },
                { value: "3", label: "Neutral", size: "w-12 h-12", color: "bg-gray-100 hover:bg-gray-200 border-gray-300" },
                { value: "4", label: "Agree", size: "w-14 h-14", color: "bg-green-100 hover:bg-green-200 border-green-300" },
                { value: "5", label: "Strongly Agree", size: "w-16 h-16", color: "bg-green-200 hover:bg-green-300 border-green-400" },
              ].map((option) => (
                <div
                  key={option.value}
                  className="flex flex-col items-center space-y-3"
                >
                  <label
                    className="cursor-pointer group transition-all duration-200 hover:scale-110"
                    title={option.label}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option.value}
                      checked={selectedAnswer === option.value}
                      onChange={(e) => handleAnswerSelect(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`${option.size} ${option.color} rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                        selectedAnswer === option.value
                          ? "ring-4 ring-purple-300 border-purple-500 shadow-lg"
                          : "border-gray-300 hover:shadow-md"
                      }`}
                      style={
                        selectedAnswer === option.value
                          ? { backgroundColor: "var(--color-custom-2)", borderColor: "var(--color-custom-2)" }
                          : {}
                      }
                    >
                      {selectedAnswer === option.value && (
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
                  <span className="text-xs text-gray-600 text-center max-w-20 leading-tight">
                    {option.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-md p-6 flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              {Object.keys(answers).length} of {questions.length} questions
              answered
            </p>
            {isTestComplete() && (
              <p className="text-sm text-green-600 font-medium">
                All questions completed! Ready to submit.
              </p>
            )}
          </div>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer || isLoading}
              className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              style={{ backgroundColor: "var(--color-custom-2)" }}
            >
              {isLoading ? "Submitting..." : "Submit Test"}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              style={{ backgroundColor: "var(--color-custom-2)" }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MBTITest;
