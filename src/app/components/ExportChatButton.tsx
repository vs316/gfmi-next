"use client";
import { useRef, useState, useEffect } from "react";
import { Download, FileText } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

interface ExportChatButtonProps {
  onExport: (options: { format: 'txt' | 'pdf' | 'docx' }) => void;
}

export function ExportChatButton({ onExport }: ExportChatButtonProps) {
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);
  const exportButtonRef = useRef<HTMLButtonElement>(null);

  // Listen for command palette export trigger
  useEffect(() => {
    const handleOpenExportDropdown = (event: CustomEvent) => {
      if (event.detail?.source === 'command-palette' || event.detail?.source === 'keyboard-shortcut') {
        setExportDropdownOpen(true);
        // Optional: Focus the export button for better UX
        setTimeout(() => exportButtonRef.current?.focus(), 100);
      }
    };

    window.addEventListener('open-export-dropdown', handleOpenExportDropdown as EventListener);
    
    return () => {
      window.removeEventListener('open-export-dropdown', handleOpenExportDropdown as EventListener);
    };
  }, []);

  return (
    <DropdownMenu open={exportDropdownOpen} onOpenChange={setExportDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          ref={exportButtonRef}
          variant="outline" 
          size="sm" 
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          <span>Export Chat</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => {
            onExport({ format: 'txt' });
            setExportDropdownOpen(false);
          }}
          className="cursor-pointer text-sm"
        >
          <FileText className="h-4 w-4 mr-2" />
          Export as TXT
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => {
            onExport({ format: 'pdf' });
            setExportDropdownOpen(false);
          }}
          className="cursor-pointer text-sm"
        >
          <FileText className="h-4 w-4 mr-2" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => {
            onExport({ format: 'docx' });
            setExportDropdownOpen(false);
          }}
          className="cursor-pointer text-sm"
        >
          <FileText className="h-4 w-4 mr-2" />
          Export as DOCX
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
