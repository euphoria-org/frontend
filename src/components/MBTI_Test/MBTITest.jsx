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
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {currentQuestionData?.question}
            </h2>

            <div className="space-y-3">
              {/* Strongly Disagree */}
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-purple-50 transition-colors">
                <input
                  type="radio"
                  name="answer"
                  value="-2"
                  checked={selectedAnswer === "-2"}
                  onChange={(e) => handleAnswerSelect(e.target.value)}
                  className="mr-3 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">Strongly Disagree</span>
              </label>

              {/* Disagree */}
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-purple-50 transition-colors">
                <input
                  type="radio"
                  name="answer"
                  value="-1"
                  checked={selectedAnswer === "-1"}
                  onChange={(e) => handleAnswerSelect(e.target.value)}
                  className="mr-3 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">Disagree</span>
              </label>

              {/* Neutral */}
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-purple-50 transition-colors">
                <input
                  type="radio"
                  name="answer"
                  value="0"
                  checked={selectedAnswer === "0"}
                  onChange={(e) => handleAnswerSelect(e.target.value)}
                  className="mr-3 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">Neutral</span>
              </label>

              {/* Agree */}
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-purple-50 transition-colors">
                <input
                  type="radio"
                  name="answer"
                  value="1"
                  checked={selectedAnswer === "1"}
                  onChange={(e) => handleAnswerSelect(e.target.value)}
                  className="mr-3 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">Agree</span>
              </label>

              {/* Strongly Agree */}
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-purple-50 transition-colors">
                <input
                  type="radio"
                  name="answer"
                  value="2"
                  checked={selectedAnswer === "2"}
                  onChange={(e) => handleAnswerSelect(e.target.value)}
                  className="mr-3 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">Strongly Agree</span>
              </label>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
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
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Submitting..." : "Submit Test"}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
