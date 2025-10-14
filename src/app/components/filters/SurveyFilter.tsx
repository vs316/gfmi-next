// import { MultiSelect } from "@/components/ui/multi-select";
// import { Input } from "@/components/ui/input";
// import { Lightbulb } from "lucide-react";
// import { useState } from "react";
// import { Filters } from "@/types/filters";

// interface SurveyFilterProps {
//   filters: Filters;
//   setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
// }

// const surveyOptions = [
//   { value: "q1-2024", label: "Q1 2024 Medical Survey" },
//   { value: "q4-2023", label: "Q4 2023 Medical Survey" },
//   { value: "q3-2023", label: "Q3 2023 Medical Survey" },
//   { value: "oncology-us", label: "Oncology Organic Insight US" },
//   { value: "oncology-eu-uk", label: "Oncology Organic Insight EU/UK" },
// ];

// export const SurveyFilter = ({ filters, setFilters }: SurveyFilterProps) => {
//   const [customQuestion, setCustomQuestion] = useState("");

//   const handleAddCustomQuestion = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && customQuestion.trim()) {
//       const newQuestions = [...filters.surveyQuestion, customQuestion.trim()];
//       setFilters({ ...filters, surveyQuestion: newQuestions });
//       setCustomQuestion("");
//     }
//   };

//   const handleRemoveQuestion = (question: string) => {
//     const newQuestions = filters.surveyQuestion.filter((q: string) => q !== question);
//     setFilters({ ...filters, surveyQuestion: newQuestions });
//   };

//   return (
//     <div className="space-y-4">
//       <h3 className="text-sm font-medium text-sidebar-foreground">Surveys</h3>

//       <div className="space-y-3">
//         <div>
//           <label className="mb-1.5 block text-xs font-medium text-sidebar-foreground">
//             Specific Survey
//           </label>
//           <MultiSelect
//             options={surveyOptions}
//             selected={filters.specificSurvey}
//             onChange={(value) =>
//               setFilters({ ...filters, specificSurvey: value })
//             }
//             placeholder="Search specific survey..."
//           />
//         </div>

//         <div>
//           <label className="mb-1.5 block text-xs font-medium text-sidebar-foreground">
//             Survey Question
//           </label>
//           <Input
//             type="text"
//             placeholder="Search survey questions or add custom..."
//             value={customQuestion}
//             onChange={(e) => setCustomQuestion(e.target.value)}
//             onKeyDown={handleAddCustomQuestion}
//             className="text-xs"
//           />
//           <div className="mt-2 flex items-start gap-1.5 rounded-md bg-muted/50 p-2">
//             <Lightbulb className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground" />
//             <p className="text-xs text-muted-foreground">
//               Type custom search terms or select from suggestions. Press Enter to add.
//             </p>
//           </div>
//           {filters.surveyQuestion.length > 0 && (
//             <div className="mt-2 flex flex-wrap gap-1">
//               {filters.surveyQuestion.map((question: string, index: number) => (
//                 <span
//                   key={index}
//                   className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs text-primary"
//                 >
//                   {question}
//                   <button
//                     onClick={() => handleRemoveQuestion(question)}
//                     className="hover:text-primary/80"
//                   >
//                     ×
//                   </button>
//                 </span>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// import { MultiSelect } from "@/components/ui/multi-select";
// import { Filters } from "@/types/filters";
// import { useFilterOptions } from "@/hooks/useSurveyData";
// import { LoadingSkeleton } from "@/components/LoadingSkeleton";
// import { useMemo } from "react";

// interface SurveyFilterProps {
//   filters: Filters;
//   setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
// }

// export const SurveyFilter = ({
//   filters,
//   setFilters,
// }: SurveyFilterProps) => {
//   const { data: filterOptions, isLoading, error } = useFilterOptions();

//   // Convert API data to MultiSelect format
//   const surveyNameOptions = useMemo(() => 
//     filterOptions?.survey_names?.map(survey => ({
//       value: survey,
//       label: survey.length > 50 ? `${survey.substring(0, 50)}...` : survey
//     })) || [], [filterOptions?.survey_names]
//   );

//   const questionOptions = useMemo(() => 
//     filterOptions?.questions?.map(question => ({
//       value: question,
//       label: question.length > 80 ? `${question.substring(0, 80)}...` : question
//     })) || [], [filterOptions?.questions]
//   );

//   if (isLoading) {
//     return (
//       <div className="space-y-4">
//         <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
//           Surveys
//         </h3>
//         <LoadingSkeleton />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="space-y-4">
//         <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
//           Surveys
//         </h3>
//         <p className="text-sm text-red-500">Failed to load survey filters</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
//         Surveys
//       </h3>
      
//       <div className="space-y-3">
//         <div>
//           <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">
//             Survey Name
//           </label>
//           <MultiSelect
//             options={surveyNameOptions}
//             selected={filters.specificSurvey}
//             onChange={(value) => setFilters(prev => ({ ...prev, specificSurvey: value }))}
//             placeholder="Search surveys..."
//           />
//         </div>
        
//         <div>
//           <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">
//             Survey Question
//           </label>
//           <MultiSelect
//             options={questionOptions}
//             selected={filters.surveyQuestion}
//             onChange={(value) => setFilters(prev => ({ ...prev, surveyQuestion: value }))}
//             placeholder="Search questions..."
//           />
//         </div>
//       </div>
//     </div>
//   );
// };


// import { TooltipMultiSelect } from "@/components/ui/tooltip-multi-select";
// import { Filters } from "@/types/filters";
// import { useFilterOptions } from "@/hooks/useSurveyData";
// import { LoadingSkeleton } from "@/components/LoadingSkeleton";
// import { useMemo } from "react";

// interface SurveyFilterProps {
//   filters: Filters;
//   setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
// }

// export const SurveyFilter = ({
//   filters,
//   setFilters,
// }: SurveyFilterProps) => {
//   const { data: filterOptions, isLoading, error } = useFilterOptions();

//   // Convert API data with smart truncation and tooltips
//   const surveyNameOptions = useMemo(() => 
//     filterOptions?.survey_names?.map(survey => ({
//       value: survey,
//       label: survey // Keep full text for tooltip, truncation handled in component
//     })) || [], [filterOptions?.survey_names]
//   );

//   const questionOptions = useMemo(() => 
//     filterOptions?.questions?.map(question => ({
//       value: question,
//       label: question // Keep full text for tooltip
//     })) || [], [filterOptions?.questions]
//   );

//   if (isLoading) {
//     return (
//       <div className="space-y-4">
//         <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
//           Surveys
//         </h3>
//         <LoadingSkeleton />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="space-y-4">
//         <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
//           Surveys
//         </h3>
//         <p className="text-sm text-red-500">Failed to load survey filters</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
//         Surveys
//       </h3>
      
//       <div className="space-y-3">
//         <div className="w-full"> {/* Constrain width */}
//           <label className="text-xs font-medium text-gray-600 dark:text-gray-400 scroll-mb-1.5 block">
//             Survey Name
//           </label>
//           <TooltipMultiSelect
//             options={surveyNameOptions}
//             selected={filters.specificSurvey}
//             onChange={(value) => setFilters(prev => ({ ...prev, specificSurvey: value }))}
//             placeholder="Search surveys..."
//             className="h-8 text-xs focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-gray-300"
            
//           />
//         </div>
        
//         <div className="w-full"> {/* Constrain width */}
//           <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 block">
//             Survey Question
//           </label>
//           <TooltipMultiSelect
//             options={questionOptions}
//             selected={filters.surveyQuestion}
//             onChange={(value) => setFilters(prev => ({ ...prev, surveyQuestion: value }))}
//             placeholder="Search questions..."
//             className="h-8 text-xs focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-gray-300"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
// 
import { MultiSelect } from "@/components/ui/multi-select";
import { Filters } from "@/types/filters";
import { useFilterOptions } from "@/hooks/useSurveyData";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { useMemo } from "react";

interface SurveyFilterProps {
  filters: Filters;
  setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
}

export const SurveyFilter = ({ filters, setFilters }: SurveyFilterProps) => {
  const { data: filterOptions, isLoading, error } = useFilterOptions();

  const surveyNameOptions = useMemo(() => 
    filterOptions?.survey_names?.map(survey => ({
      value: survey,
      label: survey.length > 50 ? `${survey.substring(0, 50)}...` : survey
    })) || [], [filterOptions?.survey_names]
  );

  const questionOptions = useMemo(() => 
    filterOptions?.questions?.map(question => ({
      value: question,
      label: question.length > 60 ? `${question.substring(0, 60)}...` : question
    })) || [], [filterOptions?.questions]
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-sidebar-foreground">Surveys</h3>
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-sidebar-foreground">Surveys</h3>
        <p className="text-sm text-red-500">Failed to load survey filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-sidebar-foreground">Surveys</h3>
      
      <div className="space-y-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-sidebar-foreground">
            Survey Name
          </label>
          <MultiSelect
            options={surveyNameOptions}
            selected={filters.specificSurvey || []}
            onChange={(value) => setFilters(prev => ({ ...prev, specificSurvey: value }))}
            placeholder="Search surveys..."
          />
        </div>
        
        <div>
          <label className="mb-1.5 block text-xs font-medium text-sidebar-foreground">
            Survey Question
          </label>
          <MultiSelect
            options={questionOptions}
            selected={filters.surveyQuestion || []}
            onChange={(value) => setFilters(prev => ({ ...prev, surveyQuestion: value }))}
            placeholder="Search questions..."
          />
        </div>
      </div>
    </div>
  );
};