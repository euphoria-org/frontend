import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { authService } from "../services/authService";

// Initial state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Action types
const AuthActionTypes = {
  SET_LOADING: "SET_LOADING",
  SET_USER: "SET_USER",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
  LOGOUT: "LOGOUT",
};

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AuthActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case AuthActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case AuthActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case AuthActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...initialState,
        isLoading: false,
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const { user, token, isAuthenticated } = authService.getCurrentUser();

        if (isAuthenticated) {
          dispatch({
            type: AuthActionTypes.SET_USER,
            payload: { user, token },
          });
        } else {
          dispatch({
            type: AuthActionTypes.SET_LOADING,
            payload: false,
          });
        }
      } catch (error) {
        dispatch({
          type: AuthActionTypes.SET_ERROR,
          payload: "Failed to initialize authentication",
        });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      dispatch({ type: AuthActionTypes.SET_LOADING, payload: true });
      dispatch({ type: AuthActionTypes.CLEAR_ERROR });

      const response = await authService.login(credentials);

      if (response.success) {
        dispatch({
          type: AuthActionTypes.SET_USER,
          payload: {
            user: response.data.user,
            token: response.data.token,
          },
        });
        return { success: true, message: "Login successful" };
      } else {
        dispatch({
          type: AuthActionTypes.SET_ERROR,
          payload: response.message,
        });
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = error.message || "Login failed";
      dispatch({
        type: AuthActionTypes.SET_ERROR,
        payload: errorMessage,
      });
      return { success: false, message: errorMessage };
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      dispatch({ type: AuthActionTypes.SET_LOADING, payload: true });
      dispatch({ type: AuthActionTypes.CLEAR_ERROR });

      const response = await authService.signup(userData);

      if (response.success) {
        dispatch({
          type: AuthActionTypes.SET_USER,
          payload: {
            user: response.data.user,
            token: response.data.token,
          },
        });
        return { success: true, message: "Signup successful" };
      } else {
        dispatch({
          type: AuthActionTypes.SET_ERROR,
          payload: response.message,
        });
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = error.message || "Signup failed";
      dispatch({
        type: AuthActionTypes.SET_ERROR,
        payload: errorMessage,
      });
      return { success: false, message: errorMessage };
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    dispatch({ type: AuthActionTypes.LOGOUT });
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: AuthActionTypes.CLEAR_ERROR });
  };

  // Forgot password function
  const forgotPassword = async (email) => {
    try {
      dispatch({ type: AuthActionTypes.SET_LOADING, payload: true });
      dispatch({ type: AuthActionTypes.CLEAR_ERROR });

      const response = await authService.forgotPassword(email);

      dispatch({ type: AuthActionTypes.SET_LOADING, payload: false });

      if (response.success) {
        return { success: true, message: response.message };
      } else {
        dispatch({
          type: AuthActionTypes.SET_ERROR,
          payload: response.message,
        });
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = error.message || "Failed to send reset email";
      dispatch({
        type: AuthActionTypes.SET_ERROR,
        payload: errorMessage,
      });
      return { success: false, message: errorMessage };
    }
  };

  // Reset password function
  const resetPassword = async (token, newPassword) => {
    try {
      dispatch({ type: AuthActionTypes.SET_LOADING, payload: true });
      dispatch({ type: AuthActionTypes.CLEAR_ERROR });

      const response = await authService.resetPassword(token, newPassword);

      dispatch({ type: AuthActionTypes.SET_LOADING, payload: false });

      if (response.success) {
        return { success: true, message: response.message };
      } else {
        dispatch({
          type: AuthActionTypes.SET_ERROR,
          payload: response.message,
        });
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = error.message || "Password reset failed";
      dispatch({
        type: AuthActionTypes.SET_ERROR,
        payload: errorMessage,
      });
      return { success: false, message: errorMessage };
    }
  };

  // OAuth authentication function
  const oauthLogin = useCallback(async (token) => {
    try {
      dispatch({ type: AuthActionTypes.SET_LOADING, payload: true });
      dispatch({ type: AuthActionTypes.CLEAR_ERROR });

      // Store the token
      localStorage.setItem("token", token);

      // Fetch user profile with the token
      const response = await fetch("http://localhost:8080/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();

        // Store user data - the response structure is { success: true, data: user }
        localStorage.setItem("user", JSON.stringify(userData.data));

        // Update context state
        dispatch({
          type: AuthActionTypes.SET_USER,
          payload: { user: userData.data, token },
        });

        return { success: true, user: userData.data };
      } else {
        throw new Error("Failed to fetch user profile");
      }
    } catch (error) {
      const errorMessage = error.message || "OAuth authentication failed";

      // Clean up storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      dispatch({
        type: AuthActionTypes.SET_ERROR,
        payload: errorMessage,
      });

      return { success: false, message: errorMessage };
    }
  }, []);

  const value = {
    ...state,
    login,
    signup,
    logout,
    clearError,
    forgotPassword,
    resetPassword,
    oauthLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
