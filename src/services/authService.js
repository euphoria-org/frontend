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
  updatePassword: async (passwordData) => {
    try {
      const response = await apiConnector(
        "PUT",
        API_ENDPOINTS.AUTH.UPDATE_PASSWORD,
        passwordData
      );
      return response;
    } catch (error) {
      return {
        success: false,
        message: error.message || "Password update failed",
      };
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await apiConnector(
        "PUT",
        API_ENDPOINTS.USER.UPDATE_PROFILE,
        profileData
      );

      if (response.success && response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response;
    } catch (error) {
      return {
        success: false,
        message: error.message || "Profile update failed",
      };
    }
  },

  changePassword: async (passwordData) => {
    try {
      const requestData = {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        confirmNewPassword: passwordData.confirmPassword,
      };

      const response = await apiConnector(
        "PUT",
        API_ENDPOINTS.AUTH.UPDATE_PASSWORD,
        requestData
      );
      return response;
    } catch (error) {
      return {
        success: false,
        message: error.message || "Password change failed",
      };
    }
  },

  getUserMBTIResults: async () => {
    try {
      const response = await apiConnector(
        "GET",
        `${API_ENDPOINTS.AUTH.PROFILE.replace("/profile", "")}/mbti-results`
      );
      return response;
    } catch (error) {
      return {
        success: false,
        message: error.message || "Failed to fetch MBTI results",
      };
    }
  },

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

      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;

      if (payload.exp < currentTime) {
        return false;
      }

      return true;
    } catch (error) {
      console.warn("Error validating token:", error);
      return false;
    }
  },

  cleanExpiredToken: () => {
    if (!authService.isTokenValid()) {
      const token = localStorage.getItem("token");
      if (token) {
        authService.logout();
        return true;
      }
    }
    return false;
  },

  validateSession: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return {
          success: false,
          message: "No token found",
          shouldLogout: false,
        };
      }

      if (!authService.isTokenValid()) {
        authService.logout();
        return {
          success: false,
          message: "Token expired",
          shouldLogout: true,
        };
      }

      return {
        success: true,
        message: "Session valid",
      };
    } catch (error) {
      console.warn("Session validation error:", error);

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
