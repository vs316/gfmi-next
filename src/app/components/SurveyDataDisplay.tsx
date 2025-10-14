// import { useSurveys } from "@/hooks/useSurveyData";
// import { SurveyFilters } from "@/types/survey";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { LoadingSkeleton } from "@/components/LoadingSkeleton";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";

// interface SurveyDataDisplayProps {
//   filters: SurveyFilters;
// }

// export const SurveyDataDisplay = ({ filters }: SurveyDataDisplayProps) => {
//   const { data: surveyData, isLoading, error } = useSurveys(filters);

//   if (isLoading) {
//     return (
//       <Card className="h-full">
//         <CardHeader>
//           <CardTitle>Survey Data</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <LoadingSkeleton />
//         </CardContent>
//       </Card>
//     );
//   }

//   if (error) {
//     return (
//       <Card className="h-full">
//         <CardHeader>
//           <CardTitle>Survey Data</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-red-500">Failed to load survey data</p>
//         </CardContent>
//       </Card>
//     );
//   }

//   const { surveys, total, page, size, total_pages } = surveyData || {
//     surveys: [],
//     total: 0,
//     page: 1,
//     size: 50,
//     total_pages: 0
//   };

//   return (
//     <Card className="h-full">
//       <CardHeader>
//         <CardTitle className="flex items-center justify-between">
//           <span>Survey Data</span>
//           <Badge variant="secondary">
//             {total} total records
//           </Badge>
//         </CardTitle>
//         <p className="text-sm text-muted-foreground">
//           Showing {surveys.length} of {total} surveys (Page {page} of {total_pages})
//         </p>
//       </CardHeader>
//       <CardContent className="p-0">
//         <ScrollArea className="h-[600px]">
//           <div className="p-6 space-y-4">
//             {surveys.length === 0 ? (
//               <div className="text-center py-8">
//                 <p className="text-muted-foreground">No surveys found matching your filters.</p>
//               </div>
//             ) : (
//               surveys.map((survey, index) => (
//                 <div key={survey.survey_qstn_resp_id} className="space-y-2">
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1">
//                       <h4 className="font-medium text-sm">
//                         {survey.survey_name || 'Unknown Survey'}
//                       </h4>
//                       <p className="text-xs text-muted-foreground mt-1">
//                         ID: {survey.survey_qstn_resp_id}
//                       </p>
//                     </div>
//                     <div className="flex gap-1 flex-wrap">
//                       {survey.country_geo_id && (
//                         <Badge variant="outline" className="text-xs">
//                           {survey.country_geo_id}
//                         </Badge>
//                       )}
//                       {survey.response && (
//                         <Badge variant="secondary" className="text-xs">
//                           {survey.response}
//                         </Badge>
//                       )}
//                     </div>
//                   </div>
                  
//                   {survey.question && (
//                     <p className="text-xs text-muted-foreground">
//                       <strong>Q:</strong> {survey.question.length > 100 
//                         ? `${survey.question.substring(0, 100)}...` 
//                         : survey.question}
//                     </p>
//                   )}
                  
//                   <div className="grid grid-cols-2 gap-2 text-xs">
//                     {survey.msl_name && (
//                       <div>
//                         <span className="font-medium">MSL:</span> {survey.msl_name}
//                       </div>
//                     )}
//                     {survey.account_name && (
//                       <div>
//                         <span className="font-medium">Account:</span> {survey.account_name}
//                       </div>
//                     )}
//                     {survey.title && (
//                       <div>
//                         <span className="font-medium">Title:</span> {survey.title}
//                       </div>
//                     )}
//                     {survey.territory && (
//                       <div>
//                         <span className="font-medium">Territory:</span> {survey.territory}
//                       </div>
//                     )}
//                   </div>
                  
//                   {index < surveys.length - 1 && <Separator className="mt-4" />}
//                 </div>
//               ))
//             )}
//           </div>
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   );
// };
"use client";
import { useSurveys } from "@/app/hooks/useSurveyData";
import { SurveyFilters } from "@/app/types/survey";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { LoadingSkeleton } from "@/app/components/LoadingSkeleton";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Separator } from "@/app/components/ui/separator";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface SurveyDataDisplayProps {
  filters: SurveyFilters;
}

export const SurveyDataDisplay = ({ filters }: SurveyDataDisplayProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50;

  const paginatedFilters = {
    ...filters,
    page: currentPage,
    size: pageSize
  };
  
  const { data: surveyData, isLoading, error } = useSurveys(paginatedFilters);
  
  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Survey Data</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingSkeleton />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Survey Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Failed to load survey data</p>
        </CardContent>
      </Card>
    );
  }

  // const { surveys, total, page, size, total_pages } = surveyData || {
  //   surveys: [],
  //   total: 0,
  //   page: 1,
  //   size: 50,
  //   total_pages: 0
  // };
  const { 
    surveys = [], 
    total = 0, 
    page = 1, 
    size = 50, 
    total_pages = 0 
  } = surveyData || {};
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < total_pages) {
      setCurrentPage(currentPage + 1);
    }
  };
 
  return (
    <Card className="h-full flex flex-col">
      {/* Header - REMOVED pagination from here */}
      <CardHeader className="flex-shrink-0 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle>Survey Data</CardTitle>
          <Badge variant="secondary">
            {total} total records
          </Badge>
        </div>
        
        {/* Simple info only - NO pagination controls */}
        <div className="text-sm text-muted-foreground">
          Showing {((currentPage - 1) * pageSize) + 1}-{Math.min(currentPage * pageSize, total)} of {total} surveys
        </div>
      </CardHeader>
      
      {/* Content Area - FIXED height and scrolling */}
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-6 pb-20 space-y-4"> {/* Added pb-20 for bottom padding */}
            {surveys.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No surveys found matching your filters.</p>
              </div>
            ) : (
              surveys.map((survey, index) => (
                <div key={survey.survey_qstn_resp_id|| `survey-row-${index}`} className="space-y-3 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0"> {/* Added min-w-0 for text truncation */}
                      <h4 className="font-medium text-sm truncate">
                        {survey.survey_name || 'Unknown Survey'}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        ID: {survey.survey_qstn_resp_id}
                      </p>
                    </div>
                    <div className="flex gap-1 flex-wrap flex-shrink-0">
                      {survey.country_geo_id && (
                        <Badge variant="outline" className="text-xs">
                          {survey.country_geo_id}
                        </Badge>
                      )}
                      {survey.response && (
                        <Badge variant="secondary" className="text-xs">
                          {survey.response}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {survey.question && (
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <strong>Q:</strong> {survey.question.length > 150 
                        ? `${survey.question.substring(0, 150)}...` 
                        : survey.question}
                    </p>
                  )}
                  
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {survey.msl_name && (
                      <div className="truncate">
                        <span className="font-medium">MSL:</span> <span className="text-muted-foreground">{survey.msl_name}</span>
                      </div>
                    )}
                    {survey.account_name && (
                      <div className="truncate">
                        <span className="font-medium">Account:</span> <span className="text-muted-foreground">{survey.account_name}</span>
                      </div>
                    )}
                    {survey.title && (
                      <div className="truncate">
                        <span className="font-medium">Title:</span> <span className="text-muted-foreground">{survey.title}</span>
                      </div>
                    )}
                    {survey.territory && (
                      <div className="truncate">
                        <span className="font-medium">Territory:</span> <span className="text-muted-foreground">{survey.territory}</span>
                      </div>
                    )}
                  </div>
                  
                  {index < surveys.length - 1 && <Separator className="mt-4" />}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
      
      {/* Bottom Pagination ONLY - FIXED */}
      <div className="flex-shrink-0 border-t bg-muted/30">
        <div className="flex items-center justify-center gap-2 p-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, total_pages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className="w-8 h-8 p-0"
                >
                  {pageNum}
                </Button>
              );
            })}
            {total_pages > 5 && <span className="text-sm text-muted-foreground">...</span>}
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleNextPage}
            disabled={currentPage >= total_pages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </Card>
  );
};