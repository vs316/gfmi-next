// import { MultiSelect } from "@/components/ui/multi-select";
// import { Filters } from "@/types/filters";

// interface TeamOrganizationFilterProps {
//   filters: Filters;
//   setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
// }

// const teamOrgOptions = [
//   { value: "ta", label: "TA" },
//   { value: "medical-affairs", label: "Medical Affairs" },
//   { value: "clinical-ops", label: "Clinical Operations" },
//   { value: "regulatory", label: "Regulatory Affairs" },
// ];

// const nationalDirectorOptions = [
//   { value: "john-smith", label: "John Smith" },
//   { value: "sarah-johnson", label: "Sarah Johnson" },
//   { value: "michael-brown", label: "Michael Brown" },
//   { value: "emily-davis", label: "Emily Davis" },
// ];

// const regionalDirectorOptions = [
//   { value: "david-wilson", label: "David Wilson" },
//   { value: "lisa-moore", label: "Lisa Moore" },
//   { value: "james-taylor", label: "James Taylor" },
//   { value: "patricia-anderson", label: "Patricia Anderson" },
// ];

// const mslOptions = [
//   { value: "robert-thomas", label: "Robert Thomas" },
//   { value: "jennifer-martinez", label: "Jennifer Martinez" },
//   { value: "william-garcia", label: "William Garcia" },
//   { value: "elizabeth-rodriguez", label: "Elizabeth Rodriguez" },
// ];

// export const TeamOrganizationFilter = ({
//   filters,
//   setFilters,
// }: TeamOrganizationFilterProps) => {
//   return (
//     <div className="space-y-4">
//       <h3 className="text-sm font-medium text-sidebar-foreground">
//         Team & Organization
//       </h3>

//       <div className="space-y-3">
//         <div>
//           <label className="mb-1.5 block text-xs font-medium text-sidebar-foreground">
//             TA
//           </label>
//           <MultiSelect
//             options={teamOrgOptions}
//             selected={filters.teamOrg}
//             onChange={(value) => setFilters({ ...filters, teamOrg: value })}
//             placeholder="Search ta..."
//           />
//         </div>

//         <div>
//           <label className="mb-1.5 block text-xs font-medium text-sidebar-foreground">
//             National Director
//           </label>
//           <MultiSelect
//             options={nationalDirectorOptions}
//             selected={filters.nationalDirector}
//             onChange={(value) =>
//               setFilters({ ...filters, nationalDirector: value })
//             }
//             placeholder="Search national director..."
//           />
//         </div>

//         <div>
//           <label className="mb-1.5 block text-xs font-medium text-sidebar-foreground">
//             Regional Director
//           </label>
//           <MultiSelect
//             options={regionalDirectorOptions}
//             selected={filters.regionalDirector}
//             onChange={(value) =>
//               setFilters({ ...filters, regionalDirector: value })
//             }
//             placeholder="Search regional director..."
//           />
//         </div>

//         <div>
//           <label className="mb-1.5 block text-xs font-medium text-sidebar-foreground">
//             MSL
//           </label>
//           <MultiSelect
//             options={mslOptions}
//             selected={filters.msl}
//             onChange={(value) => setFilters({ ...filters, msl: value })}
//             placeholder="Search msl..."
//           />
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

interface TeamOrganizationFilterProps {
  filters: Filters;
  setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
}

export const TeamOrganizationFilter = ({
  filters,
  setFilters,
}: TeamOrganizationFilterProps) => {
  const { data: filterOptions, isLoading, error } = useFilterOptions();

  // Convert API data to MultiSelect format
  const mslOptions = useMemo(() => 
    filterOptions?.msl_names?.map(msl => ({
      value: msl,
      label: msl
    })) || [], [filterOptions?.msl_names]
  );

  const titleOptions = useMemo(() => 
    filterOptions?.titles?.map(title => ({
      value: title,
      label: title
    })) || [], [filterOptions?.titles]
  );

  const departmentOptions = useMemo(() => 
    filterOptions?.departments?.map(dept => ({
      value: dept,
      label: dept
    })) || [], [filterOptions?.departments]
  );

  const userTypeOptions = useMemo(() => 
    filterOptions?.user_types?.map(type => ({
      value: type,
      label: type
    })) || [], [filterOptions?.user_types]
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Team & Organization
        </h3>
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Team & Organization
        </h3>
        <p className="text-sm text-red-500">Failed to load team filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
        Team & Organization
      </h3>
      
      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">
            MSL (Medical Science Liaison)
          </label>
          <MultiSelect
            options={mslOptions}
            selected={filters.msl}
            onChange={(value) => setFilters(prev => ({ ...prev, msl: value }))}
            placeholder="Search MSL..."
          />
        </div>
        
        <div>
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">
            Title
          </label>
          <MultiSelect
            options={titleOptions}
            selected={filters.teamOrg} // Map to teamOrg for compatibility
            onChange={(value) => setFilters(prev => ({ ...prev, teamOrg: value }))}
            placeholder="Search title..."
          />
        </div>
        
        <div>
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">
            National Director
          </label>
          <MultiSelect
            options={titleOptions.filter(opt => opt.label.toLowerCase().includes('director'))}
            selected={filters.nationalDirector}
            onChange={(value) => setFilters(prev => ({ ...prev, nationalDirector: value }))}
            placeholder="Search national director..."
          />
        </div>
        
        <div>
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">
            Regional Director
          </label>
          <MultiSelect
            options={titleOptions.filter(opt => opt.label.toLowerCase().includes('regional'))}
            selected={filters.regionalDirector}
            onChange={(value) => setFilters(prev => ({ ...prev, regionalDirector: value }))}
            placeholder="Search regional director..."
          />
        </div>
      </div>
    </div>
  );
};