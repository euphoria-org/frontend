import React, { createContext, useContext, useReducer } from "react";
import { iqService } from "../services/iqService";

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
  timeTaken: 0,
  startTime: null,
};

// Action types
const IQActionTypes = {
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
  SET_TIME_TAKEN: "SET_TIME_TAKEN",
  SET_START_TIME: "SET_START_TIME",
};

// IQ reducer
const iqReducer = (state, action) => {
  switch (action.type) {
    case IQActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case IQActionTypes.SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        isLoading: false,
        error: null,
      };
    case IQActionTypes.SET_ANSWER:
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.answer,
        },
      };
    case IQActionTypes.SET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: action.payload,
      };
    case IQActionTypes.SET_RESULT:
      return {
        ...state,
        result: action.payload,
        testInProgress: false,
        isLoading: false,
        error: null,
      };
    case IQActionTypes.SET_USER_RESULTS:
      return {
        ...state,
        userResults: action.payload,
        isLoading: false,
        error: null,
      };
    case IQActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case IQActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case IQActionTypes.START_TEST:
      return {
        ...state,
        testInProgress: true,
        currentQuestion: 0,
        answers: {},
        result: null,
        startTime: Date.now(),
        timeTaken: 0,
      };
    case IQActionTypes.RESET_TEST:
      return {
        ...state,
        currentQuestion: 0,
        answers: {},
        result: null,
        testInProgress: false,
        error: null,
        timeTaken: 0,
        startTime: null,
      };
    case IQActionTypes.SET_TIME_TAKEN:
      return {
        ...state,
        timeTaken: action.payload,
      };
    case IQActionTypes.SET_START_TIME:
      return {
        ...state,
        startTime: action.payload,
      };
    default:
      return state;
  }
};

// Create context
const IQContext = createContext();

// IQ provider component
export const IQProvider = ({ children }) => {
  const [state, dispatch] = useReducer(iqReducer, initialState);

  // Fetch questions
  const fetchQuestions = async () => {
    try {
      dispatch({ type: IQActionTypes.SET_LOADING, payload: true });
      dispatch({ type: IQActionTypes.CLEAR_ERROR });

      const response = await iqService.getQuestions();

      if (response.success) {
        dispatch({
          type: IQActionTypes.SET_QUESTIONS,
          payload: response.data,
        });
        return { success: true };
      } else {
        dispatch({
          type: IQActionTypes.SET_ERROR,
          payload: response.message,
        });
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = error.message || "Failed to fetch questions";
      dispatch({
        type: IQActionTypes.SET_ERROR,
        payload: errorMessage,
      });
      return { success: false, message: errorMessage };
    }
  };

  // Start test
  const startTest = async () => {
    dispatch({ type: IQActionTypes.START_TEST });
    return await fetchQuestions();
  };

  // Set answer for a question
  const setAnswer = (questionId, answer) => {
    dispatch({
      type: IQActionTypes.SET_ANSWER,
      payload: { questionId, answer },
    });
  };

  // Navigate to next question
  const nextQuestion = () => {
    if (state.currentQuestion < state.questions.length - 1) {
      dispatch({
        type: IQActionTypes.SET_CURRENT_QUESTION,
        payload: state.currentQuestion + 1,
      });
    }
  };

  // Navigate to previous question
  const previousQuestion = () => {
    if (state.currentQuestion > 0) {
      dispatch({
        type: IQActionTypes.SET_CURRENT_QUESTION,
        payload: state.currentQuestion - 1,
      });
    }
  };

  // Calculate time taken
  const calculateTimeTaken = () => {
    if (state.startTime) {
      return Math.floor((Date.now() - state.startTime) / 1000); // in seconds
    }
    return 0;
  };

  // Submit test (authenticated user)
  const submitTest = async () => {
    try {
      dispatch({ type: IQActionTypes.SET_LOADING, payload: true });
      dispatch({ type: IQActionTypes.CLEAR_ERROR });

      const timeTaken = calculateTimeTaken();

      const answersArray = Object.entries(state.answers).map(
        ([questionId, selectedAnswer]) => ({
          questionId,
          selectedAnswer,
        })
      );

      const response = await iqService.submitTest(answersArray, timeTaken);

      if (response && response.success) {
        dispatch({
          type: IQActionTypes.SET_RESULT,
          payload: response.result,
        });
        dispatch({
          type: IQActionTypes.SET_TIME_TAKEN,
          payload: timeTaken,
        });
        return { success: true, result: response.result };
      } else {
        const errorMessage = response?.message || "Unknown error occurred";
        console.error("IQContext: Submit failed:", errorMessage);
        dispatch({
          type: IQActionTypes.SET_ERROR,
          payload: errorMessage,
        });
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      console.error("IQContext: Submit error:", error);
      const errorMessage = error.message || "Failed to submit test";
      dispatch({
        type: IQActionTypes.SET_ERROR,
        payload: errorMessage,
      });
      return { success: false, message: errorMessage };
    }
  };

  // Submit test as guest
  const submitTestGuest = async (sessionId) => {
    try {
      dispatch({ type: IQActionTypes.SET_LOADING, payload: true });
      dispatch({ type: IQActionTypes.CLEAR_ERROR });

      const timeTaken = calculateTimeTaken();

      const answersArray = Object.entries(state.answers).map(
        ([questionId, selectedAnswer]) => ({
          questionId,
          selectedAnswer,
        })
      );

      const response = await iqService.submitTestGuest(
        answersArray,
        sessionId,
        timeTaken
      );

      if (response.success) {
        dispatch({
          type: IQActionTypes.SET_RESULT,
          payload: response.result,
        });
        dispatch({
          type: IQActionTypes.SET_TIME_TAKEN,
          payload: timeTaken,
        });
        return { success: true, result: response.result };
      } else {
        dispatch({
          type: IQActionTypes.SET_ERROR,
          payload: response.message,
        });
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = error.message || "Failed to submit test";
      dispatch({
        type: IQActionTypes.SET_ERROR,
        payload: errorMessage,
      });
      return { success: false, message: errorMessage };
    }
  };

  // Claim temporary result
  const claimTemporaryResult = async (sessionId) => {
    try {
      dispatch({ type: IQActionTypes.SET_LOADING, payload: true });
      dispatch({ type: IQActionTypes.CLEAR_ERROR });

      const response = await iqService.claimResult(sessionId);

      if (response.success) {
        dispatch({
          type: IQActionTypes.SET_RESULT,
          payload: response.result,
        });
        return { success: true, result: response.result };
      } else {
        dispatch({
          type: IQActionTypes.SET_ERROR,
          payload: response.message,
        });
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = error.message || "Failed to claim result";
      dispatch({
        type: IQActionTypes.SET_ERROR,
        payload: errorMessage,
      });
      return { success: false, message: errorMessage };
    }
  };

  // Fetch user results
  const getUserResults = async () => {
    try {
      dispatch({ type: IQActionTypes.SET_LOADING, payload: true });
      dispatch({ type: IQActionTypes.CLEAR_ERROR });

      const response = await iqService.getUserResults();

      if (response.success) {
        dispatch({
          type: IQActionTypes.SET_USER_RESULTS,
          payload: response.data,
        });
        return { success: true, data: response.data };
      } else {
        dispatch({
          type: IQActionTypes.SET_ERROR,
          payload: response.message,
        });
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = error.message || "Failed to fetch user results";
      dispatch({
        type: IQActionTypes.SET_ERROR,
        payload: errorMessage,
      });
      return { success: false, message: errorMessage };
    }
  };

  // Reset test
  const resetTest = () => {
    dispatch({ type: IQActionTypes.RESET_TEST });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: IQActionTypes.CLEAR_ERROR });
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
    getUserResults,
    resetTest,
    clearError,
    isTestComplete,
    getProgress,
    calculateTimeTaken,
  };

  return <IQContext.Provider value={value}>{children}</IQContext.Provider>;
};

// Custom hook to use IQ context
export const useIQ = () => {
  const context = useContext(IQContext);
  if (!context) {
    throw new Error("useIQ must be used within an IQProvider");
  }
  return context;
};
