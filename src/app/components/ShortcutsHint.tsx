import { useState, useEffect } from "react";
import { Keyboard, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ShortcutsHint = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the hint
    const dismissed = localStorage.getItem("gfmi-shortcuts-hint-dismissed");
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Show hint after 2 seconds of page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible && !isDismissed) {
      // Auto-hide after 8 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem("gfmi-shortcuts-hint-dismissed", "true");
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 bg-background border border-border rounded-lg shadow-lg p-4 max-w-sm transform transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <Keyboard className="h-5 w-5 text-muted-foreground mt-0.5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground font-medium">
            Quick Tip
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Press{" "}
            <kbd className="px-1.5 py-0.5 text-xs font-semibold text-foreground bg-muted border border-border rounded">
              {navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}+/
            </kbd>{" "}
            to view all keyboard shortcuts
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-muted"
          onClick={handleDismiss}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};