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
  // Teams and Organizations
  msl_name?: string;
  title?: string;
  department?: string;
  user_type?: string;
  
  // Geographic
  region?: string;
  country_geo_id?: string;
  territory?: string;
  
  // Medical
  response?: string; // tumor type
  product?: string;
  
  // Healthcare provider (HCP)
  account_name?: string;
  company?: string;
  name?: string;
  usertype?: string;
  
  // Event & Engagement
  channels?: string;
  assignment_type?: string;
  
  // Surveys
  survey_name?: string;
  question?: string;
  
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