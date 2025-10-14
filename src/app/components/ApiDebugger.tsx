
// import React from 'react';
// import { useHealthCheck, useFilterOptions } from '@/hooks/useSurveyData';

// export const ApiDebugger = () => {
//   const { data: healthData, error: healthError, isLoading: healthLoading } = useHealthCheck();
//   const { data: filterData, error: filterError, isLoading: filterLoading } = useFilterOptions();

//   return (
//     <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mb-4">
//       <h3 className="font-bold mb-2">🔧 API Debug Info</h3>
      
//       <div className="space-y-2 text-sm">
//         <div>
//           <strong>Health Check:</strong>
//           {healthLoading && <span className="text-blue-500"> Loading...</span>}
//           {healthError && <span className="text-red-500"> Error: {String(healthError)}</span>}
//           {healthData && <span className="text-green-500"> ✅ Connected ({healthData.records} records)</span>}
//         </div>
        
//         <div>
//           <strong>Filter Options:</strong>
//           {filterLoading && <span className="text-blue-500"> Loading...</span>}
//           {filterError && <span className="text-red-500"> Error: {String(filterError)}</span>}
//           {filterData && (
//             <span className="text-green-500">
//               ✅ Loaded ({filterData.countries?.length || 0} countries, {filterData.msl_names?.length || 0} MSLs)
//             </span>
//           )}
//         </div>
        
//         <div>
//           <strong>API Base URL:</strong> {import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'}
//         </div>
        
//         {filterData && (
//           <details className="mt-2">
//             <summary className="cursor-pointer font-medium">📊 Raw Filter Data (Sample)</summary>
//             <div className="mt-2 p-2 bg-white dark:bg-gray-900 rounded text-xs">
//               <div>Countries: {JSON.stringify(filterData.countries?.slice(0, 3) || [])}</div>
//               <div>MSL Names: {JSON.stringify(filterData.msl_names?.slice(0, 2) || [])}</div>
//               <div>Survey Names: {JSON.stringify(filterData.survey_names?.slice(0, 2) || [])}</div>
//             </div>
//           </details>
//         )}
        
//         {healthData && (
//           <details className="mt-2">
//             <summary className="cursor-pointer font-medium">💚 Health Data</summary>
//             <div className="mt-2 p-2 bg-white dark:bg-gray-900 rounded text-xs">
//               Status: {healthData.status}, Records: {healthData.records}
//             </div>
//           </details>
//         )}
//       </div>
//     </div>
//   );
// };

import React from 'react';
import { useHealthCheck, useFilterOptions } from '@/app/hooks/useSurveyData';

export const ApiDebugger = () => {
  const { data: healthData, error: healthError, isLoading: healthLoading } = useHealthCheck();
  const { data: filterData, error: filterError, isLoading: filterLoading } = useFilterOptions();

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mb-4">
      <h3 className="font-bold mb-2">🔧 API Debug Info</h3>
      
      <div className="space-y-2 text-sm">
        <div>
          <strong>Health Check:</strong>
          {healthLoading && <span className="text-blue-500"> Loading...</span>}
          {healthError && <span className="text-red-500"> Error: {String(healthError)}</span>}
          {healthData && (
            <span className="text-green-500"> 
              ✅ Connected ({healthData.records ? String(healthData.records) : 'unknown'} records)
            </span>
          )}
        </div>
        
        <div>
          <strong>Filter Options:</strong>
          {filterLoading && <span className="text-blue-500"> Loading...</span>}
          {filterError && <span className="text-red-500"> Error: {String(filterError)}</span>}
          {filterData && (
            <span className="text-green-500">
              ✅ Loaded ({filterData.countries?.length || 0} countries, {filterData.msl_names?.length || 0} MSLs)
            </span>
          )}
        </div>
        
        <div>
          <strong>API Base URL:</strong> {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1'}
        </div>
        
        {filterData && (
          <details className="mt-2">
            <summary className="cursor-pointer font-medium">📊 Raw Filter Data (Sample)</summary>
            <div className="mt-2 p-2 bg-white dark:bg-gray-900 rounded text-xs">
              <div><strong>Countries:</strong> {JSON.stringify(filterData.countries?.slice(0, 3) || [])}</div>
              <div><strong>MSL Names:</strong> {JSON.stringify(filterData.msl_names?.slice(0, 2) || [])}</div>
              <div><strong>Survey Names:</strong> {JSON.stringify(filterData.survey_names?.slice(0, 2) || [])}</div>
            </div>
          </details>
        )}
        
        {healthData && (
          <details className="mt-2">
    <summary className="cursor-pointer font-medium">💚 Health Data</summary>
    <div className="mt-2 p-2 bg-white dark:bg-gray-900 rounded text-xs">
      <div><strong>Status:</strong> {String(healthData.status || 'unknown')}</div>
      <div><strong>Records:</strong> {typeof healthData.records === 'number' ? healthData.records : 'unknown'}</div>
      <div><strong>Database:</strong> {String(healthData.database || 'unknown')}</div>
    </div>
  </details> 
        )}
      </div>
    </div>
  );
};
