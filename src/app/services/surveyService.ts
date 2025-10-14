import api from './api';
import { Survey, SurveyListResponse, SurveyFilters, ApiFilterOptions } from '../types/survey';

export class SurveyService {
  // Get surveys with filtering and pagination
  static async getSurveys(filters?: Partial<SurveyFilters>): Promise<SurveyListResponse> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value));
        }
      });
    }

    const response = await api.get(`/surveys/?${params.toString()}`);
    return response.data;
  }

  // Get a specific survey by ID
  static async getSurvey(surveyId: string): Promise<Survey> {
    const response = await api.get(`/surveys/${surveyId}`);
    return response.data;
  }

  // Get all filter options
  static async getFilterOptions(): Promise<ApiFilterOptions> {
    const response = await api.get('/filters/options');
    return response.data;
  }

  // Create a new survey
  static async createSurvey(survey: Partial<Survey>): Promise<Survey> {
    const response = await api.post('/surveys/', survey);
    return response.data;
  }

  // Update a survey
  static async updateSurvey(surveyId: string, survey: Partial<Survey>): Promise<Survey> {
    const response = await api.put(`/surveys/${surveyId}`, survey);
    return response.data;
  }

  // Delete a survey
  static async deleteSurvey(surveyId: string): Promise<void> {
    await api.delete(`/surveys/${surveyId}`);
  }

  // Health check
  static async healthCheck() {
    const response = await api.get('/health', { 
      baseURL: 'http://localhost:8000' // Direct health endpoint
    });
    return response.data;
  }
}