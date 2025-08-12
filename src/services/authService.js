import apiConnector from "../config/apiConnector";
import { API_ENDPOINTS } from "../config/apiEndpoints";

export const authService = {
  // Sign up a new user
  signup: async (userData) => {
    try {
      const response = await apiConnector(
        "POST",
        API_ENDPOINTS.AUTH.SIGNUP,
        userData
      );

      if (response.success && response.data.token) {
        // Store token in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response;
    } catch (error) {
      return {
        success: false,
        message: error.message || "Signup failed",
      };
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await apiConnector(
        "POST",
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );

      if (response.success && response.data.token) {
        // Store token and user data in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response;
    } catch (error) {
      return {
        success: false,
        message: error.message || "Login failed",
      };
    }
  },

  // Logout user
  logout: () => {
    // Remove token and user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return {
      success: true,
      message: "Logged out successfully",
    };
  },

  // Verify email
  verifyEmail: async (token) => {
    try {
      const response = await apiConnector(
        "POST",
        API_ENDPOINTS.AUTH.VERIFY_EMAIL,
        { token }
      );
      return response;
    } catch (error) {
      return {
        success: false,
        message: error.message || "Email verification failed",
      };
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await apiConnector(
        "POST",
        API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
        { email }
      );
      return response;
    } catch (error) {
      return {
        success: false,
        message: error.message || "Failed to send reset email",
      };
    }
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    try {
      const response = await apiConnector(
        "POST",
        API_ENDPOINTS.AUTH.RESET_PASSWORD,
        {
          token,
          newPassword,
        }
      );
      return response;
    } catch (error) {
      return {
        success: false,
        message: error.message || "Password reset failed",
      };
    }
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    try {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (user && token) {
        return {
          user: JSON.parse(user),
          token,
          isAuthenticated: true,
        };
      }

      return {
        user: null,
        token: null,
        isAuthenticated: false,
      };
    } catch (error) {
      return {
        user: null,
        token: null,
        isAuthenticated: false,
      };
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    return !!token;
  },
};
