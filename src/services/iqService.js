import apiConnector from "../config/apiConnector";
import { API_ENDPOINTS } from "../config/apiEndpoints";

export const iqService = {
  getQuestions: async () => {
    try {
      console.log("🌐 iqService: Calling API endpoint:", API_ENDPOINTS.IQ.GET_QUESTIONS);
      const response = await apiConnector(
        "GET",
        API_ENDPOINTS.IQ.GET_QUESTIONS
      );
      console.log("📡 iqService: API response:", response);
      return response;
    } catch (error) {
      console.error("🚨 iqService: API call failed:", error);
      return {
        success: false,
        message: error.message || "Failed to fetch questions",
      };
    }
  },

  submitTest: async (answers, timeTaken = 0) => {
    try {
      const response = await apiConnector(
        "POST",
        API_ENDPOINTS.IQ.SUBMIT_TEST,
        { responses: answers, timeTaken }
      );
      return response;
    } catch (error) {
      return {
        success: false,
        message: error.message || "Failed to submit test",
      };
    }
  },

  submitTestGuest: async (answers, sessionId, timeTaken = 0) => {
    try {
      const response = await apiConnector(
        "POST",
        API_ENDPOINTS.IQ.SUBMIT_TEST_GUEST,
        { responses: answers, sessionId, timeTaken }
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
        API_ENDPOINTS.IQ.CLAIM_RESULT,
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

  getResultDetails: async (resultId) => {
    try {
      const response = await apiConnector(
        "GET",
        `${API_ENDPOINTS.IQ.GET_RESULT}/${resultId}`
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
        API_ENDPOINTS.IQ.GET_USER_RESULTS
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
