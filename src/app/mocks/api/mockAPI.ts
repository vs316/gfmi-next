import { mockFilterOptions } from '../data/filters';
import { completeMockSurveyData } from '../data/surveys';
import { mockHealthData } from '../data/health';
// export const mockHealthData = {
//   status: "healthy",
//   records: completeMockSurveyData.length,
//   last_updated: new Date().toISOString(),
//   version: "1.0.0-mock",
//   endpoints: {
//     surveys: "/api/surveys",
//     filters: "/api/filters", 
//     health: "/api/health"
//   }
// };

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class MockApiClient {
  private isEnabled: boolean;

  constructor() {
    // Enable mock when API_BASE_URL points to localhost or when explicitly enabled
    this.isEnabled = 
      import.meta.env.VITE_API_BASE_URL?.includes('localhost') ||
      import.meta.env.VITE_ENABLE_MOCKS === 'true' ||
      import.meta.env.MODE === 'development';
  }

  async get(endpoint: string, params?: any) {
    if (!this.isEnabled) {
      throw new Error('Mock API is disabled');
    }

    // Simulate network delay (300-1000ms)
    await delay(300 + Math.random() * 700);

    // Random 5% chance of failure to simulate real API issues
    if (Math.random() < 0.05) {
      throw new Error('Simulated network error');
    }

    switch (endpoint) {
      case '/api/health':
        return mockHealthData;
        
      case '/api/filters':
        return mockFilterOptions;
        
      case '/api/surveys':
        return this.getFilteredSurveys(params);
        
      case '/api/status':
        return {
          status: 'active',
          mockEnabled: this.isEnabled,
          recordCount: completeMockSurveyData.length,
          timestamp: new Date().toISOString()
        };
        
      default:
        throw new Error(`Mock endpoint not found: ${endpoint}`);
    }
  }

  private getFilteredSurveys(filters: any = {}) {
    let filteredData = [...completeMockSurveyData];

    // Apply filters
    if (filters.country_geo_id) {
      filteredData = filteredData.filter(item => 
        item.country_geo_id.toLowerCase().includes(filters.country_geo_id.toLowerCase())
      );
    }
    
    if (filters.survey_name) {
      filteredData = filteredData.filter(item => 
        item.survey_name.toLowerCase().includes(filters.survey_name.toLowerCase())
      );
    }

    if (filters.msl_name) {
      filteredData = filteredData.filter(item => 
        item.msl_name.toLowerCase().includes(filters.msl_name.toLowerCase())
      );
    }

    if (filters.territory) {
      filteredData = filteredData.filter(item => 
        item.territory.toLowerCase().includes(filters.territory.toLowerCase())
      );
    }

    if (filters.region) {
      filteredData = filteredData.filter(item => 
        item.region.toLowerCase().includes(filters.region.toLowerCase())
      );
    }

    if (filters.response) {
      filteredData = filteredData.filter(item => 
        item.response.toLowerCase().includes(filters.response.toLowerCase())
      );
    }

    if (filters.account_name) {
      filteredData = filteredData.filter(item => 
        item.account_name.toLowerCase().includes(filters.account_name.toLowerCase())
      );
    }

    if (filters.title) {
      filteredData = filteredData.filter(item => 
        item.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    // Apply pagination
    const page = Math.max(1, parseInt(filters.page) || 1);
    const size = Math.min(Math.max(1, parseInt(filters.size) || 20), 100);
    const start = (page - 1) * size;
    const end = start + size;

    return {
      surveys: filteredData.slice(start, end),
      total: filteredData.length,
      page,
      size,
      total_pages: Math.ceil(filteredData.length / size),
      has_next: end < filteredData.length,
      has_previous: page > 1
    };
  }

  // Enable/disable mocks at runtime
  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  getStatus() {
    return {
      enabled: this.isEnabled,
      recordCount: completeMockSurveyData.length,
      filterCount: Object.keys(mockFilterOptions).length
    };
  }
}

export const mockApi = new MockApiClient();