"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, MessageSquare, Download, X, AlertTriangle, Square, Globe } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { ChatMessage } from "@/app/components/ChatMessage";
import { WelcomeScreen } from "@/app/components/WelcomeScreen";
import { KeyboardShortcuts } from "@/app/components/KeyboardShortcuts";
import { useLocalStorage } from "@/app/hooks/use-local-storage";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { TypingIndicator } from "./TypingIndicator";
import { Filters } from "@/app/types/filters";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  files?: FileWithPreview[];
  citations?: { title: string; url: string }[];
  webSearchUsed?: boolean;
}

interface FileWithPreview extends File {
  id: string;
  preview?: string;
  isCorrupt?: boolean;
}

// interface ChatAreaProps {
//   datasetCount: number;
//   filters: any;
// }
interface ChatAreaProps {
  datasetCount: number;
  filters: Filters;
}
interface ExportOptions {
  format: 'txt' | 'pdf' | 'docx';
  filename?: string;
}

export const ChatArea = ({ datasetCount, filters }: ChatAreaProps) => {
  const [messages, setMessages] = useLocalStorage<Message[]>("gfmi-chat-history", []);
  const [input, setInput] = useLocalStorage<string>("gfmi-draft-message", "");
  const [isLoading, setIsLoading] = useState(false);
  const [pendingUserMessage, setPendingUserMessage] = useState<string | null>(null);
  // Add this to your existing state in ChatArea.tsx
  const [isGenerating, setIsGenerating] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);

  const [attachedFiles, setAttachedFiles] = useState<FileWithPreview[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Updated limits
  const MAX_CHARS = 10000; // Increased from 5000 to 10000
  const MAX_LINES = 100; // Increased proportionally
  const MAX_FILES = 5; // Combined limit for all files
  const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB limit
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);
const exportButtonRef = useRef<HTMLButtonElement>(null);

// Listen for command palette export trigger
useEffect(() => {
  const handleOpenExportDropdown = (event: CustomEvent) => {
    if (event.detail?.source === "command-palette") {
      setExportDropdownOpen(true);
      
      // Optional: Focus the export button for better UX
      setTimeout(() => {
        exportButtonRef.current?.focus();
      }, 100);
    }
  };

  window.addEventListener("open-export-dropdown", handleOpenExportDropdown as EventListener);
  return () => {
    window.removeEventListener("open-export-dropdown", handleOpenExportDropdown as EventListener);
  };
}, []);
  // Allowed file types for production
  const ALLOWED_FILE_TYPES = [
    // Images
    'image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'image/svg+xml',
    // Documents
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'text/csv',
    'application/json',
    'application/xml',
    'text/xml'
  ];

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]");
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Parse dates when messages load from localStorage
  useEffect(() => {
    const needsParsing = messages.some(msg => typeof msg.timestamp === 'string');
    if (needsParsing) {
      const parsedMessages = messages.map((msg) => ({
        ...msg,
        timestamp: msg.timestamp instanceof Date ? msg.timestamp : new Date(msg.timestamp),
      }));
      setMessages(parsedMessages);
    }
  }, [messages.length]);

  // File validation functions
  const validateFileType = (file: File): boolean => {
    return ALLOWED_FILE_TYPES.includes(file.type);
  };

  const validateFileSize = (file: File): boolean => {
    return file.size <= MAX_FILE_SIZE;
  };

  const checkFileCorruption = async (file: File): Promise<boolean> => {
    try {
      // Basic corruption check for images
      if (file.type.startsWith('image/')) {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(false); // Not corrupt
          img.onerror = () => resolve(true); // Corrupt
          img.src = URL.createObjectURL(file);
        });
      }
      
      // Basic check for text files
      if (file.type === 'text/plain' || file.type === 'text/csv') {
        try {
          await file.text();
          return false; // Not corrupt
        } catch {
          return true; // Corrupt
        }
      }
      
      // For other file types, assume not corrupt if size is reasonable
      return file.size === 0; // Empty files are considered corrupt
    } catch {
      return true; // Error reading file, consider corrupt
    }
  };

  const generateFilePreview = async (file: FileWithPreview): Promise<string | undefined> => {
    if (file.type.startsWith('image/')) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = () => resolve(undefined);
        reader.readAsDataURL(file);
      });
    }
    return undefined;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const exportConversation = (options: ExportOptions = { format: 'txt' }) => {
    if (messages.length === 0) {
      toast.error("No conversation to export");
      return;
    }

    const timestamp = new Date().toISOString().split("T")[0];
    const baseFilename = options.filename || `gfmi-conversation-${timestamp}`;

    switch (options.format) {
      case 'txt':
        exportAsText(messages, `${baseFilename}.txt`);
        break;
      case 'pdf':
        exportAsPDF(messages, `${baseFilename}.pdf`);
        break;
      case 'docx':
        exportAsDocx(messages, `${baseFilename}.docx`);
        break;
    }

    toast.success(`Conversation exported as ${options.format.toUpperCase()}`);
  };

  const exportAsText = (msgs: Message[], filename: string) => {
    const conversationText = msgs
      .map((msg) => {
        const role = msg.role === "user" ? "You" : "GFMI Assistant";
        const time = msg.timestamp.toLocaleString();
        let text = `[${time}] ${role}:\n${msg.content}\n`;
        
        // Add citations if available
        if (msg.citations && msg.citations.length > 0) {
          text += "\nSources:\n";
          msg.citations.forEach((citation, idx) => {
            text += `[${idx + 1}] ${citation.title}\n    ${citation.url}\n`;
          });
        }
        
        return text;
      })
      .join("\n");
      
    const blob = new Blob([conversationText], { type: "text/plain" });
    downloadBlob(blob, filename);
  };

  const parseMarkdownToTextRuns = (text: string): any[] => {
    // Import TextRun types from docx
    const runs: any[] = [];
    const boldRegex = /\*\*(.*?)\*\*/g;
    const italicRegex = /\*(.*?)\*/g;
    
    let lastIndex = 0;
    let match;
    
    // First handle bold text
    const segments: Array<{text: string, bold?: boolean, italic?: boolean}> = [];
    let currentText = text;
    
    while ((match = boldRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        segments.push({ text: text.slice(lastIndex, match.index) });
      }
      segments.push({ text: match[1], bold: true });
      lastIndex = match.index + match[0].length;
    }
    
    if (lastIndex < text.length) {
      segments.push({ text: text.slice(lastIndex) });
    }
    
    // Now handle italic in segments
    const finalSegments: Array<{text: string, bold?: boolean, italic?: boolean}> = [];
    segments.forEach(seg => {
      if (seg.bold) {
        finalSegments.push(seg);
      } else {
        let segLastIndex = 0;
        let segMatch;
        const segText = seg.text;
        
        while ((segMatch = italicRegex.exec(segText)) !== null) {
          if (segMatch.index > segLastIndex) {
            finalSegments.push({ text: segText.slice(segLastIndex, segMatch.index) });
          }
          finalSegments.push({ text: segMatch[1], italic: true });
          segLastIndex = segMatch.index + segMatch[0].length;
        }
        
        if (segLastIndex < segText.length) {
          finalSegments.push({ text: segText.slice(segLastIndex) });
        }
      }
    });
    
    return finalSegments.length > 0 ? finalSegments : [{ text }];
  };

  const exportAsPDF = (msgs: Message[], filename: string) => {
    import('jspdf').then(({ jsPDF }) => {
      const doc = new jsPDF({
        format: 'a4',
        unit: 'mm'
      });
      
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;
      const maxWidth = pageWidth - (margin * 2);
      let y = margin;
      
      // msgs.forEach((msg, msgIdx) => {
      //   const role = msg.role === "user" ? "You" : "GFMI Assistant";
      //   const time = msg.timestamp.toLocaleString();
        
      //   // Add header
      //   doc.setFontSize(10);
      //   doc.setFont(undefined, 'bold');
      //   const header = `[${time}] ${role}:`;
      //   const headerLines = doc.splitTextToSize(header, maxWidth);
        
      //   // Check if we need a new page
      //   if (y + (headerLines.length * 7) > pageHeight - margin) {
      //     doc.addPage();
      //     y = margin;
      //   }
        
      //   headerLines.forEach((line: string) => {
      //     doc.text(line, margin, y);
      //     y += 7;
      //   });
        
      //   // Add content
      //   doc.setFont(undefined, 'normal');
      //   doc.setFontSize(9);
        
      //   // Remove markdown syntax for PDF (simple approach)
      //   const cleanContent = msg.content.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');
      //   const contentLines = doc.splitTextToSize(cleanContent, maxWidth);
        
      //   contentLines.forEach((line: string) => {
      //     if (y + 7 > pageHeight - margin) {
      //       doc.addPage();
      //       y = margin;
      //     }
      //     doc.text(line, margin, y);
      //     y += 6;
      //   });
      // Helper function to parse markdown and render with formatting
    const renderMarkdownText = (text: string, startY: number): number => {
      let currentY = startY;
      const lines = text.split('\n');
      
      lines.forEach((line) => {
        if (line.trim() === '') {
          currentY += 4; // Empty line spacing
          return;
        }

        // Parse markdown in the line
        const segments = parseLineForMarkdown(line);
        
        // Check if we need a new page
        if (currentY + 7 > pageHeight - margin) {
          doc.addPage();
          currentY = margin;
        }

        let currentX = margin;
        const lineHeight = 6;

        segments.forEach((segment) => {
          // Set font style based on segment properties
          if (segment.bold && segment.italic) {
            doc.setFont('helvetica', 'bolditalic');
          } else if (segment.bold) {
            doc.setFont('helvetica', 'bold');
          } else if (segment.italic) {
            doc.setFont('helvetica', 'italic');
          } else {
            doc.setFont('helvetica', 'normal');
          }

          // Handle text wrapping for long segments
          const textLines = doc.splitTextToSize(segment.text, maxWidth - (currentX - margin));
          
          textLines.forEach((textLine: string, index: number) => {
            if (currentY + lineHeight > pageHeight - margin) {
              doc.addPage();
              currentY = margin;
              currentX = margin;
            }

            doc.text(textLine, currentX, currentY);
            
            if (index < textLines.length - 1) {
              currentY += lineHeight;
              currentX = margin;
            } else {
              // For the last line, calculate where the next text should start
              const textWidth = doc.getTextWidth(textLine);
              currentX += textWidth;
              
              // If the text extends beyond the line, move to next line
              if (currentX > pageWidth - margin) {
                currentY += lineHeight;
                currentX = margin;
              }
            }
          });
        });

        currentY += lineHeight + 1; // Line spacing
      });

      return currentY;
    };

    // Helper function to parse a line for markdown formatting
    const parseLineForMarkdown = (line: string) => {
      const segments: Array<{text: string, bold?: boolean, italic?: boolean}> = [];
      let currentIndex = 0;

      // Regular expressions for markdown
      const boldRegex = /\*\*(.*?)\*\*/g;
      const italicRegex = /\*(.*?)\*/g;
      const combinedRegex = /(\*\*.*?\*\*|\*.*?\*)/g;

      const matches: Array<{start: number, end: number, text: string, type: 'bold'|'italic'|'both'}> = [];
      
      // Find all markdown matches
      let match;
      while ((match = combinedRegex.exec(line)) !== null) {
        const fullMatch = match[0];
        if (fullMatch.startsWith('**') && fullMatch.endsWith('**')) {
          matches.push({
            start: match.index,
            end: match.index + fullMatch.length,
            text: fullMatch.slice(2, -2),
            type: 'bold'
          });
        } else if (fullMatch.startsWith('*') && fullMatch.endsWith('*') && !fullMatch.startsWith('**')) {
          matches.push({
            start: match.index,
            end: match.index + fullMatch.length,
            text: fullMatch.slice(1, -1),
            type: 'italic'
          });
        }
      }

      // Sort matches by start position
      matches.sort((a, b) => a.start - b.start);

      // Build segments
      matches.forEach((match) => {
        // Add text before the match
        if (match.start > currentIndex) {
          const beforeText = line.slice(currentIndex, match.start);
          if (beforeText) {
            segments.push({ text: beforeText });
          }
        }

        // Add the formatted text
        segments.push({
          text: match.text,
          bold: match.type === 'bold' || match.type === 'both',
          italic: match.type === 'italic' || match.type === 'both'
        });

        currentIndex = match.end;
      });

      // Add remaining text
      if (currentIndex < line.length) {
        const remainingText = line.slice(currentIndex);
        if (remainingText) {
          segments.push({ text: remainingText });
        }
      }

      // If no segments were created, add the entire line as plain text
      if (segments.length === 0) {
        segments.push({ text: line });
      }

      return segments;
    };

    // Process each message
    msgs.forEach((msg, msgIdx) => {
      const role = msg.role === "user" ? "You" : "GFMI Assistant";
      const time = msg.timestamp.toLocaleString();

      // Add header
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      const header = `[${time}] ${role}:`;
      
      // Check if we need a new page for header
      if (y + 7 > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      
      doc.text(header, margin, y);
      y += 8;

      // Add content with markdown formatting
      doc.setFontSize(9);
      y = renderMarkdownText(msg.content, y);
        // Add citations if available
        if (msg.citations && msg.citations.length > 0) {
          y += 3;
          doc.setFontSize(8);
          doc.setFont(undefined, 'italic');
          
          if (y + 5 > pageHeight - margin) {
            doc.addPage();
            y = margin;
          }
          
          doc.text("Sources:", margin, y);
          y += 5;
          
          msg.citations.forEach((citation, idx) => {
            const citationText = `[${idx + 1}] ${citation.title}`;
            const citationLines = doc.splitTextToSize(citationText, maxWidth - 5);
            
            citationLines.forEach((line: string) => {
              if (y + 5 > pageHeight - margin) {
                doc.addPage();
                y = margin;
              }
              doc.text(line, margin + 5, y);
              y += 4;
            });
            
            const urlLines = doc.splitTextToSize(citation.url, maxWidth - 5);
            urlLines.forEach((line: string) => {
              if (y + 4 > pageHeight - margin) {
                doc.addPage();
                y = margin;
              }
              doc.text(line, margin + 5, y);
              y += 4;
            });
          });
        }
        
        // Add spacing between messages
        y += 8;
        
        if (msgIdx < msgs.length - 1 && y > pageHeight - margin - 20) {
          doc.addPage();
          y = margin;
        }
      });
      
      doc.save(filename);
    }).catch(() => {
      toast.error("PDF export failed. Please try again.");
    });
  };

  const exportAsDocx = (msgs: Message[], filename: string) => {
    Promise.all([
      import('docx'),
      import('file-saver')
    ]).then(([{ Document, Packer, Paragraph, TextRun, HeadingLevel }, FileSaver]) => {
      const children: any[] = [];
      
      msgs.forEach((msg) => {
        const role = msg.role === "user" ? "You" : "GFMI Assistant";
        const time = msg.timestamp.toLocaleString();
        
        // Add header
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `[${time}] ${role}:`,
                bold: true,
                size: 22,
              })
            ],
            spacing: { before: 200, after: 100 }
          })
        );
        
        // Parse and add content with markdown formatting
        const contentLines = msg.content.split('\n');
        contentLines.forEach(line => {
          if (line.trim() === '') {
            children.push(new Paragraph({ text: '' }));
          } else {
            const segments = parseMarkdownToTextRuns(line);
            children.push(
              new Paragraph({
                children: segments.map(seg => 
                  new TextRun({
                    text: seg.text,
                    bold: seg.bold || false,
                    italics: seg.italic || false,
                  })
                ),
                spacing: { after: 100 }
              })
            );
          }
        });
        
        // Add citations if available
        if (msg.citations && msg.citations.length > 0) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: "Sources:",
                  italics: true,
                  size: 20,
                })
              ],
              spacing: { before: 100, after: 50 }
            })
          );
          
          msg.citations.forEach((citation, idx) => {
            children.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: `[${idx + 1}] ${citation.title}`,
                    size: 18,
                  })
                ],
                spacing: { after: 30 }
              })
            );
            children.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: `    ${citation.url}`,
                    size: 18,
                    italics: true,
                  })
                ],
                spacing: { after: 50 }
              })
            );
          });
        }
        
        // Add spacing between messages
        children.push(new Paragraph({ text: '' }));
      });
      
      const doc = new Document({
        sections: [{
          properties: {},
          children: children,
        }],
      });

      Packer.toBlob(doc).then((blob) => {
        FileSaver.saveAs(blob, filename);
      });
    }).catch(() => {
      toast.error("DOCX export failed. Please try again.");
    });
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const focusInput = () => {
    textareaRef.current?.focus();
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    await processFiles(files);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const processFiles = async (files: File[]) => {
  // Check total file count limit
  if (attachedFiles.length + files.length > MAX_FILES) {
    toast.error(`Maximum ${MAX_FILES} files allowed. Currently have ${attachedFiles.length} files.`);
    return;
  }

  const processedFiles: FileWithPreview[] = [];
  
  for (const file of files) {
    // Validate file type
    if (!validateFileType(file)) {
      toast.error(`${file.name}: Unsupported file type. Please upload documents, images, or text files only.`);
      continue;
    }

    // Validate file size
    if (!validateFileSize(file)) {
      toast.error(`${file.name}: File too large. Maximum size is ${formatFileSize(MAX_FILE_SIZE)}.`);
      continue;
    }

    // Check for corruption
    const isCorrupt = await checkFileCorruption(file);
    if (isCorrupt) {
      toast.error(`${file.name}: File appears to be corrupted or empty.`);
      continue;
    }

    // Create file with preview
    const fileWithPreview: FileWithPreview = Object.assign(file, {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      isCorrupt: false
    });

    // Generate preview for images
    if (file.type.startsWith('image/')) {
      fileWithPreview.preview = await generateFilePreview(fileWithPreview);
    }

    processedFiles.push(fileWithPreview);
  }

  if (processedFiles.length > 0) {
    setUploadingFiles(true);
    
    // Simulate upload progress
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Update the attached files
    const newAttachedFiles = [...attachedFiles, ...processedFiles];
    setAttachedFiles(newAttachedFiles);
    setUploadingFiles(false);
    
    // Show correct total count in toast notification
    const totalFileCount = newAttachedFiles.length;
    toast.success(`${processedFiles.length} file(s) added • Total: ${totalFileCount} file(s) attached`);
  }
};

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    const pastedFiles: File[] = [];
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      
      // Check if it's an image
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        if (file) {
          // Give pasted images a unique name with timestamp
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          const extension = item.type.split('/') || 'png';
          const uniqueName = `pasted-image-${timestamp}.${extension}`;
          
          // Create a new file with unique name
          const renamedFile = new File([file], uniqueName, { type: file.type });
          pastedFiles.push(renamedFile);
        }
      }
    }

    if (pastedFiles.length > 0) {
      await processFiles(pastedFiles);
    }
  };

  const removeFile = (fileId: string) => {
    setAttachedFiles(attachedFiles.filter(file => file.id !== fileId));
    toast.info("File removed");
  };

  const mockAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("trend")) {
      return `Based on your current dataset of ${(datasetCount / 1000).toFixed(1)}K records with ${Object.values(filters).flat().length} active filters, here are the key trends I've identified:

1. **Geographic Distribution**: Most activity is concentrated in North America and Europe
2. **HCP Engagement**: Tier 1 and Tier 2 healthcare providers show highest engagement rates
3. **Therapeutic Areas**: Oncology programs demonstrate strongest performance metrics
4. **Seasonal Patterns**: Q3 and Q4 typically show increased conference and advisory board activity

Would you like me to dive deeper into any specific trend?`;
    } else if (lowerMessage.includes("summarize")) {
      return `Here's a summary of your filtered dataset:

**Dataset Overview:**
- Total Records: ${(datasetCount / 1000).toFixed(1)}K medical survey responses
- Active Filters: ${Object.values(filters).flat().length}
- Date Range: ${filters.dateRange}

**Key Findings:**
- High engagement rates across Tier 1 healthcare providers
- Strong performance in oncology therapeutic areas
- Increasing trend in advisory board participation
- Geographic concentration in North America and Europe

The data suggests consistent growth in medical affairs engagement with opportunities for expansion in underrepresented regions.`;
    } else {
      return `I've analyzed your question about "${userMessage}" using the current filtered dataset of ${(datasetCount / 1000).toFixed(1)}K records.

Based on the applied filters and the medical affairs data, I can provide insights on:
- Engagement patterns across your selected geographic regions
- Performance metrics for the specified healthcare provider tiers
- Trends in the selected therapeutic areas
- Conference and advisory board participation rates

Could you provide more specific details about what aspect you'd like me to focus on?`;
    }
  };

  // Handle AI response when pendingUserMessage changes
  useEffect(() => {
    if (pendingUserMessage) {
      const timer = setTimeout(() => {
      // Check if generation was aborted
      if (abortController?.signal.aborted) {
        return;
      }
      
      // Generate mock citations if web search was used
      const mockCitations = webSearchEnabled ? [
        { title: "Medical Affairs Best Practices 2024", url: "https://example.com/medical-affairs-guide" },
        { title: "Healthcare Provider Engagement Strategies", url: "https://example.com/provider-engagement" },
        { title: "Oncology Insights Report Q1 2024", url: "https://example.com/oncology-report" },
      ] : undefined;
      
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: mockAIResponse(pendingUserMessage),
        timestamp: new Date(),
        citations: mockCitations,
        webSearchUsed: webSearchEnabled,
      };
        setMessages((prev) => [...prev, aiMessage]);
        setIsLoading(false);
        setIsGenerating(false);
        setPendingUserMessage(null);
        setAbortController(null);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [pendingUserMessage, abortController, webSearchEnabled]);

  const handleSend = async () => {
    if (!input.trim() 
      && 
    attachedFiles.length === 0
        ) return;

    // Check character limit
    if (input.length > MAX_CHARS) {
      toast.error(`Message too long! Maximum ${MAX_CHARS} characters allowed (current: ${input.length})`);
      return;
    }

    // Check line limit
    const lineCount = input.split('\n').length;
    if (lineCount > MAX_LINES) {
      toast.error(`Message too long! Maximum ${MAX_LINES} lines allowed (current: ${lineCount})`);
      return;
    }

    const currentInput = input.trim();
    const currentFiles = [...attachedFiles];

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: currentInput,
      timestamp: new Date(),
      files: currentFiles.length > 0 ? currentFiles : undefined,
      webSearchUsed: webSearchEnabled,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setAttachedFiles([]);
    setIsLoading(true);
    setIsGenerating(true);

     // Create abort controller for stopping generation
    const controller = new AbortController();
    setAbortController(controller);

    setPendingUserMessage(currentInput);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const stopGeneration = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
    setIsLoading(false);
    setIsGenerating(false);
    setPendingUserMessage(null);
    toast.info("Response generation stopped");
  };


  return (
    <div className="flex h-full flex-col bg-background">
      {/* Main Chat Container */}
      <div className="flex h-full flex-col">
        {/* Header with Export Button */}
        <div className="flex items-center justify-between border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 py-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">GFMI Assistant</span>
          </div>
          
          {messages.length > 0 && (
            // <DropdownMenu>
            //   <DropdownMenuTrigger asChild>
            //     <Button variant="outline" size="sm" className="gap-2">
            //       <Download className="h-4 w-4" />
            //       Export Chat
            //     </Button>
            //   </DropdownMenuTrigger>
            //   <DropdownMenuContent align="end">
            //     <DropdownMenuItem 
            //       onClick={() => exportConversation({ format: 'txt' })}
            //       className="cursor-pointer text-sm"
            //     >
            //       Export as TXT
            //     </DropdownMenuItem>
            //     <DropdownMenuItem 
            //       onClick={() => exportConversation({ format: 'pdf' })}
            //       className="cursor-pointer text-sm"
            //     >
            //       Export as PDF
            //     </DropdownMenuItem>
            //     <DropdownMenuItem 
            //       onClick={() => exportConversation({ format: 'docx' })}
            //       className="cursor-pointer text-sm"
            //     >
            //       Export as DOCX
            //     </DropdownMenuItem>
            //   </DropdownMenuContent>
            // </DropdownMenu>
            <DropdownMenu open={exportDropdownOpen} onOpenChange={setExportDropdownOpen}>
            <DropdownMenuTrigger asChild >
              <Button 
                ref={exportButtonRef}
                variant="outline" 
                size="sm" className="gap-2"
              >
                <Download className="h-4 w-4" />
                Export Chat
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => exportConversation({ format: 'txt' })}className="cursor-pointer text-sm">
                Export as TXT
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportConversation({ format: 'pdf' })}className="cursor-pointer text-sm">
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportConversation({ format: 'docx' })}className="cursor-pointer text-sm">
                Export as DOCX
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          )}
        </div>

        {/* Messages Area - Enhanced Layout */}
        <ScrollArea 
          ref={scrollAreaRef} 
          className="flex-1 px-4 md:px-6"
        >
          {messages.length === 0 ? (
            <WelcomeScreen 
              datasetCount={datasetCount}
              onSuggestedQuestion={handleSuggestedQuestion}
            />
          ) : (
            <div className="space-y-6 py-6 max-w-4xl mx-auto">
              {/* Messages */}
              {messages.map((message, index) => (
                <div key={message.id}>
                  <ChatMessage message={message} />
                  
                  {/* Add visual separator between messages */}
                  {index < messages.length - 1 && (
                    <div className="h-px bg-border/30 mx-8 my-6" />
                  )}
                </div>
              ))}
              
              {/* Enhanced Loading State */}
              {isLoading && <TypingIndicator />}
            </div>
          )}
        </ScrollArea>

        {/* Input Area - Fixed at Bottom */}
        <div className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 md:p-6">
          {/* File Attachments - Above the input */}
          {(attachedFiles.length > 0 || uploadingFiles) && (
            <div className="mb-4 flex flex-wrap gap-2">
              {attachedFiles.map((file) => (
                <div
                  key={file.id}
                  className="group relative flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm border border-border"
                >
                  {file.preview && (
                    <img 
                      src={file.preview} 
                      alt={file.name}
                      className="h-8 w-8 rounded object-cover"
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="truncate max-w-32">{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFile(file.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              {uploadingFiles && (
                <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  Uploading...
                </div>
              )}
            </div>
          )}

          {/* ChatGPT-style rounded input container */}
          <div className="relative rounded-2xl border border-border bg-background shadow-sm hover:shadow-md transition-shadow">
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={ALLOWED_FILE_TYPES.join(',')}
              onChange={handleFileSelect}
              className="hidden"
            />
            
            {/* Attachment button - inside left */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted z-10"
              onClick={() => fileInputRef.current?.click()}
              disabled={attachedFiles.length >= MAX_FILES}
            >
              <Paperclip className="h-4 w-4" />
            </Button>

            {/* Textarea with proper padding for buttons */}
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              onPaste={handlePaste}
              placeholder="Ask a question about your filtered data... (Paste images with Ctrl+V)"
              className="min-h-[52px] max-h-32 pl-12 pr-24
              py-3 border-0 bg-transparent resize-none focus-visible:ring-0 focus-visible:ring-offset-0 scrollbar-thin"
              style={{ 
                lineHeight: '1.5'
              }}
              aria-label="Chat input"
            />

            {/* Send button - inside right */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {/* Web Search Toggle */}
              <Button
                variant={webSearchEnabled ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  setWebSearchEnabled(!webSearchEnabled);
                  toast.info(webSearchEnabled ? "Web search disabled" : "Web search enabled");
                }}
                className="h-8 w-8 p-0"
                title={webSearchEnabled ? "Disable web search" : "Enable web search"}
              >
                <Globe className={`h-4 w-4 ${webSearchEnabled ? "" : "opacity-60"}`} />
              </Button>

              {isGenerating ? (
                <Button
                  size="sm"
                  onClick={stopGeneration}
                  className="h-8 w-8 p-0 bg-destructive hover:bg-destructive/90"
                >
                  <Square className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading || uploadingFiles}
                  className="h-8 w-8 p-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Optional: Keyboard hint with character count */}
          <div className="flex items-center justify-between mt-2 px-2">
            <span className="text-xs text-muted-foreground">
              Press Enter to send, Shift+Enter for new line • Max {MAX_FILES} files
            </span>
            {input.length > 0 && (
              <span className={`text-xs ${input.length > MAX_CHARS * 0.9 ? 'text-destructive' : 'text-muted-foreground'}`}>
                {input.length}/{MAX_CHARS}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};