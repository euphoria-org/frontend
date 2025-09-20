import apiConnector from "../config/apiConnector";
import { API_ENDPOINTS } from "../config/apiEndpoints";

export const mbtiService = {
  getQuestions: async () => {
    try {
      const response = await apiConnector(
        "GET",
        API_ENDPOINTS.MBTI.GET_QUESTIONS
      );
      return response;
    } catch (error) {
      return {
        success: false,
        message: error.message || "Failed to fetch questions",
      };
    }
  },

  submitTest: async (answers) => {
    try {
      const response = await apiConnector(
        "POST",
        API_ENDPOINTS.MBTI.SUBMIT_TEST,
        { responses: answers }
      );
      return response;
    } catch (error) {
      return {
        success: false,
        message: error.message || "Failed to submit test",
      };
    }
  },

  submitTestGuest: async (answers, sessionId) => {
    try {
      const response = await apiConnector(
        "POST",
        API_ENDPOINTS.MBTI.SUBMIT_TEST_GUEST,
        { responses: answers, sessionId }
      );
      return response;
    } catch (error) {
      return {
        success: false,
        message: error.message || "Failed to submit test",
      };
    }
  },

  claimResult: async (sessionId) => {
    try {
      const response = await apiConnector(
        "POST",
        API_ENDPOINTS.MBTI.CLAIM_RESULT,
        { sessionId }
      );
      return response;
    } catch (error) {
      return {
        success: false,
        message: error.message || "Failed to claim result",
      };
    }
  },

  getResult: async (resultId) => {
    try {
      const response = await apiConnector(
        "GET",
        `${API_ENDPOINTS.MBTI.GET_RESULT}/${resultId}`
      );
      return response;
    } catch (error) {
      return {
        success: false,
        message: error.message || "Failed to fetch result",
      };
    }
  },

  getUserResults: async () => {
    try {
      const response = await apiConnector(
        "GET",
        API_ENDPOINTS.MBTI.GET_USER_RESULTS
      );
      return response;
    } catch (error) {
      return {
        success: false,
        message: error.message || "Failed to fetch user results",
      };
    }
  },
};
