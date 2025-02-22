import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { SearchBox } from "@/components/search-box";
import { FileUpload } from "@/components/file-upload";
import { AnswerDisplay } from "@/components/answer-display";
import { useToast } from "@/hooks/use-toast";
import type { Query } from "@shared/schema";

export default function Home() {
  const [files, setFiles] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string>("");
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (question: string) => {
      const res = await apiRequest("POST", "/api/query", {
        question,
        files,
      });
      return res.json() as Promise<Query>;
    },
    onSuccess: (data) => {
      setAnswer(data.answer);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to process your query",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary py-8">
        <div className="container">
          <h1 className="text-4xl font-bold text-primary-foreground mb-2">
            MSBI.AI
          </h1>
          <p className="text-lg text-primary-foreground/80">
            Your AI Research Assistant for Biological Sciences
          </p>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img
              src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69"
              alt="Laboratory"
              className="rounded-lg object-cover aspect-video"
            />
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1579154392128-bf8c7ebee541"
              alt="DNA Structure"
              className="rounded-lg object-cover aspect-video"
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <SearchBox
            onSubmit={(question) => mutation.mutate(question)}
            isLoading={mutation.isPending}
          />
          <FileUpload onFilesSelected={setFiles} />
          {answer && <AnswerDisplay answer={answer} />}
        </div>
      </main>
    </div>
  );
}
