import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  datasetCount: number;
  onSuggestedQuestion: (question: string) => void;
}

export const WelcomeScreen = ({
  datasetCount,
  onSuggestedQuestion,
}: WelcomeScreenProps) => {
  const suggestedQuestions = [
    "What are the key trends in this data?",
    "Summarize the findings",
  ];

  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <div className="flex min-h-full flex-col items-center justify-center text-center px-4 py-8">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-muted transition-colors">
          <MessageSquare className="h-12 w-12 text-muted-foreground" />
        </div>

        <h1 className="mb-4 text-3xl font-semibold text-foreground transition-colors">
          Welcome to GFMI Assistant
        </h1>

        <p className="mb-8 max-w-2xl text-lg text-muted-foreground transition-colors">
          Use the filters on the left to narrow down your dataset, then ask
          questions to get insights from your data.
        </p>

        <div className="mb-8 rounded-lg bg-muted px-6 py-3 text-sm transition-colors">
          <p className="text-muted-foreground transition-colors">
            Currently working with{" "}
            <span className="font-semibold text-foreground transition-colors">
              {(datasetCount / 1000).toFixed(1)}K
            </span>{" "}
            filtered datasets
          </p>
        </div>

        <div className="space-y-4 w-full max-w-2xl pb-8">
          <p className="text-sm font-medium text-muted-foreground transition-colors">Try asking:</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:flex-wrap">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => onSuggestedQuestion(question)}
                className="min-w-[200px] transition-all hover:shadow-sm"
              >
                "{question}"
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
