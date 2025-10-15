"use client";
import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Download, FileText } from "lucide-react";

interface ExportDropdownProps {
  onExport: (format: string) => void;
}

export function ExportDropdown({ onExport }: ExportDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Listen for custom event to open dropdown
  useEffect(() => {
    if (!mounted) return;

    const handleOpenExportDropdown = (event: CustomEvent) => {
      console.log('Export dropdown event received:', event.detail);
      setIsOpen(true);
    };

    window.addEventListener('open-export-dropdown', handleOpenExportDropdown as EventListener);
    
    return () => {
      window.removeEventListener('open-export-dropdown', handleOpenExportDropdown as EventListener);
    };
  }, [mounted]);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="gap-2" disabled>
        <Download className="h-4 w-4" />
        Export Chat
      </Button>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Export Chat
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => { 
            onExport('txt'); 
            setIsOpen(false); 
          }}
        >
          <FileText className="h-4 w-4 mr-2" />
          Export as TXT
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => { 
            onExport('pdf'); 
            setIsOpen(false); 
          }}
        >
          <FileText className="h-4 w-4 mr-2" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => { 
            onExport('docx'); 
            setIsOpen(false); 
          }}
        >
          <FileText className="h-4 w-4 mr-2" />
          Export as DOCX
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}