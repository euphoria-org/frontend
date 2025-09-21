const apiConnector = async (
  method,
  url,
  bodyData,
  headers = {},
  params = {}
) => {
  try {
    const token = localStorage.getItem("token");

    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`;
    }

    const config = {
      method: method.toUpperCase(),
      headers: defaultHeaders,
    };

    if (bodyData && ["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
      config.body = JSON.stringify(bodyData);
    }

    const urlWithParams = new URL(url);
    Object.keys(params).forEach((key) => {
      urlWithParams.searchParams.append(key, params[key]);
    });

    const response = await fetch(urlWithParams.toString(), config);

    let data;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new Error(data.message || `HTTP Error: ${response.status}`);
    }

    return {
      success: true,
      data: data.data || data,
      result: data.result,
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
