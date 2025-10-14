import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Option {
  value: string;
  label: string;
}

interface TooltipMultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function TooltipMultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  className,
}: TooltipMultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (optionValue: string) => {
    const newSelected = selected.includes(optionValue)
      ? selected.filter((item) => item !== optionValue)
      : [...selected, optionValue];
    onChange(newSelected);
  };

  const handleRemove = (optionValue: string) => {
    onChange(selected.filter((item) => item !== optionValue));
  };

  const selectedOptions = options.filter((option) => selected.includes(option.value));

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-auto min-h-9 px-3 py-2"
          >
            <div className="flex flex-wrap gap-1 flex-1 min-w-0">
              {selectedOptions.length === 0 ? (
                <span className="text-muted-foreground text-sm truncate">
                  {placeholder}
                </span>
              ) : (
                selectedOptions.map((option) => (
                  <TooltipProvider key={option.value}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge
                          variant="secondary"
                          className="text-xs max-w-32 truncate cursor-help"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(option.value);
                          }}
                        >
                          {option.label}
                          <X className="h-3 w-3 ml-1" />
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <p className="text-sm">{option.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))
              )}
            </div>
            <ChevronsUpDown className="h-4 w-4 opacity-50 flex-shrink-0 ml-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" side="bottom" align="start">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected.includes(option.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="truncate cursor-help" title={option.label}>
                          {option.label}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-sm">
                        <p className="text-sm">{option.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
