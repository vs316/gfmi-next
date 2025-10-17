export interface Survey {
  survey_qstn_resp_id: string;
  survey_qstn_resp_key: string;
  survey_key: string;
  msl_key: string;
  src_cd: string;
  account_key?: string;
  survey_name: string;
  question?: string;
  response?: string;
  msl_name?: string;
  account_name?: string;
  country_geo_id?: string;
  territory?: string;
  title?: string;
  department?: string;
  start_date?: string;
  end_date?: string;
  status?: string;
  useremail?: string;
  usertype?: string;
  company?: string;
  name?: string;
}

export interface SurveyListResponse {
  surveys: Survey[];
  total: number;
  page: number;
  size: number;
  total_pages: number;
}

export interface SurveyFilters {
  // Teams and Organizations - Accept arrays for multiple selections
  msl_name?: string | string[];
  title?: string | string[];
  department?: string | string[];
  user_type?: string | string[];
  
  // Geographic - Accept arrays for multiple selections
  region?: string | string[];
  country_geo_id?: string | string[];
  territory?: string | string[];
  
  // Medical - Accept arrays for multiple selections
  response?: string | string[]; // tumor type
  product?: string | string[];
  
  // Healthcare provider (HCP) - Accept arrays for multiple selections
  account_name?: string | string[];
  company?: string | string[];
  name?: string | string[];
  usertype?: string | string[];
  
  // Event & Engagement - Accept arrays for multiple selections
  channels?: string | string[];
  assignment_type?: string | string[];
  
  // Surveys - Accept arrays for multiple selections
  survey_name?: string | string[];
  question?: string; // Keep as single string for LIKE search
  
  // Pagination
  page?: number;
  size?: number;
}

export interface ApiFilterOptions {
  // Teams and Organizations
  msl_names: string[];
  titles: string[];
  departments: string[];
  user_types: string[];
  
  // Geographic
  regions: string[];
  countries: string[];
  territories: string[];
  states: string[];
  
  // Medical
  tumor_types: string[];
  products: string[];
  
  // Healthcare provider (HCP)
  account_names: string[];
  institutions: string[];
  specialties: string[];
  
  // Event & Engagement
  channels: string[];
  assignment_types: string[];
  
  // Surveys
  survey_names: string[];
  questions: string[];
}
