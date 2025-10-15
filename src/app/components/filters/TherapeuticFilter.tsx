// import { MultiSelect } from "@/components/ui/multi-select";
// import { Filters } from "@/types/filters";
// import { AlertCircle } from "lucide-react";

// interface TherapeuticFilterProps {
//   filters: Filters;
//   setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
// }

// const therapeuticAreaOptions = [
//   { value: "oncology", label: "Oncology" },
//   { value: "cardiology", label: "Cardiology" },
//   { value: "neurology", label: "Neurology" },
//   { value: "immunology", label: "Immunology" },
// ];

// const tumourTypeOptions = [
//   { value: "breast", label: "Breast Cancer" },
//   { value: "lung", label: "Lung Cancer" },
//   { value: "prostate", label: "Prostate Cancer" },
//   { value: "colorectal", label: "Colorectal Cancer" },
// ];

// export const TherapeuticFilter = ({
//   filters,
//   setFilters,
// }: TherapeuticFilterProps) => {
//   // Check if tumour type should be enabled based on selected surveys
//   const oncologySurveys = ["oncology-us", "oncology-eu-uk"];
//   const isTumourTypeEnabled = filters.specificSurvey.some(survey => 
//     oncologySurveys.includes(survey)
//   );

//   return (
//     <div className="space-y-4">
//       <h3 className="text-sm font-medium text-sidebar-foreground">
//         Therapeutic Area
//       </h3>

//       <div className="space-y-3">
//         <div>
//           <label className="mb-1.5 block text-xs font-medium text-sidebar-foreground">
//             Therapeutic Area (TA)
//           </label>
//           <MultiSelect
//             options={therapeuticAreaOptions}
//             selected={filters.therapeuticArea}
//             onChange={(value) => setFilters({ ...filters, therapeuticArea: value })}
//             placeholder="Search therapeutic area..."
//           />
//         </div>

//         <div>
//           <label className="mb-1.5 block text-xs font-medium text-sidebar-foreground">
//             Tumour Type
//           </label>
//           <MultiSelect
//             options={tumourTypeOptions}
//             selected={filters.tumourType}
//             onChange={(value) => {
//               if (isTumourTypeEnabled) {
//                 setFilters({ ...filters, tumourType: value });
//               }
//             }}
//             placeholder={isTumourTypeEnabled ? "Search tumour type..." : "Only for Oncology surveys"}
//           />
//           {!isTumourTypeEnabled && (
//             <div className="mt-2 flex items-start gap-1.5 rounded-md bg-muted/50 p-2">
//               <AlertCircle className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground" />
//               <p className="text-xs text-muted-foreground">
//                 Available only for Oncology Organic Insight US/EU/UK surveys
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
"use client";
import { MultiSelect } from "@/app/components/ui/multi-select";
import { Filters } from "@/app/types/filters";
import { useFilterOptions } from "@/app/hooks/useSurveyData";
import { LoadingSkeleton } from "@/app/components/LoadingSkeleton";
import { useMemo } from "react";
import { Option } from "@/app/components/ui/multi-select";
interface TherapeuticFilterProps {
  filters: Filters;
  setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
}

export const TherapeuticFilter = ({
  filters,
  setFilters,
}: TherapeuticFilterProps) => {
  const { data: filterOptions, isLoading, error } = useFilterOptions();

  // Convert API data to MultiSelect format
  const tumorTypeOptions = useMemo(() => 
    (filterOptions?.tumor_types || []).map((name: string) => ({
      value: name,
      label: name
    })),[filterOptions?.tumor_types]
  );

  const therapeuticAreaOptions = useMemo(() => 
    // Use tumor types as therapeutic areas since they map to the same field
    (filterOptions?.tumor_types || []).map((name: string) => ({
      value: name,
      label: `${name} Oncology`
    })),[filterOptions?.tumor_types]
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Therapeutic Area
        </h3>
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Therapeutic Area
        </h3>
        <p className="text-sm text-red-500">Failed to load therapeutic filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
        Therapeutic Area
      </h3>
      
      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">
            Tumor Type
          </label>
          <MultiSelect
            options={tumorTypeOptions}
            selected={filters.tumourType || []}
            onChange={(value) => setFilters(prev => ({ ...prev, tumourType: value }))}
            placeholder="Select tumor type..."
          />
        </div>
        
        <div>
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">
            Therapeutic Area
          </label>
          <MultiSelect
            options={therapeuticAreaOptions}
            selected={filters.therapeuticArea || []}
            onChange={(value) => setFilters(prev => ({ ...prev, therapeuticArea: value }))}
            placeholder="Select therapeutic area..."
          />
        </div>
      </div>
    </div>
  );
};
