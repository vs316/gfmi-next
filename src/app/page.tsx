"use client";
import { useState, memo, useMemo } from "react";
import { ChatArea } from "@/app/components/ChatArea";
import { Header } from "@/app/components/Header";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import { KeyboardShortcuts } from "@/app/components/KeyboardShortcuts";
import { CommandPalette } from "@/app/components/CommandPalette";
import { useAutoCollapseSidebar } from "@/app/hooks/useAutoCollapseSidebar";
import { ShortcutsHint } from "@/app/components/ShortcutsHint";
import { FilterSidebar } from "@/app/components/FilterSidebar";
import { useLocalStorage } from "@/app/hooks/use-local-storage";
import { toast } from "sonner";
import { ExportDatasetDialog } from "@/app/components/ExportDatasetDialog";
import { useHealthCheck } from "@/app/hooks/useSurveyData";
import React from "react";
import { SurveyFilters } from "@/app/types/survey";
import { SurveyDataDisplay } from "@/app/components/SurveyDataDisplay";
import { ApiDebugger } from "@/app/components/ApiDebugger";

// Memoized chat area for performance
const MemoizedChatArea = memo(ChatArea);

const Index = () => {
  const { data: healthData, error: healthError } = useHealthCheck();
  const [filters, setFilters] = useState({
    dateRange: "Last 90 days",
    customDateRange: null as { from: string; to: string; label?: string } | null,
    teamOrg: [] as string[],
    nationalDirector: [] as string[],
    regionalDirector: [] as string[],
    msl: [] as string[],
    region: [] as string[],
    country: [] as string[],
    state: [] as string[],
    province: [] as string[],
    city: [] as string[],
    specialty: [] as string[],
    tier: [] as string[],
    practiceSetting: [] as string[],
    conferences: [] as string[],
    advisoryBoards: [] as string[],
    specificSurvey: [] as string[],
    surveyQuestion: [] as string[],
    therapeuticArea: [] as string[],
    tumourType: [] as string[],
  });

  // NEW: Convert your filters to API format
  const apiFilters = useMemo((): SurveyFilters => ({
    // Map your current filters to API filters
    country_geo_id: filters.country[0], // Take first selected country
    territory: filters.state[0], // Map state to territory
    region: filters.region[0], // Take first selected region
    msl_name: filters.msl[0], // Take first selected MSL
    survey_name: filters.specificSurvey[0], // Map to survey name
    response: filters.tumourType[0], // Map tumor type to response
    account_name: undefined, // Can be added based on other filters
    title: filters.teamOrg[0], // Map team org to title
    // Add pagination
    page: 1,
    size: 50,
  }), [filters]);

  // NEW: Show API connection status
  React.useEffect(() => {
    if (healthError) {
      toast.error("API connection failed. Check if your backend is running.");
    } else if (healthData) {
      toast.success(`Connected to API - ${healthData.records} records available`);
    }
  }, [healthData, healthError]);
  
  const [datasetCount] = useState(250000);
  const [chatKey, setChatKey] = useState(0);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
    // Missing state variables for export functionality
  const [exportDatasetDialogOpen, setExportDatasetDialogOpen] = useState(false);
  const [selectedExportFormat, setSelectedExportFormat] = useState<'csv' | 'json'>('csv');
  // NEW: Add state for showing survey data
  const [showSurveyData, setShowSurveyData] = useState(false);

  useAutoCollapseSidebar({
    enabled: true,
    delay: 200,
    sidebarSelectors: ['.sidebar', '[data-sidebar]', '#sidebar'],
    collapseButtonSelectors: ['.sidebar-toggle', '[data-sidebar-toggle]']
  });

  const clearAllFilters = () => {
    setFilters({
      dateRange: "Last 90 days",
      customDateRange: null,
      teamOrg: [],
      nationalDirector: [],
      regionalDirector: [],
      msl: [],
      region: [],
      country: [],
      state: [],
      province: [],
      city: [],
      specialty: [],
      tier: [],
      practiceSetting: [],
      conferences: [],
      advisoryBoards: [],
      specificSurvey: [],
      surveyQuestion: [],
      therapeuticArea: [],
      tumourType: [],
    });
  };
   
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleNewChat = () => {
    localStorage.removeItem("gfmi-chat-history");
    localStorage.removeItem("gfmi-draft-message");
    setChatKey((prev) => prev + 1);
  };
  // Fixed: Complete export dataset functionality
  const handleExportDataset = (format: 'csv' | 'json') => {
    setSelectedExportFormat(format);
    setExportDatasetDialogOpen(true);
  };

  const handleExportChat = () => {
    // Trigger export from ChatArea
    const exportEvent = new CustomEvent("export-chat");
    window.dispatchEvent(exportEvent);
  };

   // Fixed: Complete copy last message functionality
  const handleCopyLastMessage = () => {
    const messages = JSON.parse(localStorage.getItem("gfmi-chat-history") || "[]");
    if (messages.length > 0) {
      const lastAssistantMessage = messages
        .slice()
        .reverse()
        .find((msg: { role: string; content: string }) => msg.role === "assistant");
      
      if (lastAssistantMessage) {
        navigator.clipboard.writeText(lastAssistantMessage.content);
        return true;
      }
    }
    return false;
  };

 // Fixed: Use current filters state instead of undefined variable
  const handleSaveConversation = () => {
    const messages = JSON.parse(localStorage.getItem("gfmi-chat-history") || "[]");
    if (messages.length === 0) {
      toast.info("No conversation to save");
      return;
    }

    const timestamp = new Date().toISOString();
    const conversationData = {
      id: `conv_${Date.now()}`,
      timestamp,
      messages,
      filters: filters, // Use the current filters state
      title: `Conversation ${new Date().toLocaleDateString()}`,
    };
    
    // Save to a different localStorage key for saved conversations
    const savedConversations = JSON.parse(localStorage.getItem("gfmi-saved-conversations") || "[]");
    savedConversations.push(conversationData);
    localStorage.setItem("gfmi-saved-conversations", JSON.stringify(savedConversations));
    
    toast.success("Conversation saved successfully");
  };
  // New: Import conversation functionality
  const handleImportConversation = () => {
    const savedConversations = JSON.parse(localStorage.getItem("gfmi-saved-conversations") || "[]");
    
    if (savedConversations.length === 0) {
      toast.info("No saved conversations found");
      return;
    }

    // For now, load the most recent conversation
    // In a full implementation, you'd show a selection dialog
    const mostRecent = savedConversations[savedConversations.length - 1];
    
    localStorage.setItem("gfmi-chat-history", JSON.stringify(mostRecent.messages));
    setFilters(mostRecent.filters);
    setChatKey((prev) => prev + 1);
    
    toast.success(`Loaded conversation from ${new Date(mostRecent.timestamp).toLocaleDateString()}`);
  };

  // New: Settings functionality
  const handleOpenSettings = () => {
    toast.info("Settings panel coming soon");
  };

  // New: Help functionality  
  const handleOpenHelp = () => {
    toast.info("Help documentation coming soon");
  };

  // New: Date picker functionality
  const handleOpenDatePicker = () => {
    toast.info("Date range picker coming soon");
  };

  // New: Reset filters to default
  const handleResetFilters = () => {
    setFilters({
      dateRange: "Last 90 days",
      customDateRange: null,
      teamOrg: [],
      nationalDirector: [],
      regionalDirector: [],
      msl: [],
      region: [],
      country: [],
      state: [],
      province: [],
      city: [],
      specialty: [],
      tier: [],
      practiceSetting: [],
      conferences: [],
      advisoryBoards: [],
      specificSurvey: [],
      surveyQuestion: [],
      therapeuticArea: [],
      tumourType: [],
    });
    toast.success("Filters reset to default");
  };
  const [apiDebuggerOpen, setApiDebuggerOpen] = useState(true);

  return (
    <ThemeProvider defaultTheme="system" storageKey="gfmi-theme">
      {/* 
        Fixed viewport container - prevents any overflow scrolling 
        Uses viewport units and overflow hidden to lock the layout
      */}
      <div className="fixed inset-0 overflow-hidden bg-background">
        <div className="h-full w-full flex">
          {/* Desktop Sidebar - Fixed width, no overflow */}
          <div className={`hidden md:block transition-all duration-300 ease-in-out flex-shrink-0 ${
            sidebarOpen ? "w-80" : "w-0"
          } overflow-hidden`}>
            {sidebarOpen && (
              <div className="h-full w-80 overflow-hidden">
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  onClearAll={clearAllFilters}
                />
              </div>
            )}
          </div>

          {/* Main Content Area - Takes remaining space, controlled overflow */}
          <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
            {/* Header - Fixed height */}
            <div className="flex-shrink-0">
              <Header
                filters={filters}
                setFilters={setFilters}
                onClearAll={clearAllFilters}
                datasetCount={datasetCount}
                onNewChat={handleNewChat}
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                sidebarOpen={sidebarOpen}
              />
            </div>
            <div className="border-b px-4 py-2 bg-muted-foreground">
              <button
                className="text-sm font-medium"
                onClick={() => setApiDebuggerOpen(prev => !prev)}
              >
                {apiDebuggerOpen ? "Hide API Debugger" : "Show API Debugger"}
              </button>
            </div>
            {apiDebuggerOpen && (
              <ApiDebugger />
            )}

            {/* <ApiDebugger/> */}
              {/* NEW: Add toggle for survey data view */}
          <div className="flex-shrink-0 p-2 border-b">
            <button
              onClick={() => setShowSurveyData(!showSurveyData)}
              className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded"
            >
              {showSurveyData ? 'Show Chat' : 'Show Survey Data'}
            </button>
            <span className="ml-2 text-xs text-muted-foreground">
              {healthData ? `✅ API Connected (${healthData.records} records)` : '❌ API Disconnected'}
            </span>
          </div>
          {/* Content Area - Show either chat or survey data */}
          <div className="flex-1 overflow-hidden">
            {showSurveyData ? (
              <div className="h-full p-4">
                <SurveyDataDisplay filters={apiFilters} />
              </div>
            ) : (
              <MemoizedChatArea
                key={chatKey}
                datasetCount={datasetCount}
                filters={filters}
              />
            )}
          </div>

            {/* Chat Area - Fills remaining space with internal scrolling only */}
            {/* <div className="flex-1 min-h-0 overflow-hidden">
              <MemoizedChatArea
                key={chatKey}
                datasetCount={datasetCount}
                filters={filters}
              />
            </div> */}
          </div>
        </div>
      </div>

      <KeyboardShortcuts
        onClearFilters={clearAllFilters}
        onExportConversation={handleExportChat}
        onFocusInput={() => {
          const textarea = document.querySelector('textarea[aria-label="Chat input"]') as HTMLTextAreaElement;
          textarea?.focus();
        }}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onEscape={() => setCommandPaletteOpen(false)}
      />
      
      <CommandPalette
        open={commandPaletteOpen}
        onOpenChange={setCommandPaletteOpen}
        onNewChat={handleNewChat}
        onClearFilters={clearAllFilters}
        onExportChat={handleExportChat}
        onToggleSidebar={handleToggleSidebar}
        onExportDataset={handleExportDataset}
        onCopyLastMessage={handleCopyLastMessage}
        onSaveConversation={handleSaveConversation}
        onImportConversation={handleImportConversation}
        onOpenSettings={handleOpenSettings}
        onOpenHelp={handleOpenHelp}
        onOpenDatePicker={handleOpenDatePicker}
        onResetFilters={handleResetFilters}
      />
      {/* Export Dataset Dialog */}
      <ExportDatasetDialog
        open={exportDatasetDialogOpen}
        onOpenChange={setExportDatasetDialogOpen}
        datasetCount={datasetCount}
        filters={filters}
        setFilters={setFilters}
      />

      <ShortcutsHint />
    </ThemeProvider>
  );
};

export default Index;