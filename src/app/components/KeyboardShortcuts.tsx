import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface KeyboardShortcutsProps {
  onClearFilters?: () => void;
  onExportConversation?: () => void;
  onFocusInput?: () => void;
  onOpenCommandPalette?: () => void;
  onEscape?: () => void;
}

export const KeyboardShortcuts = ({
  onClearFilters,
  onExportConversation,
  onFocusInput,
  onOpenCommandPalette,
  onEscape,
}: KeyboardShortcutsProps) => {
  // Ref to track if help toast is already showing
  const helpToastId = useRef<string | null>(null);
  const lastHelpTime = useRef<number>(0);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape to close dialogs/modals
      if (e.key === "Escape") {
        onEscape?.();
        return;
      }

      // Command/Ctrl + K to open command palette
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenCommandPalette?.();
        return;
      }

      // Command/Ctrl + I to focus input (alternative)
      if ((e.metaKey || e.ctrlKey) && e.key === "i") {
        e.preventDefault();
        onFocusInput?.();
      }

      // Command/Ctrl + E to export conversation
      if ((e.metaKey || e.ctrlKey) && e.key === "e") {
        e.preventDefault();
        onExportConversation?.();
      }

      // Command/Ctrl + Shift + C to clear filters
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "C") {
        e.preventDefault();
        onClearFilters?.();
      }

      // F1 for help (alternative)
      if (e.key === "F1") {
        e.preventDefault();
        showHelpToast();
        return;
      }
      
      // Command/Ctrl + / to show shortcuts
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault();
        showHelpToast();
      }
    };

    const showHelpToast = () => {
      // Debounce help toast to prevent duplicates
      const now = Date.now();
      if (now - lastHelpTime.current < 1000) {
        return;
      }
      lastHelpTime.current = now;

      // Dismiss any existing help toast first
      if (helpToastId.current) {
        toast.dismiss(helpToastId.current);
      }

      // Show new help toast with unique ID
      const toastId = `keyboard-shortcuts-${now}`;
      helpToastId.current = toastId;
      toast.info(
        <div className="space-y-2">
          <p className="font-semibold">Keyboard Shortcuts</p>
          <ul className="space-y-1 text-xs">
            <li>⌘/Ctrl + K - Command palette</li>
            <li>⌘/Ctrl + I - Focus chat input</li>
            <li>⌘/Ctrl + E - Export conversation</li>
            <li>⌘/Ctrl + Shift + C - Clear filters</li>
            <li>Escape - Close dialogs</li>
            <li>F1 or ⌘/Ctrl + / - Show help</li>
          </ul>
        </div>,
        { 
          id: toastId,
          duration: 5000,
          style: {
            pointerEvents: 'none'
          }
        }
      );
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClearFilters, onExportConversation, onFocusInput, onOpenCommandPalette, onEscape]);

  return null;
};
