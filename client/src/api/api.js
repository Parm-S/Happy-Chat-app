// api.js
import axios from "axios";

const createApiInstance = (baseURL) => {
  const api = axios.create({
    baseURL,
  });

  // Add a request interceptor
  api.interceptors.request.use(
    (config) => {
      // Modify the request config before sending it
      console.log("Request Interceptor: Request is being sent", config);
      // You can also set headers, authentication tokens, etc.
      return config;
    },
    (error) => {
      // Handle request error
      console.error("Request Interceptor: Request error", error);
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  api.interceptors.response.use(
    (response) => {
      // Modify the response data before it's resolved
      console.log("Response Interceptor: Response received", response);
      return response;
    },
    (error) => {
      // Handle response error
      console.error("Response Interceptor: Response error", error);
      return Promise.reject(error);
    }
  );

  return api;
};

export default createApiInstance;
