import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";

interface SearchBoxProps {
  onSubmit: (question: string) => void;
  isLoading: boolean;
}

export function SearchBox({ onSubmit, isLoading }: SearchBoxProps) {
  const form = useForm({
    defaultValues: {
      question: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => onSubmit(data.question))}>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Ask any biological or bioinformatics question..."
                    className="min-h-[100px] text-lg bg-black/50 border-gray-800 text-gray-200 placeholder:text-gray-500 focus:border-gray-700 focus:ring-gray-700"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="w-full md:w-auto bg-gray-800 text-gray-200 hover:bg-gray-700 transition-colors" 
            disabled={isLoading}
          >
            <Search className="mr-2 h-4 w-4" />
            {isLoading ? "Analyzing..." : "Search"}
          </Button>
        </div>
      </form>
    </Form>
  );
}