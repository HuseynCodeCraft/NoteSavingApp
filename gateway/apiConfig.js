const path = require('path');
const axios = require('./axios.js');

// Configuration object
exports.config = {
  BASE_PROTOCOL: "http",
  BASE_HOST: "localhost",
  BASE_PORT: "59728",
  PORT: "8080"
}

/**
 * Generate a URL with the provided endpoint path and parameters.
 * @param {string} endpointPath - The path of the endpoint.
 * @param {string} params - Additional parameters for the URL.
 * @returns {string} The generated URL.
 */
exports.generateUrl = (endpointPath, params) => {
  // Constructing the URL using configuration variables
  const baseProtocol = exports.config.BASE_PROTOCOL;
  const baseHost = exports.config.BASE_HOST;
  const basePort = exports.config.BASE_PORT;

  let url = `${baseProtocol}://`;
  url += `${baseHost}:${basePort}/`;
  url += endpointPath;
  url += params;
  
  return url;
}


// Add more request functions for different HTTP methods if needed

