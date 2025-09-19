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
        `${API_ENDPOINTS.AUTH.RESET_PASSWORD}/${token}`,
        {
          newPassword,
          confirmNewPassword: newPassword, // Backend expects both fields
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

  // Update password (for logged-in users)
  updatePassword: async (currentPassword, newPassword, confirmNewPassword) => {
    try {
      const response = await apiConnector(
        "PUT",
        API_ENDPOINTS.AUTH.UPDATE_PASSWORD,
        {
          currentPassword,
          newPassword,
          confirmNewPassword,
        }
      );
      return response;
    } catch (error) {
      return {
        success: false,
        message: error.message || "Password update failed",
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

  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    return !!token && authService.isTokenValid();
  },

  // Validate JWT token
  isTokenValid: () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      // Decode JWT token to check expiration
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;

      // Check if token is expired
      if (payload.exp < currentTime) {
        // Token is expired, return false but don't automatically logout
        // Let the calling code decide what to do
        return false;
      }

      return true;
    } catch (error) {
      // If there's any error in decoding, consider token invalid
      // But don't automatically logout - let calling code handle it
      console.warn("Error validating token:", error);
      return false;
    }
  },

  // Clean expired token
  cleanExpiredToken: () => {
    if (!authService.isTokenValid()) {
      const token = localStorage.getItem("token");
      if (token) {
        // Only remove if token exists but is invalid/expired
        authService.logout();
        return true; // Token was expired and removed
      }
    }
    return false; // Token is valid or doesn't exist
  },

  // Validate and refresh user session
  validateSession: async () => {
    try {
      // First check if token exists and is valid
      const token = localStorage.getItem("token");

      if (!token) {
        return {
          success: false,
          message: "No token found",
          shouldLogout: false, // Don't force logout if no token
        };
      }

      // Check token validity
      if (!authService.isTokenValid()) {
        // Token is expired or invalid
        authService.logout();
        return {
          success: false,
          message: "Token expired",
          shouldLogout: true,
        };
      }

      // Token is valid, no need for backend verification for now
      // You can add backend verification later if needed
      return {
        success: true,
        message: "Session valid",
      };

      /* Optional backend verification - uncomment if you have the endpoint
      const response = await apiConnector(
        "GET",
        API_ENDPOINTS.AUTH.VERIFY_TOKEN || "/auth/verify"
      );

      if (!response.success) {
        authService.logout();
        return {
          success: false,
          message: "Invalid session",
          shouldLogout: true
        };
      }

      return {
        success: true,
        message: "Session valid"
      };
      */
    } catch (error) {
      // Don't automatically logout on network errors
      console.warn("Session validation error:", error);

      // If token is valid locally, keep the session
      if (authService.isTokenValid()) {
        return {
          success: true,
          message: "Session valid (offline)",
        };
      }

      return {
        success: false,
        message: "Session validation failed",
        shouldLogout: false, // Don't force logout on network errors
      };
    }
  },
};
