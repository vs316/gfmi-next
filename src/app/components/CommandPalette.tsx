// import { useEffect, useState, useCallback } from "react";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   Search,
//   MessageSquare,
//   SlidersHorizontal,
//   Download,
//   Trash2,
//   Plus,
//   Moon,
//   Sun,
// } from "lucide-react";
// import { useTheme } from "@/components/ThemeProvider";
// import { toast } from "sonner";

// interface CommandAction {
//   id: string;
//   label: string;
//   icon: React.ReactNode;
//   action: () => void;
//   keywords: string[];
// }

// interface CommandPaletteProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onNewChat: () => void;
//   onClearFilters: () => void;
//   onExportChat: () => void;
//   onToggleSidebar: () => void;
// }

// export function CommandPalette({
//   open,
//   onOpenChange,
//   onNewChat,
//   onClearFilters,
//   onExportChat,
//   onToggleSidebar,
// }: CommandPaletteProps) {
//   const [search, setSearch] = useState("");
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const { setTheme, theme } = useTheme();
//   // Add smooth theme transition function
//   const handleThemeToggle = () => {
//     const newTheme = theme === "dark" ? "light" : "dark";
    
//     // Add transition class to body for smooth animation
//     document.body.classList.add('theme-transitioning');
    
//     setTheme(newTheme);
    
//     // Remove transition class after animation completes
//     setTimeout(() => {
//       document.body.classList.remove('theme-transitioning');
//     }, 180);
    
//     onOpenChange(false);
//   };
//   const commands: CommandAction[] = [
//     {
//       id: "new-chat",
//       label: "New Chat",
//       icon: <Plus className="h-4 w-4" />,
//       action: () => {
//         onNewChat();
//         onOpenChange(false);
//       },
//       keywords: ["new", "chat", "conversation", "start"],
//     },
//     {
//       id: "toggle-sidebar",
//       label: "Toggle Sidebar",
//       icon: <SlidersHorizontal className="h-4 w-4" />,
//       action: () => {
//         onOpenChange(false);
//         // Small delay to ensure dialog closes before toggling
//         setTimeout(() => onToggleSidebar(), 100);
//       },
//       keywords: ["sidebar", "toggle", "filters", "history"],
//     },
//     {
//       id: "export-chat",
//       label: "Export Conversation",
//       icon: <Download className="h-4 w-4" />,
//       action: () => {
//         // Check if there are messages to export
//         const messages = JSON.parse(localStorage.getItem("gfmi-chat-history") || "[]");
//         if (!messages || messages.length === 0) {
//           toast.info("No conversation to export");
//           onOpenChange(false);
//           return;
//         }
//         onExportChat();
//         onOpenChange(false);
//       },
//       keywords: ["export", "download", "save", "conversation"],
//     },
//     {
//       id: "clear-filters",
//       label: "Clear All Filters",
//       icon: <Trash2 className="h-4 w-4" />,
//       action: () => {
//         onClearFilters();
//         toast.success("All filters cleared");
//         onOpenChange(false);
//       },
//       keywords: ["clear", "reset", "filters", "remove"],
//     },
//     {
//       id: "toggle-theme",
//       label: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
//       icon: theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />,
//       action: handleThemeToggle,
//       // () => {
//       //   setTheme(theme === "dark" ? "light" : "dark");
//       //   onOpenChange(false);
//       // },
//       keywords: ["theme", "dark", "light", "mode"],
//     },
//   ];

//   const filteredCommands = search
//     ? commands.filter((cmd) =>
//         cmd.keywords.some((keyword) =>
//           keyword.toLowerCase().includes(search.toLowerCase())
//         ) || cmd.label.toLowerCase().includes(search.toLowerCase())
//       )
//     : commands;

//   useEffect(() => {
//     setSelectedIndex(0);
//   }, [search]);

//   const handleKeyDown = useCallback(
//     (e: KeyboardEvent) => {
//       if (!open) return;

//       if (e.key === "Escape") {
//         e.preventDefault();
//         onOpenChange(false);
//       } else if (e.key === "ArrowDown") {
//         e.preventDefault();
//         setSelectedIndex((prev) =>
//           prev < filteredCommands.length - 1 ? prev + 1 : prev
//         );
//       } else if (e.key === "ArrowUp") {
//         e.preventDefault();
//         setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
//       } else if (e.key === "Enter") {
//         e.preventDefault();
//         if (filteredCommands[selectedIndex]) {
//           filteredCommands[selectedIndex].action();
//         }
//       }
//     },
//     [open, selectedIndex, filteredCommands, onOpenChange]
//   );

//   useEffect(() => {
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [handleKeyDown]);

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="p-0 gap-0 max-w-lg" aria-label="Command palette">
//         <div className="flex items-center border-b px-3">
//           <Search className="h-4 w-4 text-muted-foreground mr-2" />
//           <Input
//             placeholder="Type a command or search..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
//             autoFocus
//             aria-label="Search commands"
//           />
//         </div>
//         <ScrollArea className="max-h-96">
//           <div className="p-2">
//             {filteredCommands.length === 0 ? (
//               <div className="py-6 text-center text-sm text-muted-foreground">
//                 No commands found
//               </div>
//             ) : (
//               filteredCommands.map((cmd, index) => (
//                 <button
//                   key={cmd.id}
//                   onClick={cmd.action}
//                   className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-colors ${
//                     index === selectedIndex
//                       ? "bg-muted"
//                       : "hover:bg-muted/50"
//                   }`}
//                   aria-label={cmd.label}
//                 >
//                   {cmd.icon}
//                   <span className="text-sm">{cmd.label}</span>
//                 </button>
//               ))
//             )}
//           </div>
//         </ScrollArea>
//         <div className="border-t px-3 py-2 text-xs text-muted-foreground">
//           <div className="flex items-center justify-between">
//             <span>Navigate with ↑↓ keys</span>
//             <span>Press Enter to select</span>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
import { useEffect, useState, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  MessageSquare,
  SlidersHorizontal,
  Download,
  Trash2,
  Plus,
  Moon,
  Sun,
  FileText,
  Calendar,
  Settings,
  HelpCircle,
  Copy,
  Zap,
  Database,
  Filter,
  RotateCcw,
  FolderOpen,
  Save,
  Upload,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { toast } from "sonner";

interface CommandAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  keywords: string[];
  category?: string;
}

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNewChat: () => void;
  onClearFilters: () => void;
  onExportChat: () => void;
  onToggleSidebar: () => void;
  onExportDataset?: (format: 'csv' | 'json') => void;
  onOpenSettings?: () => void;
  onOpenHelp?: () => void;
  onCopyLastMessage?: () => void;
  onOpenDatePicker?: () => void;
  onResetFilters?: () => void;
  onSaveConversation?: () => void;
  onImportConversation?: () => void;
}

export function CommandPalette({
  open,
  onOpenChange,
  onNewChat,
  onClearFilters,
  onExportChat,
  onToggleSidebar,
  onExportDataset,
  onOpenSettings,
  onOpenHelp,
  onCopyLastMessage,
  onOpenDatePicker,
  onResetFilters,
  onSaveConversation,
  onImportConversation,
}: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { setTheme, theme } = useTheme();

  // Add smooth theme transition function
  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    
    // Add transition class to body for smooth animation
    document.body.classList.add('theme-transitioning');
    
    setTheme(newTheme);
    
    // Remove transition class after animation completes
    setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
    }, 180);
    
    onOpenChange(false);
  };

  const handleExportConversation = () => {
  // Check if there are messages to export
  const messages = JSON.parse(localStorage.getItem("gfmi-chat-history") || "[]");
  if (!messages || messages.length === 0) {
    toast.info("No conversation to export");
    onOpenChange(false);
    return;
  }

  // Close the command palette first
  onOpenChange(false);
  
  // Wait for palette to close, then trigger export dropdown
  setTimeout(() => {
    // Dispatch custom event to open export dropdown in ChatArea
    const openExportDropdownEvent = new CustomEvent("open-export-dropdown", {
      detail: { source: "command-palette" }
    });
    window.dispatchEvent(openExportDropdownEvent);
  }, 150); // Small delay to ensure palette closes smoothly
};

  const handleExportDatasetCSV = () => {
    if (onExportDataset) {
      onExportDataset('csv');
      onOpenChange(false);
    }
  };

  const handleExportDatasetJSON = () => {
    if (onExportDataset) {
      onExportDataset('json');
      onOpenChange(false);
    }
  };

  const handleCopyLastMessage = () => {
    if (onCopyLastMessage) {
      onCopyLastMessage();
      toast.success("Last message copied to clipboard");
    }
    onOpenChange(false);
  };

  const commands: CommandAction[] = [
    // Chat Management
    {
      id: "new-chat",
      label: "New Chat",
      icon: <Plus size={18} />,
      action: () => {
        onNewChat();
        onOpenChange(false);
      },
      keywords: ["new", "chat", "conversation", "start", "create"],
      category: "Chat"
    },
    {
      id: "copy-last-message",
      label: "Copy Last Message",
      icon: <Copy size={18} />,
      action: handleCopyLastMessage,
      keywords: ["copy", "last", "message", "clipboard"],
      category: "Chat"
    },
    {
      id: "save-conversation",
      label: "Save Conversation",
      icon: <Save size={18} />,
      action: () => {
        if (onSaveConversation) {
          onSaveConversation();
          toast.success("Conversation saved");
        }
        onOpenChange(false);
      },
      keywords: ["save", "conversation", "local", "storage"],
      category: "Chat"
    },
    {
      id: "import-conversation",
      label: "Import Conversation",
      icon: <Upload size={18} />,
      action: () => {
        if (onImportConversation) {
          onImportConversation();
        }
        onOpenChange(false);
      },
      keywords: ["import", "conversation", "load", "restore"],
      category: "Chat"
    },

    // View Controls
    {
      id: "toggle-sidebar",
      label: "Toggle Sidebar",
      icon: <SlidersHorizontal size={18} />,
      action: () => {
        onOpenChange(false);
        setTimeout(() => onToggleSidebar(), 100);
      },
      keywords: ["sidebar", "toggle", "filters", "history", "panel"],
      category: "View"
    },
    {
      id: "toggle-theme",
      label: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
      icon: theme === "dark" ? <Sun size={18} /> : <Moon size={18} />,
      action: handleThemeToggle,
      keywords: ["theme", "dark", "light", "mode", "appearance"],
      category: "View"
    },

    // Export Options
    {
      id: "export-chat",
      label: "Export Conversation",
      icon: <Download size={18} />,
      action: handleExportConversation,
      keywords: ["export", "download", "save", "conversation", "chat"],
      category: "Export"
    },
    {
      id: "export-dataset-csv",
      label: "Export Dataset (CSV)",
      icon: <FileText size={18} />,
      action: handleExportDatasetCSV,
      keywords: ["export", "dataset", "csv", "excel", "data"],
      category: "Export"
    },
    {
      id: "export-dataset-json",
      label: "Export Dataset (JSON)",
      icon: <Database size={18} />,
      action: handleExportDatasetJSON,
      keywords: ["export", "dataset", "json", "raw", "data"],
      category: "Export"
    },

    // Filter Management
    {
      id: "clear-filters",
      label: "Clear All Filters",
      icon: <Filter size={18} />,
      action: () => {
        onClearFilters();
        toast.success("All filters cleared");
        onOpenChange(false);
      },
      keywords: ["clear", "reset", "filters", "remove", "all"],
      category: "Filters"
    },
    {
      id: "reset-filters",
      label: "Reset to Default Filters",
      icon: <RotateCcw size={18} />,
      action: () => {
        if (onResetFilters) {
          onResetFilters();
          toast.success("Filters reset to default");
        }
        onOpenChange(false);
      },
      keywords: ["reset", "default", "filters", "restore"],
      category: "Filters"
    },
    {
      id: "open-date-picker",
      label: "Open Date Range Picker",
      icon: <Calendar size={18} />,
      action: () => {
        if (onOpenDatePicker) {
          onOpenDatePicker();
        }
        onOpenChange(false);
      },
      keywords: ["date", "range", "picker", "calendar", "time"],
      category: "Filters"
    },

    // Settings & Help
    {
      id: "open-settings",
      label: "Open Settings",
      icon: <Settings size={18} />,
      action: () => {
        if (onOpenSettings) {
          onOpenSettings();
        }
        onOpenChange(false);
      },
      keywords: ["settings", "preferences", "config", "options"],
      category: "Settings"
    },
    {
      id: "open-help",
      label: "Open Help & Documentation",
      icon: <HelpCircle size={18} />,
      action: () => {
        if (onOpenHelp) {
          onOpenHelp();
        }
        onOpenChange(false);
      },
      keywords: ["help", "documentation", "guide", "support", "docs"],
      category: "Help"
    },

    // Quick Actions
    {
      id: "focus-search",
      label: "Focus Search Bar",
      icon: <Search size={18} />,
      action: () => {
        // Close command palette and focus main search
        onOpenChange(false);
        setTimeout(() => {
          const searchInput = document.querySelector('input[placeholder*="search"]') as HTMLInputElement;
          if (searchInput) {
            searchInput.focus();
          }
        }, 100);
      },
      keywords: ["focus", "search", "bar", "input"],
      category: "Navigation"
    },
    {
      id: "open-recent-files",
      label: "Open Recent Files",
      icon: <FolderOpen size={18} />,
      action: () => {
        toast.info("Recent files feature coming soon");
        onOpenChange(false);
      },
      keywords: ["recent", "files", "history", "documents"],
      category: "Navigation"
    },
  ];

  const filteredCommands = search
    ? commands.filter((cmd) =>
        cmd.keywords.some((keyword) =>
          keyword.toLowerCase().includes(search.toLowerCase())
        ) || cmd.label.toLowerCase().includes(search.toLowerCase())
      )
    : commands;

  // Group commands by category for better organization
  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    const category = cmd.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(cmd);
    return acc;
  }, {} as Record<string, CommandAction[]>);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
        // Cycle through categories with Tab
        const categories = Object.keys(groupedCommands);
        if (categories.length > 1) {
          const currentCommand = filteredCommands[selectedIndex];
          const currentCategory = currentCommand?.category || "Other";
          const currentCategoryIndex = categories.indexOf(currentCategory);
          const nextCategoryIndex = (currentCategoryIndex + 1) % categories.length;
          const nextCategory = categories[nextCategoryIndex];
          const firstCommandInNextCategory = filteredCommands.findIndex(
            cmd => cmd.category === nextCategory
          );
          if (firstCommandInNextCategory !== -1) {
            setSelectedIndex(firstCommandInNextCategory);
          }
        }
      }
    },
    [open, selectedIndex, filteredCommands, groupedCommands, onOpenChange]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        <div className="flex items-center border-b px-4">
          <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
          <Input
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            autoFocus
            aria-label="Search commands"
          />
        </div>
        
        <ScrollArea className="max-h-96 overflow-hidden">
          <div className="p-2">
            {filteredCommands.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No commands found
              </div>
            ) : (
              Object.entries(groupedCommands).map(([category, categoryCommands]) => (
                <div key={category} className="mb-4">
                  {Object.keys(groupedCommands).length > 1 && (
                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {category}
                    </div>
                  )}
                  {categoryCommands.map((cmd, categoryIndex) => {
                    const globalIndex = filteredCommands.findIndex(c => c.id === cmd.id);
                    return (
                      <button
                        key={cmd.id}
                        onClick={cmd.action}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors text-left ${
                          selectedIndex === globalIndex
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                        aria-selected={selectedIndex === globalIndex}
                      >
                        {cmd.icon}
                        <span className="flex-1">{cmd.label}</span>
                        {selectedIndex === globalIndex && (
                          <span className="text-xs opacity-60">↵</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
        
        <div className="border-t px-3 py-2 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <div>Navigate with ↑↓ keys • Tab to switch categories</div>
            <div>Press Enter to select • Esc to close</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}