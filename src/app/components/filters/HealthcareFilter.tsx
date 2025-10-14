import { MultiSelect } from "@/components/ui/multi-select";
import { Filters } from "@/types/filters";

interface HealthcareFilterProps {
  filters: Filters;
  setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
}

const specialtyOptions = [
  { value: "oncology", label: "Oncology" },
  { value: "cardiology", label: "Cardiology" },
  { value: "neurology", label: "Neurology" },
  { value: "immunology", label: "Immunology" },
  { value: "endocrinology", label: "Endocrinology" },
];

const tierOptions = [
  { value: "tier-1", label: "Tier 1" },
  { value: "tier-2", label: "Tier 2" },
  { value: "tier-3", label: "Tier 3" },
];

const practiceSettingOptions = [
  { value: "academic", label: "Academic Medical Center" },
  { value: "community", label: "Community Hospital" },
  { value: "private", label: "Private Practice" },
  { value: "research", label: "Research Institution" },
];

export const HealthcareFilter = ({
  filters,
  setFilters,
}: HealthcareFilterProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-sidebar-foreground">
        Healthcare Specific
      </h3>

      <div className="space-y-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-sidebar-foreground">
            Specialty
          </label>
          <MultiSelect
            options={specialtyOptions}
            selected={filters.specialty}
            onChange={(value) => setFilters({ ...filters, specialty: value })}
            placeholder="Search specialty..."
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-sidebar-foreground">
            Tier
          </label>
          <MultiSelect
            options={tierOptions}
            selected={filters.tier}
            onChange={(value) => setFilters({ ...filters, tier: value })}
            placeholder="Search tier..."
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-sidebar-foreground">
            Practice Setting
          </label>
          <MultiSelect
            options={practiceSettingOptions}
            selected={filters.practiceSetting}
            onChange={(value) =>
              setFilters({ ...filters, practiceSetting: value })
            }
            placeholder="Search practice setting..."
          />
        </div>
      </div>
    </div>
  );
};
