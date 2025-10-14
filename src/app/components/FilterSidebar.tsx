// import { RotateCcw, Save, Download } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { DateRangeFilter } from "@/components/filters/DateRangeFilter";
// import { TeamOrganizationFilter } from "@/components/filters/TeamOrganizationFilter";
// import { GeographicFilter } from "@/components/filters/GeographicFilter";
// import { HealthcareFilter } from "@/components/filters/HealthcareFilter";
// import { EventEngagementFilter } from "@/components/filters/EventEngagementFilter";
// import { SurveyFilter } from "@/components/filters/SurveyFilter";
// import { ExportDatasetDialog } from "@/components/ExportDatasetDialog";
// import { useState } from "react";
// import { toast } from "sonner";

// interface FilterSidebarProps {
//   filters: any;
//   setFilters: (filters: any) => void;
//   onClearAll: () => void;
// }

// export const FilterSidebar = ({ filters, setFilters, onClearAll }: FilterSidebarProps) => {
//   const [exportDialogOpen, setExportDialogOpen] = useState(false);

//   const handleSaveFilters = () => {
//     // Mock save functionality
//     toast.success("Filters saved successfully");
//   };

//   const handleClearAll = () => {
//     onClearAll();
//     toast.info("All filters cleared");
//   };

//   return (
//     <aside className="hidden lg:flex w-80 flex-col border-r border-border bg-sidebar-background">
//       <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-6">
//         <h2 className="text-lg font-semibold text-sidebar-foreground">Filters</h2>
//         <Button
//           variant="ghost"
//           size="sm"
//           onClick={handleClearAll}
//           className="text-muted-foreground hover:text-foreground"
//         >
//           <RotateCcw className="mr-2 h-4 w-4" />
//           Clear All
//         </Button>
//       </div>

//       <ScrollArea className="flex-1 custom-scrollbar">
//         <div className="space-y-6 p-6">
//           {/* Action Buttons */}
//           <div className="space-y-2">
//             <Button
//               variant="outline"
//               className="w-full justify-start"
//               onClick={handleSaveFilters}
//             >
//               <Save className="mr-2 h-4 w-4" />
//               Save Current Filters
//             </Button>
//             <Button
//               variant="outline"
//               className="w-full justify-start"
//               onClick={() => setExportDialogOpen(true)}
//             >
//               <Download className="mr-2 h-4 w-4" />
//               Export Dataset
//             </Button>
//           </div>

//           <Separator />

//           {/* Timeline Section */}
//           <DateRangeFilter filters={filters} setFilters={setFilters} />

//           <Separator />

//           {/* Team & Organization */}
//           <TeamOrganizationFilter filters={filters} setFilters={setFilters} />

//           <Separator />

//           {/* Geographic */}
//           <GeographicFilter filters={filters} setFilters={setFilters} />

//           <Separator />

//           {/* Healthcare Specific */}
//           <HealthcareFilter filters={filters} setFilters={setFilters} />

//           <Separator />

//           {/* Event & Engagement */}
//           <EventEngagementFilter filters={filters} setFilters={setFilters} />

//           <Separator />

//           {/* Surveys */}
//           <SurveyFilter filters={filters} setFilters={setFilters} />
//         </div>
//       </ScrollArea>

//       <ExportDatasetDialog 
//         open={exportDialogOpen} 
//         onOpenChange={setExportDialogOpen}
//         datasetCount={250000}
//         filters={filters}
//       />
//     </aside>
//   );
// };
import { RotateCcw, Save, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DateRangeFilter } from "@/components/filters/DateRangeFilter";
import { TeamOrganizationFilter } from "@/components/filters/TeamOrganizationFilter";
import { GeographicFilter } from "@/components/filters/GeographicFilter";
import { HealthcareFilter } from "@/components/filters/HealthcareFilter";
import { EventEngagementFilter } from "@/components/filters/EventEngagementFilter";
import { SurveyFilter } from "@/components/filters/SurveyFilter";
import { TherapeuticFilter } from "@/components/filters/TherapeuticFilter";
import { ExportDatasetDialog } from "@/components/ExportDatasetDialog";
import { useState } from "react";
import { toast } from "sonner";
import { Filters } from "@/types/filters";

interface FilterSidebarProps {
  filters: Filters;
  setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
  onClearAll: () => void;
}

export const FilterSidebar = ({ filters, setFilters, onClearAll }: FilterSidebarProps) => {
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  const handleSaveFilters = () => {
    // Mock save functionality
    toast.success("Filters saved successfully");
  };

  const handleClearAll = () => {
    onClearAll();
    toast.info("All filters cleared");
  };

  return (
    <div className="flex h-full w-full flex-col border-r border-border bg-sidebar-background">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="h-8 px-3"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>

        {/* Action Buttons - Stacked vertically */}
        <div className="flex flex-col gap-3 px-6 py-4 border-b border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveFilters}
            className="w-full justify-start"
          >
            <Save className="h-4 w-4 mr-3" />
            Save Current Filters
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExportDialogOpen(true)}
            className="w-full justify-start"
          >
            <Download className="h-4 w-4 mr-3" />
            Export Dataset
          </Button>
        </div>

        {/* Scrollable Filter Content */}
        <ScrollArea className="flex-1">
          <div className="px-6 pb-6">
            <div className="space-y-6">
              {/* Timeline Section */}
              <DateRangeFilter filters={filters} setFilters={setFilters} />
              
              <Separator />

              {/* Team & Organization */}
              <TeamOrganizationFilter filters={filters} setFilters={setFilters} />
              
              <Separator />

              {/* Geographic */}
              <GeographicFilter filters={filters} setFilters={setFilters} />
              
              <Separator />

              {/* Healthcare Specific */}
              <HealthcareFilter filters={filters} setFilters={setFilters} />
              
              <Separator />

              {/* Therapeutic Area */}
              <TherapeuticFilter filters={filters} setFilters={setFilters} />
              
              <Separator />

              {/* Event & Engagement */}
              <EventEngagementFilter filters={filters} setFilters={setFilters} />
              
              <Separator />

              {/* Surveys */}
              <SurveyFilter filters={filters} setFilters={setFilters} />
            </div>
          </div>
        </ScrollArea>
      </div>

      <ExportDatasetDialog 
        open={exportDialogOpen} 
        onOpenChange={setExportDialogOpen}
        datasetCount={250000}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
};