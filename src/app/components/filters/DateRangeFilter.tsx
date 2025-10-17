"use client";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Plus, X } from "lucide-react";
import { Filters } from "@/app/types/filters";
import { toast } from "sonner";

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

  const handleCustomRangeSelect = (customRange: any) => {
    setFilters({ 
      ...filters, 
      dateRange: "Custom", 
      customDateRange: customRange 
      // customDateRange: {
      //     id: customRange.id,
      //     from: customFrom,
      //     to: customTo,
      //     label: customLabel || `${customFrom} to ${customTo}`,
      //   },
    });
  };

  const handleAddCustomRange = () => {
    // Validation
    if (!customFrom || !customTo) {
      toast.error("Please select both start and end dates");
      return;
    }

    if (new Date(customFrom) > new Date(customTo)) {
      toast.error("Start date must be before end date");
      return;
    }

    const newCustomRange = {
      id: `custom-${Date.now()}`,
      from: customFrom,
      to: customTo,
      label: customLabel || `${customFrom} to ${customTo}`,
    };

    // Add to the array of saved custom ranges
    const updatedCustomRanges = [
      ...(filters.savedCustomRanges || []),
      newCustomRange
    ];

    setFilters({
      ...filters,
      dateRange: "Custom",
      customDateRange: newCustomRange,
      savedCustomRanges: updatedCustomRanges
    });

    // Reset form
    setShowCustomRange(false);
    setCustomFrom("");
    setCustomTo("");
    setCustomLabel("");
    
    toast.success("Custom date range added");
  };

  const handleRemoveCustomRange = (id: string) => {
    const updatedCustomRanges = (filters.savedCustomRanges || []).filter(
      range => range.id !== id
    );
    
    setFilters({
      ...filters,
      savedCustomRanges: updatedCustomRanges,
      // If the removed range was currently selected, clear selection
      ...(filters.customDateRange?.id === id && {
        dateRange: "",
        customDateRange: null
      })
    });
    
    toast.success("Custom date range removed");
  };

  const handleCancel = () => {
    setShowCustomRange(false);
    setCustomFrom("");
    setCustomTo("");
    setCustomLabel("");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-sidebar-foreground">Timeline</h3>
      
      <div className="space-y-2">
        <p className="text-sm font-medium text-sidebar-foreground">Date Range</p>
        
        {/* Quick Ranges */}
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

        {/* Saved Custom Ranges */}
        {filters.savedCustomRanges && filters.savedCustomRanges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {filters.savedCustomRanges.map((customRange) => (
              <div key={customRange.id} className="flex items-center gap-1">
                <Button
                  variant={
                    filters.dateRange === "Custom" && 
                    filters.customDateRange?.id === customRange.id 
                      ? "default" 
                      : "outline"
                  }
                  size="sm"
                  onClick={() => handleCustomRangeSelect(customRange)}
                  className="text-xs"
                >
                  {customRange.label}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => handleRemoveCustomRange(customRange.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
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
              onClick={handleCancel}
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
