// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { SurveyService } from '../services/surveyService';
// import { SurveyFilters } from '../types/survey';
// import { toast } from 'sonner';

// // Hook to get surveys with filters
// export const useSurveys = (filters?: Partial<SurveyFilters>) => {
//   return useQuery({
//     queryKey: ['surveys', filters],
//     queryFn: () => SurveyService.getSurveys(filters),
//     staleTime: 30000, // 30 seconds
//     gcTime: 300000, // 5 minutes
//     refetchOnWindowFocus: false,
//   });
// };

// // Hook to get filter options
// export const useFilterOptions = () => {
//   return useQuery({
//     queryKey: ['filterOptions'],
//     queryFn: () => SurveyService.getFilterOptions(),
//     staleTime: 300000, // 5 minutes
//     gcTime: 600000, // 10 minutes
//     refetchOnWindowFocus: false,
//   });
// };

// // Hook to get a specific survey
// export const useSurvey = (surveyId: string) => {
//   return useQuery({
//     queryKey: ['survey', surveyId],
//     queryFn: () => SurveyService.getSurvey(surveyId),
//     enabled: !!surveyId,
//   });
// };

// // Hook for creating surveys
// export const useCreateSurvey = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: SurveyService.createSurvey,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['surveys'] });
//       toast.success('Survey created successfully');
//     },
//     onError: (error) => {
//       console.error('Error creating survey:', error);
//       toast.error('Failed to create survey');
//     },
//   });
// };

// // Hook for updating surveys
// export const useUpdateSurvey = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: ({ id, data }: { id: string; data: any }) => 
//       SurveyService.updateSurvey(id, data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['surveys'] });
//       toast.success('Survey updated successfully');
//     },
//     onError: (error) => {
//       console.error('Error updating survey:', error);
//       toast.error('Failed to update survey');
//     },
//   });
// };

// // Hook for deleting surveys
// export const useDeleteSurvey = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: SurveyService.deleteSurvey,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['surveys'] });
//       toast.success('Survey deleted successfully');
//     },
//     onError: (error) => {
//       console.error('Error deleting survey:', error);
//       toast.error('Failed to delete survey');
//     },
//   });
// };

// // Hook for API health check
// export const useHealthCheck = () => {
//   return useQuery({
//     queryKey: ['health'],
//     queryFn: () => SurveyService.healthCheck(),
//     refetchInterval: 60000, // Check every minute
//     retry: 3,
    
//   });
// };

"use client";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchFromApi } from '@/app/config/api';
import { SurveyService } from '../services/surveyService';
import { SurveyFilters } from '@/app/types/survey';
import { toast } from 'sonner';
// Hook to get surveys with filters
// export const useHealthCheck = () => {
//   return useQuery({
//     queryKey: ['health'],
//     //for mock api
//     // queryFn: () => fetchFromApi('/api/health'),
//     queryFn: () => fetchFromApi('/health'),
//     // staleTime: 5 * 60 * 1000, // 5 minutes
//     // retry: 1, // Only retry once before falling back to mock

//     staleTime: 30000, // 30 seconds
//     gcTime: 300000, // 5 minutes
//     refetchOnWindowFocus: false,
//   });
// };
// Hook to get filter options
export const useFilterOptions = () => {
  return useQuery({
    queryKey: ['filterOptions'],
    //for mock api
    // queryFn: () => fetchFromApi('/api/filters'),
    queryFn: () => SurveyService.getFilterOptions(),
    // staleTime: 10 * 60 * 1000, // 10 minutes
    // retry: 1,
    staleTime: 300000, // 5 minutes
    gcTime: 600000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

// Hook to get a specific survey
export const useSurvey = (surveyId: string) => {
  return useQuery({
    queryKey: ['survey', surveyId],
    queryFn: () => SurveyService.getSurvey(surveyId),
    enabled: !!surveyId,
  });
};

// Hook to get surveys with filters
export const useSurveys = (filters?: Partial<SurveyFilters>) => {
  return useQuery({
    queryKey: ['surveys', filters],
    queryFn: () => SurveyService.getSurveys(filters),
    staleTime: 30000, // 30 seconds
    gcTime: 300000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
// Hook for creating surveys
export const useCreateSurvey = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: SurveyService.createSurvey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['surveys'] });
      toast.success('Survey created successfully');
    },
    onError: (error) => {
      console.error('Error creating survey:', error);
      toast.error('Failed to create survey');
    },
  });
};

// Hook for updating surveys
export const useUpdateSurvey = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      SurveyService.updateSurvey(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['surveys'] });
      toast.success('Survey updated successfully');
    },
    onError: (error) => {
      console.error('Error updating survey:', error);
      toast.error('Failed to update survey');
    },
  });
};

// Hook for deleting surveys
export const useDeleteSurvey = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: SurveyService.deleteSurvey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['surveys'] });
      toast.success('Survey deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting survey:', error);
      toast.error('Failed to delete survey');
    },
  });
};

// Hook for API health check
export const useHealthCheck = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: () => SurveyService.healthCheck(),
    refetchInterval: 60000, // Check every minute
    retry: 3,
    
  });
};
// export const useSurveyData = (filters: SurveyFilters) => {
//   return useQuery({
//     queryKey: ['survey-data', filters],
//     queryFn: () => fetchFromApi('/api/v1/surveys', filters),
//     enabled: Object.keys(filters).length > 0,
//     staleTime: 2 * 60 * 1000, // 2 minutes
//     retry: 1,
//   });
// };

// export const useSurveys = (filters?: Partial<SurveyFilters>) => {
//   return useQuery({
//     queryKey: ['surveys', filters],
//     // queryFn: () => fetchFromApi('/api/surveys', filters),
//     queryFn: async () => {
//       try {
//         const response = await fetchFromApi('/api/v1/surveys', filters);
        
//         // Validate response structure
//         if (!response || typeof response !== 'object') {
//           throw new Error('Invalid API response format');
//         }
        
//         // Ensure surveys is always an array
//         const surveys = Array.isArray(response.surveys) ? response.surveys : [];
        
//         return {
//           surveys,
//           total: response.total || 0,
//           page: response.page || 1,
//           size: response.size || 20,
//           total_pages: response.total_pages || response.pages || 0,
//           has_next: response.has_next || false,
//           has_previous: response.has_previous || false
//         };
//       } catch (error) {
//         console.error('Survey fetch error:', error);
//         throw error;
//       }
//     },
//     enabled: !!filters && Object.keys(filters).length > 0,
//     staleTime: 2 * 60 * 1000, // 2 minutes
//     retry: 2,
//     refetchOnWindowFocus: false,
//   });
// };



// export const useSurveys = useSurveyData; 