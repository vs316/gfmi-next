import { MessageSquare } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-muted to-muted/60 border border-border/50">
        <MessageSquare className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="bg-muted/60 border border-border/30 rounded-2xl px-4 py-3">
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
          <span className="ml-3 text-xs text-muted-foreground">GFMI Assistant is thinking...</span>
        </div>
      </div>
    </div>
  );
};