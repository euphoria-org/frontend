import apiConnector from "../config/apiConnector";
import { API_ENDPOINTS } from "../config/apiEndpoints";

export const mbtiService = {
  // Get all MBTI questions
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

  // Submit MBTI test answers
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

  // Get MBTI result by ID
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

  // Get user's MBTI test results
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
