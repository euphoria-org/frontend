const BASE_URL = "http://localhost:8080";

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
};
