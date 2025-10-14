// import { MultiSelect } from "@/components/ui/multi-select";
// import { Filters } from "@/types/filters";

// interface GeographicFilterProps {
//   filters: Filters;
//   setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
// }

// const regionOptions = [
//   { value: "north-america", label: "North America" },
//   { value: "europe", label: "Europe" },
//   { value: "asia-pacific", label: "Asia Pacific" },
//   { value: "latin-america", label: "Latin America" },
// ];

// const countryOptions = [
//   { value: "usa", label: "United States" },
//   { value: "canada", label: "Canada" },
//   { value: "uk", label: "United Kingdom" },
//   { value: "germany", label: "Germany" },
//   { value: "france", label: "France" },
// ];

// const stateOptions = [
//   { value: "ca", label: "California" },
//   { value: "ny", label: "New York" },
//   { value: "tx", label: "Texas" },
//   { value: "fl", label: "Florida" },
//   { value: "il", label: "Illinois" },
// ];

// const provinceOptions = [
//   { value: "on", label: "Ontario" },
//   { value: "qc", label: "Quebec" },
//   { value: "bc", label: "British Columbia" },
// ];

// const cityOptions = [
//   { value: "new-york", label: "New York" },
//   { value: "los-angeles", label: "Los Angeles" },
//   { value: "chicago", label: "Chicago" },
//   { value: "toronto", label: "Toronto" },
// ];

// export const GeographicFilter = ({
//   filters,
//   setFilters,
// }: GeographicFilterProps) => {
//   // Check if Canada is selected
//   const isCanadaSelected = filters.country.includes("canada");
  
//   return (
//     <div className="space-y-4">
//       <h3 className="text-sm font-medium text-sidebar-foreground">Geographic</h3>

//       <div className="space-y-3">
//         <div>
//           <label className="mb-1.5 block text-xs font-medium text-sidebar-foreground">
//             Region
//           </label>
//           <MultiSelect
//             options={regionOptions}
//             selected={filters.region}
//             onChange={(value) => setFilters({ ...filters, region: value })}
//             placeholder="Search region..."
//           />
//         </div>

//         <div>
//           <label className="mb-1.5 block text-xs font-medium text-sidebar-foreground">
//             Country
//           </label>
//           <MultiSelect
//             options={countryOptions}
//             selected={filters.country}
//             onChange={(value) => {
//               // Clear province/state when country changes
//               setFilters({ 
//                 ...filters, 
//                 country: value,
//                 province: value.includes("canada") ? filters.province : [],
//                 state: !value.includes("canada") ? filters.state : []
//               });
//             }}
//             placeholder="Search country..."
//           />
//         </div>

//         {/* Show Province for Canada */}
//         {isCanadaSelected && (
//           <div>
//             <label className="mb-1.5 block text-xs font-medium text-sidebar-foreground">
//               Province
//             </label>
//             <MultiSelect
//               options={provinceOptions}
//               selected={filters.province}
//               onChange={(value) => setFilters({ ...filters, province: value })}
//               placeholder="Search province..."
//             />
//           </div>
//         )}

//         {/* Show State for other countries */}
//         {!isCanadaSelected && (
//           <div>
//             <label className="mb-1.5 block text-xs font-medium text-sidebar-foreground">
//               State
//             </label>
//             <MultiSelect
//               options={stateOptions}
//               selected={filters.state}
//               onChange={(value) => setFilters({ ...filters, state: value })}
//               placeholder="Search state..."
//             />
//           </div>
//         )}

//         <div>
//           <label className="mb-1.5 block text-xs font-medium text-sidebar-foreground">
//             City
//           </label>
//           <MultiSelect
//             options={cityOptions}
//             selected={filters.city}
//             onChange={(value) => setFilters({ ...filters, city: value })}
//             placeholder="Search city..."
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
import { MultiSelect } from "@/components/ui/multi-select";
import { Filters } from "@/types/filters";
import { useFilterOptions } from "@/hooks/useSurveyData";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { useMemo, useEffect } from "react";

interface GeographicFilterProps {
  filters: Filters;
  setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
}

export const GeographicFilter = ({
  filters,
  setFilters,
}: GeographicFilterProps) => {
  const { data: filterOptions, isLoading, error } = useFilterOptions();

  // Convert API data to MultiSelect format
  const regionOptions = useMemo(() => 
    filterOptions?.regions?.map(region => ({
      value: region,
      label: region
    })) || [], [filterOptions?.regions]
  );

  const countryOptions = useMemo(() => 
    filterOptions?.countries?.map(country => ({
      value: country,
      label: country
    })) || [], [filterOptions?.countries]
  );

  const territoryOptions = useMemo(() => 
    filterOptions?.territories?.map(territory => ({
      value: territory,
      label: territory
    })) || [], [filterOptions?.territories]
  );

  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Geographic
        </h3>
        <LoadingSkeleton />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Geographic
        </h3>
        <p className="text-sm text-red-500">Failed to load geographic filters</p>
      </div>
    );
  }

  // Map your current filter structure to API filters
  const handleRegionChange = (values: string[]) => {
    setFilters(prev => ({ ...prev, region: values }));
  };

  const handleCountryChange = (values: string[]) => {
    setFilters(prev => ({ ...prev, country: values }));
  };

  // For territories, we can map to state for now since your current structure uses state
  const handleTerritoryChange = (values: string[]) => {
    setFilters(prev => ({ ...prev, state: values }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
        Geographic
      </h3>
      
      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">
            Region
          </label>
          <MultiSelect
            options={regionOptions}
            selected={filters.region}
            onChange={handleRegionChange}
            placeholder="Search region..."
          />
        </div>
        
        <div>
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">
            Country
          </label>
          <MultiSelect
            options={countryOptions}
            selected={filters.country}
            onChange={handleCountryChange}
            placeholder="Search country..."
          />
        </div>
        
        <div>
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">
            Territory
          </label>
          <MultiSelect
            options={territoryOptions}
            selected={filters.state} // Using state field for territories
            onChange={handleTerritoryChange}
            placeholder="Search territory..."
          />
        </div>

        {/* Keep existing city and province fields for compatibility */}
        <div>
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">
            Province
          </label>
          <MultiSelect
            options={[]} // Empty for now, can be populated based on country selection
            selected={filters.province}
            onChange={(value) => setFilters(prev => ({ ...prev, province: value }))}
            placeholder="Search province..."
          />
        </div>
        
        <div>
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">
            City
          </label>
          <MultiSelect
            options={[]} // Empty for now, can be populated based on state/province selection
            selected={filters.city}
            onChange={(value) => setFilters(prev => ({ ...prev, city: value }))}
            placeholder="Search city..."
          />
        </div>
      </div>
    </div>
  );
};