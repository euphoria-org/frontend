import React, { createContext, useContext, useReducer } from "react";
import { permaService } from "../services/permaService";

// Initial state
const initialState = {
  questions: [],
  currentQuestion: 0,
  answers: {},
  result: null,
  userResults: [],
  isLoading: false,
  error: null,
  testInProgress: false,
};

// Action types
const PERMAActionTypes = {
  SET_LOADING: "SET_LOADING",
  SET_QUESTIONS: "SET_QUESTIONS",
  SET_ANSWER: "SET_ANSWER",
  SET_CURRENT_QUESTION: "SET_CURRENT_QUESTION",
  SET_RESULT: "SET_RESULT",
  SET_USER_RESULTS: "SET_USER_RESULTS",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
  START_TEST: "START_TEST",
  RESET_TEST: "RESET_TEST",
};

// PERMA reducer
const permaReducer = (state, action) => {
  switch (action.type) {
    case PERMAActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case PERMAActionTypes.SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        isLoading: false,
        error: null,
      };
    case PERMAActionTypes.SET_ANSWER:
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.answer,
        },
      };
    case PERMAActionTypes.SET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: action.payload,
      };
    case PERMAActionTypes.SET_RESULT:
      return {
        ...state,
        result: action.payload,
        testInProgress: false,
        isLoading: false,
        error: null,
      };
    case PERMAActionTypes.SET_USER_RESULTS:
      return {
        ...state,
        userResults: action.payload,
        isLoading: false,
        error: null,
      };
    case PERMAActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case PERMAActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case PERMAActionTypes.START_TEST:
      return {
        ...state,
        testInProgress: true,
        currentQuestion: 0,
        answers: {},
        result: null,
      };
    case PERMAActionTypes.RESET_TEST:
      return {
        ...state,
        currentQuestion: 0,
        answers: {},
        result: null,
        testInProgress: false,
        error: null,
      };
    default:
      return state;
  }
};

// Create context
const PERMAContext = createContext();

// PERMA provider component
export const PERMAProvider = ({ children }) => {
  const [state, dispatch] = useReducer(permaReducer, initialState);

  // Fetch questions
  const fetchQuestions = async () => {
    try {
      dispatch({ type: PERMAActionTypes.SET_LOADING, payload: true });
      dispatch({ type: PERMAActionTypes.CLEAR_ERROR });

      const response = await permaService.getQuestions();

      if (response.success) {
        dispatch({
          type: PERMAActionTypes.SET_QUESTIONS,
          payload: response.data,
        });
        return { success: true };
      } else {
        dispatch({
          type: PERMAActionTypes.SET_ERROR,
          payload: response.message,
        });
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = error.message || "Failed to fetch questions";
      dispatch({
        type: PERMAActionTypes.SET_ERROR,
        payload: errorMessage,
      });
      return { success: false, message: errorMessage };
    }
  };

  // Start test
  const startTest = async () => {
    dispatch({ type: PERMAActionTypes.START_TEST });
    return await fetchQuestions();
  };

  // Set answer for a question
  const setAnswer = (questionId, answer) => {
    dispatch({
      type: PERMAActionTypes.SET_ANSWER,
      payload: { questionId, answer },
    });
  };

  // Navigate to next question
  const nextQuestion = () => {
    if (state.currentQuestion < state.questions.length - 1) {
      dispatch({
        type: PERMAActionTypes.SET_CURRENT_QUESTION,
        payload: state.currentQuestion + 1,
      });
    }
  };

  // Navigate to previous question
  const previousQuestion = () => {
    if (state.currentQuestion > 0) {
      dispatch({
        type: PERMAActionTypes.SET_CURRENT_QUESTION,
        payload: state.currentQuestion - 1,
      });
    }
  };

  const submitTest = async () => {
    try {
      dispatch({ type: PERMAActionTypes.SET_LOADING, payload: true });
      dispatch({ type: PERMAActionTypes.CLEAR_ERROR });

      const answersArray = Object.entries(state.answers).map(
        ([questionId, answer]) => ({
          questionId,
          answer,
        })
      );

      const response = await permaService.submitTest(answersArray);

      if (response && response.success) {
        dispatch({
          type: PERMAActionTypes.SET_RESULT,
          payload: response.result,
        });
        return { success: true, result: response.result };
      } else {
        const errorMessage = response?.message || "Unknown error occurred";
        console.error("PERMAContext: Submit failed:", errorMessage);
        dispatch({
          type: PERMAActionTypes.SET_ERROR,
          payload: errorMessage,
        });
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      console.error("PERMAContext: Submit error:", error);
      const errorMessage = error.message || "Failed to submit test";
      dispatch({
        type: PERMAActionTypes.SET_ERROR,
        payload: errorMessage,
      });
      return { success: false, message: errorMessage };
    }
  };

  const submitTestGuest = async (sessionId) => {
    try {
      dispatch({ type: PERMAActionTypes.SET_LOADING, payload: true });
      dispatch({ type: PERMAActionTypes.CLEAR_ERROR });

      const answersArray = Object.entries(state.answers).map(
        ([questionId, answer]) => ({
          questionId,
          answer,
        })
      );

      const response = await permaService.submitTestGuest(
        answersArray,
        sessionId
      );

      if (response.success) {
        dispatch({
          type: PERMAActionTypes.SET_RESULT,
          payload: response.result,
        });
        return { success: true, result: response.result };
      } else {
        dispatch({
          type: PERMAActionTypes.SET_ERROR,
          payload: response.message,
        });
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = error.message || "Failed to submit test";
      dispatch({
        type: PERMAActionTypes.SET_ERROR,
        payload: errorMessage,
      });
      return { success: false, message: errorMessage };
    }
  };

  const claimTemporaryResult = async (sessionId) => {
    try {
      dispatch({ type: PERMAActionTypes.SET_LOADING, payload: true });
      dispatch({ type: PERMAActionTypes.CLEAR_ERROR });

      const response = await permaService.claimResult(sessionId);

      if (response.success) {
        dispatch({
          type: PERMAActionTypes.SET_RESULT,
          payload: response.result,
        });
        return { success: true, result: response.result };
      } else {
        dispatch({
          type: PERMAActionTypes.SET_ERROR,
          payload: response.message,
        });
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = error.message || "Failed to claim result";
      dispatch({
        type: PERMAActionTypes.SET_ERROR,
        payload: errorMessage,
      });
      return { success: false, message: errorMessage };
    }
  };

  const fetchUserResults = async () => {
    try {
      dispatch({ type: PERMAActionTypes.SET_LOADING, payload: true });
      dispatch({ type: PERMAActionTypes.CLEAR_ERROR });

      const response = await permaService.getUserResults();

      if (response.success) {
        dispatch({
          type: PERMAActionTypes.SET_USER_RESULTS,
          payload: response.data,
        });
        return { success: true };
      } else {
        dispatch({
          type: PERMAActionTypes.SET_ERROR,
          payload: response.message,
        });
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = error.message || "Failed to fetch user results";
      dispatch({
        type: PERMAActionTypes.SET_ERROR,
        payload: errorMessage,
      });
      return { success: false, message: errorMessage };
    }
  };

  // Reset test
  const resetTest = () => {
    dispatch({ type: PERMAActionTypes.RESET_TEST });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: PERMAActionTypes.CLEAR_ERROR });
  };

  // Check if test is complete
  const isTestComplete = () => {
    return Object.keys(state.answers).length === state.questions.length;
  };

  // Get progress percentage
  const getProgress = () => {
    if (state.questions.length === 0) return 0;
    return Math.round(
      (Object.keys(state.answers).length / state.questions.length) * 100
    );
  };

  const value = {
    ...state,
    fetchQuestions,
    startTest,
    setAnswer,
    nextQuestion,
    previousQuestion,
    submitTest,
    submitTestGuest,
    claimTemporaryResult,
    fetchUserResults,
    resetTest,
    clearError,
    isTestComplete,
    getProgress,
  };

  return (
    <PERMAContext.Provider value={value}>{children}</PERMAContext.Provider>
  );
};

// Custom hook to use PERMA context
export const usePERMA = () => {
  const context = useContext(PERMAContext);
  if (!context) {
    throw new Error("usePERMA must be used within a PERMAProvider");
  }
  return context;
};
