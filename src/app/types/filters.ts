import { DateRange } from "react-day-picker";

export interface Filters {
  // GeographicFilter keys
  region: string[];
  country: string[];
  state: string[];
  province: string[];
  city: string[];
  // HealthcareFilter keys
  specialty: string[];
  tier: string[];
  practiceSetting: string[];
  // SurveyFilter keys
  surveyQuestion: string[];
  specificSurvey: string[];
  // EventEngagementFilter keys
  conferences: string[];
  advisoryBoards: string[];
  // TeamOrganizationFilter keys
  teamOrg: string[];
  nationalDirector: string[];
  regionalDirector: string[];
  msl: string[];
  // TherapeuticFilter keys
  therapeuticArea: string[];
  tumourType: string[];
  // DateRangeFilter key
  customDateRange: { from: string; to: string; label?: string } | null;
  dateRange: string;
}

export interface FilterProps {
  filters: Filters;
  setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
  onClearAll?: () => void;
  datasetCount?: number;
}

export interface MarkdownComponentProps {
  children: React.ReactNode;
  className?: string;
  inline?: boolean;
}
