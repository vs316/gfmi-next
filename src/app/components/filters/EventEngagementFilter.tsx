"use client";
import { MultiSelect } from "@/app/components/ui/multi-select";
import { Filters } from "@/app/types/filters";

interface EventEngagementFilterProps {
  filters: Filters;
setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
}

const conferencesOptions = [
  { value: "asco", label: "ASCO Annual Meeting" },
  { value: "ash", label: "ASH Annual Meeting" },
  { value: "esmo", label: "ESMO Congress" },
  { value: "acc", label: "ACC Scientific Sessions" },
];

const advisoryBoardsOptions = [
  { value: "oncology-board", label: "Oncology Advisory Board" },
  { value: "cardio-board", label: "Cardiovascular Advisory Board" },
  { value: "neuro-board", label: "Neurology Advisory Board" },
  { value: "immunology-board", label: "Immunology Advisory Board" },
];

export const EventEngagementFilter = ({
  filters,
  setFilters,
}: EventEngagementFilterProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-sidebar-foreground">
        Event & Engagement
      </h3>

      <div className="space-y-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-sidebar-foreground">
            Conferences
          </label>
          <MultiSelect
            options={conferencesOptions}
            selected={filters.conferences}
            onChange={(value) => setFilters({ ...filters, conferences: value })}
            placeholder="Search conferences..."
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-sidebar-foreground">
            Advisory Boards
          </label>
          <MultiSelect
            options={advisoryBoardsOptions}
            selected={filters.advisoryBoards}
            onChange={(value) =>
              setFilters({ ...filters, advisoryBoards: value })
            }
            placeholder="Search advisory boards..."
          />
        </div>
      </div>
    </div>
  );
};
