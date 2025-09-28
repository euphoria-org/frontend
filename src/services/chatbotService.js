import apiConnector from "../config/apiConnector";
import { API_ENDPOINTS } from "../config/apiEndpoints";

const chatbotService = {
  sendMessage: async (message, conversationId = null) => {
    try {
      const response = await apiConnector(
        "POST",
        API_ENDPOINTS.CHATBOT.SEND_MESSAGE,
        {
          message: message.trim(),
          conversationId,
        }
      );

      if (response.success) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        throw new Error(response.message || "Failed to send message");
      }
    } catch (error) {
      console.error("ChatBot Service - Send Message Error:", error);
      return {
        success: false,
        message: error.message || "Failed to send message to chatbot",
      };
    }
  },

  getConversations: async (page = 1, limit = 20) => {
    try {
      const response = await apiConnector(
        "GET",
        API_ENDPOINTS.CHATBOT.GET_CONVERSATIONS,
        null,
        {},
        { page, limit }
      );

      if (response.success) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        throw new Error(response.message || "Failed to fetch conversations");
      }
    } catch (error) {
      console.error("ChatBot Service - Get Conversations Error:", error);
      return {
        success: false,
        message: error.message || "Failed to fetch conversations",
      };
    }
  },

  getConversation: async (conversationId) => {
    try {
      const response = await apiConnector(
        "GET",
        `${API_ENDPOINTS.CHATBOT.GET_CONVERSATION}/${conversationId}`
      );

      if (response.success) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        throw new Error(response.message || "Failed to fetch conversation");
      }
    } catch (error) {
      console.error("ChatBot Service - Get Conversation Error:", error);
      return {
        success: false,
        message: error.message || "Failed to fetch conversation",
      };
    }
  },

  deleteConversation: async (conversationId) => {
    try {
      const response = await apiConnector(
        "DELETE",
        `${API_ENDPOINTS.CHATBOT.DELETE_CONVERSATION}/${conversationId}`
      );

      if (response.success) {
        return {
          success: true,
          message: response.message,
        };
      } else {
        throw new Error(response.message || "Failed to delete conversation");
      }
    } catch (error) {
      console.error("ChatBot Service - Delete Conversation Error:", error);
      return {
        success: false,
        message: error.message || "Failed to delete conversation",
      };
    }
  },

  clearAllConversations: async () => {
    try {
      const response = await apiConnector(
        "DELETE",
        API_ENDPOINTS.CHATBOT.CLEAR_CONVERSATIONS
      );

      if (response.success) {
        return {
          success: true,
          message: response.message,
          deletedCount: response.deletedCount,
        };
      } else {
        throw new Error(response.message || "Failed to clear conversations");
      }
    } catch (error) {
      console.error("ChatBot Service - Clear Conversations Error:", error);
      return {
        success: false,
        message: error.message || "Failed to clear conversations",
      };
    }
  },

  checkHealth: async () => {
    try {
      const response = await apiConnector("GET", API_ENDPOINTS.CHATBOT.HEALTH);

      return {
        success: response.success,
        data: response.data,
      };
    } catch (error) {
      console.error("ChatBot Service - Health Check Error:", error);
      return {
        success: false,
        message: error.message || "Chatbot service is unavailable",
      };
    }
  },
};

export default chatbotService;
