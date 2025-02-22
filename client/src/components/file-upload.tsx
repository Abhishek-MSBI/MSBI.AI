import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onFilesSelected: (files: string[]) => void;
}

export function FileUpload({ onFilesSelected }: FileUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);

    const fileContents = await Promise.all(
      files.map((file) => file.text())
    );
    onFilesSelected(fileContents);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => document.getElementById("file-upload")?.click()}
          className="gap-2"
        >
          <Upload className="h-4 w-4" />
          Upload Files
        </Button>
        <input
          id="file-upload"
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      
      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-muted rounded-md"
            >
              <span className="text-sm truncate">{file.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
