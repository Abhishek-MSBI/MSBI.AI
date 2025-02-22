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
    <div className="min-h-screen bg-black">
      <header className="py-12 border-b border-gray-800">
        <div className="container max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-white">MSBI.AI</h1>
          <p className="text-lg text-gray-400">
            Your specialized AI research assistant for biological sciences and bioinformatics. 
            Get detailed, academic-style answers to your research questions, analyze scientific papers, 
            and explore complex biological concepts.
          </p>
        </div>
      </header>

      <main className="container max-w-3xl mx-auto py-8 px-4">
        <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-800">
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