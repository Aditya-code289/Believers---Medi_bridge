/**
 * Centralized API configuration for the frontend.
 * The VITE_API_URL environment variable should be set to the base URL of the backend.
 * Example: https://believers-medi-bridge.onrender.com
 */

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Export as API to match existing usage in components
export const API = API_BASE_URL;

// Optional: Add a warning in production if still pointing to localhost
if (import.meta.env.PROD && API.includes('localhost')) {
  console.warn(
    'WARNING: Frontend is running in production mode but API is pointing to localhost. ' +
    'Please set VITE_API_URL in your deployment environment variables.'
  );
}

export default {
  API,
};
