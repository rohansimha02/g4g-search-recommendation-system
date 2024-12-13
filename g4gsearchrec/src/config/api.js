export const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? (process.env.REACT_APP_API_URL || 'https://g4g-search-api.onrender.com')
    : 'http://localhost:5001';

export const API_ENDPOINTS = {
    BASE: API_BASE_URL,
    SEARCH: `${API_BASE_URL}/search`,
    RECOMMEND: `${API_BASE_URL}/recommend`,
    HEALTH: `${API_BASE_URL}/health`
};

export const CONFIG = {
    MAX_SEARCH_RESULTS: 10,
    MAX_RECOMMENDATIONS: 5,
    REQUEST_TIMEOUT: 30000,
    DEBOUNCE_DELAY: 300,
    CACHE_DURATION: 300000
};
