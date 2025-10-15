// import { User, MessageSquare, FileText, Image as ImageIcon, Copy, ThumbsUp, ThumbsDown } from "lucide-react";
// import { format } from "date-fns";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { useState } from "react";

// interface FileWithPreview extends File {
//   id: string;
//   preview?: string;
//   isCorrupt?: boolean;
// }

// interface Message {
//   id: string;
//   role: "user" | "assistant";
//   content: string;
//   timestamp: Date;
//   files?: FileWithPreview[];
// }

// interface ChatMessageProps {
//   message: Message;
// }

// export const ChatMessage = ({ message }: ChatMessageProps) => {
//   const isUser = message.role === "user";
//   const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

//   const getFileIcon = (fileType: string) =>
//     fileType.startsWith("image/") ? (
//       <ImageIcon className="h-4 w-4" />
//     ) : (
//       <FileText className="h-4 w-4" />
//     );

//   const formatFileSize = (bytes: number): string => {
//     if (bytes === 0) return '0 B';
//     const k = 1024;
//     const sizes = ['B', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
//   };

//   const copyToClipboard = async () => {
//     try {
//       await navigator.clipboard.writeText(message.content);
//       toast.success("Message copied to clipboard");
//     } catch {
//       toast.error("Failed to copy message");
//     }
//   };

//   const handleFeedback = (type: "up" | "down") => {
//     if (feedback === type) {
//       setFeedback(null);
//       toast.info(`${type === "up" ? "Positive" : "Negative"} feedback removed`);
//     } else {
//       setFeedback(type);
//       toast.success(`Thank you for your ${type === "up" ? "positive" : "negative"} feedback!`);
//     }
//     // TODO: send feedback to backend
//     console.log("Feedback updated:", { messageId: message.id, type: feedback === type ? null : type });
//   };

//   return (
//     <div
//       className={`message-fade-in flex items-start gap-4 ${
//         isUser ? "flex-row-reverse" : ""
//       } group`}
//     >
//       {/* Avatar */}
//       <div
//         className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all ${
//           isUser 
//             ? "bg-primary shadow-md ring-2 ring-primary/20" 
//             : "bg-gradient-to-br from-muted to-muted/60 border border-border/50 shadow-sm"
//         }`}
//       >
//         {isUser ? (
//           <User className="h-5 w-5 text-primary-foreground" />
//         ) : (
//           <MessageSquare className="h-5 w-5 text-muted-foreground" />
//         )}
//       </div>

//       {/* Message Body */}
//       <div className="flex-1 space-y-2">
//         {/* Bubble */}
//         <div
//           className={`rounded-2xl px-5 py-3.5 shadow-sm transition-all ${
//             isUser
//               ? "bg-primary text-primary-foreground ml-auto max-w-[75%] hover:shadow-md"
//               : "bg-muted/80 text-foreground max-w-[85%] border border-border/40 hover:bg-muted hover:border-border/60"
//           }`}
//         >
//           {/* Attachments */}
//           {/* {message.files?.length > 0 && (
//             <div className="mb-3 space-y-2">
//               {message.files.map((file, idx) => (
//                 <div
//                   key={idx}
//                   className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
//                     isUser
//                       ? "bg-primary-foreground/10 hover:bg-primary-foreground/20"
//                       : "bg-background/60 hover:bg-background border border-border/30"
//                   }`}
//                 >
//                   {file.preview ? (
//                     <img 
//                       src={file.preview} 
//                       alt={file.name}
//                       className="h-12 w-12 rounded object-cover border border-border/20"
//                     />
//                   ) : (
//                     getFileIcon(file.type)
//                   )}
//                   <div className="flex flex-col flex-1 min-w-0">
//                     <span className="truncate font-medium">{file.name}</span>
//                     <span className="text-xs opacity-70">
//                       {formatFileSize(file.size)}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )} */}

//           {/* Content */}
//           <div className="whitespace-pre-wrap">{message.content}</div>
//         </div>

//         {/* Footer: Role, Timestamp, Always-visible Actions */}
//         <div
//           className={`flex items-center gap-2.5 text-xs text-muted-foreground px-1 transition-colors ${
//             isUser ? "justify-end" : ""
//           }`}
//         >
//           <span>{isUser ? "You" : "GFMI Assistant"}</span>
//           <span>•</span>
//           <span>{format(message.timestamp, "h:mm a")}</span>

//           {/* Only for assistant messages */}
//           {!isUser && (
//             <>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
//                 onClick={copyToClipboard}
//               >
//                 <Copy className="h-3 w-3" />
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className={`h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity ${
//                   feedback === "up" ? "text-green-600" : ""
//                 }`}
//                 onClick={() => handleFeedback("up")}
//               >
//                 <ThumbsUp className="h-3 w-3" />
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className={`h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity ${
//                   feedback === "down" ? "text-red-600" : ""
//                 }`}
//                 onClick={() => handleFeedback("down")}
//               >
//                 <ThumbsDown className="h-3 w-3" />
//               </Button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
"use client";
import { User, MessageSquare, FileText, Image as ImageIcon, Copy, ThumbsUp, ThumbsDown, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/app/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MarkdownComponentProps } from "@/app/types/filters";
import { Components } from "react-markdown";

interface FileWithPreview extends File {
  id: string;
  preview?: string;
  isCorrupt?: boolean;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  files?: FileWithPreview[];
  citations?: { title: string; url: string }[];
  webSearchUsed?: boolean;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  const getFileIcon = (fileType: string) =>
    fileType.startsWith("image/") ? (
      <ImageIcon className="h-4 w-4" />
    ) : (
      <FileText className="h-4 w-4" />
    );

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      toast.success("Message copied to clipboard");
    } catch {
      toast.error("Failed to copy message");
    }
  };

  const handleFeedback = (type: "up" | "down") => {
    if (feedback === type) {
      setFeedback(null);
      toast.info(`${type === "up" ? "Positive" : "Negative"} feedback removed`);
    } else {
      setFeedback(type);
      toast.success(`Thank you for your ${type === "up" ? "positive" : "negative"} feedback!`);
    }
    // TODO: send feedback to backend
    console.log("Feedback updated:", { messageId: message.id, type: feedback === type ? null : type });
  };

  // Custom markdown components for better styling
  const markdownComponents: Partial<Components> = {
  // Style headings
  h1: ({ children, ...props }) => (
    <h1 className="text-xl font-bold mb-2 mt-4 first:mt-0" {...props}>{children}</h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-lg font-semibold mb-2 mt-3 first:mt-0" {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-base font-medium mb-1 mt-2 first:mt-0" {...props}>{children}</h3>
  ),
  // Style paragraphs
  p: ({ children, ...props }) => (
    <p className="mb-2 last:mb-0" {...props}>{children}</p>
  ),
  // Style lists
  ul: ({ children, ...props }) => (
    <ul className="list-disc list-inside mb-2 space-y-1" {...props}>{children}</ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal list-inside mb-2 space-y-1" {...props}>{children}</ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-sm" {...props}>{children}</li>
  ),
  // Style code blocks
  code: ({ inline, children, ...props }: any) => {
    if (inline) {
      return (
        <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono" {...props}>
          {children}
        </code>
      );
    }
    return (
      <pre className="bg-muted p-3 rounded-md overflow-x-auto mb-2">
        <code className="text-sm font-mono" {...props}>{children}</code>
      </pre>
    );
  },
  // Style blockquotes
  blockquote: ({ children, ...props }) => (
    <blockquote className="border-l-4 border-muted-foreground/20 pl-4 italic mb-2" {...props}>
      {children}
    </blockquote>
  ),
  // Style tables
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto mb-2">
      <table className="min-w-full border-collapse border border-muted" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th className="border border-muted bg-muted/50 px-3 py-2 text-left font-medium" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border border-muted px-3 py-2" {...props}>{children}</td>
  ),
  // Style strong and emphasis
  strong: ({ children, ...props }) => (
    <strong className="font-semibold" {...props}>{children}</strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic" {...props}>{children}</em>
  ),
};

  return (
    <div
      className={`message-fade-in flex items-start gap-4 ${
        isUser ? "flex-row-reverse" : ""
      } group`}
    >
      {/* Avatar */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all ${
          isUser 
            ? "bg-primary shadow-md ring-2 ring-primary/20" 
            : "bg-gradient-to-br from-muted to-muted/60 border border-border/50 shadow-sm"
        }`}
      >
        {isUser ? (
          <User className="h-5 w-5 text-primary-foreground" />
        ) : (
          <MessageSquare className="h-5 w-5 text-muted-foreground" />
        )}
      </div>

      {/* Message Body */}
      <div className="flex-1 space-y-2">
        {/* Bubble */}
        <div
          className={`rounded-2xl px-5 py-3.5 shadow-sm transition-all ${
            isUser
              ? "bg-primary text-primary-foreground ml-auto max-w-[75%] hover:shadow-md"
              : "bg-muted/80 text-foreground max-w-[85%] border border-border/40 hover:bg-muted hover:border-border/60"
          }`}
        >
          {/* Attachments */}
          {message.files && message.files.length > 0 && (
            <div className="mb-3 space-y-2">
              {message.files.map((file, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                    isUser
                      ? "bg-primary-foreground/10 hover:bg-primary-foreground/20"
                      : "bg-background/60 hover:bg-background border border-border/30"
                  }`}
                >
                  {file.preview ? (
                    <img 
                      src={file.preview} 
                      alt={file.name}
                      className="h-12 w-12 rounded object-cover border border-border/20"
                    />
                  ) : (
                    getFileIcon(file.type)
                  )}
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="truncate font-medium">{file.name}</span>
                    <span className="text-xs opacity-70">
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Content with Markdown Rendering */}
          <div className="prose prose-sm max-w-none">
            {isUser ? (
              // For user messages, render as plain text
              <p className="mb-0">{message.content}</p>
            ) : (
              // For assistant messages, render as markdown
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {message.content}
              </ReactMarkdown>
            )}
          </div>
        </div>

        {/* Citations Section */}
        {message.citations && message.citations.length > 0 && (
          <div className="mt-3 rounded-lg border border-border/50 bg-muted/30 p-3 max-w-[85%]">
            <div className="flex items-center gap-2 mb-2">
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Sources</span>
            </div>
            <div className="space-y-1.5">
              {message.citations.map((citation, idx) => (
                <a
                  key={idx}
                  href={citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-xs text-primary hover:text-primary/80 hover:underline transition-colors group"
                >
                  <span className="opacity-60 group-hover:opacity-100">[{idx + 1}]</span>
                  <span className="flex-1">{citation.title}</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Footer: Role, Timestamp, Always-visible Actions */}
        <div
          className={`flex items-center gap-2.5 text-xs text-muted-foreground px-1 transition-colors ${
            isUser ? "justify-end" : ""
          }`}
        >
          {isUser ? "You" : "GFMI Assistant"}
          •
          {format(message.timestamp, "h:mm a")}

          {/* Only for assistant messages */}
          {!isUser && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
              >
                <Copy className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleFeedback("up")}
                className={`h-6 w-6 p-0 ${
                  feedback === "up" ? "text-green-600" : "opacity-60 hover:opacity-100"
                }`}
              >
                <ThumbsUp className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleFeedback("down")}
                className={`h-6 w-6 p-0 ${
                  feedback === "down" ? "text-red-600" : "opacity-60 hover:opacity-100"
                }`}
              >
                <ThumbsDown className="h-3 w-3" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
