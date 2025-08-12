// API Connector utility for making HTTP requests
const apiConnector = async (
  method,
  url,
  bodyData,
  headers = {},
  params = {}
) => {
  try {
    // Get token from localStorage if available
    const token = localStorage.getItem("token");

    // Default headers
    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    // Add authorization header if token exists
    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`;
    }

    // Configure request options
    const config = {
      method: method.toUpperCase(),
      headers: defaultHeaders,
    };

    // Add body for POST, PUT, PATCH requests
    if (bodyData && ["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
      config.body = JSON.stringify(bodyData);
    }

    // Add query parameters to URL
    const urlWithParams = new URL(url);
    Object.keys(params).forEach((key) => {
      urlWithParams.searchParams.append(key, params[key]);
    });

    // Make the request
    const response = await fetch(urlWithParams.toString(), config);

    // Parse response
    let data;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // Handle response
    if (!response.ok) {
      throw new Error(data.message || `HTTP Error: ${response.status}`);
    }

    return {
      success: true,
      data: data.data || data,
      message: data.message,
      status: response.status,
    };
  } catch (error) {
    console.error("API Error:", error);
    return {
      success: false,
      data: null,
      message: error.message || "Something went wrong",
      status: error.status || 500,
    };
  }
};

export default apiConnector;
