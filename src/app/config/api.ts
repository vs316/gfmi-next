import { mockApi } from '@/mocks/api/mockAPI';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const IS_DEV = import.meta.env.DEV;
const USE_MOCKS = 
  import.meta.env.VITE_ENABLE_MOCKS === 'true' || 
  API_BASE_URL.includes('localhost') ||
  import.meta.env.MODE === 'development';

export const apiConfig = {
  baseURL: API_BASE_URL,
  isDevelopment: IS_DEV,
  useMocks: USE_MOCKS,
  debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',
};

// Enhanced API utility with automatic mock fallback
export const fetchFromApi = async (endpoint: string, options?: any) => {
  // If mocks are explicitly enabled, use them first
  if (USE_MOCKS) {
    try {
      console.log(`🎭 Using mock API for ${endpoint}`);
      return await mockApi.get(endpoint, options);
    } catch (mockError) {
      console.warn('Mock API failed:', mockError);
      // Fall through to try real API
    }
  }
  
  // Try real API
  try {
    const url = IS_DEV ? `/api${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}` : `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    
    console.log(`🌐 Trying real API: ${url}`);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`✅ Real API success for ${endpoint}`);
    return data;
    
  } catch (apiError) {
    console.warn(`❌ Real API failed for ${endpoint}:`, apiError);
    
    // Fallback to mock API if real API fails
    if (!USE_MOCKS) {
      try {
        console.log(`🎭 Falling back to mock API for ${endpoint}`);
        return await mockApi.get(endpoint, options);
      } catch (mockError) {
        console.error('Both real and mock APIs failed:', { apiError, mockError });
        throw new Error(`API unavailable: ${apiError.message}`);
      }
    }
    
    throw apiError;
  }
};

// Utility to check API status
export const getApiStatus = async () => {
  try {
    const health = await fetchFromApi('/api/health');
    return {
      status: 'connected',
      source: health.version?.includes('mock') ? 'mock' : 'real',
      records: health.records,
      ...health
    };
  } catch (error) {
    return {
      status: 'disconnected',
      source: 'none',
      error: error.message,
      records: 0
    };
  }
};