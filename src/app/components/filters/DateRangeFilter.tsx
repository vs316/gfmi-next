import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Filters } from "@/types/filters";

interface DateRangeFilterProps {
  filters: Filters;
  setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
}

export const DateRangeFilter = ({ filters, setFilters }: DateRangeFilterProps) => {
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [customLabel, setCustomLabel] = useState("");

  const quickRanges = ["Last 30 days", "Last 90 days", "Last year"];

  const handleQuickRange = (range: string) => {
    setFilters({ ...filters, dateRange: range, customDateRange: null });
    setShowCustomRange(false);
  };

  const handleAddCustomRange = () => {
    if (customFrom && customTo) {
      setFilters({
        ...filters,
        dateRange: "Custom",
        customDateRange: {
          from: customFrom,
          to: customTo,
          label: customLabel || `${customFrom} to ${customTo}`,
        },
      });
      setShowCustomRange(false);
      setCustomFrom("");
      setCustomTo("");
      setCustomLabel("");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-sidebar-foreground">Timeline</h3>
      
      <div className="space-y-2">
        <p className="text-sm font-medium text-sidebar-foreground">Date Range</p>
        <div className="flex flex-wrap gap-2">
          {quickRanges.map((range) => (
            <Button
              key={range}
              variant={filters.dateRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => handleQuickRange(range)}
              className="text-xs"
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {!showCustomRange && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowCustomRange(true)}
          className="w-full justify-start text-xs"
        >
          <Plus className="mr-2 h-3 w-3" />
          Add Custom Date Range
        </Button>
      )}

      {showCustomRange && (
        <div className="space-y-3 rounded-lg border border-border bg-card p-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="from" className="text-xs">From</Label>
              <Input
                id="from"
                type="date"
                value={customFrom}
                onChange={(e) => setCustomFrom(e.target.value)}
                className="h-8 text-xs lg:text-[0.65rem] md:text-[0.65rem] pr-12 lg:pr-8"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="to" className="text-xs">To</Label>
              <Input
                id="to"
                type="date"
                value={customTo}
                onChange={(e) => setCustomTo(e.target.value)}
                className="h-8 text-xs lg:text-[0.65rem] md:text-[0.65rem] pr-12 lg:pr-8"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="label" className="text-xs">Label (optional)</Label>
            <Input
              id="label"
              type="text"
              placeholder="e.g., Q1 2024"
              value={customLabel}
              onChange={(e) => setCustomLabel(e.target.value)}
              className="h-8 text-xs"
            />
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleAddCustomRange}
              disabled={!customFrom || !customTo}
              className="flex-1 text-xs"
            >
              Add Range
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCustomRange(false)}
              className="flex-1 text-xs"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
