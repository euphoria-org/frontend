const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: `${BASE_URL}/api/user/signup`,
    LOGIN: `${BASE_URL}/api/user/login`,
    LOGOUT: `${BASE_URL}/api/user/logout`,
    VERIFY_EMAIL: `${BASE_URL}/api/user/verify-email`,
    FORGOT_PASSWORD: `${BASE_URL}/api/user/forgot-password`,
    RESET_PASSWORD: `${BASE_URL}/api/user/reset-password`,
    UPDATE_PASSWORD: `${BASE_URL}/api/user/update-password`,
    GOOGLE_AUTH: `${BASE_URL}/auth/google`,
    PROFILE: `${BASE_URL}/api/user/profile`,
  },

  MBTI: {
    GET_QUESTIONS: `${BASE_URL}/api/mbti/questions`,
    SUBMIT_TEST: `${BASE_URL}/api/mbti/submit-test`,
    SUBMIT_TEST_GUEST: `${BASE_URL}/api/mbti/submit-test-guest`,
    CLAIM_RESULT: `${BASE_URL}/api/mbti/claim-result`,
    GET_RESULT: `${BASE_URL}/api/mbti/result`,
    GET_USER_RESULTS: `${BASE_URL}/api/mbti/my-results`,
  },

  USER: {
    PROFILE: `${BASE_URL}/api/user/profile`,
    UPDATE_PROFILE: `${BASE_URL}/api/user/profile`,
  },

  CHATBOT: {
    SEND_MESSAGE: `${BASE_URL}/api/chatbot/message`,
    GET_CONVERSATIONS: `${BASE_URL}/api/chatbot/conversations`,
    GET_CONVERSATION: `${BASE_URL}/api/chatbot/conversations`,
    DELETE_CONVERSATION: `${BASE_URL}/api/chatbot/conversations`,
    CLEAR_CONVERSATIONS: `${BASE_URL}/api/chatbot/conversations`,
    HEALTH: `${BASE_URL}/api/chatbot/health`,
  },

  PERMA: {
    GET_QUESTIONS: `${BASE_URL}/api/perma/questions`,
    SUBMIT_TEST: `${BASE_URL}/api/perma/submit-test`,
    SUBMIT_TEST_GUEST: `${BASE_URL}/api/perma/submit-test-guest`,
    CLAIM_RESULT: `${BASE_URL}/api/perma/claim-result`,
    GET_RESULT: `${BASE_URL}/api/perma/result`,
    GET_USER_RESULTS: `${BASE_URL}/api/perma/my-results`,
  },

  IQ: {
    GET_QUESTIONS: `${BASE_URL}/api/iq/questions`,
    SUBMIT_TEST: `${BASE_URL}/api/iq/submit-test`,
    SUBMIT_TEST_GUEST: `${BASE_URL}/api/iq/submit-test-guest`,
    CLAIM_RESULT: `${BASE_URL}/api/iq/claim-result`,
    GET_RESULT: `${BASE_URL}/api/iq/result`,
    GET_USER_RESULTS: `${BASE_URL}/api/iq/my-results`,
  },
};
