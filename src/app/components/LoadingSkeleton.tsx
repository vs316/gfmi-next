import { Skeleton } from "@/app/components/ui/skeleton";

interface LoadingSkeletonProps {
  variant?: "message" | "filters" | "chat-history";
}

export function LoadingSkeleton({ variant = "message" }: LoadingSkeletonProps) {
  if (variant === "message") {
    return (
      <div className="flex items-start gap-3 animate-fade-in">
        <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  if (variant === "filters") {
    return (
      <div className="space-y-4 p-4 animate-fade-in">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "chat-history") {
    return (
      <div className="space-y-2 p-4 animate-fade-in">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  return null;
}
