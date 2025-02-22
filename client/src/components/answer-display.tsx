import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";

interface AnswerDisplayProps {
  answer: string;
}

export function AnswerDisplay({ answer }: AnswerDisplayProps) {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(answer);
    toast({
      title: "Copied!",
      description: "Answer copied to clipboard",
    });
  };

  const downloadPDF = () => {
    const pdf = new jsPDF();
    
    // Add MSBI.AI header
    pdf.setFontSize(24);
    pdf.setTextColor(33, 99, 232);
    pdf.text("MSBI.AI", 20, 20);
    
    // Add horizontal line
    pdf.setLineWidth(0.5);
    pdf.line(20, 25, 190, 25);
    
    // Add answer content
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(pdf.splitTextToSize(answer, 170), 20, 40);
    
    pdf.save("msbi-ai-answer.pdf");
    
    toast({
      title: "Downloaded!",
      description: "Answer saved as PDF",
    });
  };

  return (
    <Card className="mt-8">
      <CardContent className="pt-6">
        <div className="prose max-w-none">
          <div className="whitespace-pre-wrap">{answer}</div>
        </div>
        
        <div className="flex gap-4 mt-6">
          <Button variant="outline" onClick={copyToClipboard}>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button variant="outline" onClick={downloadPDF}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
