"use client";
import { useState } from "react";
import { RotateCcw, Save, Download, SlidersHorizontal } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/app/components/ui/sheet";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Separator } from "@/app/components/ui/separator";
import { DateRangeFilter } from "@/app/components/filters/DateRangeFilter";
import { TeamOrganizationFilter } from "@/app/components/filters/TeamOrganizationFilter";
import { GeographicFilter } from "@/app/components/filters/GeographicFilter";
import { HealthcareFilter } from "@/app/components/filters/HealthcareFilter";
import { EventEngagementFilter } from "@/app/components/filters/EventEngagementFilter";
import { SurveyFilter } from "@/app/components/filters/SurveyFilter";
import { TherapeuticFilter } from "@/app/components/filters/TherapeuticFilter";
import { ExportDatasetDialog } from "@/app/components/ExportDatasetDialog";
import { toast } from "sonner";
import { Filters } from "@/app/types/filters";

interface MobileFilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: Filters;
  setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
  onClearAll: () => void;
  datasetCount: number;
}

export const MobileFilterSheet = ({
  filters,
  setFilters,
  onClearAll,
  datasetCount,
}: MobileFilterSheetProps) => {
  const [open, setOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  const handleSaveFilters = () => {
    toast.success("Filters saved successfully");
  };

  const handleClearAll = () => {
    onClearAll();
    toast.info("All filters cleared");
  };

  const activeFiltersCount = Object.values(filters)
    .flat()
    .filter(Boolean).length;

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden relative"
            aria-label="Open filters"
          >
            <SlidersHorizontal className="h-5 w-5" />
            {activeFiltersCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[85vw] sm:w-[400px] p-0">
          <SheetHeader className="border-b border-border px-6 py-4">
            <SheetTitle className="flex items-center justify-between">
              <span>Filters</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Clear All
              </Button>
            </SheetTitle>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-5rem)] custom-scrollbar">
            <div className="space-y-6 p-6">
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={handleSaveFilters}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Current Filters
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    setExportDialogOpen(true);
                    setOpen(false);
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export Dataset
                </Button>
              </div>

              <Separator />
              <DateRangeFilter filters={filters} setFilters={setFilters} />
              <Separator />
              <TeamOrganizationFilter filters={filters} setFilters={setFilters} />
              <Separator />
              <GeographicFilter filters={filters} setFilters={setFilters} />
              <Separator />
              <HealthcareFilter filters={filters} setFilters={setFilters} />
              <Separator />
              <TherapeuticFilter filters={filters} setFilters={setFilters} />
              <Separator />
              <EventEngagementFilter filters={filters} setFilters={setFilters} />
              <Separator />
              <SurveyFilter filters={filters} setFilters={setFilters} />
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <ExportDatasetDialog
        open={exportDialogOpen}
        onOpenChange={setExportDialogOpen}
        datasetCount={datasetCount}
        filters={filters}
        setFilters={setFilters}
      />
    </>
  );
};
