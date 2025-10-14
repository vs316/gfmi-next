"use client";
import { Copy, ThumbsUp, ThumbsDown, Share, Bookmark } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

interface MessageActionsProps {
  messageContent: string;
  messageId: string;
}

export const MessageActions = ({ messageContent, messageId }: MessageActionsProps) => {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(messageContent);
      toast.success("Message copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy message");
    }
  };

  const shareMessage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'GFMI Assistant Response',
          text: messageContent,
        });
      } catch (err) {
        copyToClipboard(); // Fallback to copy
      }
    } else {
      copyToClipboard();
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? "Bookmark removed" : "Message bookmarked");
  };

  const handleFeedback = (type: 'up' | 'down') => {
    setFeedback(type);
    toast.success(`Thank you for your ${type === 'up' ? 'positive' : 'negative'} feedback!`);
    
    // TODO: Send feedback to analytics/backend
    console.log('Feedback recorded:', { messageId, type });
  };

  return (
    <div className="flex items-center gap-1 bg-background/95 backdrop-blur-sm border border-border/60 rounded-lg px-2 py-1 shadow-lg">
      <Button
        variant="ghost"
        size="sm"
        onClick={copyToClipboard}
        className="h-7 w-7 p-0 hover:bg-muted"
        title="Copy message"
      >
        <Copy className="h-3.5 w-3.5" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={shareMessage}
        className="h-7 w-7 p-0 hover:bg-muted"
        title="Share message"
      >
        <Share className="h-3.5 w-3.5" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleBookmark}
        className={`h-7 w-7 p-0 hover:bg-muted ${
          isBookmarked ? 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950' : ''
        }`}
        title="Bookmark message"
      >
        <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
      </Button>

      <div className="w-px h-4 bg-border/60 mx-1"></div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleFeedback('up')}
        className={`h-7 w-7 p-0 hover:bg-green-50 dark:hover:bg-green-950 ${
          feedback === 'up' ? 'text-green-600 bg-green-50 dark:bg-green-950' : ''
        }`}
        title="Good response"
      >
        <ThumbsUp className="h-3.5 w-3.5" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleFeedback('down')}
        className={`h-7 w-7 p-0 hover:bg-red-50 dark:hover:bg-red-950 ${
          feedback === 'down' ? 'text-red-600 bg-red-50 dark:bg-red-950' : ''
        }`}
        title="Poor response"
      >
        <ThumbsDown className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
};