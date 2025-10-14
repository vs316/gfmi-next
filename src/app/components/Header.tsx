// import { Moon, Sun, MessageSquarePlus } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useTheme } from "@/components/ThemeProvider";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { MobileFilterSheet } from "@/components/MobileFilterSheet";

// interface HeaderProps {
//   filters?: any;
//   setFilters?: (filters: any) => void;
//   onClearAll?: () => void;
//   datasetCount?: number;
//   onNewChat?: () => void;
// }

// export const Header = ({ filters, setFilters, onClearAll, datasetCount, onNewChat }: HeaderProps) => {
//   const { setTheme } = useTheme();

//   return (
//     <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 sm:px-6">
//       <div className="flex items-center gap-3">
//         {filters && setFilters && onClearAll && datasetCount && (
//           <MobileFilterSheet
//             filters={filters}
//             setFilters={setFilters}
//             onClearAll={onClearAll}
//             datasetCount={datasetCount}
//           />
//         )}
//         <h1 className="text-lg sm:text-xl font-semibold text-foreground">GFMI Assistant</h1>
//       </div>

//       <div className="flex items-center gap-2">
//         {onNewChat && (
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={onNewChat}
//             aria-label="New chat"
//           >
//             <MessageSquarePlus className="h-5 w-5" />
//           </Button>
//         )}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" size="icon" aria-label="Toggle theme">
//               <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//               <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//               <span className="sr-only">Toggle theme</span>
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end" className="[&_[role=menuitem]]:hover:bg-muted [&_[role=menuitem][data-highlighted]]:bg-muted">
//             <DropdownMenuItem onClick={() => setTheme("light")}>
//               Light
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={() => setTheme("dark")}>
//               Dark
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={() => setTheme("system")}>
//               System
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </header>
//   );
// };
import { Moon, Sun, MessageSquarePlus, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MobileFilterSheet } from "@/components/MobileFilterSheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Filters } from "@/types/filters";
interface HeaderProps {
  filters?: Filters;
  setFilters?: (filters: Filters | ((prev: Filters) => Filters)) => void;
  onClearAll?: () => void;
  datasetCount?: number;
  onNewChat?: () => void;
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
}

export const Header = ({ 
  filters, 
  setFilters, 
  onClearAll, 
  datasetCount, 
  onNewChat,
  onToggleSidebar,
  sidebarOpen 
}: HeaderProps) => {
  const { setTheme, theme, } = useTheme();
  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    // Add transition class to body for smooth animation
    document.body.classList.add('theme-transitioning');
    
    setTheme(newTheme);
    
    // Remove transition class after animation completes
    setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
    }, 180);
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {/* Desktop Sidebar Toggle - Clean hover effect */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="hidden md:flex text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle sidebar"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>

          {/* Mobile Filter Sheet - Only visible on mobile */}
          <div className="md:hidden">
            <MobileFilterSheet
              filters={filters}
              setFilters={setFilters}
              onClearAll={onClearAll}
              datasetCount={datasetCount}
            />
          </div>

          <div className="flex items-center space-x-2">
            <MessageSquarePlus className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">GFMI Assistant</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* New Chat Button - Clean styling */}
          {/* <Button
            variant="ghost"
            size="sm"
            onClick={onNewChat}
            className="hidden sm:flex text-muted-foreground hover:text-foreground hover:bg-muted transition-colors border-0 shadow-none"
            aria-label="New chat"
          >
            <MessageSquarePlus className="h-4 w-4 mr-2" />
            
          </Button> */}
          <div className="flex items-center gap-2">
          {/* New Chat Button with Tooltip */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onNewChat}
                  className="flex text-muted-foreground hover:text-foreground hover:bg-muted transition-colors border-0 shadow-none"
                  aria-label="New chat"
                >
                  <MessageSquarePlus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>New Chat</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
          {/* Theme Toggle - Clean styling */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              
              <Button 
                variant="ghost" 
                size="sm"
                className="text-muted-foreground hover:text-foreground hover:bg-muted transition-colors border-0 shadow-none transition-all duration-150"
                >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[120px]">
              <DropdownMenuItem 
                onClick={() => handleThemeChange("light")}
                // onClick={() => setTheme("light")}
                className="cursor-pointer text-sm"
              >
                Light
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleThemeChange("dark")}
                // onClick={() => setTheme("dark")}
                className="cursor-pointer text-sm"
              >
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleThemeChange("system")}
                // onClick={() => setTheme("system")}
                className="cursor-pointer text-sm"
              >
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};