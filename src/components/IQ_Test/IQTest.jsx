import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useIQ } from "../../context/IQContext";
import { useAuth } from "../../context/AuthContext";
import { IQTestSkeleton } from "../common/skeletons";
import Meteors from "../common/Meteors";

const IQTest = () => {
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
  } = useIQ();

  const [currentPage, setCurrentPage] = useState(0);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [navigationMessage, setNavigationMessage] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const questionsPerPage = 5;
  const TIME_LIMIT = 60 * 60; // 60 minutes in seconds

  // Generate session ID if not exists
  const getSessionId = () => {
    let sessionId = localStorage.getItem("iq_session_id");
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      localStorage.setItem("iq_session_id", sessionId);
    }
    return sessionId;
  };

  // Handle navigation messages
  useEffect(() => {
    if (location.state?.message) {
      setNavigationMessage(location.state.message);
      setTimeout(() => {
        setNavigationMessage("");
        navigate(location.pathname, { replace: true });
      }, 5000);
    }
  }, [location.state, navigate, location.pathname]);

  useEffect(() => {
    const testCompleted = localStorage.getItem("iq_test_completed");
    const sessionId = localStorage.getItem("iq_session_id");

    if (isAuthenticated && testCompleted === "true" && sessionId) {
      navigate("/iq-result", { replace: true });
      return;
    }

    if (!testInProgress && questions.length === 0) {
      handleStartTest();
    }
  }, [testInProgress, questions.length, isAuthenticated, navigate]);

  // Initialize timer when test starts
  useEffect(() => {
    if (testInProgress && questions.length > 0 && timeRemaining === null) {
      const savedTime = localStorage.getItem("iq_test_time_remaining");
      const savedStartTime = localStorage.getItem("iq_test_start_time");
      
      if (savedTime && savedStartTime) {
        const elapsed = Math.floor((Date.now() - parseInt(savedStartTime)) / 1000);
        const remaining = Math.max(0, parseInt(savedTime) - elapsed);
        setTimeRemaining(remaining);
      } else {
        setTimeRemaining(TIME_LIMIT);
        localStorage.setItem("iq_test_time_remaining", TIME_LIMIT.toString());
        localStorage.setItem("iq_test_start_time", Date.now().toString());
      }
    }
  }, [testInProgress, questions.length, timeRemaining, TIME_LIMIT]);

  // Timer countdown effect
  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0 || !testInProgress) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        
        const newTime = prev - 1;
        
        // Show warning at 5 minutes
        if (newTime === 300 && !showTimeWarning) {
          setShowTimeWarning(true);
          setTimeout(() => setShowTimeWarning(false), 5000);
        }
        
        // Show warning at 1 minute
        if (newTime === 60) {
          setShowTimeWarning(true);
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, testInProgress, showTimeWarning]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const storedAnswers = localStorage.getItem("iq_test_answers");

    if (storedAnswers && questions.length > 0) {
      try {
        const parsedAnswers = JSON.parse(storedAnswers);
        Object.entries(parsedAnswers).forEach(([questionId, answer]) => {
          setAnswer(questionId, answer);
        });
      } catch (error) {
        console.error("Error restoring test answers:", error);
        localStorage.removeItem("iq_test_answers");
        localStorage.removeItem("iq_test_completed");
        localStorage.removeItem("iq_session_id");
      }
    }
  }, [questions.length]);

  const getCurrentPageQuestions = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = Math.min(startIndex + questionsPerPage, questions.length);
    return questions.slice(startIndex, endIndex);
  };

  const isCurrentPageComplete = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = Math.min(startIndex + questionsPerPage, questions.length);

    for (let i = startIndex; i < endIndex; i++) {
      if (answers[questions[i]._id] === undefined) {
        return false;
      }
    }
    return true;
  };

  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const currentPageQuestions = getCurrentPageQuestions();

  const handleStartTest = async () => {
    clearError();
    const result = await startTest();
    if (!result.success) {
      console.error("Failed to start test:", result.message);
    }
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    const actualQuestionIndex = currentPage * questionsPerPage + questionIndex;
    if (questions.length > 0 && questions[actualQuestionIndex]) {
      const questionId = questions[actualQuestionIndex]._id;
      setAnswer(questionId, answerIndex);
      
      // Save to localStorage
      const updatedAnswers = { ...answers, [questionId]: answerIndex };
      localStorage.setItem("iq_test_answers", JSON.stringify(updatedAnswers));
    }
  };

  const handleClearSelection = (questionIndex) => {
    const actualQuestionIndex = currentPage * questionsPerPage + questionIndex;
    if (questions.length > 0 && questions[actualQuestionIndex]) {
      const questionId = questions[actualQuestionIndex]._id;
      const updatedAnswers = { ...answers };
      delete updatedAnswers[questionId];
      
      // Update localStorage
      localStorage.setItem("iq_test_answers", JSON.stringify(updatedAnswers));
      
      // Update context - pass undefined to clear the answer
      setAnswer(questionId, undefined);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    if (!isTestComplete()) {
      alert("Please answer all questions before submitting.");
      return;
    }

    if (!isAuthenticated) {
      try {
        const sessionId = getSessionId();
        const response = await submitTestGuest(sessionId);

        if (response.success) {
          localStorage.setItem("iq_test_answers", JSON.stringify(answers));
          localStorage.setItem("iq_test_completed", "true");

          navigate("/login", {
            state: {
              from: { pathname: "/iq-test" },
              message:
                "Please log in to save your test results and view your personalized IQ report.",
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

    try {
      const response = await submitTest();

      if (response && response.success) {
        localStorage.removeItem("iq_test_answers");
        localStorage.removeItem("iq_test_completed");
        localStorage.removeItem("iq_session_id");
        localStorage.removeItem("iq_test_time_remaining");
        localStorage.removeItem("iq_test_start_time");

        if (response.result && response.result.id) {
          navigate(`/iq-result/${response.result.id}`);
        } else {
          navigate("/iq-result");
        }
      } else {
        alert(response?.message || "Failed to submit test");
      }
    } catch (error) {
      console.error("Error submitting test:", error);
      alert("Failed to submit test. Please try again.");
    }
  };

  const formatTime = (seconds) => {
    if (seconds === null) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeUp = async () => {
    alert("Time's up! Your test will be submitted automatically.");
    await handleSubmit();
  };

  const handleRestart = () => {
    resetTest();
    setCurrentPage(0);
    setTimeRemaining(null);
    setShowTimeWarning(false);
    localStorage.removeItem("iq_test_answers");
    localStorage.removeItem("iq_test_completed");
    localStorage.removeItem("iq_session_id");
    localStorage.removeItem("iq_test_time_remaining");
    localStorage.removeItem("iq_test_start_time");
    handleStartTest();
  };

  if (isLoading || showSkeleton) {
    return <IQTestSkeleton />;
  }

  if (error) {
    clearError();
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <Meteors number={5} />
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-12 max-w-md w-full text-center relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
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
      <Meteors number={20} />
      <div className="absolute inset-0 stars-background opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2 text-white">
                IQ Intelligence Test
              </h1>
              <p className="text-neutral-100 text-lg">
                Measure your cognitive abilities across 5 categories
              </p>
            </div>
            
            {/* Timer Display */}
            {timeRemaining !== null && (
              <div className="flex items-center space-x-4 mx-6">
                <div className={`px-6 py-3 rounded-2xl border-2 transition-all duration-300 ${
                  timeRemaining <= 60 
                    ? 'bg-red-500/20 border-red-400/40 animate-pulse' 
                    : timeRemaining <= 300 
                    ? 'bg-yellow-500/20 border-yellow-400/40' 
                    : 'bg-blue-500/20 border-blue-400/40'
                }`}>
                  <div className="flex items-center space-x-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className={`text-2xl font-bold ${
                        timeRemaining <= 60 ? 'text-red-300' : timeRemaining <= 300 ? 'text-yellow-300' : 'text-blue-300'
                      }`}>
                        {formatTime(timeRemaining)}
                      </div>
                      <div className="text-xs text-neutral-200">Time Remaining</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleRestart}
              className="px-8 py-3 text-white rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-white/20 font-semibold"
              style={{ backgroundColor: "var(--color-custom-2)" }}
            >
              Restart Test
            </button>
          </div>

          {navigationMessage && (
            <div className="mb-6 p-4 bg-blue-500/20 border border-blue-400/30 rounded-2xl backdrop-blur-sm">
              <p className="text-blue-100 text-center font-medium">
                {navigationMessage}
              </p>
            </div>
          )}

          {/* Time Warning */}
          {showTimeWarning && timeRemaining <= 300 && (
            <div className={`mb-6 p-4 rounded-2xl backdrop-blur-sm animate-pulse ${
              timeRemaining <= 60 
                ? 'bg-red-500/30 border border-red-400/50' 
                : 'bg-yellow-500/30 border border-yellow-400/50'
            }`}>
              <p className={`text-center font-bold flex items-center justify-center space-x-2 ${
                timeRemaining <= 60 ? 'text-red-100' : 'text-yellow-100'
              }`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-1.956-1.333-2.726 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>
                  {timeRemaining <= 60 
                    ? `Only ${timeRemaining} seconds remaining! Test will auto-submit.` 
                    : `${Math.floor(timeRemaining / 60)} minutes remaining!`
                  }
                </span>
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
            const currentAnswer = answers[questionId];

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
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-semibold text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-400/30">
                          {question.category}
                        </span>
                        <span
                          className={`text-sm font-semibold px-3 py-1 rounded-full border ${
                            question.difficulty === "Easy"
                              ? "text-green-300 bg-green-500/20 border-green-400/30"
                              : question.difficulty === "Medium"
                              ? "text-yellow-300 bg-yellow-500/20 border-yellow-400/30"
                              : "text-red-300 bg-red-500/20 border-red-400/30"
                          }`}
                        >
                          {question.difficulty}
                        </span>
                        <span className="text-sm font-semibold text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
                          {question.points} {question.points === 1 ? "point" : "points"}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-white leading-relaxed group-hover:text-neutral-100 transition-colors duration-200">
                        {question.question}
                      </h3>
                    </div>
                  </div>

                  {/* Clear Selection Button */}
                  {currentAnswer !== undefined && (
                    <button
                      onClick={() => handleClearSelection(index)}
                      className="px-6 py-2 text-sm text-white rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg flex-shrink-0 font-medium transform animate-fadeIn"
                      style={{ backgroundColor: "var(--color-custom-2)" }}
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-14">
                  {question.options.map((option, optionIndex) => {
                    const isSelected = currentAnswer === optionIndex;
                    return (
                      <button
                        key={optionIndex}
                        onClick={() => handleAnswerSelect(index, optionIndex)}
                        className={`p-4 rounded-2xl text-left transition-all duration-300 border-2 ${
                          isSelected
                            ? "bg-white/20 border-white/40 shadow-lg scale-105"
                            : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-102"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                              isSelected
                                ? "border-white bg-white"
                                : "border-white/40"
                            }`}
                          >
                            {isSelected && (
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: "var(--color-custom-2)" }}
                              ></div>
                            )}
                          </div>
                          <span
                            className={`text-base font-medium ${
                              isSelected ? "text-white" : "text-neutral-100"
                            }`}
                          >
                            {option}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-6">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                currentPage === 0
                  ? "bg-white/5 text-neutral-400 cursor-not-allowed border border-white/10"
                  : "bg-white/20 text-white hover:bg-white/30 hover:scale-105 border border-white/30"
              } focus:outline-none focus:ring-4 focus:ring-white/20`}
            >
              Previous
            </button>

            <div className="text-center">
              <div className="text-sm text-neutral-100 mb-1">
                Page {currentPage + 1} of {totalPages}
              </div>
              <div className="text-xs text-neutral-300">
                {Object.keys(answers).length} of {questions.length} answered
              </div>
            </div>

            {currentPage < totalPages - 1 ? (
              <button
                onClick={handleNextPage}
                disabled={!isCurrentPageComplete()}
                className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/20 ${
                  !isCurrentPageComplete()
                    ? "bg-white/5 text-neutral-400 cursor-not-allowed border border-white/10"
                    : "text-white hover:scale-105 shadow-lg"
                }`}
                style={
                  isCurrentPageComplete()
                    ? { backgroundColor: "var(--color-custom-2)" }
                    : {}
                }
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isTestComplete()}
                className={`px-10 py-4 rounded-2xl font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/20 ${
                  !isTestComplete()
                    ? "bg-white/5 text-neutral-400 cursor-not-allowed border border-white/10"
                    : "text-white hover:scale-105 shadow-lg"
                }`}
                style={
                  isTestComplete()
                    ? { backgroundColor: "var(--color-custom-2)" }
                    : {}
                }
              >
                Submit Test
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IQTest;
