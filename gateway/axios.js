// This is a default Axios Configurations for handling requests

const axios = require('axios');
const path = require('path');

// Default configuration settings for the Axios instance
const defaultConfig = {
  baseProtocol: 'http://',
  timeout: 10000, // Set a timeout for requests
  headers: {
    'Content-Type': 'application/json',
    // Add more default headers here if needed
  },
};

// HTTP methods
const HTTP_METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  // Add more HTTP methods here if needed
};

/**
 * Create a customized Axios instance with default settings and request interceptor.
 * @returns {AxiosInstance} An instance of Axios with customized settings.
 */
const createAxiosInstance = () => {
  // Merge default settings with user-defined options
  const instance = axios.create(defaultConfig);

  // Variable to store the HTTP method 'delete'
  const DELETE_METHOD = HTTP_METHODS.DELETE;
  instance.interceptors.request.use((config) => {
    config.url = defaultConfig.baseProtocol + config.url;
    return config;
  });

  return instance;
}

// Create the Axios instance with customized settings
const axiosInstance = createAxiosInstance();

// Export the customized Axios instance for use in other modules
module.exports = axiosInstance;

