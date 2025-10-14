// src/components/MockDebugger.tsx
import { useHealthCheck, useFilterOptions } from '@/hooks/useSurveyData';

export const MockDebugger = () => {
  const { data: health, isLoading: healthLoading } = useHealthCheck();
  const { data: filters, isLoading: filtersLoading } = useFilterOptions();

  if (import.meta.env.PROD) return null; // Hide in production

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-gray-800 text-white text-xs rounded max-w-sm">
      <h4 className="font-bold mb-2">Mock Data Status</h4>
      <div>Health: {healthLoading ? 'Loading...' : health ? '✅ Connected' : '❌ Failed'}</div>
      <div>Filters: {filtersLoading ? 'Loading...' : filters ? `✅ ${filters.survey_names?.length} surveys` : '❌ Failed'}</div>
      <div>Mode: {import.meta.env.MODE}</div>
      <div>Mocks: {import.meta.env.VITE_ENABLE_MOCKS || 'auto'}</div>
    </div>
  );
};
