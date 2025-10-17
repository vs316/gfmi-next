"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/ThemeProvider";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "sonner";
import { queryClient } from "@/lib/queryClient";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="gfmi-theme">
        <TooltipProvider>
          {children}
          <Toaster 
          position="top-right" richColors
          />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
