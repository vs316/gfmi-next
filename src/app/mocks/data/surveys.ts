export const mockSurveyData = [
  {
    id: 1,
    survey_name: "Q1 2024 Medical Survey - Oncology Focus",
    question: "What is your primary treatment approach for advanced NSCLC patients?",
    response: "Combination immunotherapy with chemotherapy as first-line treatment",
    country_geo_id: "United States",
    territory: "Northeast US",
    region: "North America",
    msl_name: "Dr. Sarah Johnson",
    account_name: "Mayo Clinic",
    title: "Medical Oncologist",
    date_submitted: "2024-03-15",
    respondent_id: "R001"
  },
  {
    id: 2,
    survey_name: "REGN Company Sponsored Studies - Myeloma Research",
    question: "How do you assess treatment response in myeloma patients?",
    response: "Regular monitoring of M-protein levels combined with imaging studies",
    country_geo_id: "United Kingdom",
    territory: "Western Europe",
    region: "Europe",
    msl_name: "Dr. Michael Chen",
    account_name: "Johns Hopkins Hospital",
    title: "Hematologist",
    date_submitted: "2024-02-28",
    respondent_id: "R002"
  },
  {
    id: 3,
    survey_name: "Oncology Organic Insight EU/UK - Clinical Practices",
    question: "What factors influence your choice of adjuvant therapy?",
    response: "Patient age, performance status, molecular markers, and comorbidities",
    country_geo_id: "Germany",
    territory: "Western Europe", 
    region: "Europe",
    msl_name: "Dr. Emily Rodriguez",
    account_name: "MD Anderson Cancer Center",
    title: "Medical Oncologist",
    date_submitted: "2024-03-20",
    respondent_id: "R003"
  },
  {
    id: 4,
    survey_name: "Adjuvant Practice Patterns Feedback Initiative - Moh's H&N Surgeons",
    question: "How has your prescribing pattern changed in the last 12 months?",
    response: "Increased use of targeted therapies and biomarker-guided treatment selection",
    country_geo_id: "France",
    territory: "Western Europe",
    region: "Europe",
    msl_name: "Dr. David Thompson",
    account_name: "Memorial Sloan Kettering",
    title: "Surgical Oncologist",
    date_submitted: "2024-03-10",
    respondent_id: "R004"
  },
  {
    id: 5,
    survey_name: "HBCHONC - 2024 - NSCLC",
    question: "What are the main barriers to implementing new treatment protocols?",
    response: "Cost considerations, insurance approval delays, and patient access issues",
    country_geo_id: "Canada",
    territory: "North America",
    region: "North America",
    msl_name: "Dr. Lisa Wang",
    account_name: "Cleveland Clinic",
    title: "Clinical Researcher",
    date_submitted: "2024-03-25",
    respondent_id: "R005"
  },
  {
    id: 6,
    survey_name: "Q4 2023 Medical Survey - Cardiology Insights",
    question: "How do you evaluate patient quality of life during treatment?",
    response: "Using standardized QoL questionnaires and regular patient assessments",
    country_geo_id: "Italy",
    territory: "Southern Europe",
    region: "Europe",
    msl_name: "Dr. James Miller",
    account_name: "Mass General Brigham",
    title: "Department Head",
    date_submitted: "2024-01-15",
    respondent_id: "R006"
  },
  {
    id: 7,
    survey_name: "Oncology Organic Insight US - Treatment Patterns",
    question: "What role does biomarker testing play in your treatment decisions?",
    response: "Essential for treatment selection, particularly for targeted therapies",
    country_geo_id: "United States",
    territory: "West Coast US",
    region: "North America",
    msl_name: "Dr. Maria Garcia",
    account_name: "UCSF Medical Center",
    title: "Associate Professor",
    date_submitted: "2024-02-20",
    respondent_id: "R007"
  },
  {
    id: 8,
    survey_name: "Q3 2023 Medical Survey - Neurology Trends",
    question: "How do you manage treatment-related adverse events?",
    response: "Proactive monitoring, dose modifications, and supportive care measures",
    country_geo_id: "Australia",
    territory: "Asia Pacific",
    region: "Asia Pacific",
    msl_name: "Dr. Robert Taylor",
    account_name: "Cedars-Sinai",
    title: "Senior Consultant",
    date_submitted: "2023-09-30",
    respondent_id: "R008"
  },
  {
    id: 9,
    survey_name: "REGN Company Sponsored Studies - Myeloma Research",
    question: "What is your experience with combination therapies?",
    response: "Increasingly effective but requires careful patient selection and monitoring",
    country_geo_id: "Japan",
    territory: "Asia Pacific",
    region: "Asia Pacific",
    msl_name: "Dr. Jennifer Lee",
    account_name: "Mount Sinai Health System",
    title: "Research Director",
    date_submitted: "2024-03-05",
    respondent_id: "R009"
  },
  {
    id: 10,
    survey_name: "Q1 2024 Medical Survey - Oncology Focus",
    question: "How do you determine optimal treatment duration?",
    response: "Based on response assessment, toxicity profile, and clinical guidelines",
    country_geo_id: "Netherlands",
    territory: "Western Europe",
    region: "Europe",
    msl_name: "Dr. Mark Anderson",
    account_name: "Dana-Farber Cancer Institute",
    title: "Chief of Oncology",
    date_submitted: "2024-03-18",
    respondent_id: "R010"
  },
  {
    id: 11,
    survey_name: "Oncology Organic Insight EU/UK - Clinical Practices",
    question: "What are your preferred first-line treatment options?",
    response: "Immunotherapy-based combinations for eligible patients",
    country_geo_id: "Spain",
    territory: "Southern Europe",
    region: "Europe",
    msl_name: "Dr. Rachel Kim",
    account_name: "Fred Hutchinson Cancer Center",
    title: "Clinical Director",
    date_submitted: "2024-02-14",
    respondent_id: "R011"
  },
  {
    id: 12,
    survey_name: "Adjuvant Practice Patterns Feedback Initiative - Moh's H&N Surgeons",
    question: "How do you approach treatment in elderly patients?",
    response: "Comprehensive geriatric assessment and modified treatment protocols",
    country_geo_id: "Belgium",
    territory: "Western Europe",
    region: "Europe",
    msl_name: "Dr. Thomas Wilson",
    account_name: "Mayo Clinic",
    title: "Medical Oncologist",
    date_submitted: "2024-03-12",
    respondent_id: "R012"
  }
];

// Generate additional mock data programmatically
const generateAdditionalMockData = (count: number) => {
  const additionalData = [];
  const baseData = mockSurveyData[0];
  
  for (let i = 13; i <= count; i++) {
    additionalData.push({
      ...baseData,
      id: i,
      respondent_id: `R${String(i).padStart(3, '0')}`,
      date_submitted: new Date(2024, Math.floor(Math.random() * 4), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      survey_name: mockSurveyData[Math.floor(Math.random() * 8)].survey_name,
      question: mockSurveyData[Math.floor(Math.random() * 12)].question,
      response: `Sample response ${i} for survey data simulation`,
    });
  }
  
  return additionalData;
};

export const completeMockSurveyData = [
  ...mockSurveyData,
  ...generateAdditionalMockData(50) // Generate 50 total records
];