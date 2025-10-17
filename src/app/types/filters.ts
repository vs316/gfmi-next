
export interface Filters {
  // Date Range
  dateRange?: string;
  customDateRange?: {
    id: string;
    from: string;
    to: string;
    label?: string;
  } | null;
  savedCustomRanges?: Array<{
    id: string;
    from: string;
    to: string;
    label?: string;
  }>;
  
  // Team & Organization
  teamOrg?: string[];
  nationalDirector?: string[];
  regionalDirector?: string[];
  msl?: string[];
  title?: string[];
  department?: string[];
  userType?: string[];
  
  // Geographic
  region?: string[];
  country?: string[];
  territory?: string[];
  state?: string[];
  province?: string[];
  city?: string[];
  
  // Survey
  surveyName?: string[];
  question?: string[];
  specificSurvey?: string[];
  surveyQuestion?: string[];
  
  // Therapeutic
  therapeuticArea?: string[];
  tumourType?: string[];
  
  // Healthcare
  specialty?: string[];
  tier?: string[];
  practiceSetting?: string[];
  
  // Events & Engagement
  conferences?: string[];
  advisoryBoards?: string[];
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
